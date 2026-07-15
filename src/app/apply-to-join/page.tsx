import ApplyToJoinContent from "./ApplyToJoinContent";
import { Metadata } from "next";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Apply to Join | Easy Mover Sign-Up | Man and Van Club",
  description: "Apply to join Man and Van Club in a few minutes. Tell us your service area, job types and capacity, then email insurance documents for manual approval.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/apply-to-join',
  },
  openGraph: {
    title: "Apply to Join | Easy Mover Sign-Up | Man and Van Club",
    description: "Apply to join Man and Van Club in a few minutes. Tell us your service area, job types and capacity.",
    url: 'https://www.manandvanclub.co.uk/apply-to-join',
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Apply to Join")}&subtitle=${encodeURIComponent("Man and Van Club Movers")}`, width: 1200, height: 630, alt: "Apply to Join Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply to Join | Easy Mover Sign-Up | Man and Van Club",
    description: "Apply to join Man and Van Club in a few minutes. Tell us your service area, job types and capacity.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Apply to Join")}&subtitle=${encodeURIComponent("Man and Van Club Movers")}`],
  },
};

export default function ApplyToJoinPage() {
  return <ApplyToJoinContent />;
}
