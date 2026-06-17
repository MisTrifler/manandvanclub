import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as a Mover | Easy Sign-Up | Man and Van Club",
  description: "Simple mover sign-up for Man and Van Club. Apply online, email your insurance documents, get approved, and quote suitable customer enquiries as they become available.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/why-join',
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
