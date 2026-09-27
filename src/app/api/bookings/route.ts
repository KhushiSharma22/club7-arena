import { handle, json, body, sameOrigin, ApiError } from "@/lib/server/http";
import { reserveSlot } from "@/lib/server/booking-store";
import { hash, consumeRateLimit } from "@/lib/server/auth";
export const runtime = "nodejs";
export async function POST(request: Request) { return handle(async () => {
  sameOrigin(request); const data = await body(request);
  if (typeof data.email !== "string" || data.email.length > 254) throw new ApiError(400, "Enter a valid email address.");
  if (!consumeRateLimit("booking-global", 500, 3600000) || !consumeRateLimit(`booking:${hash(data.email.toLowerCase().trim())}`, 10, 3600000)) throw new ApiError(429, "Too many booking attempts. Please try again later.");
  return json(reserveSlot(data), 201);
}); }
