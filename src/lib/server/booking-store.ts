import { randomUUID } from "node:crypto";
import { getDb } from "./db";
import { hash } from "./auth";
import { ApiError } from "./http";
import type { Slot, Booking } from "../booking-types";

export function text(value: unknown, label: string, max = 100) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) throw new ApiError(400, `Enter a valid ${label}.`);
  return value.trim();
}
function integer(value: unknown, label: string, min: number, max: number) {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max) throw new ApiError(400, `Invalid ${label}.`);
  return value;
}
export function dateValue(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new ApiError(400, "Enter a valid date.");
  return value;
}
export function sportValue(value: unknown) { if (value !== "football" && value !== "cricket" && value !== "pickleball") throw new ApiError(400, "Choose a valid sport."); return value; }
function minutes(value: unknown, allowEnd = false) {
  if (allowEnd && value === "24:00") return 1440;
  if (typeof value !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) throw new ApiError(400, "Enter a valid time.");
  return Number(value.slice(0,2)) * 60 + Number(value.slice(3));
}
function audit(adminId: string, action: string, target: string) { getDb().prepare("INSERT INTO audit(adminId, action, target, createdAt) VALUES (?, ?, ?, ?)").run(adminId, action, target, Date.now()); }
export function createSlots(data: Record<string, unknown>, adminId: string) {
  const sport = sportValue(data.sport), resource = text(data.resource, "court or turf name", 60);
  const from = dateValue(data.from), to = dateValue(data.to);
  const days = (Date.parse(to) - Date.parse(from)) / 86400000;
  if (days < 0 || days > 89) throw new ApiError(400, "Choose a range of up to 90 days.");
  const start = minutes(data.start), end = minutes(data.end, true);
  const duration = integer(data.duration, "duration", 15, 240), pricePaise = integer(data.pricePaise, "price", 0, 10000000), maxPeople = integer(data.maxPeople, "group size", 1, 100);
  if (end <= start || (end - start) % duration !== 0) throw new ApiError(400, "The time window must fit complete slots of your chosen duration.");
  if (!Array.isArray(data.weekdays) || !data.weekdays.length || data.weekdays.some(d => !Number.isInteger(d) || d < 0 || d > 6)) throw new ApiError(400, "Select at least one weekday.");
  const weekdays = data.weekdays as number[], db = getDb();
  return db.transaction(() => {
    let created = 0, skipped = 0;
    const overlap = db.prepare("SELECT id FROM slots WHERE resourceKey = ? AND startsAt < ? AND endsAt > ? LIMIT 1");
    const insert = db.prepare("INSERT INTO slots(id,sport,resource,resourceKey,startsAt,endsAt,pricePaise,maxPeople,createdBy,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)");
    for (let day = 0; day <= days; day++) {
      const date = new Date(Date.parse(from) + day * 86400000);
      if (!weekdays.includes(date.getUTCDay())) continue;
      const midnight = Date.parse(`${date.toISOString().slice(0,10)}T00:00:00+05:30`);
      for (let time = start; time + duration <= end; time += duration) {
        const startsAt = midnight + time * 60000, endsAt = startsAt + duration * 60000;
        if (startsAt <= Date.now()) { skipped++; continue; }
        if (overlap.get(resource.toLowerCase().replace(/\s+/g, " "), endsAt, startsAt)) { skipped++; continue; }
        const id = randomUUID();
        insert.run(id, sport, resource, resource.toLowerCase().replace(/\s+/g, " "), startsAt, endsAt, pricePaise, maxPeople, adminId, Date.now()); created++;
      }
    }
    audit(adminId, "slots.publish", JSON.stringify({ created, skipped, sport, from, to }));
    return { created, skipped };
  }).immediate();
}
const slotColumns = "s.id,s.sport,s.resource,s.startsAt,s.endsAt,s.pricePaise,s.maxPeople,s.state,s.version";
export function availableSlots(sport: unknown, date: unknown) {
  const day = dateValue(date), game = sportValue(sport);
  const start = Date.parse(`${day}T00:00:00+05:30`);
  return getDb().prepare(`SELECT ${slotColumns} FROM slots s WHERE s.sport = ? AND s.startsAt >= ? AND s.startsAt < ? AND s.startsAt > ? AND s.state = 'open' AND NOT EXISTS (SELECT 1 FROM bookings b WHERE b.slotId = s.id AND b.status IN ('pending','confirmed')) ORDER BY s.startsAt, s.resource`).all(game, start, start + 86400000, Date.now()) as Slot[];
}
export function adminSlots(from: unknown, to: unknown) {
  const start = Date.parse(`${dateValue(from)}T00:00:00+05:30`), end = Date.parse(`${dateValue(to)}T00:00:00+05:30`) + 86400000;
  if (end < start || end - start > 91 * 86400000) throw new ApiError(400, "Choose a range of up to 90 days.");
  return getDb().prepare(`SELECT ${slotColumns}, EXISTS(SELECT 1 FROM bookings b WHERE b.slotId = s.id AND b.status IN ('pending','confirmed')) as booked FROM slots s WHERE startsAt >= ? AND startsAt < ? ORDER BY startsAt, resource`).all(start, end) as Slot[];
}
export function updateSlot(data: Record<string, unknown>, adminId: string) {
  const id = text(data.id, "slot"), db = getDb();
  return db.transaction(() => {
    const slot = db.prepare("SELECT * FROM slots WHERE id = ?").get(id) as Slot | undefined;
    if (!slot) throw new ApiError(404, "Slot not found.");
    if (slot.startsAt <= Date.now()) throw new ApiError(409, "Past slots cannot be changed.");
    if (db.prepare("SELECT id FROM bookings WHERE slotId = ? AND status IN ('pending','confirmed')").get(id)) throw new ApiError(409, "This slot is booked. Cancel the booking before changing it.");
    if (data.state !== "open" && data.state !== "closed") throw new ApiError(400, "Invalid slot state.");
    const price = integer(data.pricePaise, "price", 0, 10000000), max = integer(data.maxPeople, "group size", 1, 100);
    db.prepare("UPDATE slots SET state = ?, pricePaise = ?, maxPeople = ?, version = version + 1 WHERE id = ?").run(data.state, price, max, id);
    audit(adminId, "slot.update", id);
    return { ok: true };
  }).immediate();
}
export function reserveSlot(data: Record<string, unknown>) {
  const slotId = text(data.slotId, "slot"), name = text(data.name, "name"), email = text(data.email, "email", 254).toLowerCase(), phone = text(data.phone, "phone", 25);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ApiError(400, "Enter a valid email address.");
  if (!/^[+\d ()-]+$/.test(phone) || phone.replace(/\D/g, "").length < 8 || phone.replace(/\D/g, "").length > 15) throw new ApiError(400, "Enter a valid phone number.");
  const people = integer(data.people, "group size", 1, 100), expectedVersion = integer(data.expectedVersion, "slot version", 1, 1000000000), expectedPrice = integer(data.expectedPricePaise, "price", 0, 10000000);
  if (typeof data.notes !== "string" || data.notes.length > 500) throw new ApiError(400, "Notes must be at most 500 characters.");
  const notes = data.notes.trim(), requestKey = text(data.requestKey, "request reference", 80);
  if (!/^[a-f0-9-]{36}$/.test(requestKey)) throw new ApiError(400, "Invalid request reference.");
  const requestHash = hash(JSON.stringify({ slotId, name, email, phone, people, notes, expectedVersion, expectedPrice }));
  const db = getDb();
  return db.transaction(() => {
    const existing = db.prepare("SELECT id, totalPaise, status, requestHash FROM bookings WHERE requestKey = ?").get(requestKey) as {id: string; totalPaise: number; status: string; requestHash: string} | undefined;
    if (existing) {
      if (existing.requestHash !== requestHash) throw new ApiError(409, "Request changed. Please refresh and try again.");
      return { id: existing.id, totalPaise: existing.totalPaise, status: existing.status };
    }
    const slot = db.prepare("SELECT * FROM slots WHERE id = ?").get(slotId) as Slot | undefined;
    if (!slot || slot.state !== "open" || slot.startsAt <= Date.now() || db.prepare("SELECT id FROM bookings WHERE slotId = ? AND status IN ('pending','confirmed')").get(slotId)) throw new ApiError(409, "This slot is no longer available. Please choose another.");
    if (slot.pricePaise !== expectedPrice || slot.version !== expectedVersion) throw new ApiError(409, "The venue updated this slot. Review the latest details and select it again.");
    if (people > slot.maxPeople) throw new ApiError(400, `This slot allows up to ${slot.maxPeople} people.`);
    const id = randomUUID();
    db.prepare("INSERT INTO bookings(id,slotId,name,email,phone,people,notes,totalPaise,requestKey,requestHash,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(id, slotId, name, email, phone, people, notes, slot.pricePaise, requestKey, requestHash, Date.now());
    return { id, totalPaise: slot.pricePaise, status: "pending" };
  }).immediate();
}
export function listBookings(from: unknown, to: unknown) {
  const start = Date.parse(`${dateValue(from)}T00:00:00+05:30`), end = Date.parse(`${dateValue(to)}T00:00:00+05:30`) + 86400000;
  if (end < start || end - start > 91 * 86400000) throw new ApiError(400, "Choose a range of up to 90 days.");
  return getDb().prepare("SELECT b.id,b.slotId,b.name,b.email,b.phone,b.people,b.notes,b.totalPaise,b.status,b.paymentStatus,b.createdAt,s.sport,s.resource,s.startsAt,s.endsAt FROM bookings b JOIN slots s ON s.id = b.slotId WHERE s.startsAt >= ? AND s.startsAt < ? ORDER BY b.createdAt DESC").all(start, end) as Booking[];
}
export function updateBooking(data: Record<string, unknown>, adminId: string) {
  const id = text(data.id, "booking"), db = getDb();
  return db.transaction(() => {
    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as Booking | undefined;
    if (!booking) throw new ApiError(404, "Booking not found.");
    if (data.action === "cancel") {
      db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(id);
    } else if (data.action === "approve" && booking.status === "pending") {
      const slot = db.prepare("SELECT startsAt FROM slots WHERE id = ?").get(booking.slotId) as {startsAt: number};
      if (slot.startsAt <= Date.now()) throw new ApiError(409, "This slot has passed. Decline the request instead.");
      db.prepare("UPDATE bookings SET status = 'confirmed' WHERE id = ?").run(id);
    } else if (data.action === "mark-paid" && booking.status === "confirmed") {
      db.prepare("UPDATE bookings SET paymentStatus = 'paid' WHERE id = ?").run(id);
    } else throw new ApiError(400, "Invalid booking action.");
    audit(adminId, `booking.${data.action}`, id);
    return { ok: true };
  }).immediate();
}
