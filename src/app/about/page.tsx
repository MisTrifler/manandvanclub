import AboutContent from "./AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Man and Van Club | Our Story & Mission",
  description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent. Learn about our secure introduction marketplace.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/about',
  },
  openGraph: {
    title: "About Man and Van Club | Our Story & Mission",
    description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent. Learn about our secure introduction marketplace.",
    url: 'https://www.manandvanclub.co.uk/about',
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "About Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Man and Van Club | Our Story & Mission",
    description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent.",
    images: ["/images/og-homepage.jpg"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
