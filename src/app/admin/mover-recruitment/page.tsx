import RecruitmentCRM from "./RecruitmentCRM";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Mover Recruitment CRM",
  description: "Private admin dashboard for tracking mover recruitment across the UK.",
};

export default function MoverRecruitmentPage() {
  return <RecruitmentCRM />;
}
