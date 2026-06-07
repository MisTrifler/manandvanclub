import AboutContent from "./AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Man and Van Club | Our Story & Mission",
  description: "We built Man and Van Club to make finding a trusted local mover in England simple and transparent. Learn about our exclusive introduction marketplace.",
};

export default function AboutPage() {
  return <AboutContent />;
}
