import HomeContent from "./HomeContent";
import { Metadata } from "next";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Club | Moving Home From £34 | Verified UK Movers",
  description:
    "Moving home? Man and van from £34/hr. Verified movers for house removals, flat moves, furniture delivery and same-day jobs across the UK. One approved mover reviews your details before you book. Call 0121 751 1269.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Man and Van Club | Moving Home From £34 | Verified UK Movers",
    description:
      "Moving home? Man and van from £34/hr. Verified movers for house removals, flat moves, furniture delivery and same-day jobs across the UK. One approved mover reviews your details before you book.",
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
    title: "Man and Van Club | Moving Home From £34 | Verified UK Movers",
    description:
      "Moving home? Man and van from £34/hr. Verified movers for house removals, flat moves, furniture delivery and same-day jobs across the UK.",
    images: ["/images/og-homepage.jpg"],
  },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  "cssSelector": [
    "[data-speakable='hero-heading']",
    "[data-speakable='hero-description']",
    "[data-speakable='seo-content']"
  ]
};

export default function Home() {
  const serviceSchema = {
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
      { "@type": "AdministrativeArea", "name": "East Midlands" },
      { "@type": "AdministrativeArea", "name": "Greater London" },
      { "@type": "AdministrativeArea", "name": "Greater Manchester" },
      { "@type": "AdministrativeArea", "name": "Merseyside" },
      { "@type": "AdministrativeArea", "name": "South East England" },
      { "@type": "AdministrativeArea", "name": "South West England" },
      { "@type": "AdministrativeArea", "name": "North East England" },
      { "@type": "AdministrativeArea", "name": "North West England" },
      { "@type": "AdministrativeArea", "name": "Yorkshire and the Humber" },
      { "@type": "AdministrativeArea", "name": "East of England" },
      { "@type": "Country", "name": "Scotland" },
      { "@type": "Country", "name": "Wales" },
      { "@type": "Country", "name": "Northern Ireland" },
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
      "Piano removals",
      "Single item delivery",
    ],
    "description": "Marketplace helping customers submit free move requests for anything from single-item collections to full home moves. An approved mover reviews the details and sends a quote before the customer decides whether to book.",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to get a man and van quote on Man and Van Club",
    "description": "Submit a free move request, receive a quote from a verified mover, and decide whether to book — no obligation.",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Submit your details",
        "text": "Enter your postcodes, items, move date and access notes. Free and takes under a minute.",
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "A verified mover reviews it",
        "text": "One approved mover — not five companies — reviews your anonymised details and sends a quote.",
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Accept or walk away",
        "text": "If the quote works, book it. If not, no obligation. Your details stay private.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <HomeContent />
    </>
  );
}
