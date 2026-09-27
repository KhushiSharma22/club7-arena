import { handle, json, body, sameOrigin, requireAdmin } from "@/lib/server/http";
import { adminSlots, createSlots, updateSlot } from "@/lib/server/booking-store";
export const runtime = "nodejs";
export async function GET(request: Request) { return handle(async () => { await requireAdmin(); const p = new URL(request.url).searchParams; return json({ slots: adminSlots(p.get("from"), p.get("to")) }); }); }
export async function POST(request: Request) { return handle(async () => { sameOrigin(request); const admin = await requireAdmin(); return json(createSlots(await body(request), admin.id), 201); }); }
export async function PATCH(request: Request) { return handle(async () => { sameOrigin(request); const admin = await requireAdmin(); return json(updateSlot(await body(request), admin.id)); }); }
