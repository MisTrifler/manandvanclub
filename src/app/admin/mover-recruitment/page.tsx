import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import RecruitmentCRM from "./RecruitmentCRM";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Mover Recruitment CRM",
  description: "Private admin dashboard for tracking mover recruitment across the UK.",
  robots: { index: false, follow: false },
};

export default function MoverRecruitmentPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminSession(token)) {
    redirect("/control-center-mv");
  }

  return <RecruitmentCRM />;
}
