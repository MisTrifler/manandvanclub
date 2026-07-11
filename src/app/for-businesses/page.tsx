import ForBusinessesContent from "./ForBusinessesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as a Mover | Verified Mover Network | Man and Van Club",
  description: "Access exclusive verified move requests across the UK. No monthly contracts, no competing against multiple movers. Apply to join Man and Van Club today.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/for-businesses',
  },
};

export default function ForBusinessesPage() {
  return <ForBusinessesContent />;
}
