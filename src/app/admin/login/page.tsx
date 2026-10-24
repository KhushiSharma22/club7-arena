import { isClientPreview } from "@/lib/preview-mode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, sessionAdmin } from "@/lib/server/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import "@/styles/admin.css";
export const metadata = {title:"Team sign in", robots:{index:false, follow:false}};
export default async function LoginPage() {
  if (isClientPreview()) return <main style={{ padding: "160px 8vw" }}><h1>Staff tools</h1><p>Staff access is not enabled on this client preview.</p></main>;
  if (sessionAdmin((await cookies()).get(COOKIE)?.value)) redirect("/admin");
  return <AdminLogin />;
}
