import HowItWorksContent from "./HowItWorksContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Man and Van Club Works | Get a Free Moving Quote",
  description: "Request a free moving quote, review one verified mover quote, secure your booking with a deposit, and pay the rest on moving day.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/how-it-works',
  },
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
