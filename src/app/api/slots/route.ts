import { handle, json } from "@/lib/server/http";
import { availableSlots } from "@/lib/server/booking-store";
export const runtime = "nodejs";
export async function GET(request: Request) { return handle(() => { const p = new URL(request.url).searchParams; return json({ slots: availableSlots(p.get("sport"), p.get("date")) }); }); }
