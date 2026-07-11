import AboutContent from "./AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Man and Van Club | Our Story & Mission",
  description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent. Learn about our secure introduction marketplace.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
