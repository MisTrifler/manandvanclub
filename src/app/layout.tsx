import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Man and Van Club | From One Item to Full Home Moves",
  description: "Submit a free move request for furniture collections, flat moves, house removals, office moves and same-day jobs. One approved mover can review before you book.",
  metadataBase: new URL('https://www.manandvanclub.co.uk'),
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk',
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
  "url": "https://www.manandvanclub.co.uk",
  "logo": "https://www.manandvanclub.co.uk/icon.png",
  "description": "A marketplace helping customers arrange flexible moves, from single-item collections to full home moves, through an approved mover quote and customer-confirmed booking deposit process.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-7943-617-386",
    "contactType": "customer support",
    "availableLanguage": "English",
    "areaServed": "GB"
  },
  "email": "support@manandvanclub.co.uk",
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
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
