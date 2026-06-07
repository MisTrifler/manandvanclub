import HomeContent from "./HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Trusted Local Movers Near You | Man and Van Club",
  description: "Get exclusively matched with a vetted local mover in England, mainly Birmingham. No bidding wars, no spam — one verified professional for your move.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Man and Van Club",
    "url": "https://www.manandvanclub.co.uk",
    "telephone": "07943617386",
    "email": "support@manandvanclub.co.uk",
    "areaServed": "GB-ENG",
    "description": "Marketplace connecting customers with vetted independent local movers in England, mainly Birmingham, via exclusive one-to-one introductions.",
    "priceRange": "££",
    "openingHours": "Mo-Su 08:00-22:00"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
