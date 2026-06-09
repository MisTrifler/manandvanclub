import ApplyToJoinContent from "./ApplyToJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mover Application | Join Man and Van Club Network",
  description: "Apply to join Man and Van Club, an England-focused network of professional independent movers. Verified, insured, and exclusively matched.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/apply-to-join',
  },
};

export default function ApplyToJoinPage() {
  return <ApplyToJoinContent />;
}
