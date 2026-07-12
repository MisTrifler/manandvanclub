import HomeContent from "./HomeContent";
import { Metadata } from "next";
import { HOME_FAQ_ITEMS } from "@/constants/home-faq";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Club | From One Item to Full Home Moves",
  description:
    "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs. One approved mover can review before you book.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Man and Van Club | Free Move Requests | UK-Wide Verified Movers",
    description:
      "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs. One approved mover reviews your details before you decide whether to book.",
    url: siteUrl,
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Man and Van Club — Free Move Requests Across the UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Club | Free Move Requests | UK-Wide Verified Movers",
    description:
      "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs.",
    images: ["/images/og-homepage.jpg"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Man and Van Club",
  "url": siteUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": HOME_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    },
  })),
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Man and Van Club quote request service",
    "url": siteUrl,
    "provider": {
      "@type": "Organization",
      "name": "Man and Van Club",
      "url": siteUrl,
      "telephone": "+44-121-751-1269",
      "email": "support@manandvanclub.co.uk",
      "logo": `${siteUrl}/icon.png`,
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "West Midlands" },
      { "@type": "Country", "name": "United Kingdom" },
    ],
    "serviceType": [
      "Man and van quote request",
      "Single item collections",
      "House removals",
      "Flat moves",
      "Student moves",
      "Furniture delivery",
      "Office moves",
    ],
    "description": "Marketplace helping customers submit free move requests for anything from single-item collections to full home moves. An approved mover reviews the details and sends a quote before the customer decides whether to book.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
