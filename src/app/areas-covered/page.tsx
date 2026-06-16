import AreasCoveredContent from "./AreasCoveredContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas Covered | UK-Wide Man and Van Services | Man and Van Club",
  description:
    "Man and Van Club covers towns and cities across England, Scotland and Wales. Find your area and get matched with a verified mover. UK-wide coverage.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/areas-covered',
  },
};

export default function AreasCoveredPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.manandvanclub.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas Covered",
        item: "https://www.manandvanclub.co.uk/areas-covered",
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Man and Van Club",
    url: "https://www.manandvanclub.co.uk",
    telephone: "07943617386",
    email: "support@manandvanclub.co.uk",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description:
      "UK-wide man and van marketplace connecting customers with verified movers via exclusive one-to-one introductions.",
    priceRange: "££",
    openingHours: "Mo-Su 08:00-22:00",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AreasCoveredContent />
    </>
  );
}
