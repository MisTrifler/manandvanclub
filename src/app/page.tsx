import HomeContent from "./HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Man and Van Club | Verified Man and Van Quotes",
  description:
    "Submit a free man and van request, see a guide price and receive a quote from one verified mover before you book. West Midlands and UK-wide coverage.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk',
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Man and Van Club",
  "url": "https://www.manandvanclub.co.uk",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is it free to submit a move request?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote."
      }
    },
    {
      "@type": "Question",
      "name": "What is the booking deposit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The booking deposit secures your accepted mover quote and releases your details to the mover. It is deducted from the mover’s quote, so your total move cost stays the same."
      }
    },
    {
      "@type": "Question",
      "name": "Do I pay the mover separately?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You pay the remaining balance directly to the mover on moving day."
      }
    },
    {
      "@type": "Question",
      "name": "Will lots of companies contact me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your details are not shared with multiple companies. They are only released to the mover whose quote you accept."
      }
    },
    {
      "@type": "Question",
      "name": "Is the mover quote fixed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The quote is based on the details you provide. It may only change if your move details were incomplete, inaccurate or later changed."
      }
    },
    {
      "@type": "Question",
      "name": "Are movers verified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We help connect customers with movers who have completed our application and verification process. Customers should still confirm insurance cover and final details directly with their mover before booking."
      }
    }
  ]
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Man and Van Club quote request service",
    "url": "https://www.manandvanclub.co.uk",
    "provider": {
      "@type": "Organization",
      "name": "Man and Van Club",
      "url": "https://www.manandvanclub.co.uk",
      "telephone": "+44-7943-617-386",
      "email": "support@manandvanclub.co.uk",
      "logo": "https://www.manandvanclub.co.uk/icon.png"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "West Midlands" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "serviceType": [
      "Man and van quote request",
      "House removals",
      "Flat moves",
      "Student moves",
      "Furniture delivery",
      "Office moves"
    ],
    "description": "Marketplace helping customers submit free man and van move requests. A verified mover reviews the details and sends a quote before the customer decides whether to book."
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
