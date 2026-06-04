import { redirect } from "next/navigation";

export const metadata = {
  title: "Redirecting to Booking | West Midlands Cleaner",
  description: "Redirecting to the West Midlands Cleaner booking page."
};

export default function QuotePage() {
  redirect("/book");
}
