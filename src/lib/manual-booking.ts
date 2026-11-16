import { PLAY_SPORTS, type PlaySportId } from "./play-data";

export type ManualBooking = {
  sport: PlaySportId; date: string; time: string; duration: string;
  name: string; phone: string; email: string; people: string; notes: string;
};
export type ManualBookingErrors = Partial<Record<keyof ManualBooking, string>>;

export function validateManualBooking(data: ManualBooking, now = new Date()): ManualBookingErrors {
  const errors: ManualBookingErrors = {};
  if (!PLAY_SPORTS.some(s => s.id === data.sport)) errors.sport = "Choose a sport.";
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(data.date) && !Number.isNaN(Date.parse(data.date)) && new Date(data.date).toISOString().slice(0, 10) === data.date;
  if (!validDate) errors.date = "Choose a valid date.";
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(data.time)) errors.time = "Choose a preferred time.";
  if (validDate && !errors.time && new Date(`${data.date}T${data.time}:00+05:30`).getTime() <= now.getTime()) errors.time = "Choose a future date and time (IST).";
  if (!["60", "90", "120", "180"].includes(data.duration)) errors.duration = "Choose a duration.";
  if (!data.name.trim() || data.name.trim().length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (!/^\+?[\d ()-]{8,25}$/.test(data.phone.trim()) || data.phone.replace(/\D/g, "").length < 8 || data.phone.replace(/\D/g, "").length > 15) errors.phone = "Enter a valid phone number.";
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Enter a valid email, or leave it blank.";
  if (!/^\d+$/.test(data.people) || Number(data.people) < 1 || Number(data.people) > 100) errors.people = "Enter a group size from 1 to 100.";
  if (data.notes.trim().length > 500) errors.notes = "Keep notes within 500 characters.";
  return errors;
}

export function manualBookingMessage(data: ManualBooking) {
  const sport = PLAY_SPORTS.find(s => s.id === data.sport)!.shortName;
  return [
    "Hi Club 7, I'd like to request a playing slot.",
    `Sport: ${sport}`, `Preferred date: ${data.date}`,
    `Preferred start time: ${data.time} IST`, `Duration: ${data.duration} minutes`,
    `Group size: ${data.people} people`, `Name: ${data.name.trim()}`, `Phone: ${data.phone.trim()}`,
    data.email.trim() ? `Email: ${data.email.trim()}` : null,
    data.notes.trim() ? `Notes: ${data.notes.trim()}` : null,
    "Please confirm availability, the total price and payment arrangements. I understand this request does not reserve a slot.",
  ].filter(Boolean).join("\n");
}
