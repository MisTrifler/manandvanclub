import ForBusinessesContent from "./ForBusinessesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Man and Van Club | Grow Your Moving Business",
  description: "Get exclusive verified move requests in England, starting with Birmingham. No monthly contracts, no competition. Apply to join Man and Van Club today.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/for-businesses',
  },
};

export default function ForBusinessesPage() {
  return <ForBusinessesContent />;
}
