import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Club | From One Item to Full Home Moves",
  description: "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs. One approved mover can review before you book.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-GB': siteUrl,
    },
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'West Midlands',
    'geo.country': 'GB',
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Man and Van Club",
    title: "Man and Van Club | Free Move Requests | UK-Wide Verified Movers",
    description: "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs. One approved mover reviews your details before you decide whether to book.",
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
    description: "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs.",
    images: ["/images/og-homepage.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Man and Van Club",
  "url": siteUrl,
  "logo": `${siteUrl}/icon.png`,
  "description": "A marketplace helping customers arrange flexible moves, from single-item collections to full home moves, through an approved mover quote and customer-confirmed booking deposit process.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-121-751-1269",
    "contactType": "customer support",
    "availableLanguage": "English",
    "areaServed": "GB"
  },
  "email": "support@manandvanclub.co.uk",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Walsall",
    "addressRegion": "West Midlands",
    "addressCountry": "GB"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "serviceArea": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "knowsAbout": [
    "Man and van services",
    "Single item collections",
    "Home moves",
    "House removals",
    "Flat removals",
    "Student removals",
    "Office removals",
    "Furniture delivery",
    "Same-day man and van services",
    "Long distance removals"
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61590898873944",
    "https://www.yell.com/biz/man-and-van-club-walsall-11043227/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <AnalyticsEvents />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />

      </body>
    </html>
  );
}
