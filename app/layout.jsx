import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";

const siteUrl = "https://www.westmidlandscleaner.co.uk";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "West Midlands Cleaners | Compare Local Cleaning Quotes",
    template: "%s | West Midlands Cleaner"
  },
  description:
    "Compare cleaning quotes across Birmingham, Walsall, Wolverhampton, Dudley, Solihull, Coventry and the wider West Midlands for domestic, deep and end-of-tenancy cleaning.",
  applicationName: "West Midlands Cleaner",
  keywords: [
    "West Midlands cleaner",
    "cleaners near me West Midlands",
    "cleaning quotes West Midlands",
    "cleaning booking West Midlands",
    "house cleaning West Midlands",
    "domestic cleaning West Midlands",
    "deep cleaning West Midlands",
    "end of tenancy cleaning West Midlands",
    "move-out cleaning West Midlands",
    "Airbnb cleaning West Midlands",
    "after builders cleaning West Midlands",
    "cleaners Birmingham",
    "cleaners Walsall",
    "cleaners Wolverhampton",
    "cleaners Dudley",
    "cleaners Solihull"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "West Midlands Cleaner",
    title: "West Midlands Cleaners | Compare Local Cleaning Quotes",
    description:
      "Post one cleaning request and compare quotes from independent cleaning providers across the West Midlands before paying.",
    images: [
      {
        url: "/wmc-logo-horizontal.png",
        width: 1200,
        height: 630,
        alt: "West Midlands Cleaner logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "West Midlands Cleaner",
    description:
      "Compare cleaning quotes across Birmingham, Walsall, Wolverhampton, Dudley, Solihull, Coventry and the wider West Midlands.",
    images: ["/wmc-logo-horizontal.png"]
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any"
      },
      {
        url: "/wmc-favicon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    shortcut: "/favicon.ico"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

const serviceAreas = [
  "West Midlands",
  "Birmingham",
  "Walsall",
  "Wolverhampton",
  "Dudley",
  "Coventry",
  "Solihull",
  "Sandwell",
  "West Bromwich",
  "Sutton Coldfield",
  "Brownhills"
];

const cleaningServices = [
  "Domestic cleaning",
  "Deep cleaning",
  "End-of-tenancy cleaning",
  "Move-out cleaning",
  "Airbnb and holiday-let cleaning",
  "After-builders cleaning"
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: "West Midlands Cleaner",
  alternateName: "WMC",
  url: siteUrl,
  logo: `${siteUrl}/wmc-logo-horizontal.png`,
  image: `${siteUrl}/wmc-logo-horizontal.png`,
  email: "info@westmidlandscleaner.co.uk",
  areaServed: serviceAreas.map((area) => ({
    "@type": "Place",
    name: area
  })),
  description:
    "West Midlands Cleaner is a local cleaning quote marketplace helping customers compare quotes from independent cleaning providers for domestic, deep, end-of-tenancy, Airbnb and after-builders cleaning.",
  priceRange: "££"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "West Midlands Cleaner",
  alternateName: "WMC",
  url: siteUrl,
  logo: `${siteUrl}/wmc-logo-horizontal.png`,
  email: "info@westmidlandscleaner.co.uk"
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "West Midlands Cleaner",
  url: siteUrl,
  publisher: {
    "@id": `${siteUrl}/#organization`
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/#cleaning-marketplace-service`,
  name: "Cleaning quote marketplace across the West Midlands",
  provider: {
    "@id": `${siteUrl}/#localbusiness`
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "Place",
    name: area
  })),
  serviceType: cleaningServices,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning services",
    itemListElement: cleaningServices.map((serviceName) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: serviceName
      }
    }))
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
