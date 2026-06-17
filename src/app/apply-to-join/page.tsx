import ApplyToJoinContent from "./ApplyToJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply to Join | Easy Mover Sign-Up | Man and Van Club",
  description: "Apply to join Man and Van Club in a few minutes. Tell us your service area, job types and capacity, then email insurance documents for manual approval.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/apply-to-join',
  },
};

export default function ApplyToJoinPage() {
  return <ApplyToJoinContent />;
}
