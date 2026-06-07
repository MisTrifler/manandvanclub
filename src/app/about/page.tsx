import AboutContent from "./AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Man & Van Club | Our Story & Mission",
  description: "We built Man & Van Club to make finding a trusted local mover simple and transparent. Learn about our exclusive introduction marketplace.",
};

export default function AboutPage() {
  return <AboutContent />;
}
