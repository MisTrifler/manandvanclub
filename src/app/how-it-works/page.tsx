import HowItWorksContent from "./HowItWorksContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Man and Van Club Works | Exclusive Mover Matching",
  description: "See our 5-step process for connecting you with a verified local mover exclusively. No bidding, no multiple quotes — submit and get matched.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
