import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin | West Midlands Cleaner",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminRedirectPage() {
  redirect("/admin/marketplace");
}
