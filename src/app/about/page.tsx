import AboutContent from "./AboutContent";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "About Man and Van Club | Our Story & Mission",
  description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent. Learn about our secure introduction marketplace.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Man and Van Club | Our Story & Mission",
    description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent. Learn about our secure introduction marketplace.",
    url: `${baseUrl}/about`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "About Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Man and Van Club | Our Story & Mission",
    description: "We built Man and Van Club to make requesting a quote from an approved mover simple and transparent.",
    images: ["/images/og-homepage.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${baseUrl}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutContent />
    </>
  );
}
