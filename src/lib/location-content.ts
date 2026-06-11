import { LocationData, getLocationBySlug, LOCATIONS } from "@/constants/locations";
import { customLocationContentOverrides } from "./custom-location-content";
import { getRouteInfo, type RouteInfo } from "./google-maps-routes";

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
  region: string;
  pageType: "location";
  // NEW: rich content sections
  areasWeCover: string[];
  localMovingInfo: string;
  popularMoves: { from: string; to: string; slug?: string; routeInfo: RouteInfo }[];
  localLandmarks: string[];
  trustPoints: { icon: string; label: string }[];
  verificationChecks: string[];
  movingChecklist: string[];
  regionCities: { name: string; slug: string }[];
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

const TRUST_POINTS = [
  { icon: "ClipboardCheck", label: "Free To Submit" },
  { icon: "PhoneOff", label: "No Multiple Sales Calls" },
  { icon: "UserCheck", label: "Customer-Confirmed Process" },
  { icon: "Lock", label: "Secure Enquiry Process" },
  { icon: "MapPin", label: "Local Mover Coverage" },
];

const VERIFICATION_CHECKS = [
  "Business Details",
  "Contact Information",
  "Goods in Transit Insurance",
  "Public Liability Insurance",
  "Service Area Verification",
];

const MOVING_CHECKLIST = [
  "Confirm moving date",
  "Prepare packing materials",
  "Label boxes clearly",
  "Arrange parking if required",
  "Notify utility providers",
  "Take meter readings",
  "Update your address",
];

// Popular move destinations by region (for generic generation)
function getPopularMovesForRegion(loc: LocationData): { from: string; to: string; slug?: string; routeInfo: RouteInfo }[] {
  const majorCities: Record<string, { to: string; slug: string }[]> = {
    "West Midlands": [
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Leeds", slug: "leeds" },
      { to: "Bristol", slug: "bristol" },
      { to: "Wolverhampton", slug: "wolverhampton" },
    ],
    "Greater London": [
      { to: "Birmingham", slug: "birmingham" },
      { to: "Manchester", slug: "manchester" },
      { to: "Bristol", slug: "bristol" },
      { to: "Leeds", slug: "leeds" },
      { to: "Brighton", slug: "" },
    ],
    "Greater Manchester": [
      { to: "London", slug: "london" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Leeds", slug: "leeds" },
      { to: "Liverpool", slug: "liverpool" },
      { to: "Sheffield", slug: "" },
    ],
    "West Yorkshire": [
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Leeds", slug: "leeds" },
      { to: "Newcastle", slug: "" },
    ],
    "Merseyside": [
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Leeds", slug: "leeds" },
      { to: "Chester", slug: "" },
    ],
    "South West": [
      { to: "London", slug: "london" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Manchester", slug: "manchester" },
      { to: "Cardiff", slug: "cardiff" },
      { to: "Exeter", slug: "" },
    ],
    "East Midlands": [
      { to: "Birmingham", slug: "birmingham" },
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Leeds", slug: "leeds" },
      { to: "Leicester", slug: "" },
    ],
  };

  const region = loc.region;
  const destinations = majorCities[region] || majorCities["West Midlands"];
  return destinations.slice(0, 5).map((d) => ({
    from: loc.name,
    to: d.to,
    slug: d.slug,
    routeInfo: getRouteInfo(loc.name, d.to),
  }));
}

function generateAreasWeCover(loc: LocationData): string[] {
  // Combine nearbyAreas + areas, take up to 12 unique
  const combined = Array.from(new Set([...loc.nearbyAreas, ...loc.areas]));
  return combined.slice(0, 12);
}

function generateLocalMovingInfo(loc: LocationData): string {
  const considerations = loc.movingConsiderations;
  const roads = loc.majorRoads.slice(0, 3).join(", ");
  const properties = loc.propertyTypes.slice(0, 3).join(", ");

  let info = `Moving in ${loc.name} requires local knowledge. `;

  if (loc.hasStudentAreas && loc.studentAreas) {
    info += `With student areas like ${loc.studentAreas.slice(0, 2).join(" and ")}, peak moving periods align with academic term dates. `;
  }

  if (loc.businessDistricts) {
    info += `Business relocations in ${loc.businessDistricts.slice(0, 2).join(" and ")} often need evening or weekend slots to minimise disruption. `;
  }

  info += `Our movers know the ${roads} corridors and understand access challenges for ${properties} properties. `;

  if (considerations.length > 0) {
    info += `Common moving considerations in ${loc.name} include ${considerations.slice(0, 3).join("; ")}. `;
  }

  info += `Whether you are moving within ${loc.name} or relocating to a neighbouring town, our network connects you with movers who understand the local landscape.`;

  return info;
}

function generateLocalLandmarks(loc: LocationData): string[] {
  // Use nearbyAreas as "landmarks" - these are genuine local areas
  return loc.nearbyAreas.slice(0, 6);
}

function generateCostAnswer(loc: LocationData): string {
  const base = loc.region === "Greater London" ? 60 : loc.region === "South West" ? 55 : 50;
  const rangeLow = loc.region === "Greater London" ? 350 : loc.region === "South West" ? 300 : 280;
  const rangeHigh = loc.region === "Greater London" ? 750 : loc.region === "South West" ? 650 : 600;
  return `${loc.name} prices start from around £${base} for smaller moves. A typical 2–3 bedroom house move usually falls between £${rangeLow}–£${rangeHigh} depending on the locations, volume, and access. Submit your details for a more accurate estimate.`;
}

function generateFAQ(loc: LocationData): { q: string; a: string }[] {
  const faq: { q: string; a: string }[] = [];

  faq.push({
    q: `Do you cover all areas of ${loc.name}?`,
    a: `Yes. Our ${loc.name} network covers ${loc.areas.slice(0, 5).join(", ")} and surrounding areas. Whether you are in the town centre or the outskirts, we can match you with a suitable local mover.`,
  });

  faq.push({
    q: `How much does a man and van cost in ${loc.name}?`,
    a: generateCostAnswer(loc),
  });

  faq.push({
    q: `Can I find a mover for a same-day move in ${loc.name}?`,
    a: `Same-day moves are often possible in ${loc.name} depending on availability. Submit your request and we will match you with the nearest available mover.`,
  });

  faq.push({
    q: `Will multiple movers contact me?`,
    a: `No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies.`,
  });

  faq.push({
    q: `Is it free to submit a move request?`,
    a: `Yes. It is free to submit your move request. You only pay a booking fee if you accept a mover quote. The booking fee is separate from the mover’s quote, and you pay the mover’s quoted price directly to the mover.`,
  });

  faq.push({
    q: `How quickly will I be contacted?`,
    a: `We aim to have your mover contact you as promptly as possible. In most cases, you can expect to hear back within 24 hours, often sooner. The mover will contact you directly by phone or email to discuss your requirements.`,
  });

  if (loc.nearbyAreas.length > 0) {
    const nearby = loc.nearbyAreas.slice(0, 3).join(", ");
    faq.push({
      q: `Do you cover ${nearby}?`,
      a: `Yes. Our ${loc.name} network covers ${loc.nearbyAreas.slice(0, 5).join(", ")} and most of the surrounding areas.`,
    });
  }

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
    a: `Yes, every mover on our platform carries full Goods in Transit and Public Liability insurance. We verify this before they join the network.`,
  });

  return faq;
}

function getRegionCities(loc: LocationData): { name: string; slug: string }[] {
  return LOCATIONS.filter((l) => l.region === loc.region && l.slug !== loc.slug).map((l) => ({
    name: l.name,
    slug: l.slug,
  }));
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

  const baseData = {
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
    // NEW sections
    areasWeCover: generateAreasWeCover(loc),
    localMovingInfo: generateLocalMovingInfo(loc),
    popularMoves: getPopularMovesForRegion(loc),
    localLandmarks: generateLocalLandmarks(loc),
    trustPoints: TRUST_POINTS,
    verificationChecks: VERIFICATION_CHECKS,
    movingChecklist: MOVING_CHECKLIST,
    regionCities: getRegionCities(loc),
    region: loc.region,
    pageType: "location" as const,
  };

  // Merge custom content overrides for priority cities (prevents doorway-page penalties)
  const customOverride = customLocationContentOverrides[loc.slug];
  if (customOverride) {
    return { ...baseData, ...customOverride };
  }

  return baseData;
}

export function getAllLocationPageSlugs(): string[] {
  return LOCATIONS.map((l) => `man-and-van-${l.slug}`);
}
