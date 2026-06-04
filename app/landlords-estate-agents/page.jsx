import { redirect } from "next/navigation";

export const metadata = {
  title: "Redirecting to Booking | West Midlands Cleaner",
  description: "Redirecting landlords, tenants and estate agents to the main WMC booking page."
};

export default function LandlordsEstateAgentsPage() {
  redirect("/book");
}
