import type { PlaySportId } from "./play-data";
export type Slot = { id: string; sport: PlaySportId; resource: string; startsAt: number; endsAt: number; pricePaise: number; maxPeople: number; version: number; state: "open" | "closed"; booked?: number };
export type Booking = { id: string; slotId: string; name: string; email: string; phone: string; people: number; notes: string; totalPaise: number; status: "pending" | "confirmed" | "cancelled"; paymentStatus: "pending" | "paid"; createdAt: number; sport: PlaySportId; resource: string; startsAt: number; endsAt: number };
export const rupees = (paise: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(paise / 100);
export const slotTime = (timestamp: number) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(timestamp);
export const slotDate = (timestamp: number) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" }).format(timestamp);
