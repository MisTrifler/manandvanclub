import AboutContent from "./AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Man and Van Club | Verified Mover Network for UK Moves",
  description: "Man and Van Club connects customers with verified independent movers across the UK. Learn about our secure, transparent introduction marketplace — one mover, protected details, no spam.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
