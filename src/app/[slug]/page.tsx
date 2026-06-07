import CityServiceContent from "@/components/CityServiceContent";
import { Metadata } from "next";

const pageContent: Record<string, any> = {
  "london": {
    name: "London",
    title: "Man and Van London | Vetted Local Movers | Man & Van Club",
    description: "Trusted man and van across all London boroughs. ULEZ-aware, Congestion Charge experienced movers ready for your London move.",
    badge: "Local Experts in London",
    intro: "London is the busiest moving market in the UK. Whether you're moving into a high-rise in Canary Wharf or a Victorian terrace in Hackney, our London movers know the capital's streets inside out.",
    knowledge: "Moving in London requires expert knowledge of Red Routes, Congestion Charges, and ULEZ restrictions. Our London-based man and van companies are fully equipped for every borough.",
    areas: ["Hackney", "Brixton", "Shoreditch", "Clapham", "Islington", "Camden Town", "Greenwich", "Richmond"],
    faq: [
      { q: "How much does a man and van cost in London?", a: "Prices in London vary based on the size of your move. Rates range from £50 for small moves up to £250+ for larger house moves. Use our form for an instant estimate." },
      { q: "Are the movers in London insured?", a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
      { q: "How quickly can I get quotes for my London move?", a: "Most customers are matched with a mover within 15-30 minutes of submitting their request through our platform." },
      { q: "Can I book a same-day move in London?", a: "Yes, many of our local providers offer same-day and emergency moving services depending on their availability." },
      { q: "Do I need to help the driver with loading?", a: "You can request a driver-only service or a full team where they handle all the heavy lifting for you." }
    ]
  },
  "birmingham": {
    name: "Birmingham",
    title: "Man and Van Birmingham | Local Vetted Movers | Man & Van Club",
    description: "Connect with verified man and van professionals in Birmingham. Exclusive 1-to-1 introductions, fully insured, available today.",
    badge: "Local Experts in Birmingham",
    intro: "As the UK's second city, Birmingham has a diverse range of moving needs. From student moves to large house removals in Solihull, our network covers the entire West Midlands area.",
    knowledge: "With major transport routes like the M6 and the A38 passing through, timing is everything in Birmingham. Our movers account for local traffic patterns around the Bullring and beyond.",
    areas: ["Sutton Coldfield", "Solihull", "Edgbaston", "Moseley", "Harborne", "Jewellery Quarter", "Digbeth", "Erdington"],
    faq: [
      { q: "How much does a man and van cost in Birmingham?", a: "Prices in Birmingham vary based on the size of your move. Rates range from £50 for small moves up to £250+ for larger house moves. Use our form for an instant estimate." },
      { q: "Are the movers in Birmingham insured?", a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
      { q: "How quickly can I get quotes for my Birmingham move?", a: "Most customers are matched with a mover within 15-30 minutes of submitting their request through our platform." },
      { q: "Can I book a same-day move in Birmingham?", a: "Yes, many of our local providers offer same-day and emergency moving services depending on their availability." },
      { q: "Do I need to help the driver with loading?", a: "You can request a driver-only service or a full team where they handle all the heavy lifting for you." }
    ]
  },
  "manchester": {
    name: "Manchester",
    title: "Man and Van Manchester | Trusted Local Movers | Man & Van Club",
    description: "Find a vetted local mover in Manchester. House moves, flat removals, single items — exclusive matching, no bidding wars.",
    badge: "Local Experts in Manchester",
    intro: "Manchester is a hub of relocation activity. From the city centre's modern apartment blocks to the residential streets of Didsbury, our Manchester movers offer flexible, affordable services.",
    knowledge: "Navigating the Mancunian Way and city centre traffic requires local experience. Our Manchester movers are familiar with the specific challenges of apartment moves in areas like Ancoats.",
    areas: ["Didsbury", "Chorlton", "Ancoats", "Northern Quarter", "Salford Quays", "Altrincham", "Stockport", "Prestwich"],
    faq: [
      { q: "How much does a man and van cost in Manchester?", a: "Prices in Manchester vary based on the size of your move. Rates range from £50 for small moves up to £250+ for larger house moves. Use our form for an instant estimate." },
      { q: "Are the movers in Manchester insured?", a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
      { q: "How quickly can I get quotes for my Manchester move?", a: "Most customers are matched with a mover within 15-30 minutes of submitting their request through our platform." },
      { q: "Can I book a same-day move in Manchester?", a: "Yes, many of our local providers offer same-day and emergency moving services depending on their availability." },
      { q: "Do I need to help the driver with loading?", a: "You can request a driver-only service or a full team where they handle all the heavy lifting for you." }
    ]
  },
  "leeds": {
    name: "Leeds",
    title: "Man and Van Leeds | Verified Movers | Man & Van Club",
    description: "Get exclusively matched with a verified man and van in Leeds. House moves, flat removals, same day — fully insured professionals.",
    badge: "Local Experts in Leeds",
    intro: "Looking for a reliable man and van in Leeds? Our vetted local professionals are ready to help with your move, whether it's a single item or a full house relocation.",
    knowledge: "Moving in Leeds is made simple with our local experts. They understand the local road networks and parking regulations to provide a seamless moving experience.",
    areas: ["Leeds City Centre", "Headingley", "Chapel Allerton", "Roundhay", "Horsforth"],
    faq: [
      { q: "How much does a man and van cost in Leeds?", a: "Prices in Leeds vary based on the size of your move. Rates range from £50 for small moves up to £250+ for larger house moves. Use our form for an instant estimate." },
      { q: "Are the movers in Leeds insured?", a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
      { q: "How quickly can I get quotes for my Leeds move?", a: "Most customers are matched with a mover within 15-30 minutes of submitting their request through our platform." },
      { q: "Can I book a same-day move in Leeds?", a: "Yes, many of our local providers offer same-day and emergency moving services depending on their availability." },
      { q: "Do I need to help the driver with loading?", a: "You can request a driver-only service or a full team where they handle all the heavy lifting for you." }
    ]
  },
  "bristol": {
    name: "Bristol",
    title: "Man and Van Bristol | Local Vetted Movers | Man & Van Club",
    description: "Find trusted man and van services in Bristol. Exclusive 1-to-1 introductions, verified professionals, available across Bristol.",
    badge: "Local Experts in Bristol",
    intro: "Looking for a reliable man and van in Bristol? Our vetted local professionals are ready to help with your move, whether it's a single item or a full house relocation.",
    knowledge: "Moving in Bristol is made simple with our local experts. They understand the local road networks and parking regulations to provide a seamless moving experience.",
    areas: ["Bristol City Centre", "Clifton", "Bedminster", "Redland", "St George"],
    faq: [
      { q: "How much does a man and van cost in Bristol?", a: "Prices in Bristol vary based on the size of your move. Rates range from £50 for small moves up to £250+ for larger house moves. Use our form for an instant estimate." },
      { q: "Are the movers in Bristol insured?", a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
      { q: "How quickly can I get quotes for my Bristol move?", a: "Most customers are matched with a mover within 15-30 minutes of submitting their request through our platform." },
      { q: "Can I book a same-day move in Bristol?", a: "Yes, many of our local providers offer same-day and emergency moving services depending on their availability." },
      { q: "Do I need to help the driver with loading?", a: "You can request a driver-only service or a full team where they handle all the heavy lifting for you." }
    ]
  },
  "house-removals": {
    name: "House Removals",
    title: "House Removals UK | Vetted Local Movers | Man & Van Club",
    description: "Get exclusively matched with a verified house removal specialist near you. Fully insured, local knowledge, from £150. Submit in 60 seconds.",
    badge: "House Removal Specialists",
    h1: "House Removals Across the UK",
    intro: "Moving your home? Our vetted local professionals handle everything from studio flats to large family houses. Get exclusively matched in under 60 seconds.",
    knowledge: "Moving house is one of life's biggest events. Our network of verified professionals covers every postcode in the UK. Whether you're moving a 1-bed flat or a 5-bed family home, we match you exclusively with a local expert who knows your area inside out — including parking, access, and the best time to move.",
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Sheffield", "Liverpool", "Edinburgh", "Cardiff", "Glasgow"],
    faq: [
      { q: "How much does a house removal cost?", a: "Prices vary based on property size and distance. A 1-bed flat typically costs £150–£300. A 3-bed house move averages £400–£800. Use our form for an instant estimate tailored to your move." },
      { q: "Are house removal movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a house removal?", a: "Most customers receive a mover match within a few hours of submitting their request. Same-day matches are available in most major cities." },
      { q: "Can I book a same-day house removal?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional as quickly as possible." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "flat-removals": {
    name: "Flat Removals",
    title: "Flat Removals UK | Apartment Movers | Man & Van Club",
    description: "Moving flat? Get matched with a specialist experienced in apartments, narrow stairwells and lift bookings. Verified, insured, UK-wide.",
    badge: "Flat Move Specialists",
    h1: "Flat & Apartment Removals UK",
    intro: "Moving into or out of a flat? Our movers are experienced with lifts, narrow stairwells, and parking restrictions. Get exclusively matched in under 60 seconds.",
    knowledge: "Flat removals come with their own challenges — lift bookings, no-parking zones, and tight corridors. Our vetted movers handle it all. From studio apartments to penthouse floors, we match you exclusively with a local professional who's done it hundreds of times.",
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Sheffield", "Liverpool", "Edinburgh", "Cardiff", "Glasgow"],
    faq: [
      { q: "How much does a flat removal cost?", a: "Prices vary based on property size and distance. A studio flat typically costs £100–£200. A 2-bed flat move averages £250–£500. Use our form for an instant estimate tailored to your move." },
      { q: "Are flat removal movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a flat removal?", a: "Most customers receive a mover match within a few hours of submitting their request. Same-day matches are available in most major cities." },
      { q: "Can I book a same-day flat removal?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional as quickly as possible." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "student-removals": {
    name: "Student Removals",
    title: "Student Removals UK | Affordable Uni Moves | Man & Van Club",
    description: "Trusted by students UK-wide. Get exclusively matched with an affordable vetted mover for your university move. Submit in 60 secs.",
    badge: "Student Move Specialists",
    h1: "Student Removals UK",
    intro: "Moving to or from university? Our man and van service is trusted by students across the UK. Affordable, reliable, and exclusively matched.",
    knowledge: "Moving into halls or a student house shouldn't cost a fortune. Our verified movers specialise in student relocations — from single room loads to shared house moves — across every major university city in the UK. Get exclusively matched with a vetted local professional in under 60 seconds.",
    areas: ["London", "Manchester", "Leeds", "Birmingham", "Bristol", "Sheffield", "Edinburgh", "Nottingham", "Liverpool", "Cardiff"],
    faq: [
      { q: "How much do student removals cost?", a: "Prices for student removals are typically lower as the load is smaller. Prices usually range from £50–£150 depending on distance." },
      { q: "Are student removal movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a student removal?", a: "Most customers receive a mover match within a few hours of submitting their request. Same-day matches are available in most major cities." },
      { q: "Can I book a same-day student removal?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional as quickly as possible." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "office-removals": {
    name: "Office Removals",
    title: "Office Removals UK | Commercial Moves | Man & Van Club",
    description: "Relocating your business? Find a vetted commercial mover for your office move. Insured, experienced, minimal disruption. UK-wide.",
    badge: "Office Relocation Specialists",
    h1: "Office & Commercial Removals UK",
    intro: "Relocating your business? Our commercial movers handle desks, equipment, and entire offices — with minimal disruption to your working day.",
    knowledge: "Business moves require planning, care, and reliability. Our vetted commercial movers are experienced with IT equipment, filing systems, and large furniture. We match you exclusively with a local professional who can work around your schedule — including evenings and weekends.",
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Edinburgh", "Cardiff", "Glasgow", "Liverpool", "Sheffield"],
    faq: [
      { q: "How much do office removals cost?", a: "Office removal costs vary widely based on the size of the office and the equipment involved. Contact us for a tailored estimate." },
      { q: "Are office removal movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for an office removal?", a: "Most customers receive a mover match within a few hours of submitting their request. Same-day matches are available in most major cities." },
      { q: "Can I book a same-day office removal?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional as quickly as possible." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "long-distance-removals": {
    name: "Long Distance Removals",
    title: "Long Distance Man & Van UK | Man & Van Club",
    description: "Moving across the UK? Get matched with a verified long distance mover for any route. Fully insured, door to door. Submit in 60 seconds.",
    badge: "Long Distance Specialists",
    h1: "Long Distance Man & Van UK",
    intro: "Moving across the UK? Our long distance specialists cover any route, any distance — from city to city or coast to coast. Exclusively matched, fully insured.",
    knowledge: "Whether you're moving from London to Edinburgh or Manchester to Bristol, our network of verified long distance movers has you covered. We exclusively match you with a trusted local professional who specialises in cross-country moves, so your belongings travel safely from door to door.",
    areas: ["London to Manchester", "London to Birmingham", "London to Bristol", "Manchester to Leeds", "Birmingham to Bristol", "Any UK route"],
    faq: [
      { q: "How much do long distance removals cost?", a: "Long distance moves are priced primarily on mileage and the volume of items. Use our form for a precise estimate for your specific route." },
      { q: "Are long distance movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a long distance move?", a: "Most customers receive a mover match within a few hours of submitting their request. Same-day matches are available in most major cities." },
      { q: "Can I book a same-day long distance move?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional as quickly as possible." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "same-day-man-and-van": {
    name: "Same Day Man & Van",
    title: "Same Day Man & Van | Book Today | Man & Van Club",
    description: "Need a mover today? Get exclusively matched with an available local professional for same-day moves and deliveries anywhere in the UK.",
    badge: "Same Day Available",
    h1: "Same Day Man & Van UK",
    intro: "Need a mover today? We match you with the nearest available vetted professional for same-day collection and delivery anywhere in the UK.",
    knowledge: "Urgency met with reliability. Our same-day man and van service connects you instantly with a verified local mover who's available right now. Perfect for last-minute house moves, urgent deliveries, and time-sensitive collections. Most same-day requests are matched within the hour.",
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Sheffield", "Liverpool", "Edinburgh", "Cardiff", "Glasgow"],
    faq: [
      { q: "How much does a same day man and van cost?", a: "Same-day services may carry a small premium depending on availability, but we always match you with the best local rate." },
      { q: "Are same day movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a same day move?", a: "Most same-day requests are matched within the hour of submission." },
      { q: "Can I book a same-day move?", a: "Yes, that is exactly what this service is for. Submit your request and we'll find an available mover for you right now." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "furniture-delivery": {
    name: "Furniture Delivery",
    title: "Furniture Collection & Delivery UK | Man & Van Club",
    description: "Need a single item moved? Our vetted movers collect and deliver furniture anywhere in the UK. No full-load minimum. Book in 60 secs.",
    badge: "Furniture Collection & Delivery",
    h1: "Furniture Collection & Delivery UK",
    intro: "Bought something big online or from a shop? Our vetted movers collect and deliver single items anywhere in the UK. No full-load minimum.",
    knowledge: "From sofas and wardrobes to dining tables and white goods — if you need a single item moved, our network is ready. No need to hire a full removal service. Get exclusively matched with a local mover who can collect from any retailer, showroom, or private seller and deliver straight to your door.",
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Sheffield", "Liverpool", "Edinburgh", "Cardiff", "Glasgow"],
    faq: [
      { q: "How much does furniture delivery cost?", a: "Single item furniture delivery usually starts from £50 depending on the size of the item and the distance." },
      { q: "Are furniture delivery movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a furniture delivery?", a: "Most customers receive a mover match within a few hours of submitting their request." },
      { q: "Can I book a same-day furniture delivery?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  },
  "facebook-marketplace-collection": {
    name: "Marketplace Collection",
    title: "Facebook Marketplace Collection Service | Man & Van Club",
    description: "Can't collect your Marketplace find yourself? We send a vetted local mover to collect and deliver it to your door. UK-wide, fast matching.",
    badge: "Marketplace Collection Service",
    h1: "Facebook Marketplace Collection & Delivery UK",
    intro: "Found a bargain on Facebook Marketplace but can't collect it yourself? We send a vetted mover to collect and deliver it straight to your door.",
    knowledge: "Don't let distance or a lack of a van stop you from grabbing a great deal. Our movers collect items from Facebook Marketplace, eBay, Gumtree, and any private seller — anywhere in the UK — and deliver them to your address. Get exclusively matched with a vetted local professional in under 60 seconds.",
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Sheffield", "Liverpool", "Edinburgh", "Cardiff", "Glasgow"],
    faq: [
      { q: "How much does a marketplace collection cost?", a: "Marketplace collections usually start from £50 depending on the size of the item and the distance." },
      { q: "Are marketplace collection movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." },
      { q: "How quickly can I get matched for a marketplace collection?", a: "Most customers receive a mover match within a few hours of submitting their request." },
      { q: "Can I book a same-day marketplace collection?", a: "Yes, subject to availability. Submit your request and we'll match you with the nearest available professional." },
      { q: "Do I need to help the driver with loading?", a: "This depends on the mover and the service you book. Most of our movers offer a full load and unload service. Check with your matched mover when they contact you to confirm exactly what's included." }
    ]
  }
};

const defaultPage = (slug: string) => {
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    name,
    title: `${name} | Man & Van Club`,
    description: `Professional ${name} services. Get exclusively matched with a vetted local mover.`,
    badge: name,
    intro: `Looking for reliable ${name}? Our vetted local professionals are ready to help with your move, whether it's a single item or a full house relocation.`,
    knowledge: `Our ${name} services are designed to be simple and stress-free. We connect you with verified local movers who understand the specific needs of your relocation.`,
    areas: ["London", "Birmingham", "Manchester", "Leeds", "Bristol"],
    faq: [
      { q: `How much does ${name} cost?`, a: "Prices vary based on the requirements. Use our form for an instant estimate tailored to your move." },
      { q: "Are the movers insured?", a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance." }
    ]
  };
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const key = params.slug.replace("man-and-van-", "");
  const data = pageContent[key] || defaultPage(key);

  return {
    title: data.title,
    description: data.description,
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const key = params.slug.replace("man-and-van-", "");
  const data = pageContent[key] || defaultPage(key);
  const dataWithSlug = { ...data, slug: params.slug };

  return <CityServiceContent data={dataWithSlug} faqItems={data.faq} />;
}

export async function generateStaticParams() {
  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "glasgow", "cardiff", "walsall"].map(c => `man-and-van-${c}`);
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "sofa-collection", "ikea-collection", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];
  return [...cities, ...services].map(slug => ({ slug }));
}
