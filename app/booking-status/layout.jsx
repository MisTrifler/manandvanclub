import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: "Check Booking Status | West Midlands Cleaner",
  description:
    "Check a West Midlands Cleaner booking request using your WMC reference and phone number.",
  path: "/booking-status",
  noIndex: true
});

export default function PageLayout({ children }) {
  return children;
}
