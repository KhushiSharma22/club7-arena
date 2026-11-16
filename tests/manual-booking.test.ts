import { test } from "node:test";
import assert from "node:assert/strict";
import { manualBookingMessage, validateManualBooking, type ManualBooking } from "../src/lib/manual-booking";
import { whatsappHref } from "../src/lib/constants";

const now = new Date("2026-11-16T10:00:00Z");
const request: ManualBooking = { sport: "cricket", date: "2026-11-17", time: "19:30", duration: "90", name: "Test & Squad", phone: "+91 99999 99999", email: "test@example.com", people: "12", notes: "Bat & ball?\nOne turf please." };
test("manual booking validates preferences without claiming live availability", () => {
  assert.deepEqual(validateManualBooking(request, now), {});
  assert.ok(validateManualBooking({...request, date:"2026-11-16", time:"14:00"}, now).time);
  assert.ok(validateManualBooking({...request, date:"2026-02-30"}, now).date);
  assert.ok(validateManualBooking({...request, time:"25:00"}, now).time);
  assert.ok(validateManualBooking({...request, people:"0"}, now).people);
  assert.ok(validateManualBooking({...request, people:"1.5"}, now).people);
  assert.ok(validateManualBooking({...request, phone:"no phone"}, now).phone);
  assert.ok(validateManualBooking({...request, email:"invalid"}, now).email);
  assert.deepEqual(validateManualBooking({...request, email:""}, now), {});
});
test("WhatsApp draft preserves all details and targets Club 7", () => {
  const message = manualBookingMessage(request);
  const url = new URL(whatsappHref(message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/919911046717");
  assert.equal(url.searchParams.get("text"), message);
  for (const value of ["Box Cricket", "2026-11-17", "19:30 IST", "90 minutes", "12 people", request.name, request.phone, request.email, request.notes]) assert.ok(message.includes(value));
  assert.ok(message.includes("does not reserve a slot"));
  assert.equal(manualBookingMessage({...request, sport:"football"}).includes("Sport: Football"), true);
});
