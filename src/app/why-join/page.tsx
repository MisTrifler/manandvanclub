import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

const siteUrl = "https://www.manandvanclub.co.uk";

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
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Why Join Man and Van Club")}&subtitle=${encodeURIComponent("Benefits for Movers")}`, width: 1200, height: 630, alt: "Join Man and Van Club as a Mover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join as a Mover | Fill Quiet Days with Moving Jobs",
    description: "Apply to join Man and Van Club and access suitable move enquiries in your approved area.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Why Join Man and Van Club")}&subtitle=${encodeURIComponent("Benefits for Movers")}`],
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
