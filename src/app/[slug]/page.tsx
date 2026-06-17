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

const servicePageData: Record<string, any> = {
  "house-removals": {
    name: "House Removals",
    formIntent: "house",
    title: "House Removals | Professional Home Moving Services | Man and Van Club",
    description: "House removal quote requests across England. Submit your move details securely so an approved mover can review your full home move before sending quote options.",
    badge: "Home Move Requests",
    intro: "Moving your entire home? Submit one secure request with the key details, from bedrooms and items to stairs, parking and access, so an approved mover can review the move properly before quoting.",
    knowledge: "Every house removal is different. Your request helps the mover account for tight staircases, large furniture, fragile items, parking, loading access and timing before you decide whether to book.",
    areas: ["Small Homes", "Family Homes", "Large Properties", "Apartments", "Cottages", "Terraced Houses"],
    faq: [
      { q: "How much does a house removal cost?", a: "Prices vary based on volume, distance, access, helpers, stairs and date. Use the form to see a guide price first, then an approved mover can review the details before quoting." },
      { q: "Do movers dismantle and reassemble furniture?", a: "Some movers offer this service. Add dismantling and reassembly notes to the form so an approved mover can review whether they can include it in the quote." },
      { q: "Are my belongings insured during the move?", a: "Movers must provide Goods in Transit and Public Liability insurance before they are approved. We still recommend confirming cover details directly with your mover before moving day." }
    ]
  },
  "flat-removals": {
    name: "Flat Removals",
    formIntent: "house",
    title: "Flat Removals | Apartment & Flat Move Requests | Man and Van Club",
    description: "Flat and apartment move requests across England. Add lift access, parking restrictions and staircase details so an approved mover can quote accurately.",
    badge: "Flat Move Requests",
    intro: "Moving from a flat or apartment comes with unique challenges — lifts, staircases, parking permits, tight corners and shared entrances. Add those details so the mover can review the job before quoting.",
    knowledge: "Flat moves can involve narrow hallways, lift rules, communal areas and loading-bay restrictions. Your request gives the mover enough information to account for those details before you book.",
    areas: ["Studio Flats", "1-Bed Apartments", "2-Bed Flats", "City Centre", "Penthouses", "Ground Floor"],
    faq: [
      { q: "Do I need to book the lift for my flat removal?", a: "It is recommended to book the lift with your building management in advance. Add any lift or building access rules to your request so the mover can quote with the right timing." },
      { q: "Can movers handle tight staircases?", a: "Yes. Add no-lift access and staircase details to your request so the mover can account for the extra time and handling before quoting." },
      { q: "How much does a flat removal cost?", a: "Flat move prices depend on volume, distance, stairs, lift access, parking and timing. Use the form to see a guide price before an approved mover reviews the details." }
    ]
  },
  "student-removals": {
    name: "Student Removals",
    formIntent: "student",
    title: "Student Removals | Affordable University Moves | Man and Van Club",
    description: "Student move quote requests across England. Moving to or from university halls or a shared house? Submit your details so an approved mover can review the job before quoting.",
    badge: "Student Move Requests",
    intro: "Moving to or from university? Student moves often involve fixed term dates, shared houses, halls, small loads and budget limits. Submit the details so a mover can review them before quoting.",
    knowledge: "Student move requests can cover halls, shared houses, studios or moves back home for summer. The quote depends on the item list, route, helpers, access and timing.",
    areas: ["University Halls", "Shared Houses", "Studio Flats", "Home to Uni", "End of Term", "Start of Term"],
    faq: [
      { q: "Do you offer student discounts?", a: "Student move costs depend on load size, route, helpers and timing. Smaller loads and flexible dates can help keep the guide price lower." },
      { q: "Can I share a move with housemates?", a: "Combined student moves can sometimes reduce the guide price when housemates are moving on the same route. Add the details to the form so a mover can review the request properly." },
      { q: "How much does a student move cost?", a: "Student move prices depend on the route, item list, helpers, access and term-time demand. Smaller loads and flexible dates can help keep the guide price lower." }
    ]
  },
  "office-removals": {
    name: "Office Removals",
    formIntent: "office",
    title: "Office Removals | Business Relocation Services | Man and Van Club",
    description: "Office removal and business relocation quote requests across England. Add access, timing and equipment details so an approved mover can review the job before quoting.",
    badge: "Business Move Requests",
    intro: "Relocating your office or business? Add the key details such as desks, equipment, access, loading times and preferred moving window so a mover can quote with less disruption.",
    knowledge: "Office removals require careful planning. Your request can include evening or weekend preferences, IT equipment, filing cabinets, access restrictions and timing so the mover can review the work involved.",
    areas: ["Small Offices", "Large Offices", "Co-Working Spaces", "Retail", "Warehouses", "Home Offices"],
    faq: [
      { q: "Can you move outside business hours?", a: "Evening and weekend office relocations may be available depending on mover availability. Add your preferred timing when submitting the request." },
      { q: "Do you handle IT equipment?", a: "Add IT equipment, monitors, servers or fragile electronics to your request so the mover can confirm what they can handle before quoting." },
      { q: "How much notice do you need for an office move?", a: "We recommend at least 1–2 weeks' notice for office moves to ensure proper planning and availability." }
    ]
  },
  "furniture-delivery": {
    name: "Furniture Collection",
    formIntent: "single-item",
    title: "Furniture Collection & Delivery | Single Item Movers | Man and Van Club",
    description: "Single-item furniture collection and delivery quote requests across England. From eBay purchases to shop collections, submit the details so an approved mover can review the job before quoting.",
    badge: "Furniture Collection Requests",
    h1: "Furniture Collection & Delivery",
    intro: "Need a single item collected and delivered? Whether it is a sofa from a shop, a dining table from an online seller or a wardrobe from a friend, submit the details so an approved mover can review the route, access and item size before quoting.",
    knowledge: "Furniture collection requests can cover small items, wardrobes, sofas and appliances. Add item size, access and timing so a mover can review the job properly before quoting.",
    areas: ["Sofas", "Beds", "Wardrobes", "Dining Sets", "Appliances", "eBay Purchases"],
    faq: [
      { q: "Can you collect from a shop or seller?", a: "Yes. Collections from shops, private sellers or auction houses can be submitted. Provide the collection postcode and item details so the mover can quote accurately." },
      { q: "How much does furniture collection cost?", a: "Single-item collection prices depend on distance, item size, access, timing and whether extra help is needed. Use the form to see a guide price first." },
      { q: "Will my furniture be protected?", a: "Movers typically use protective blankets and straps as standard. Movers must provide Goods in Transit and Public Liability insurance before they are approved, and we recommend confirming cover details directly with your mover." }
    ]
  },
  "same-day-man-and-van": {
    name: "Same Day Man and Van",
    formIntent: "general",
    title: "Same Day Man and Van | Fast Local Move Quotes | Man and Van Club",
    description: "Need a same-day man and van? Submit your move details for free, see a guide price and receive a quote from one verified mover before booking.",
    badge: "Same-Day Move Requests",
    h1: "Same Day Man and Van",
    intro: "Need a same-day man and van for an urgent local move, furniture collection or last-minute delivery? Submit accurate postcodes, item details and access notes so an available verified mover can review the request quickly before quoting.",
    knowledge: "Same-day moves require accurate details. Postcodes, item list, helpers, stairs, parking and access help a mover decide quickly whether they can help and what to quote.",
    areas: ["Emergency Moves", "Last-Minute Collections", "Urgent Deliveries", "Same-Day Furniture", "Quick Clearances", "Day-Of Requests"],
    faq: [
      { q: "How quickly can a mover arrive?", a: "Depending on availability, same-day help can sometimes be arranged. Submit accurate postcodes, items and access notes so an available approved mover can review the request quickly." },
      { q: "Does same-day cost more?", a: "Same-day moves can cost more when availability is limited or the route is longer. You can see a guide price first, then the mover quote is shown before you decide whether to book." },
      { q: "Can I book same-day for long distances?", a: "Same-day is usually best for local or regional moves. For long-distance same-day requests, include accurate postcodes, timing and access notes so a mover can decide whether they can help." }
    ]
  },
  "long-distance-removals": {
    name: "Long Distance Moves",
    formIntent: "general",
    title: "Long Distance Removals | UK-Wide Moving Services | Man and Van Club",
    description: "Long-distance move quote requests across the UK. Moving from Birmingham to London, Manchester to Bristol or anywhere in between? Submit your details so an approved mover can review the route before quoting.",
    badge: "UK-Wide Movers",
    intro: "Moving across the country? Long-distance quotes depend on route time, mileage, load size, access and timing. Submit the details so a mover can review the job before you book.",
    knowledge: "Long-distance moves require careful planning. Your postcodes, date, access notes and item list help the mover account for route time, mileage, fuel, loading and unloading before sending quote options.",
    areas: ["City to City", "Cross-Country", "England to Scotland", "England to Wales", "Regional Moves", "Multi-Drop"],
    faq: [
      { q: "How much does a long-distance move cost?", a: "Long-distance pricing depends on mileage, route time, volume, access and whether the move is one-way or part of a return route. Use the form to get a guide price first." },
      { q: "Can the mover stay overnight for very long distances?", a: "For moves over 4–5 hours, some movers may require overnight accommodation. This is agreed upfront and included in the quote." },
      { q: "Is my load the only one on the van?", a: "Yes, for most long-distance bookings you get a dedicated vehicle. Mention if you need exclusive use when filling out the form." }
    ]
  },
  "facebook-marketplace-collection": {
    name: "Facebook Marketplace Collection",
    formIntent: "single-item",
    title: "Facebook Marketplace Collection & Delivery | Man and Van Club",
    description: "Collection and delivery quote requests for Facebook Marketplace purchases across England. Submit item and postcode details so an approved mover can review the job before quoting.",
    badge: "Marketplace Collection",
    h1: "Facebook Marketplace Collection",
    intro: "Bought something on Facebook Marketplace and need it collected? Submit the seller, collection and delivery details so an approved mover can review whether they can collect and deliver the item before quoting.",
    knowledge: "Facebook Marketplace purchases often need quick collection. Add seller access, item size, collection window and delivery postcode so the mover can review whether the job is possible before quoting.",
    areas: ["Sofas", "Beds", "Tables", "Appliances", "Wardrobes", "Miscellaneous Items"],
    faq: [
      { q: "Can the mover collect on my behalf if I can't be there?", a: "Yes, with clear arrangements. Provide the seller's contact details and any collection instructions. Payment must be settled with the seller beforehand." },
      { q: "How much does a marketplace collection cost?", a: "Marketplace collection prices depend on distance, item size, access, timing and whether extra help is needed. Use the form to see a guide price first." },
      { q: "Can you collect multiple items from different sellers?", a: "Yes. Multi-drop collections are possible. Mention it on the form and we'll arrange a route that works." }
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
