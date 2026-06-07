import CityServiceContent from "@/components/CityServiceContent";
import { Metadata } from "next";

const pageContent: Record<string, any> = {
  "london": {
    name: "London",
    title: "Man and Van London | Expert Local Movers | Man and Van Club",
    description: "Connect with vetted man and van professionals in London. Expert movers for Hackney, Brixton, Camden & all boroughs. ULEZ-ready, 5-star service.",
    badge: "London Relocation Experts",
    intro: "London is a core part of our England moving network. From high-rises in Canary Wharf to Victorian terraces in Hackney, our London movers handle the capital's unique challenges daily.",
    knowledge: "Moving in London requires mastery of Red Routes, Congestion Charges, and ULEZ. Our local experts are fully equipped for every borough, ensuring your move is seamless and compliant.",
    areas: ["Hackney", "Brixton", "Shoreditch", "Clapham", "Islington", "Camden Town", "Greenwich", "Richmond"],
    faq: [
      { q: "How much does a man and van cost in London?", a: "London rates start from £50 for single items, with full house removals typically ranging between £250 and £800 depending on distance and volume." },
      { q: "Are London movers insured?", a: "Yes, every mover in our London network must provide proof of Goods in Transit and Public Liability insurance." }
    ]
  },
  "birmingham": {
    name: "Birmingham",
    title: "Man and Van Birmingham | Reliable Local Movers | Man and Van Club",
    description: "Top-rated man and van in Birmingham & West Midlands. Reliable movers for student relocations, house moves & furniture delivery in Solihull & Edgbaston.",
    badge: "Midlands Moving Specialists",
    intro: "As our primary focus city in England, Birmingham has diverse moving needs. Our network covers everything from large house removals in Solihull to student moves near UoB.",
    knowledge: "Our movers account for local traffic patterns around the Bullring and major transport routes like the M6 and A38, ensuring punctual collections and deliveries in the Birmingham area.",
    areas: ["Sutton Coldfield", "Solihull", "Edgbaston", "Moseley", "Harborne", "Jewellery Quarter", "Digbeth", "Erdington"],
    faq: [
      { q: "What are the typical prices in Birmingham?", a: "Small moves start around £50, while larger 3-bed house moves in areas like Solihull average £400-£700." },
      { q: "Can I get a same-day move in Birmingham?", a: "Yes, we have multiple providers in the West Midlands who offer emergency and same-day availability." }
    ]
  },
  "manchester": {
    name: "Manchester",
    title: "Man and Van Manchester | Trusted Removals | Man and Van Club",
    description: "Professional man and van in Manchester. Secure movers for Didsbury, Ancoats & Salford. Exclusive matching for stress-free house and flat moves.",
    badge: "Greater Manchester Movers",
    intro: "Manchester is a hub of relocation in our England network. From modern apartment blocks in Ancoats to residential streets in Didsbury, our movers offer flexible, professional services.",
    knowledge: "Navigating the Mancunian Way and city centre traffic requires local experience. Our Manchester movers are experts in apartment moves and navigating narrow city streets.",
    areas: ["Didsbury", "Chorlton", "Ancoats", "Northern Quarter", "Salford Quays", "Altrincham", "Stockport", "Prestwich"],
    faq: [
      { q: "How much does a man and van cost in Manchester?", a: "Small flat moves usually cost between £80-£150, while larger suburban house moves range from £300-£600." },
      { q: "Do you cover Salford and Greater Manchester?", a: "Yes, our network covers the entire Greater Manchester area including Salford, Stockport, and Altrincham." }
    ]
  },
  "nottingham": {
    name: "Nottingham",
    title: "Man and Van Nottingham | Local Professional Movers | Man and Van Club",
    description: "Vetted man and van services in Nottingham. Affordable movers for West Bridgford, Beeston & city centre. Reliable house removals and student moves.",
    badge: "East Midlands Experts",
    intro: "From the busy student areas of Lenton to the family homes of West Bridgford, our Nottingham movers provide tailored services for every type of relocation in England.",
    knowledge: "We understand the layout of Nottingham, from navigating the tram-lined streets of the city centre to the suburban reaches of Beeston and Sherwood.",
    areas: ["West Bridgford", "Beeston", "Lenton", "Sherwood", "Wollaton", "Arnold", "Hyson Green", "City Centre"],
    faq: [
      { q: "How much is a man and van in Nottingham?", a: "Expect to pay from £45 for small local items, and between £200-£500 for most residential house moves." },
      { q: "Do you offer student moves for Uni of Nottingham?", a: "Absolutely. We specialise in affordable student relocations across Lenton and the main campuses." }
    ]
  },
  "wolverhampton": {
    name: "Wolverhampton",
    title: "Man and Van Wolverhampton | Expert Local Movers | Man and Van Club",
    description: "Reliable man and van in Wolverhampton. Secure movers for Tettenhall, Penn & city centre. Fully insured removals for homes and businesses.",
    badge: "Black Country Specialists",
    intro: "Our Wolverhampton movers are deeply rooted in the Black Country. Whether you're moving near Molineux or out to the suburbs of Tettenhall, we've got you covered in our England network.",
    knowledge: "We avoid the local congestion hotspots and know the quickest routes through the city and out towards the M54 and M6 corridors.",
    areas: ["Tettenhall", "Penn", "Wombourne", "Wednesfield", "Bilston", "Codsall", "Perton", "Whitmore Reans"],
    faq: [
      { q: "What is the cost of a man and van in Wolverhampton?", a: "Local Wolverhampton moves are very affordable, starting from £45. Larger house removals average £250-£550." },
      { q: "Are movers in Wolverhampton vetted?", a: "Yes, every driver in our Wolverhampton network undergoes ID and insurance verification." }
    ]
  },
  "walsall": {
    name: "Walsall",
    title: "Man and Van Walsall | Local Trusted Movers | Man and Van Club",
    description: "Vetted man and van in Walsall. Professional movers for Aldridge, Bloxwich & city centre. Affordable house removals and furniture delivery.",
    badge: "Walsall Moving Network",
    intro: "Providing reliable moving services across Walsall and the surrounding West Midlands areas. We handle everything from small furniture pickups to full house relocations.",
    knowledge: "Our movers know Walsall's industrial and residential areas intimately, ensuring efficient routes and stress-free parking handling for your move.",
    areas: ["Aldridge", "Bloxwich", "Streetly", "Willenhall", "Pelsall", "Rushall", "Shelfield", "Town Centre"],
    faq: [
      { q: "How quickly can I get a mover in Walsall?", a: "Most requests are matched within 30 minutes, with movers often available for same-day service." },
      { q: "Do you handle office moves in Walsall?", a: "Yes, we have specialist commercial movers available for business relocations in the Walsall area." }
    ]
  },
  "house-removals": {
    name: "House Removals",
    title: "House Removals England | Vetted Local Movers | Man and Van Club",
    description: "Get exclusively matched with a verified house removal specialist near you in England. Fully insured, local knowledge, from £150. Submit in 60 seconds.",
    badge: "House Removal Specialists",
    h1: "House Removals Across England",
    intro: "Moving your home? Our vetted local professionals handle everything from studio flats to large family houses across England, starting in Birmingham.",
    knowledge: "Moving house is one of life's biggest events. Our network of verified professionals covers key postcodes in England. Whether you're moving a 1-bed flat or a 5-bed family home, we match you exclusively with a local expert who knows your area inside out.",
    areas: ["Birmingham", "London", "Manchester", "Leeds", "Bristol", "Sheffield", "Liverpool", "Nottingham", "Wolverhampton", "Walsall"],
    faq: [
      { q: "How much does a house removal cost?", a: "Prices vary based on property size and distance. A 1-bed flat typically costs £150–£300. A 3-bed house move averages £400–£800. Use our form for an instant estimate tailored to your move." },
      { q: "Are house removal movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." }
    ]
  },
  "flat-removals": {
    name: "Flat Removals",
    title: "Flat Removals England | Apartment Movers | Man and Van Club",
    description: "Moving flat in England? Get matched with a specialist experienced in apartments, narrow stairwells and lift bookings. Verified, insured.",
    badge: "Flat Move Specialists",
    h1: "Flat & Apartment Removals England",
    intro: "Moving into or out of a flat? Our movers are experienced with lifts, narrow stairwells, and parking restrictions in England's major cities.",
    knowledge: "Flat removals come with their own challenges — lift bookings, no-parking zones, and tight corridors. Our vetted movers handle it all. From studio apartments to penthouse floors, we match you exclusively with a local professional who's done it hundreds of times.",
    areas: ["Birmingham", "London", "Manchester", "Leeds", "Bristol", "Nottingham", "Sheffield", "Liverpool"],
    faq: [
      { q: "How much does a flat removal cost?", a: "Prices vary based on property size and distance. A studio flat typically costs £100–£200. A 2-bed flat move averages £250–£500." },
      { q: "Are flat removal movers insured?", a: "Yes. Every mover on our platform is required to hold goods-in-transit and public liability insurance before joining the network." }
    ]
  }
};

const defaultPage = (slug: string) => {
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    name,
    title: `${name} | Man and Van Club`,
    description: `Professional ${name} services in England. Get exclusively matched with a vetted local mover for a stress-free experience.`,
    badge: name,
    intro: `Looking for reliable ${name}? Our vetted local professionals are ready to help with your move in England, whether it's a single item or a full house relocation.`,
    knowledge: `Our ${name} services are designed to be simple and stress-free. We connect you with verified local movers in England who understand the specific needs of your relocation.`,
    areas: ["Birmingham", "London", "Manchester", "Leeds", "Bristol"],
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
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'website',
      url: `https://www.manandvanclub.co.uk/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
    }
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const key = params.slug.replace("man-and-van-", "");
  const data = pageContent[key] || defaultPage(key);
  const dataWithSlug = { ...data, slug: params.slug };

  return <CityServiceContent data={dataWithSlug} faqItems={data.faq} />;
}

export async function generateStaticParams() {
  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "walsall", "wolverhampton"].map(c => `man-and-van-${c}`);
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "sofa-collection", "ikea-collection", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];
  return [...cities, ...services].map(slug => ({ slug }));
}
