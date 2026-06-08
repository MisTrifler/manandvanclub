import HomeContent from "./HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Man and Van Services Near You | Man and Van Club",
  description: "Get matched with a suitable local mover through our exclusive matching process. Verified business network, secure enquiries, and no obligation. Nationwide coverage across the UK.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Man and Van Club",
    "url": "https://www.manandvanclub.co.uk",
    "telephone": "07943617386",
    "email": "support@manandvanclub.co.uk",
    "areaServed": "GB",
    "description": "Marketplace connecting customers with verified local movers across the UK via exclusive one-to-one introductions. Secure, transparent, and free to enquire.",
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
