"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
export default function AdminLogin() {
  const [busy,setBusy] = useState(false), [error,setError] = useState("");
  const router = useRouter();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/auth/login", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))});
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      router.replace("/admin"); router.refresh();
    } catch(e) {setError(e instanceof Error ? e.message : "Could not sign in.");setBusy(false);}
  }
  return <main className="admin-page admin-login"><section className="admin-login-intro"><p className="admin-eyebrow">CLUB 7 / TEAM ACCESS</p><h1>Behind every<br />great game.</h1><p>One place for your schedule,<br />your bookings and your team.</p><span>SECTOR 89 · FARIDABAD</span></section><form onSubmit={submit} className="admin-login-form"><span className="admin-eyebrow">STAFF SIGN IN</span><h2>Welcome back.</h2><p>Use your team account to manage the arena.</p><label>Email address<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={128}/></label>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in to dashboard ↗"}</button><p className="admin-muted">Accounts are created by the site administrator. Contact them if you need access.</p></form></main>;
}
