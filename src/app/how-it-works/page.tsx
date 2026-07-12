import type { Metadata } from "next";
import HowItWorksContent from "./HowItWorksContent";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "How It Works | Free Move Request Process | Man and Van Club",
  description:
    "Submit a free move request in 5 simple steps. One verified mover reviews your anonymised details and sends a quote before you decide whether to book. No spam, no multiple sales calls.",
  alternates: {
    canonical: `${siteUrl}/how-it-works`,
  },
  openGraph: {
    title: "How It Works | Free Move Request Process | Man and Van Club",
    description:
      "Submit a free move request in 5 simple steps. One verified mover reviews your anonymised details and sends a quote before you decide whether to book.",
    url: `${siteUrl}/how-it-works`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "How Man and Van Club Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Free Move Request Process | Man and Van Club",
    description:
      "Submit a free move request in 5 simple steps. One verified mover reviews your anonymised details and sends a quote before you decide whether to book.",
    images: ["/images/og-homepage.jpg"],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to request a man and van quote on Man and Van Club",
  description:
    "Submit a free move request on Man and Van Club. One verified mover reviews your anonymised details and sends a quote before you decide whether to book. No spam, no multiple sales calls.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Tell us about your move",
      text: "Enter your collection and delivery postcodes, move date, and move type. It takes less than 60 seconds.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "See a guide price range",
      text: "We show a guide price range based on the move details provided. This is not the final mover quote.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "A verified mover sends a quote",
      text: "Approved local movers can review anonymised move details and submit a mover quote if they can help.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Accept or decline securely",
      text: "You receive a secure quote review link. Your contact details are not released unless you accept the quote and pay the booking deposit. The deposit is deducted from the mover quote.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Mover contacts you directly",
      text: "After the booking deposit is paid, your details are released only to that mover. You pay the remaining balance directly to the mover on moving day.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "How It Works",
      item: `${siteUrl}/how-it-works`,
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HowItWorksContent />
    </>
  );
}
