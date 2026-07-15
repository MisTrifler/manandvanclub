import ContactContent from "./ContactContent";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Contact Man and Van Club | Support & Enquiries",
  description: "Have a question about your move or want to join as a mover? Our team is ready to help. Contact us via phone, email or message.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact Man and Van Club | Support & Enquiries",
    description: "Have a question about your move or want to join as a mover? Contact us via phone, email or message.",
    url: `${baseUrl}/contact`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Contact Man and Van Club")}&subtitle=${encodeURIComponent("Get in Touch")}`, width: 1200, height: 630, alt: "Contact Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Man and Van Club | Support & Enquiries",
    description: "Have a question about your move or want to join as a mover? Contact us via phone, email or message.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Contact Man and Van Club")}&subtitle=${encodeURIComponent("Get in Touch")}`],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Man and Van Club",
  description: "Contact Man and Van Club for move enquiries, support or to join as a verified mover.",
  url: `${baseUrl}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "Man and Van Club",
    telephone: "+44-121-751-1269",
    email: "support@manandvanclub.co.uk",
    url: baseUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-121-751-1269",
      contactType: "customer support",
      availableLanguage: "English",
      areaServed: "GB",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${baseUrl}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactContent />
    </>
  );
}
