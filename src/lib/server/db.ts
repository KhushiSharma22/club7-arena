import Database from "better-sqlite3";
import { mkdirSync, chmodSync } from "node:fs";
import path from "node:path";

let db: Database.Database | undefined;
export function getDb() {
  if (db) return db;
  if (process.env.VERCEL) throw new Error("SQLite needs a persistent disk. Configure a persistent Node host before deploying this backend.");
  const filename = process.env.CLUB7_DB_PATH || path.join(process.cwd(), ".data", "club7.sqlite");
  mkdirSync(path.dirname(filename), { recursive: true, mode: 0o700 });
  db = new Database(filename);
  chmodSync(filename, 0o600);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, passwordHash TEXT NOT NULL, createdAt INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      tokenHash TEXT PRIMARY KEY, adminId TEXT NOT NULL REFERENCES admins(id), expiresAt INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS slots (
      id TEXT PRIMARY KEY, sport TEXT NOT NULL CHECK(sport IN ('football','cricket','pickleball')),
      resource TEXT NOT NULL, resourceKey TEXT NOT NULL,
      startsAt INTEGER NOT NULL, endsAt INTEGER NOT NULL CHECK(endsAt > startsAt),
      pricePaise INTEGER NOT NULL CHECK(pricePaise >= 0), maxPeople INTEGER NOT NULL CHECK(maxPeople > 0),
      state TEXT NOT NULL DEFAULT 'open' CHECK(state IN ('open','closed')), version INTEGER NOT NULL DEFAULT 1,
      createdBy TEXT NOT NULL REFERENCES admins(id), createdAt INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS slots_lookup ON slots(sport, startsAt);
    CREATE INDEX IF NOT EXISTS slots_resource ON slots(resourceKey, startsAt, endsAt);
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY, slotId TEXT NOT NULL REFERENCES slots(id),
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, people INTEGER NOT NULL,
      notes TEXT NOT NULL, totalPaise INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed','cancelled')),
      paymentStatus TEXT NOT NULL DEFAULT 'pending' CHECK(paymentStatus IN ('pending','paid')),
      requestKey TEXT NOT NULL UNIQUE, requestHash TEXT NOT NULL, createdAt INTEGER NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS one_booking_per_slot ON bookings(slotId) WHERE status IN ('pending','confirmed');
    CREATE TABLE IF NOT EXISTS rateLimits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expiresAt INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, adminId TEXT NOT NULL REFERENCES admins(id), action TEXT NOT NULL, target TEXT NOT NULL, createdAt INTEGER NOT NULL);
  `);
  return db;
}
