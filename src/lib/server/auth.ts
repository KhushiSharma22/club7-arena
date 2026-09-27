import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { getDb } from "./db";
export const COOKIE = "club7_session";
export const SESSION_SECONDS = 60 * 60 * 12;
export const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export function passwordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function checkPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(key, "hex"));
}
export function createAdmin(email: string, password: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 128) throw new Error("Use a valid email and a password of 12–128 characters.");
  getDb().prepare("INSERT INTO admins VALUES (?, ?, ?, ?)").run(randomUUID(), email.toLowerCase().trim(), passwordHash(password), Date.now());
}
export function consumeRateLimit(key: string, limit: number, windowMs: number) {
  const db = getDb();
  return db.transaction(() => {
    const now = Date.now();
    db.prepare("DELETE FROM rateLimits WHERE expiresAt <= ?").run(now);
    db.prepare("INSERT INTO rateLimits VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1").run(key, now + windowMs);
    return (db.prepare("SELECT count FROM rateLimits WHERE key = ?").get(key) as {count: number}).count <= limit;
  }).immediate();
}
const dummyHash = passwordHash("invalid-account-timing-padding");
export function login(email: string, password: string) {
  const db = getDb();
  const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email.toLowerCase().trim()) as { id: string; email: string; passwordHash: string } | undefined;
  const matches = checkPassword(password, admin?.passwordHash || dummyHash);
  if (!admin || !matches) return null;
  const token = randomBytes(32).toString("hex");
  db.prepare("DELETE FROM sessions WHERE expiresAt <= ?").run(Date.now());
  db.prepare("INSERT INTO sessions VALUES (?, ?, ?)").run(hash(token), admin.id, Date.now() + SESSION_SECONDS * 1000);
  return token;
}
export function sessionAdmin(token?: string) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  return getDb().prepare("SELECT a.id, a.email FROM sessions s JOIN admins a ON a.id = s.adminId WHERE s.tokenHash = ? AND s.expiresAt > ?").get(hash(token), Date.now()) as { id: string; email: string } | undefined || null;
}
export function logout(token: string) { getDb().prepare("DELETE FROM sessions WHERE tokenHash = ?").run(hash(token)); }
