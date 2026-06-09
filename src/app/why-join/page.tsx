import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Join | Exclusive Enquiries for Professional Movers | Man and Van Club",
  description: "Join Man and Van Club as a professional mover. Get exclusive customer enquiries without competing against multiple companies. No subscription, transparent lead fees.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/why-join',
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
