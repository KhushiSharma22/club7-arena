import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createAdmin } from "../src/lib/server/auth";
const email = process.argv[2];
if (!email) { console.error("Usage: npm run admin:create -- staff@example.com"); process.exit(1); }
const password = process.env.ADMIN_PASSWORD || randomBytes(18).toString("base64url");
try {
  createAdmin(email, password);
  if (!process.env.ADMIN_PASSWORD) {
    const directory = path.join(process.cwd(), ".data"); mkdirSync(directory, {recursive:true, mode:0o700});
    const filename = path.join(directory, `admin-${Date.now()}.txt`);
    writeFileSync(filename, `Club 7 local staff sign-in\nURL: http://127.0.0.1:3000/admin\nEmail: ${email}\nPassword: ${password}\n\nKeep this file private. Delete after storing the credentials in your password manager.\n`, {mode:0o600});
    console.log(`Staff account created. Credentials saved privately to ${filename}`);
  } else console.log("Staff account created.");
} catch (e) { console.error(e instanceof Error && e.message.includes("UNIQUE") ? "An account with this email already exists." : "Could not create account. Check email and password (12–128 characters)."); process.exit(1); }
