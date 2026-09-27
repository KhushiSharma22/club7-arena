import { cookies } from "next/headers";
import { COOKIE, logout } from "@/lib/server/auth";
import { handle, json, sameOrigin } from "@/lib/server/http";
export async function POST(request: Request) {
  return handle(async () => {
    sameOrigin(request);
    const jar = await cookies(), token = jar.get(COOKIE)?.value;
    if (token) logout(token);
    jar.delete(COOKIE);
    return json({ ok: true });
  });
}
