import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as a Mover | Fill Quiet Days with Moving Jobs",
  description: "Apply to join Man and Van Club, send your insurance documents, and access suitable furniture, flat, house, office and same-day move enquiries in your approved area.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/why-join',
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
