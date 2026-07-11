import CityServiceContent from "@/components/CityServiceContent";
import { getLocationPageData, getAllLocationPageSlugs } from "@/lib/location-content";
import { getIndexableLocationSlugs, isLocationIndexable } from "@/lib/seo-quality-guard";
import { getEnhancedServiceSchema } from "@/lib/enhanced-schemas";
import { type IntentType } from "@/lib/intent-detection";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

const serviceSlugs = [
  "house-removals",
  "flat-removals",
  "student-removals",
  "office-removals",
  "furniture-delivery",
  "same-day-man-and-van",
  "long-distance-removals",
  "facebook-marketplace-collection",
];

const baseServiceLinks = [
      { title: "House Removals", href: "/house-removals" },
      { title: "Flat Moves", href: "/flat-removals" },
      { title: "Office Relocations", href: "/office-removals" },
      { title: "Student Moves", href: "/student-removals" },
      { title: "Furniture Delivery", href: "/furniture-delivery" },
      { title: "Long Distance Moves", href: "/long-distance-removals" },
      { title: "Same Day Moves", href: "/same-day-man-and-van" }
    ];

const servicePageData: Record<string, any> = {
  "house-removals": {
    name: "House Removals",
    formIntent: "house",
    title: "House Removals | Get Verified Mover Quotes | Man and Van Club",
    description: "Moving home? Submit your house removal details free — bedrooms, packing, access and postcodes. One verified mover reviews your request before you decide to book.",
    badge: "Home Move Requests",
    h1: "Full Home Moves Made Easier",
    intro: "Moving your whole home? Man and Van Club can handle more than collections. Add bedrooms, property type, packing, stairs, lift access and postcodes so an approved mover can review the job properly before quoting.",
    knowledge: "A house removal needs more detail than a quick collection. Your request helps the mover account for furniture volume, fragile items, parking, stairs, loading access and the timing needed on moving day.",
    proofQuote: "Best for full home moves where the mover needs enough detail to price the job properly before you decide whether to book.",
    requestTypesHeading: "Common House Move Requests",
    areas: ["Full Home Moves", "Family Homes", "Terraced Houses", "Apartments", "Cottages", "Large Properties"],
    featureCards: [
      { t: "Full Move Details", d: "Bedrooms, property type, packing and access notes help the mover judge the size of the job.", icon: "home" },
      { t: "Furniture Planning", d: "Large items, fragile items and dismantling notes can be added before the mover quotes.", icon: "package" },
      { t: "Access Checked", d: "Stairs, lift access, parking and loading restrictions help avoid surprises on moving day.", icon: "access" },
      { t: "Customer-Controlled", d: "You see the guide price first, then decide whether to accept a mover quote.", icon: "check" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/house-removals"),
    faq: [
      { q: "How much does a house removal cost?", a: "Prices vary based on volume, distance, access, helpers, stairs and date. Use the form to see a guide price first, then an approved mover can review the details before quoting." },
      { q: "Do movers dismantle and reassemble furniture?", a: "Some movers offer this service. Add dismantling and reassembly notes to the form so an approved mover can review whether they can include it in the quote." },
      { q: "Are my belongings insured during the move?", a: "Movers must provide Goods in Transit and Public Liability insurance before they are approved. We still recommend confirming cover details directly with your mover before moving day." }
    ]
  },
  "flat-removals": {
    name: "Flat Removals",
    formIntent: "house",
    title: "Flat Removals | Apartment Moving Quotes | Man and Van Club",
    description: "Flat moves made simple. Add floor level, lift access, stairs and postcodes. One verified mover sends a quote — free to submit, no spam, details protected.",
    badge: "Flat Move Requests",
    h1: "Flat Removals Without The Guesswork",
    intro: "Moving from a flat or apartment? Add lift access, floor level, parking, shared entrances and postcodes so the mover can quote around the real access conditions.",
    knowledge: "Flat moves often depend on access. Lifts, staircases, building rules, loading bays, parking permits and narrow hallways can change the time and handling needed.",
    proofQuote: "Best for apartments, studios and flats where access details matter as much as the item list.",
    requestTypesHeading: "Common Flat Move Requests",
    areas: ["Studio Flats", "1-Bed Apartments", "2-Bed Flats", "Upper Floors", "Ground Floor", "City Centre Flats"],
    featureCards: [
      { t: "Lift & Stair Notes", d: "Floor level and lift access help the mover understand how long loading may take.", icon: "building" },
      { t: "Parking Details", d: "Permit zones, loading bays and restricted streets can be included in the request.", icon: "access" },
      { t: "Right-Sized Moves", d: "Studios, one-bed flats and larger apartment moves can be described clearly without a generic quote form.", icon: "package" },
      { t: "Clear Quote Review", d: "An approved mover reviews the access and move details before sending quote options.", icon: "check" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/flat-removals"),
    faq: [
      { q: "Do I need to book the lift for my flat removal?", a: "It is recommended to book the lift with your building management in advance. Add any lift or building access rules to your request so the mover can quote with the right timing." },
      { q: "Can movers handle tight staircases?", a: "Yes. Add no-lift access and staircase details to your request so the mover can account for the extra time and handling before quoting." },
      { q: "How much does a flat removal cost?", a: "Flat move prices depend on volume, distance, stairs, lift access, parking and timing. Use the form to see a guide price before an approved mover reviews the details." }
    ]
  },
  "student-removals": {
    name: "Student Removals",
    formIntent: "student",
    title: "Student Moves | University & Term-Time Moving | Man and Van Club",
    description: "Student moving? Submit your move details free — halls, shared houses, boxes and bags. Verified movers, transparent quotes, no spam calls.",
    badge: "Student Move Requests",
    h1: "Student Removals For Uni Moves",
    intro: "Moving to halls, a shared house or back home for summer? Add your university, boxes, bags, small furniture and postcodes so a mover can review the student move quickly.",
    knowledge: "Student moves are usually smaller but time-sensitive. Term dates, halls access, shared-house parking and budget limits can all affect the quote.",
    proofQuote: "Best for halls, shared houses, studios and smaller student loads where speed and clear item details matter.",
    requestTypesHeading: "Common Student Move Requests",
    areas: ["University Halls", "Shared Houses", "Studio Flats", "Home To Uni", "End Of Term", "Start Of Term"],
    featureCards: [
      { t: "Student Load Details", d: "Boxes, suitcases and small furniture can be listed without filling a full house-removal form.", icon: "student" },
      { t: "Term-Time Timing", d: "Add preferred dates and deadlines around halls move-in or end-of-term collections.", icon: "clock" },
      { t: "Shared House Access", d: "Parking, stairs and room access details help the mover quote accurately.", icon: "building" },
      { t: "Budget-Aware", d: "Smaller loads and flexible dates can help keep the guide price lower.", icon: "check" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/student-removals"),
    faq: [
      { q: "Do you offer student discounts?", a: "Student move costs depend on load size, route, helpers and timing. Smaller loads and flexible dates can help keep the guide price lower." },
      { q: "Can I share a move with housemates?", a: "Combined student moves can sometimes reduce the guide price when housemates are moving on the same route. Add the details to the form so a mover can review the request properly." },
      { q: "How much does a student move cost?", a: "Student move prices depend on the route, item list, helpers, access and term-time demand. Smaller loads and flexible dates can help keep the guide price lower." }
    ]
  },
  "office-removals": {
    name: "Office Removals",
    formIntent: "office",
    title: "Office Relocations | Business Moving Quotes | Man and Van Club",
    description: "Office relocation? Submit your move details free — desks, IT equipment, timing and access. One verified mover reviews before you decide to book.",
    badge: "Business Move Requests",
    h1: "Office Removals With Less Disruption",
    intro: "Relocating your office or business? Add desks, filing cabinets, IT equipment, access, loading times and preferred moving window so a mover can quote around your work schedule.",
    knowledge: "Office removals need careful planning. Evening or weekend preferences, IT equipment, filing cabinets, loading bays and building rules all help the mover understand the job before quoting.",
    proofQuote: "Best for business moves where timing, equipment and disruption control are more important than a basic van booking.",
    requestTypesHeading: "Common Office Move Requests",
    areas: ["Small Offices", "Large Offices", "Co-Working Spaces", "Retail Units", "Warehouses", "Home Offices"],
    featureCards: [
      { t: "Business Timing", d: "Add evening, weekend or preferred moving windows to reduce disruption.", icon: "clock" },
      { t: "Equipment Notes", d: "Desks, filing cabinets, IT equipment and meeting-room furniture can be listed upfront.", icon: "office" },
      { t: "Loading Access", d: "Lift access, loading bays and building restrictions help the mover plan properly.", icon: "access" },
      { t: "Reviewed Before Quote", d: "An approved mover checks the business-move details before sending quote options.", icon: "check" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/office-removals"),
    faq: [
      { q: "Can you move outside business hours?", a: "Evening and weekend office relocations may be available depending on mover availability. Add your preferred timing when submitting the request." },
      { q: "Do you handle IT equipment?", a: "Add IT equipment, monitors, servers or fragile electronics to your request so the mover can confirm what they can handle before quoting." },
      { q: "How much notice do you need for an office move?", a: "We recommend at least 1–2 weeks' notice for office moves to ensure proper planning and availability." }
    ]
  },
  "furniture-delivery": {
    name: "Furniture Delivery",
    formIntent: "single-item",
    title: "Furniture Delivery & Collection | Single Item Movers | Man and Van Club",
    description: "Need furniture collected or delivered? Sofas, beds, wardrobes, appliances and Marketplace buys. Free request, verified mover, protected details.",
    badge: "Furniture Delivery Requests",
    h1: "Furniture Collection & Delivery",
    intro: "Need a sofa, bed, wardrobe, appliance or online purchase collected? Add item size, pickup and delivery postcodes, stairs and helpers so a mover can quote accurately.",
    knowledge: "Furniture jobs depend on item size, access and handling. A wardrobe up two flights of stairs is different from a boxed item collected from a shop, so the request form asks for the details that matter.",
    proofQuote: "Best for single items, Facebook Marketplace buys, shop collections and bulky furniture loads that need the right van and handling.",
    requestTypesHeading: "Common Furniture Delivery Requests",
    areas: ["Sofas", "Beds", "Wardrobes", "Dining Sets", "Appliances", "Online Purchases"],
    featureCards: [
      { t: "Item Size Matters", d: "Add dimensions, weight and photos if needed so the mover can judge the handling.", icon: "furniture" },
      { t: "Pickup & Drop-Off", d: "Collection and delivery postcodes help calculate the route and guide price.", icon: "route" },
      { t: "Access Notes", d: "Stairs, lifts, tight turns and parking details help avoid failed collections.", icon: "access" },
      { t: "Item Or Load Friendly", d: "Useful for one-off items or several bulky pieces without filling in a full house-removal request.", icon: "package" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/furniture-delivery"),
    faq: [
      { q: "Can you collect from a shop or seller?", a: "Yes. Collections from shops, private sellers or auction houses can be submitted. Provide the collection postcode and item details so the mover can quote accurately." },
      { q: "How much does furniture collection cost?", a: "Single-item collection prices depend on distance, item size, access, timing and whether extra help is needed. Use the form to see a guide price first." },
      { q: "Will my furniture be protected?", a: "Movers typically use protective blankets and straps as standard. Movers must provide Goods in Transit and Public Liability insurance before they are approved, and we recommend confirming cover details directly with your mover." }
    ]
  },
  "same-day-man-and-van": {
    name: "Same Day Man and Van",
    formIntent: "general",
    title: "Same Day Man and Van | Urgent & Last-Minute Moves | Man and Van Club",
    description: "Need a mover today? Submit a same-day move request free. Verified local movers, urgent collections, last-minute moves — details protected until you book.",
    badge: "Same-Day Move Requests",
    h1: "Same Day Man And Van",
    intro: "Need urgent help today? Submit accurate postcodes, item details, timing and access notes so an available approved mover can review the request quickly before quoting.",
    knowledge: "Same-day requests need clear details. Postcodes, item list, helpers, stairs, parking and time window help a mover decide quickly whether they can help and what to quote.",
    proofQuote: "Best for urgent local moves, short-notice furniture collections, flat moves and time-sensitive deliveries.",
    requestTypesHeading: "Common Same-Day Requests",
    areas: ["Emergency Moves", "Last-Minute Collections", "Urgent Deliveries", "Same-Day Furniture", "Flat Moves", "Day-Of Requests"],
    featureCards: [
      { t: "Fast Detail Review", d: "The clearer your item and access notes, the faster an available mover can assess the job.", icon: "clock" },
      { t: "Urgent Local Jobs", d: "Best suited to local and regional requests where availability can be checked quickly.", icon: "route" },
      { t: "No Endless Calls", d: "Submit one request and one suitable mover can review it before quoting.", icon: "check" },
      { t: "Clear Timing", d: "Add your preferred time window so the mover can confirm whether same-day help is realistic.", icon: "access" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/same-day-man-and-van"),
    faq: [
      { q: "How quickly can a mover arrive?", a: "Depending on availability, same-day help can sometimes be arranged. Submit accurate postcodes, items and access notes so an available approved mover can review the request quickly." },
      { q: "Does same-day cost more?", a: "Same-day moves can cost more when availability is limited or the route is longer. You can see a guide price first, then the mover quote is shown before you decide whether to book." },
      { q: "Can I book same-day for long distances?", a: "Same-day is usually best for local or regional moves. For long-distance same-day requests, include accurate postcodes, timing and access notes so a mover can decide whether they can help." }
    ]
  },
  "long-distance-removals": {
    name: "Long Distance Moves",
    formIntent: "general",
    title: "Long Distance Removals | UK-Wide Move Quotes | Man and Van Club",
    description: "City-to-city and UK-wide move requests. Add collection and delivery postcodes, date and item details. Free to submit, one verified mover, no spam.",
    badge: "UK-Wide Move Requests",
    h1: "Long Distance Moves Planned Properly",
    intro: "Moving city to city or across the country? Add postcodes, date, access notes and item list so a mover can review mileage, route time and loading before quoting.",
    knowledge: "Long-distance moves need route planning. Mileage, fuel, loading time, unloading time, access and whether the van returns empty can all affect the quote.",
    proofQuote: "Best for UK-wide moves where mileage, route time and access details need checking before booking.",
    requestTypesHeading: "Common Long-Distance Requests",
    areas: ["City To City", "Cross-Country", "England To Scotland", "England To Wales", "Regional Moves", "Multi-Drop"],
    featureCards: [
      { t: "Route Reviewed", d: "Collection and delivery postcodes help the mover review mileage and timing.", icon: "route" },
      { t: "Dedicated Details", d: "Add load size and access notes so the quote reflects the real job.", icon: "package" },
      { t: "Timing Planned", d: "Longer routes may need careful pickup and delivery windows.", icon: "clock" },
      { t: "Quote Before Booking", d: "You can review quote options before deciding whether to proceed.", icon: "check" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/long-distance-removals"),
    faq: [
      { q: "How much does a long-distance move cost?", a: "Long-distance pricing depends on mileage, route time, volume, access and whether the move is one-way or part of a return route. Use the form to get a guide price first." },
      { q: "Can the mover stay overnight for very long distances?", a: "For moves over 4–5 hours, some movers may require overnight accommodation. This is agreed upfront and included in the quote." },
      { q: "Is my load the only one on the van?", a: "For most long-distance bookings you can describe whether you need a dedicated vehicle or can be flexible. Add this to your request so the mover can quote correctly." }
    ]
  },
  "facebook-marketplace-collection": {
    name: "Facebook Marketplace Collection",
    formIntent: "single-item",
    title: "Facebook Marketplace Collection & Delivery | Man and Van Club",
    description: "Collection and delivery quote requests for Facebook Marketplace purchases across England. Submit item and postcode details so an approved mover can review the job before quoting.",
    badge: "Marketplace Collection Requests",
    h1: "Facebook Marketplace Collection",
    intro: "Bought something on Facebook Marketplace and need it collected? Add seller access, collection and delivery postcodes, item size and timing so a mover can review the request before quoting.",
    knowledge: "Marketplace collections often need quick, practical planning. Item size, seller access, collection window and parking details help avoid wasted journeys.",
    proofQuote: "Best for marketplace purchases where collection timing, seller access and item size need to be clear before booking.",
    requestTypesHeading: "Common Marketplace Collections",
    areas: ["Sofas", "Beds", "Tables", "Appliances", "Wardrobes", "Mixed Items"],
    featureCards: [
      { t: "Seller Details", d: "Add collection instructions and timing so the mover can plan the pickup.", icon: "check" },
      { t: "Item Handling", d: "Describe item size, stairs and access to reduce collection problems.", icon: "package" },
      { t: "Route Clarity", d: "Pickup and delivery postcodes help calculate route and guide price.", icon: "route" },
      { t: "Useful For One-Off Buys", d: "A simple way to request help without booking a full house move.", icon: "furniture" }
    ],
    serviceLinks: baseServiceLinks.filter((item) => item.href !== "/facebook-marketplace-collection"),
    faq: [
      { q: "Can the mover collect on my behalf if I cannot be there?", a: "Yes, with clear arrangements. Provide the seller's contact details and any collection instructions. Payment must be settled with the seller beforehand." },
      { q: "How much does a marketplace collection cost?", a: "Marketplace collection prices depend on distance, item size, access, timing and whether extra help is needed. Use the form to see a guide price first." },
      { q: "Can you collect multiple items from different sellers?", a: "Yes. Multi-drop collections are possible. Mention it on the form so the mover can review the route and quote correctly." }
    ]
  }
};
function buildServiceSchema(serviceData: any, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceData.name} quote request`,
    url: `https://www.manandvanclub.co.uk/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Man and Van Club",
      url: "https://www.manandvanclub.co.uk",
      logo: "https://www.manandvanclub.co.uk/icon.png",
      telephone: "+44-7943-617-386",
      email: "support@manandvanclub.co.uk",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: serviceData.name,
    description: serviceData.description,
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  // Redirect plain city slugs to man-and-van- prefix
  if (!slug.startsWith("man-and-van-") && !serviceSlugs.includes(slug)) {
    return {
      title: "Man and Van Club",
      description: "Professional man and van services across the UK.",
    };
  }

  const locationKey = slug.replace("man-and-van-", "");
  const locData = getLocationPageData(locationKey);

  if (locData) {
    // Quality guard: thin/placeholder pages are noindexed and excluded
    // from the sitemap until their local content is enriched.
    const indexable = isLocationIndexable(locationKey);
    return {
      title: locData.title,
      description: locData.description,
      alternates: {
        canonical: `https://www.manandvanclub.co.uk/${slug}`,
      },
      ...(indexable ? {} : { robots: { index: false, follow: true } }),
    };
  }

  const serviceData = servicePageData[slug];
  if (serviceData) {
    return {
      title: serviceData.title,
      description: serviceData.description,
      alternates: {
        canonical: `https://www.manandvanclub.co.uk/${slug}`,
      },
    };
  }

  return {
    title: "Man and Van Club",
    description: "Professional man and van services across the UK.",
    alternates: {
      canonical: `https://www.manandvanclub.co.uk/${slug}`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // If it's a plain city slug (without man-and-van- prefix), redirect to the canonical URL
  if (!slug.startsWith("man-and-van-")) {
    if (!serviceSlugs.includes(slug)) {
      redirect(`/man-and-van-${slug}`);
    }
  }

  const locationKey = slug.replace("man-and-van-", "");
  const locData = getLocationPageData(locationKey);

  if (locData) {
    // Override with enhanced Service schema for approved priority cities
    const enhancedSchema = getEnhancedServiceSchema(locationKey);
    const enhancedData = enhancedSchema
      ? { ...locData, localBusinessSchema: enhancedSchema }
      : locData;
    return <CityServiceContent data={enhancedData} faqItems={locData.faq} />;
  }

  const serviceData = servicePageData[slug];
  if (serviceData) {
    const serviceDataWithSlug = {
      ...serviceData,
      slug,
      pageType: "service" as const,
      localBusinessSchema: buildServiceSchema(serviceData, slug),
    };
    return <CityServiceContent data={serviceDataWithSlug} faqItems={serviceData.faq} formIntent={serviceData.formIntent as IntentType} />;
  }

  // Unknown slugs should return a real 404 instead of redirecting home.
  notFound();
}

export async function generateStaticParams() {
  // Prebuild only the location pages currently allowed into the sitemap.
  // Non-priority pages still resolve on demand and render with noindex,
  // keeping broad coverage available without making launch builds heavy.
  const locationParams = getIndexableLocationSlugs().map((slug) => ({ slug: `man-and-van-${slug}` }));
  const serviceParams = serviceSlugs.map((slug) => ({ slug }));
  return [...locationParams, ...serviceParams];
}
