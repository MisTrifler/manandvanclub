import ForBusinessesContent from "./ForBusinessesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Man and Van Club | Grow Your Moving Business",
  description: "Get exclusive verified move requests across the UK. No monthly contracts, no competition. Apply to join Man and Van Club today.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/for-businesses',
  },
  openGraph: {
    title: "Join Man and Van Club | Grow Your Moving Business",
    description: "Get exclusive verified move requests across the UK. No monthly contracts, no competition.",
    url: 'https://www.manandvanclub.co.uk/for-businesses',
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Join Man and Van Club as a Mover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Man and Van Club | Grow Your Moving Business",
    description: "Get exclusive verified move requests across the UK. No monthly contracts, no competition.",
    images: ["/images/og-homepage.jpg"],
  },
};

export default function ForBusinessesPage() {
  return <ForBusinessesContent />;
}
