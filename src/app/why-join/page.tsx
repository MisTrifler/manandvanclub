import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as a Mover | Fill Quiet Days with Moving Jobs",
  description: "Apply to join Man and Van Club, send your insurance documents, and access suitable furniture, flat, house, office and same-day move enquiries in your approved area.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/why-join',
  },
  openGraph: {
    title: "Join as a Mover | Fill Quiet Days with Moving Jobs",
    description: "Apply to join Man and Van Club and access suitable move enquiries in your approved area.",
    url: 'https://www.manandvanclub.co.uk/why-join',
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Join Man and Van Club as a Mover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join as a Mover | Fill Quiet Days with Moving Jobs",
    description: "Apply to join Man and Van Club and access suitable move enquiries in your approved area.",
    images: ["/images/og-homepage.jpg"],
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
