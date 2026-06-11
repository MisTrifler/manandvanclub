import CityServiceContent from "@/components/CityServiceContent";
import { getLocationPageData, getAllLocationPageSlugs } from "@/lib/location-content";
import { getEnhancedLocalBusinessSchema } from "@/lib/enhanced-schemas";
import { type IntentType } from "@/lib/intent-detection";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
    description: "Professional house removals across England. Get matched with a vetted local mover for your full home move. Fixed or hourly pricing, insurance details requested.",
    badge: "Home Moving Experts",
    intro: "Moving your entire home? Our network of vetted local movers specialises in house removals of every size. From one-bedroom flats to large family homes, we match you with a professional who has the right vehicle and experience.",
    knowledge: "Every house removal is different. Our movers know how to handle tight staircases, large furniture, and fragile items. They bring protective blankets, straps, and trolleys as standard. You get a single point of contact from start to finish — no call centres, no confusion.",
    areas: ["Small Homes", "Family Homes", "Large Properties", "Apartments", "Cottages", "Terraced Houses"],
    faq: [
      { q: "How much does a house removal cost?", a: "Prices vary based on volume and distance. A typical 2-bedroom house move starts around £300. Use our form for an accurate estimate." },
      { q: "Do movers dismantle and reassemble furniture?", a: "Most movers offer this service. Mention it when you fill out the form so we can match you with a mover who provides dismantling." },
      { q: "Are my belongings insured during the move?", a: "Yes. Every mover on our platform carries Goods in Transit and Public Liability insurance." }
    ]
  },
  "flat-removals": {
    name: "Flat Removals",
    formIntent: "house",
    title: "Flat Removals | Apartment & Flat Moving Specialists | Man and Van Club",
    description: "Expert flat and apartment removals across England. Our vetted movers understand lift access, parking restrictions, and tight staircases.",
    badge: "Flat Moving Specialists",
    intro: "Moving from a flat or apartment comes with unique challenges — lifts, staircases, parking permits, and tight corners. Our flat removal specialists know how to handle these constraints efficiently and safely.",
    knowledge: "Our movers are experienced with flat removals in city centres and residential blocks. They understand how to navigate narrow hallways, protect lifts and communal areas, and manage parking for loading bays. Whether it's a studio or a penthouse, they bring the right equipment.",
    areas: ["Studio Flats", "1-Bed Apartments", "2-Bed Flats", "City Centre", "Penthouses", "Ground Floor"],
    faq: [
      { q: "Do I need to book the lift for my flat removal?", a: "It's recommended to book the lift with your building management in advance. Our movers will coordinate with you on timings." },
      { q: "Can movers handle tight staircases?", a: "Yes. Our movers regularly handle flats with no lift access and are skilled at manoeuvring furniture on tight staircases." },
      { q: "How much does a flat removal cost?", a: "A typical 1-bed flat move starts around £200. Prices depend on volume, distance, and access. Use our form for a tailored estimate." }
    ]
  },
  "student-removals": {
    name: "Student Removals",
    formIntent: "student",
    title: "Student Removals | Affordable University Moves | Man and Van Club",
    description: "Affordable student removals across England. Moving to or from university halls or shared houses? Get matched with a vetted local mover.",
    badge: "Student Moving Specialists",
    intro: "Moving to or from university? We help students with affordable, reliable removals every term. Our movers understand the tight deadlines of term dates and the budget constraints of student life.",
    knowledge: "Our student removal service is designed around the academic calendar. Whether you're moving into halls, a shared house, or back home for the summer, our movers offer flexible pricing and smaller vehicle options to keep costs down.",
    areas: ["University Halls", "Shared Houses", "Studio Flats", "Home to Uni", "End of Term", "Start of Term"],
    faq: [
      { q: "Do you offer student discounts?", a: "Our movers offer competitive rates for student moves. Smaller loads and flexible timing help keep costs low." },
      { q: "Can I share a move with housemates?", a: "Yes. Many students combine moves to the same area to split costs. Mention it on the form and we'll match you accordingly." },
      { q: "How much does a student move cost?", a: "Student moves typically start from £80 depending on distance and volume. Use our form for a quick estimate." }
    ]
  },
  "office-removals": {
    name: "Office Removals",
    formIntent: "office",
    title: "Office Removals | Business Relocation Services | Man and Van Club",
    description: "Professional office removals and business relocations across England. Minimise downtime with vetted local movers who understand commercial moves.",
    badge: "Business Relocation Experts",
    intro: "Relocating your office or business? Our commercial movers understand the need to minimise downtime and protect equipment. We match you with professionals who have experience with office furniture, IT equipment, and sensitive documents.",
    knowledge: "Office removals require careful planning. Our movers offer evening and weekend slots to reduce business disruption. They bring the right equipment for desks, filing cabinets, and fragile electronics. Every move is planned around your schedule.",
    areas: ["Small Offices", "Large Offices", "Co-Working Spaces", "Retail", "Warehouses", "Home Offices"],
    faq: [
      { q: "Can you move outside business hours?", a: "Yes. Many of our movers offer evening and weekend office relocations to minimise disruption to your business." },
      { q: "Do you handle IT equipment?", a: "Yes. Our movers are experienced with IT equipment, monitors, and servers. They use appropriate packing and transport methods." },
      { q: "How much notice do you need for an office move?", a: "We recommend at least 1–2 weeks' notice for office moves to ensure proper planning and availability." }
    ]
  },
  "furniture-delivery": {
    name: "Furniture Collection",
    formIntent: "single-item",
    title: "Furniture Collection & Delivery | Single Item Movers | Man and Van Club",
    description: "Single-item furniture collection and delivery across England. From eBay purchases to shop collections, get matched with a reliable local mover.",
    badge: "Furniture Delivery Experts",
    intro: "Need a single item collected and delivered? Whether it's a sofa from a shop, a dining table from an eBay seller, or a wardrobe from a friend, our furniture collection service is fast, affordable, and insurance details requested.",
    knowledge: "Our furniture collection specialists handle everything from small parcels to large wardrobes. They bring blankets, straps, and trolleys to protect your items. You can book same-day or scheduled slots depending on availability.",
    areas: ["Sofas", "Beds", "Wardrobes", "Dining Sets", "Appliances", "eBay Purchases"],
    faq: [
      { q: "Can you collect from a shop or seller?", a: "Yes. Our movers can collect from shops, private sellers, or auction houses. Just provide the collection address and details." },
      { q: "How much does furniture collection cost?", a: "Single-item collections typically start from £45 depending on distance and item size. Use our form for a quick quote." },
      { q: "Will my furniture be protected?", a: "Yes. Our movers use protective blankets and straps as standard. Goods in Transit insurance is also included." }
    ]
  },
  "same-day-man-and-van": {
    name: "Same Day Man & Van",
    formIntent: "general",
    title: "Same Day Man & Van | Emergency Moves | Man and Van Club",
    description: "Need a mover today? Same-day man and van services across England. Get matched with an available local mover for urgent moves.",
    badge: "Same-Day Specialists",
    intro: "Last-minute move? Urgent delivery? Our same-day man and van service connects you with available local movers who can respond quickly. No waiting days for a quote — just fast, reliable service when you need it most.",
    knowledge: "Same-day moves require flexibility and speed. Our movers keep their schedules updated so we can match you with someone who is genuinely available today. They bring the same professionalism and equipment as any pre-booked move.",
    areas: ["Emergency Moves", "Last-Minute Collections", "Urgent Deliveries", "Same-Day Furniture", "Quick Clearances", "Day-Of Requests"],
    faq: [
      { q: "How quickly can a mover arrive?", a: "Depending on availability, a mover can sometimes arrive within 1–2 hours. Submit your request and we'll match you with the nearest available driver." },
      { q: "Does same-day cost more?", a: "Same-day moves may carry a small premium depending on demand and distance. You'll see pricing clearly before confirming." },
      { q: "Can I book same-day for long distances?", a: "Same-day is best for local or regional moves. For long-distance same-day, mention it on the form and we'll confirm availability." }
    ]
  },
  "long-distance-removals": {
    name: "Long Distance Moves",
    formIntent: "general",
    title: "Long Distance Removals | UK-Wide Moving Services | Man and Van Club",
    description: "Long distance removals across the UK. Moving from Birmingham to London, Manchester to Bristol, or anywhere in between? Get matched with a vetted mover.",
    badge: "UK-Wide Movers",
    intro: "Moving across the country? Our long-distance removal service connects you with movers who regularly travel between cities. Whether it's a single load or a full house move, you get a dedicated driver and transparent pricing.",
    knowledge: "Long-distance moves require careful planning. Our movers calculate routes, fuel costs, and driving time accurately. They provide clear fixed-price quotes so there are no surprises. Every long-distance move is insurance details requested.",
    areas: ["City to City", "Cross-Country", "England to Scotland", "England to Wales", "Regional Moves", "Multi-Drop"],
    faq: [
      { q: "How much does a long-distance move cost?", a: "Long-distance pricing depends on mileage, volume, and whether it's a return or one-way journey. Typical city-to-city moves start from £250." },
      { q: "Can the mover stay overnight for very long distances?", a: "For moves over 4–5 hours, some movers may require overnight accommodation. This is agreed upfront and included in the quote." },
      { q: "Is my load the only one on the van?", a: "Yes, for most long-distance bookings you get a dedicated vehicle. Mention if you need exclusive use when filling out the form." }
    ]
  },
  "facebook-marketplace-collection": {
    name: "Facebook Marketplace Collection",
    formIntent: "single-item",
    title: "Facebook Marketplace Collection & Delivery | Man and Van Club",
    description: "Collection and delivery for Facebook Marketplace purchases across England. Get matched with a local mover who can collect and deliver your purchases safely.",
    badge: "Marketplace Collection",
    intro: "Bought something on Facebook Marketplace and need it collected? Our marketplace collection service connects you with a local mover who can pick up your purchase and deliver it to your door. Fast, affordable, and insurance details requested.",
    knowledge: "Facebook Marketplace purchases often need quick collection. Our movers offer flexible slots and can often collect within 24–48 hours. They bring the right vehicle size for sofas, beds, tables, and appliances.",
    areas: ["Sofas", "Beds", "Tables", "Appliances", "Wardrobes", "Miscellaneous Items"],
    faq: [
      { q: "Can the mover collect on my behalf if I can't be there?", a: "Yes, with clear arrangements. Provide the seller's contact details and any collection instructions. Payment must be settled with the seller beforehand." },
      { q: "How much does a marketplace collection cost?", a: "Marketplace collections typically start from £45 depending on distance and item size. Use our form for a quick quote." },
      { q: "Can you collect multiple items from different sellers?", a: "Yes. Multi-drop collections are possible. Mention it on the form and we'll arrange a route that works." }
    ]
  }
};

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
    return {
      title: locData.title,
      description: locData.description,
      alternates: {
        canonical: `https://www.manandvanclub.co.uk/${slug}`,
      },
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
    // Override with enhanced LocalBusiness schema for approved priority cities
    const enhancedSchema = getEnhancedLocalBusinessSchema(locationKey);
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
    };
    return <CityServiceContent data={serviceDataWithSlug} faqItems={serviceData.faq} formIntent={serviceData.formIntent as IntentType} />;
  }

  // Fallback for unknown slugs — redirect home
  redirect("/");
}

export async function generateStaticParams() {
  const locationParams = getAllLocationPageSlugs().map((slug) => ({ slug }));
  const serviceParams = serviceSlugs.map((slug) => ({ slug }));
  return [...locationParams, ...serviceParams];
}
