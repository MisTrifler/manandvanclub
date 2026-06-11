import ForMoversContent from "./ForMoversContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Movers | Why Join Man and Van Club — Exclusive Enquiries",
  description: "Get customer-confirmed move requests without competing against other movers. No shared move requests, just direct opportunities. Apply to join Man and Van Club today.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/for-movers',
  },
};

export default function ForMoversPage() {
  return <ForMoversContent />;
}
