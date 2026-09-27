import { handle, json, body, sameOrigin, requireAdmin } from "@/lib/server/http";
import { listBookings, updateBooking } from "@/lib/server/booking-store";
export const runtime = "nodejs";
export async function GET(request: Request) { return handle(async () => { await requireAdmin(); const p = new URL(request.url).searchParams; return json({ bookings: listBookings(p.get("from"), p.get("to")) }); }); }
export async function PATCH(request: Request) { return handle(async () => { sameOrigin(request); const admin = await requireAdmin(); return json(updateBooking(await body(request), admin.id)); }); }
