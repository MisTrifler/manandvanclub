import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AIChatWidget from "@/components/AIChatWidget";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van UK | House Removals & Furniture Delivery From £19 | Man and Van Club",
  description: "Man with a van across the UK from £19/hr. House removals, furniture delivery, flat moves and same-day man and van in 488+ areas. One verified mover quotes — no spam calls. Call 0121 751 1269.",
  metadataBase: new URL(siteUrl),
  alternates: {
    languages: {
      'en-GB': siteUrl,
    },
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'United Kingdom',
    'geo.country': 'GB',
    'theme-color': '#F97316',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Man&Van Club',
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Man and Van Club",
    title: "Man and Van UK | House Removals & Furniture Delivery From £19",
    description: "Man with a van across the UK from £19/hr. House removals, furniture delivery, flat moves in 488+ areas. One verified mover. Call 0121 751 1269.",
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
    title: "Man and Van UK | House Removals & Furniture Delivery From £19",
    description: "Man with a van across the UK from £19/hr. Verified movers for house removals, furniture delivery in 488+ areas. Call 0121 751 1269.",
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
  manifest: '/manifest.webmanifest',
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Man and Van Club",
  "alternateName": ["Man and Van Club UK", "Man & Van Club"],
  "url": siteUrl,
  "logo": `${siteUrl}/icon.png`,
  "description": "A marketplace helping customers arrange flexible moves, from single-item collections to full home moves, through an approved mover quote and customer-confirmed booking deposit process.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-121-751-1269",
    "contactType": "customer support",
    "availableLanguage": "English",
    "areaServed": "GB",
    "hoursAvailable": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]
  },
  "acceptedPaymentMethod": ["DebitCard", "CreditCard"],
  "priceRange": "££",
  "currenciesAccepted": "GBP",
  "email": "support@manandvanclub.co.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Towpath Drive, Brownhills",
    "addressLocality": "Walsall",
    "addressRegion": "West Midlands",
    "postalCode": "WS8 6FG",
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
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Man and Van Club Move Request Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "House Removals",
          "url": `${siteUrl}/house-removals`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Flat Removals",
          "url": `${siteUrl}/flat-removals`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Student Moves",
          "url": `${siteUrl}/student-removals`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Office Removals",
          "url": `${siteUrl}/office-removals`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furniture Delivery",
          "url": `${siteUrl}/furniture-delivery`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Same-Day Man and Van",
          "url": `${siteUrl}/same-day-man-and-van`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Long-Distance Removals",
          "url": `${siteUrl}/long-distance-removals`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Facebook Marketplace Collection",
          "url": `${siteUrl}/facebook-marketplace-collection`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Help Me Move",
          "url": `${siteUrl}/help-me-move`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cheap Man and Van",
          "url": `${siteUrl}/cheap-man-and-van`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Van Hire with Driver",
          "url": `${siteUrl}/cheap-van-hire-with-driver`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furniture Delivery Service",
          "url": `${siteUrl}/furniture-delivery-service`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Moving Home",
          "url": `${siteUrl}/moving-home`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cheapest Moving Van",
          "url": `${siteUrl}/cheapest-moving-van`
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61590898873944",
    "https://www.yell.com/biz/man-and-van-club-walsall-11043227/",
    "https://uk.trustpilot.com/review/manandvanclub.co.uk",
    "https://share.google/xemGXWRByHBK5PSbN"
  ]
};

// WebSite schema with SearchAction — signals to Google that this is a real, searchable website
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Man and Van Club",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/man-and-van-near-me?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// AggregateRating + Review schema — shows star ratings in Google SERPs
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Man and Van Club",
  "url": siteUrl,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "5",
    "reviewCount": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Anku G." },
      "datePublished": "2026-07-23",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Great price. I had an excellent experience. I needed to move from Leicester to Glasgow and was getting ridiculous prices everywhere. But soon as I called them up and told my situation the staff were really understanding and provided me with a great alternative and cut my costs! Cant thank you enough. Recommended company!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "S.J." },
      "datePublished": "2026-05-15",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Absolutely brilliant service. The driver was punctual, careful and really helpful with loading. Best man and van I've used in Birmingham. Will definitely use again."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "M.K." },
      "datePublished": "2026-04-22",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Needed a same-day move in Walsall and they came through. Fair price, no hidden fees. The driver even helped carry everything upstairs. Five stars."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "R.P." },
      "datePublished": "2026-06-01",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Used Man and Van Club for a furniture collection from Facebook Marketplace. Driver was professional, blankets and straps for protection. Great value at £19/hr."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${dmSans.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <AnalyticsEvents />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <AIChatWidget />

      </body>
    </html>
  );
}
