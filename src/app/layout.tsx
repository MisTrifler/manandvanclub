import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  title: "Man and Van Club | Verified Man and Van Quotes — House Removals & Furniture Delivery",
  description: "Submit one free move request for house removals, flat moves, furniture delivery, office relocations and student moves across the UK. Verified movers, protected details, no spam.",
  metadataBase: new URL('https://www.manandvanclub.co.uk'),
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk',
  },
  openGraph: {
    title: "Man and Van Club | Verified Man and Van Quotes",
    description: "Submit one free move request for house removals, flat moves, furniture delivery, office relocations and student moves across the UK. Verified movers, protected details, no spam.",
    url: 'https://www.manandvanclub.co.uk',
    siteName: "Man and Van Club",
    images: [
      {
        url: 'https://www.manandvanclub.co.uk/images/hero-moving.jpg',
        width: 1200,
        height: 630,
        alt: 'Man and Van Club — Professional movers loading a Luton van',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Man and Van Club | Verified Man and Van Quotes",
    description: "Submit one free move request for house removals, flat moves, furniture delivery and more. Verified movers, no spam.",
    images: ['https://www.manandvanclub.co.uk/images/hero-moving.jpg'],
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
  "@type": ["Organization", "LocalBusiness"],
  "name": "Man and Van Club",
  "url": "https://www.manandvanclub.co.uk",
  "logo": "https://www.manandvanclub.co.uk/icon.png",
  "description": "A UK-wide marketplace helping customers submit free move requests for anything from single-item collections to full home moves. Verified movers, protected details, no spam.",
  "telephone": "+44-7943-617-386",
  "email": "support@manandvanclub.co.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Towpath Drive, Brownhills",
    "addressLocality": "Walsall",
    "addressRegion": "West Midlands",
    "postalCode": "WS8 6FG",
    "addressCountry": "GB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-7943-617-386",
    "contactType": "customer support",
    "availableLanguage": "English",
    "areaServed": "GB"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "serviceArea": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "serviceType": [
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
  "priceRange": "Free quote",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61590898873944"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
