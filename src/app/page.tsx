import HomeContent from "./HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Man and Van Club | Get Matched With Verified Local Movers",
  description:
    "Man and Van Club connects customers with verified local movers across the UK. Request quotes for house removals, flat moves, office relocations, student moves, furniture delivery and same-day man and van services.",
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
        "text": "Yes. It is free to submit your move request. You only pay a booking fee if you accept a mover quote."
      }
    },
    {
      "@type": "Question",
      "name": "What is the booking fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The booking fee confirms your accepted quote and releases your contact details only to that mover. It is separate from the mover’s quote."
      }
    },
    {
      "@type": "Question",
      "name": "Do I pay the mover separately?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You pay the mover’s quoted price directly to the mover."
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
      "name": "Are movers vetted?",
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
    "@type": "LocalBusiness",
    "name": "Man and Van Club",
    "url": "https://www.manandvanclub.co.uk",
    "telephone": "07943617386",
    "email": "support@manandvanclub.co.uk",
    "areaServed": "GB",
    "description": "Marketplace connecting customers with verified local movers across the UK through a secure customer-confirmed booking process. Free to submit, with a booking fee only if a mover quote is accepted.",
    "priceRange": "££",
    "openingHours": "Mo-Su 08:00-22:00"
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
