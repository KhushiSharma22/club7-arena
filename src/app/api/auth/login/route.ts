import { cookies } from "next/headers";
import { COOKIE, SESSION_SECONDS, login, consumeRateLimit, hash } from "@/lib/server/auth";
import { handle, json, body, sameOrigin, ApiError } from "@/lib/server/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handle(async () => {
    sameOrigin(request);
    const data = await body(request);
    if (typeof data.email !== "string" || typeof data.password !== "string" || data.email.length > 254 || data.password.length > 128) throw new ApiError(400, "Enter your email and password.");
    if (!consumeRateLimit("login-global", 100, 900000) || !consumeRateLimit(`login:${hash(data.email.toLowerCase().trim())}`, 10, 900000)) throw new ApiError(429, "Too many sign-in attempts. Try again in 15 minutes.");
    const token = login(data.email, data.password);
    if (!token) throw new ApiError(401, "Email or password is incorrect.");
    (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_SECONDS });
    return json({ ok: true });
  });
}
