import ApplyToJoinContent from "./ApplyToJoinContent";
import { Metadata } from "next";

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
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Apply to Join Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply to Join | Easy Mover Sign-Up | Man and Van Club",
    description: "Apply to join Man and Van Club in a few minutes. Tell us your service area, job types and capacity.",
    images: ["/images/og-homepage.jpg"],
  },
};

export default function ApplyToJoinPage() {
  return <ApplyToJoinContent />;
}
