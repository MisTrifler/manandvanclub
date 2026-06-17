import { LocationData, getLocationBySlug, LOCATIONS } from "@/constants/locations";
import { customLocationContentOverrides } from "./custom-location-content";
import { getRouteInfo, type RouteInfo } from "./google-maps-routes";
import { isLaunchIndexableLocation, isSeoLaunchMode } from "./seo-quality-guard";

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
  localAreaGuides?: { title: string; body: string; links?: { label: string; href: string }[] }[];
  exampleMoveRequests?: { area: string; type: string; detail: string }[];
  postcodeCoverage?: { area: string; postcodes: string[] }[];
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
  { icon: "PhoneOff", label: "No Endless Calls" },
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

function generateBusinessModelIntro(loc: LocationData): string {
  const areas = loc.nearbyAreas.slice(0, 3).join(", ");
  return `${loc.name} moves can vary by postcode, property type, parking and access. Whether your move is around ${areas || loc.name} or elsewhere nearby, Man and Van Club lets you submit a free request for a verified mover to review before sending quote options.`;
}

function generateBusinessModelKnowledge(loc: LocationData): string {
  const roads = loc.majorRoads.slice(0, 3).join(", ");
  const properties = loc.propertyTypes.slice(0, 3).join(", ");
  const considerations = loc.movingConsiderations.slice(0, 3).join("; ");
  return `A good ${loc.name} quote depends on more than mileage. Postcodes, item list, parking, stairs, lifts, access and timing can all affect the work involved. Your request gives a verified mover the details they need to account for ${roads ? `${roads} routes, ` : ""}${properties || "local property types"}${considerations ? ` and local issues such as ${considerations}` : ""} before you decide whether to book.`;
}

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

  let info = `Moving in ${loc.name} can involve different parking, access and route considerations depending on the postcode and property type. `;

  if (loc.hasStudentAreas && loc.studentAreas) {
    info += `With student areas like ${loc.studentAreas.slice(0, 2).join(" and ")}, peak moving periods align with academic term dates. `;
  }

  if (loc.businessDistricts) {
    info += `Business relocations in ${loc.businessDistricts.slice(0, 2).join(" and ")} often need evening or weekend slots to minimise disruption. `;
  }

  info += `A verified mover can review details such as the ${roads} corridors and local property types, from ${properties}. `;

  if (considerations.length > 0) {
    info += `Common moving considerations in ${loc.name} include ${considerations.slice(0, 3).join("; ")}. `;
  }

  info += `Whether you are moving within ${loc.name} or relocating to a neighbouring town, your request stays protected while a mover reviews the details and prepares quote options.`;

  return info;
}

function generateLocalLandmarks(loc: LocationData): string[] {
  // Use nearbyAreas as "landmarks" - these are genuine local areas
  return loc.nearbyAreas.slice(0, 6);
}


const WEST_MIDLANDS_POSTCODE_COVERAGE: Record<string, { area: string; postcodes: string[] }[]> = {
  birmingham: [
    { area: "City centre and Jewellery Quarter", postcodes: ["B1", "B2", "B3"] },
    { area: "South Birmingham", postcodes: ["B13", "B14", "B29"] },
    { area: "Edgbaston, Harborne and west Birmingham", postcodes: ["B15", "B16", "B17"] },
  ],
  walsall: [
    { area: "Central Walsall", postcodes: ["WS1", "WS2"] },
    { area: "Bloxwich and north Walsall", postcodes: ["WS3"] },
    { area: "Aldridge, Pelsall and nearby", postcodes: ["WS4", "WS9"] },
  ],
  wolverhampton: [
    { area: "Central Wolverhampton", postcodes: ["WV1", "WV2"] },
    { area: "Tettenhall and west Wolverhampton", postcodes: ["WV6"] },
    { area: "Bushbury and north Wolverhampton", postcodes: ["WV10", "WV11"] },
  ],
  dudley: [
    { area: "Central Dudley", postcodes: ["DY1", "DY2"] },
    { area: "Brierley Hill and Pensnett", postcodes: ["DY5"] },
    { area: "Kingswinford and Sedgley", postcodes: ["DY3", "DY6"] },
  ],
  "west-bromwich": [
    { area: "West Bromwich and Sandwell", postcodes: ["B70", "B71"] },
    { area: "Smethwick and nearby", postcodes: ["B66", "B67"] },
    { area: "Oldbury and Rowley Regis", postcodes: ["B68", "B69"] },
  ],
  solihull: [
    { area: "Central Solihull", postcodes: ["B91", "B92"] },
    { area: "Shirley and Monkspath", postcodes: ["B90"] },
    { area: "Knowle and Dorridge", postcodes: ["B93"] },
  ],
  coventry: [
    { area: "Central Coventry", postcodes: ["CV1", "CV2"] },
    { area: "Earlsdon and Canley", postcodes: ["CV4", "CV5"] },
    { area: "Foleshill and north Coventry", postcodes: ["CV6"] },
  ],
};

function generatePostcodeCoverage(loc: LocationData): { area: string; postcodes: string[] }[] {
  const explicit = WEST_MIDLANDS_POSTCODE_COVERAGE[loc.slug];
  if (explicit) return explicit;

  if (loc.region !== "West Midlands") return [];

  const outwardBySlug: Record<string, string[]> = {
    stourbridge: ["DY8", "DY9"],
    halesowen: ["B62", "B63"],
    wednesbury: ["WS10", "DY4"],
    bloxwich: ["WS3"],
    brownhills: ["WS8"],
    aldridge: ["WS9"],
    oldbury: ["B68", "B69"],
    tipton: ["DY4"],
    willenhall: ["WV12", "WV13"],
    darlaston: ["WS10"],
    smethwick: ["B66", "B67"],
  };

  const postcodes = outwardBySlug[loc.slug] || [];
  return postcodes.length > 0
    ? [{ area: `${loc.name} and nearby`, postcodes }]
    : [];
}

function generateExampleMoveRequests(loc: LocationData): { area: string; type: string; detail: string }[] {
  const nearby = loc.nearbyAreas.length > 0 ? loc.nearbyAreas : loc.areas;
  const first = nearby[0] || loc.name;
  const second = nearby[1] || loc.name;
  const third = nearby[2] || loc.name;

  return [
    {
      area: `${loc.name} to ${first}`,
      type: loc.hasStudentAreas ? "Student move" : "Small home move",
      detail: loc.hasStudentAreas
        ? "Boxes, suitcases and small furniture with date and access notes included."
        : "Boxes, small furniture and access details for a local mover to review.",
    },
    {
      area: `${second} to ${loc.name}`,
      type: "Furniture collection",
      detail: "Single-item or multi-item collection with postcode, stairs and parking details supplied.",
    },
    {
      area: `${loc.name} to ${third}`,
      type: loc.businessDistricts?.length ? "Office or storage run" : "Flat move",
      detail: loc.businessDistricts?.length
        ? "Desk, chair, equipment or storage items with timing requirements described upfront."
        : "Flat or apartment move where lifts, floors and loading access matter before quoting.",
    },
  ];
}

function generateCostAnswer(loc: LocationData): string {
  return `The guide price depends on the collection and delivery postcodes, distance, route time, item list, helpers required, stairs, parking and access. Submit your details for a guide price range first, then a verified mover can review the move and send an accurate quote before you decide whether to book.`;
}

function generateFAQ(loc: LocationData): { q: string; a: string }[] {
  const faq: { q: string; a: string }[] = [];

  faq.push({
    q: `Do you cover all areas of ${loc.name}?`,
    a: `Yes. You can submit a move request for ${loc.areas.slice(0, 5).join(", ")} and surrounding areas. A verified mover can review the details and send quote options if they can help.`,
  });

  faq.push({
    q: `How much does a man and van cost in ${loc.name}?`,
    a: generateCostAnswer(loc),
  });

  faq.push({
    q: `Can I find a mover for a same-day move in ${loc.name}?`,
    a: `Same-day moves may be possible in ${loc.name} depending on mover availability. Submit your request and a verified mover can review the details if they have space to help.`,
  });

  faq.push({
    q: `Will multiple movers contact me?`,
    a: `No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies.`,
  });

  faq.push({
    q: `Is it free to submit a move request?`,
    a: `Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover’s quote, and you pay the remaining balance directly to the mover on moving day.`,
  });

  faq.push({
    q: `How quickly will I be contacted?`,
    a: `After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit.`,
  });

  if (loc.nearbyAreas.length > 0) {
    const nearby = loc.nearbyAreas.slice(0, 3).join(", ");
    faq.push({
      q: `Do you cover ${nearby}?`,
      a: `Yes. You can submit requests for ${loc.nearbyAreas.slice(0, 5).join(", ")} and nearby areas. Availability depends on verified movers reviewing the move details.`,
    });
  }

  if (loc.hasStudentAreas && loc.studentAreas && loc.studentAreas.length > 0) {
    faq.push({
      q: `Can you help with student moves in ${loc.name}?`,
      a: `Yes. Student moves can be submitted for areas near ${loc.studentAreas.join(" and ")}. A verified mover can review the item list, access and date before quoting.`,
    });
  }

  if (loc.businessDistricts && loc.businessDistricts.length > 0) {
    faq.push({
      q: `Do you handle office relocations in ${loc.name}?`,
      a: `Yes. Office relocation requests can be submitted for ${loc.businessDistricts.join(" and ")}. Include access, parking, equipment and timing details so a verified mover can quote accurately.`,
    });
  }

  faq.push({
    q: `Are approved ${loc.name} movers insured?`,
    a: `Approved movers must provide Goods in Transit and Public Liability insurance before joining the network. Cover can vary by mover, so we recommend checking the quote details before booking.`,
  });

  return faq;
}

function getRegionCities(loc: LocationData): { name: string; slug: string }[] {
  // Only link to nearby region pages that pass the quality guard. This keeps
  // internal equity focused on pages Google is allowed to index. Importing the
  // guard here would create a circular dependency, so mirror its essential
  // threshold with data already available on LocationData.
  return LOCATIONS
    .filter((l) => l.region === loc.region && l.slug !== loc.slug)
    .filter((l) => !isSeoLaunchMode() || isLaunchIndexableLocation(l.slug))
    .filter((l) =>
      Boolean(
        l.intro?.trim().length >= 120 &&
        l.knowledge?.trim().length >= 120 &&
        l.nearbyAreas?.length >= 5 &&
        l.movingConsiderations?.length >= 3 &&
        ((l.majorRoads?.length || 0) + (l.studentAreas?.length || 0) + (l.businessDistricts?.length || 0)) >= 2
      )
    )
    .map((l) => ({
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
    "@type": "Service",
    name: `Man and Van ${loc.name} quote request`,
    url,
    provider: {
      "@type": "Organization",
      name: "Man and Van Club",
      email: "support@manandvanclub.co.uk",
      telephone: "07943617386",
    },
    areaServed: {
      "@type": "Place",
      name: loc.name,
      containedInPlace: {
        "@type": "Place",
        name: loc.region,
      },
    },
    description: `Free man and van move request service in ${loc.name}. A verified mover can review anonymised move details and send quote options before the customer decides whether to book.`,
    serviceType: "Man and van quote request",
  };

  const baseData = {
    name: loc.name,
    title: `Man and Van ${loc.name} | Verified Local Movers | Man and Van Club`,
    description: `Free man and van request in ${loc.name}. Get a guide price, submit your details securely, and let a verified mover send quote options before you decide whether to book.`,
    badge: `Verified movers in ${loc.name}`,
    intro: generateBusinessModelIntro(loc),
    knowledge: generateBusinessModelKnowledge(loc),
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
    exampleMoveRequests: generateExampleMoveRequests(loc),
    postcodeCoverage: generatePostcodeCoverage(loc),
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
