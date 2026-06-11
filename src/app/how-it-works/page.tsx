import HowItWorksContent from "./HowItWorksContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Man and Van Club Works | Customer-Confirmed Mover Quotes",
  description: "See our 5-step process for requesting a quote from a verified local mover. No spam and no multiple sales calls.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/how-it-works',
  },
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
