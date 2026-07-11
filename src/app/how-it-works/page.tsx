import HowItWorksContent from "./HowItWorksContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Free Move Request & Verified Mover Quotes | Man and Van Club",
  description: "Submit a free move request, review a verified mover quote, secure your booking with a deposit deducted from the quote, and pay the rest on moving day. No spam, no multiple calls.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/how-it-works',
  },
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
