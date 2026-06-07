import ApplyToJoinContent from "./ApplyToJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mover Application | Join Man & Van Club Network",
  description: "Apply to join the UK's most exclusive network of professional independent movers. Verified, insured, and exclusively matched.",
};

export default function ApplyToJoinPage() {
  return <ApplyToJoinContent />;
}
