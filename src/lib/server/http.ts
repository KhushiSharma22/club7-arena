import { cookies } from "next/headers";
import { COOKIE, sessionAdmin } from "./auth";
export class ApiError extends Error { constructor(public status: number, message: string) { super(message); } }
export function json(data: unknown, status = 200) { return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } }); }
export async function handle(work: () => Promise<Response> | Response) {
  try { return await work(); } catch (error) {
    if (error instanceof ApiError) return json({ error: error.message }, error.status);
    console.error("Club7 API failed:", error instanceof Error ? error.message : "Unknown error");
    return json({ error: "Something went wrong. Please retry shortly." }, 500);
  }
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  const expected = process.env.APP_ORIGIN || `${url.protocol}//${request.headers.get("host") || url.host}`;
  if (!origin || origin !== expected) throw new ApiError(403, "Request origin not allowed.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ApiError(415, "JSON required.");
}
export async function body(request: Request): Promise<Record<string, unknown>> {
  if (Number(request.headers.get("content-length")) > 16384) throw new ApiError(413, "Request too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, "Missing request.");
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > 16384) { await reader.cancel(); throw new ApiError(413, "Request too large."); } chunks.push(value); }
  try { const data = JSON.parse(Buffer.concat(chunks).toString("utf8")); if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(); return data; } catch { throw new ApiError(400, "Invalid JSON request."); }
}
export async function requireAdmin() {
  const admin = sessionAdmin((await cookies()).get(COOKIE)?.value);
  if (!admin) throw new ApiError(401, "Please sign in again.");
  return admin;
}
