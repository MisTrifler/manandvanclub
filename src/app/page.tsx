import HomeContent from "./HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Man and Van Club | Get Matched With Verified Local Movers",
  description:
    "Man and Van Club connects customers with verified local movers across the UK. Get matched for house removals, flat moves, office relocations, student moves, furniture delivery and same-day man and van services.",
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
      "name": "How does matching work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you submit your moving details, we review your requirements including location, move size, and date. We then identify a suitable mover from our network and introduce your enquiry to them exclusively. You deal directly with the mover from that point onward."
      }
    },
    {
      "@type": "Question",
      "name": "Will multiple movers contact me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies."
      }
    },
    {
      "@type": "Question",
      "name": "Is there any obligation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Submitting an enquiry is completely free and without obligation. If the matched mover is not suitable, or if you decide not to proceed, you are under no obligation to book."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly will I be contacted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We aim to have your matched mover contact you as promptly as possible. In most cases, you can expect to hear back within 24 hours, often sooner. The mover will contact you directly by phone or email to discuss your requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Are movers vetted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We help connect customers with movers who have completed our application and verification process. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after I submit my enquiry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After submitting your enquiry, you will receive a confirmation. Our team reviews your requirements and identifies a suitable mover. Your details are introduced to that mover exclusively. The mover contacts you directly to discuss your move and provide a quote."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to pay to submit an enquiry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Submitting an enquiry through Man and Van Club is completely free for customers. There is no charge to get matched with a mover. You only pay the mover directly if you choose to book their services."
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
    "description": "Marketplace connecting customers with verified local movers across the UK via exclusive one-to-one introductions. Secure, transparent, and free to enquire.",
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
