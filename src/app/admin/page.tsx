import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, sessionAdmin } from "@/lib/server/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import "@/styles/admin.css";
export const metadata = {title:"Team dashboard", robots:{index:false, follow:false}};
export const runtime = "nodejs";
export default async function AdminPage() {
  const admin = sessionAdmin((await cookies()).get(COOKIE)?.value);
  if (!admin) redirect("/admin/login");
  return <AdminDashboard email={admin.email} />;
}
