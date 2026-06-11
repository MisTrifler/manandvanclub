import WhyJoinContent from "./WhyJoinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Join Man and Van Club | Customer-Confirmed Move Requests",
  description: "Join Man and Van Club as an approved mover. Submit quotes for anonymised customer requests and receive details after a customer-confirmed booking fee payment.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/why-join',
  },
};

export default function WhyJoinPage() {
  return <WhyJoinContent />;
}
