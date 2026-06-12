import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RecruitmentCRM from "./RecruitmentCRM";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Mover Recruitment CRM",
  description: "Private admin dashboard for tracking mover recruitment across the UK.",
  robots: { index: false, follow: false },
};

export default function MoverRecruitmentPage() {
  // Server-side admin gate — same session validation as /control-center-mv.
  // No frontend-only checks.
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(token)) {
    redirect("/control-center-mv");
  }

  return <RecruitmentCRM />;
}
