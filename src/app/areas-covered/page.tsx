import AreasCoveredContent from "./AreasCoveredContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas Covered | UK-Wide Man and Van Services | Man and Van Club",
  description:
    "Man and Van Club covers towns and cities across England, Scotland and Wales. Find your area, submit a free request and receive a quote from one verified mover before you book.",
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Man and Van Club areas covered",
    url: "https://www.manandvanclub.co.uk",
    provider: {
      "@type": "Organization",
      name: "Man and Van Club",
      url: "https://www.manandvanclub.co.uk",
      telephone: "+44-121-751-1269",
      email: "support@manandvanclub.co.uk",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description:
      "UK-wide man and van quote request service with priority West Midlands coverage. Customers submit move details securely so one verified mover can review and quote before booking.",
    serviceType: "Man and van quote request",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <AreasCoveredContent />
    </>
  );
}
