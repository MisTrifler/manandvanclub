import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works For Movers | Join Man and Van Club",
  description: "Approved movers can view anonymised local move requests, submit total quotes for free, and receive customer details after a booking deposit is paid.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/why-join',
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
