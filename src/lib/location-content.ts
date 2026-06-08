import { LocationData, getLocationBySlug, LOCATIONS } from "@/constants/locations";

export interface LocationPageData {
  name: string;
  title: string;
  description: string;
  badge: string;
  intro: string;
  knowledge: string;
  areas: string[];
  slug: string;
  h1?: string;
  faq: { q: string; a: string }[];
  nearbyLocations: { slug: string; name: string }[];
  serviceLinks: { title: string; href: string }[];
  localBusinessSchema: Record<string, any>;
  breadcrumbSchema: Record<string, any>;
  faqSchema: Record<string, any>;
}

const SERVICE_LINKS = [
  { title: "House Removals", href: "/house-removals" },
  { title: "Flat Removals", href: "/flat-removals" },
  { title: "Office Removals", href: "/office-removals" },
  { title: "Student Moves", href: "/student-removals" },
  { title: "Furniture Collection", href: "/furniture-delivery" },
  { title: "Long Distance Moves", href: "/long-distance-removals" },
  { title: "Same Day Moves", href: "/same-day-man-and-van" },
];

function generateCostAnswer(loc: LocationData): string {
  const base = loc.region === "Greater London" ? 60 : loc.region === "South West" ? 55 : 50;
  const rangeLow = loc.region === "Greater London" ? 350 : loc.region === "South West" ? 300 : 280;
  const rangeHigh = loc.region === "Greater London" ? 750 : loc.region === "South West" ? 650 : 600;
  return `${loc.name} prices start from around £${base} for smaller moves. A typical 2–3 bedroom house move usually falls between £${rangeLow}–£${rangeHigh} depending on the locations, volume, and access. Submit your details for a more accurate estimate.`;
}

function generateFAQ(loc: LocationData): { q: string; a: string }[] {
  const faq: { q: string; a: string }[] = [];

  faq.push({
    q: `How much does a man and van cost in ${loc.name}?`,
    a: generateCostAnswer(loc),
  });

  if (loc.nearbyAreas.length > 0) {
    const nearby = loc.nearbyAreas.slice(0, 3).join(", ");
    faq.push({
      q: `Do you cover ${nearby}?`,
      a: `Yes. Our ${loc.name} network covers ${loc.nearbyAreas.slice(0, 5).join(", ")} and most of the surrounding areas.`,
    });
  }

  faq.push({
    q: `Can I get a same-day move in ${loc.name}?`,
    a: "Same-day moves are often possible depending on availability. Submit your request and we'll match you with the nearest available mover.",
  });

  if (loc.hasStudentAreas && loc.studentAreas && loc.studentAreas.length > 0) {
    faq.push({
      q: `Can you help with student moves in ${loc.name}?`,
      a: `Absolutely. We regularly help students moving in and out of properties near ${loc.studentAreas.join(" and ")}.`,
    });
  }

  if (loc.businessDistricts && loc.businessDistricts.length > 0) {
    faq.push({
      q: `Do you handle office relocations in ${loc.name}?`,
      a: `Yes. Our movers regularly handle office relocations in ${loc.businessDistricts.join(" and ")}, including evening and weekend moves to minimise disruption.`,
    });
  }

  faq.push({
    q: `Are your ${loc.name} movers insured?`,
    a: "Yes, every mover on our platform carries full Goods in Transit and Public Liability insurance. We verify this before they join the network.",
  });

  return faq;
}

export function getLocationPageData(slug: string): LocationPageData | null {
  const loc = getLocationBySlug(slug);
  if (!loc) return null;

  const pageSlug = `man-and-van-${loc.slug}`;
  const url = `https://www.manandvanclub.co.uk/${pageSlug}`;
  const nearby = loc.nearbyLocations
    .map((s) => {
      const l = getLocationBySlug(s);
      return l ? { slug: s, name: l.name } : null;
    })
    .filter(Boolean) as { slug: string; name: string }[];

  const faq = generateFAQ(loc);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.manandvanclub.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: loc.name,
        item: url,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Man and Van Club - ${loc.name}`,
    url,
    telephone: "07943617386",
    email: "support@manandvanclub.co.uk",
    areaServed: {
      "@type": "Place",
      name: loc.name,
      containedInPlace: {
        "@type": "Place",
        name: loc.region,
      },
    },
    description: `Professional man and van services in ${loc.name}. Local movers who understand ${loc.nearbyAreas.slice(0, 3).join(", ")} and surrounding areas.`,
    priceRange: "££",
    openingHours: "Mo-Su 08:00-22:00",
    serviceType: "Moving Services",
  };

  return {
    name: loc.name,
    title: `Man and Van ${loc.name} | Local Movers Who Know the Area | Man and Van Club`,
    description: `Professional man and van services in ${loc.name}. Local movers who understand ${loc.nearbyAreas.slice(0, 3).join(", ")} and surrounding areas. Get matched with a vetted professional today.`,
    badge: loc.badge,
    intro: loc.intro,
    knowledge: loc.knowledge,
    areas: loc.areas,
    slug: pageSlug,
    faq,
    nearbyLocations: nearby,
    serviceLinks: SERVICE_LINKS,
    localBusinessSchema,
    breadcrumbSchema,
    faqSchema,
  };
}

export function getAllLocationPageSlugs(): string[] {
  return LOCATIONS.map((l) => `man-and-van-${l.slug}`);
}
