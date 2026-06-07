import { cookies } from "next/headers";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import AdminPortalClient from "./AdminPortalClient";

export const dynamic = "force-dynamic";

export default function ControlCenterPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const isAuthed = isValidAdminSession(token);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-border rounded-[2.5rem] shadow-2xl p-10 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-[2rem] bg-primary/5 text-accent flex items-center justify-center mx-auto">
              <LockKeyhole size={36} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2">Secure Admin Access</p>
              <h1 className="text-3xl font-black text-primary uppercase tracking-tighter">Control Center</h1>
            </div>
            <p className="text-text-secondary font-medium leading-relaxed">
              Enter your admin password to access leads and driver applications.
            </p>
          </div>

          {searchParams?.error === "invalid" && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold">
              Invalid admin password.
            </div>
          )}

          <form action="/api/admin/login" method="POST" className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="btn-orange w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-[1.02]"
            >
              Unlock Portal
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/30">
            <ShieldCheck size={14} className="text-accent" /> Server-side protected
          </div>
        </div>
      </div>
    );
  }

  return <AdminPortalClient />;
}
