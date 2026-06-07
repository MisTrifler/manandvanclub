import CityServiceContent from "@/components/CityServiceContent";
import { Metadata } from "next";

const pageContent: Record<string, any> = {
  "birmingham": {
    name: "Birmingham",
    title: "Man and Van Birmingham | Local Movers Who Know the City | Man and Van Club",
    description: "Trusted man and van services in Birmingham. Local movers who understand the Jewellery Quarter, Edgbaston, Moseley, and Solihull. Get matched with a vetted professional today.",
    badge: "Birmingham's Local Experts",
    intro: "Birmingham isn’t just one city — it’s a collection of neighbourhoods. Whether you’re moving from a flat in the Jewellery Quarter, a family home in Harborne, or a student house near the University, our Birmingham movers know the roads, the parking rules, and the best times to move in each area.",
    knowledge: "Our local movers understand the unique challenges of Birmingham. From navigating the busy city centre to finding parking in Edgbaston or Moseley, they’ve done hundreds of moves across the West Midlands. They know which buildings have lift restrictions, where permit parking applies, and how to work around the traffic on the A38 and M6.",
    areas: ["Jewellery Quarter", "Edgbaston", "Moseley", "Harborne", "Selly Oak", "Bournville", "Solihull", "Sutton Coldfield"],
    faq: [
      { q: "How much does a man and van cost in Birmingham?", a: "Prices typically start from £50 for small moves. A standard 2–3 bedroom house move in Birmingham usually falls between £300–£650 depending on the locations and volume." },
      { q: "Do you cover Solihull and Sutton Coldfield?", a: "Yes. Our Birmingham network covers Solihull, Sutton Coldfield, and most of the West Midlands." },
      { q: "Can I get a same-day move in Birmingham?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "london": {
    name: "London",
    title: "Man and Van London | Local Movers Who Know the Capital | Man and Van Club",
    description: "Professional man and van services across London. Experienced movers who understand Congestion Charge, ULEZ, and parking restrictions. Get matched today.",
    badge: "London's Trusted Movers",
    intro: "Moving in London comes with its own rules — Congestion Charge, ULEZ, Red Routes, and difficult parking. Our London movers know how to work within these restrictions and get the job done efficiently across every borough.",
    knowledge: "From moving into a flat in Shoreditch to relocating a family home in Clapham or Richmond, our vetted London movers understand the realities of moving in the capital. They know which buildings require lift bookings, where parking is realistically possible, and how to plan around the busiest times of day.",
    areas: ["Shoreditch", "Clapham", "Islington", "Hackney", "Camden", "Greenwich", "Wandsworth", "Richmond"],
    faq: [
      { q: "Do your London movers handle ULEZ and Congestion Charge?", a: "Yes. All our London-based movers use compliant vehicles and are experienced with navigating the Congestion Charge and ULEZ zones." },
      { q: "How much does a man and van cost in London?", a: "London prices start from around £60 for smaller moves. A typical 2-bedroom flat move usually ranges between £350–£750 depending on the locations and access." },
      { q: "Can you move at weekends in London?", a: "Yes, weekend moves are available across most London boroughs, though availability can be limited — we recommend booking early." }
    ]
  },
  "manchester": {
    name: "Manchester",
    title: "Man and Van Manchester | Local Movers Who Know the City | Man and Van Club",
    description: "Professional man and van services in Manchester. Local movers who understand the Northern Quarter, Didsbury, Chorlton, and Salford. Get matched today.",
    badge: "Manchester's Local Experts",
    intro: "Manchester moves have their own rhythm. From the trendy streets of the Northern Quarter and Ancoats to the residential roads of Didsbury and Chorlton, our Manchester movers know the city’s quirks, parking challenges, and best routes.",
    knowledge: "Our local movers understand Manchester’s unique layout. They know how to navigate the Mancunian Way, find parking in the city centre, and work around events at the Etihad or Old Trafford. Whether you're moving a flat in Salford Quays or a house in Prestwich, they’ve done it many times before.",
    areas: ["Northern Quarter", "Didsbury", "Chorlton", "Ancoats", "Salford Quays", "Prestwich", "Stockport", "Altrincham"],
    faq: [
      { q: "How much does a man and van cost in Manchester?", a: "Manchester prices start from around £55 for smaller moves. A typical 2-bedroom flat move usually ranges between £300–£650 depending on the locations." },
      { q: "Do you cover Salford and Greater Manchester?", a: "Yes. Our network covers Salford, Stockport, Altrincham, and most of Greater Manchester." },
      { q: "Can I get help with student moves in Manchester?", a: "Absolutely. We regularly help students moving in and out of halls and shared houses across the city." }
    ]
  },
  "leeds": {
    name: "Leeds",
    title: "Man and Van Leeds | Local Movers Who Know the City | Man and Van Club",
    description: "Reliable man and van services in Leeds. Local movers who understand Headingley, Roundhay, Chapel Allerton, and the city centre. Get matched today.",
    badge: "Leeds' Local Experts",
    intro: "Leeds has its own character — from the busy student streets of Headingley to the leafy roads of Roundhay and Chapel Allerton. Our Leeds movers know the city well and understand the local parking and access challenges.",
    knowledge: "Our local movers are familiar with Leeds’ road network, including the inner ring road and the steep hills in some areas. They know which buildings have restrictions, where parking is easiest, and how to plan moves around match days at Elland Road or Headingley.",
    areas: ["Headingley", "Roundhay", "Chapel Allerton", "Horsforth", "Alwoodley", "Morley", "Pudsey", "City Centre"],
    faq: [
      { q: "How much does a man and van cost in Leeds?", a: "Leeds prices start from around £50 for smaller moves. A typical 2–3 bedroom house move usually falls between £280–£600 depending on the locations." },
      { q: "Do you help with student moves in Headingley?", a: "Yes. We regularly assist students moving in and out of properties around the University of Leeds and Leeds Beckett." },
      { q: "Can I get a same-day move in Leeds?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "bristol": {
    name: "Bristol",
    title: "Man and Van Bristol | Local Movers Who Know the City | Man and Van Club",
    description: "Professional man and van services in Bristol. Local movers who understand Clifton, Bedminster, Redland, and the city centre. Get matched today.",
    badge: "Bristol's Local Experts",
    intro: "Bristol moves often involve hills, narrow streets, and tricky parking — especially in Clifton and Bedminster. Our Bristol movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Bristol’s unique layout. They know how to handle moves in Clifton’s steep streets, navigate the Clean Air Zone, and find practical solutions for parking and access in the city centre and surrounding areas.",
    areas: ["Clifton", "Bedminster", "Redland", "St George", "Bishopston", "Fishponds", "Horfield", "City Centre"],
    faq: [
      { q: "How much does a man and van cost in Bristol?", a: "Bristol prices start from around £55 for smaller moves. A typical 2-bedroom flat move usually ranges between £300–£650 depending on the locations and access." },
      { q: "Do you handle moves in the Clean Air Zone?", a: "Yes. All our Bristol-based movers use compliant vehicles and are experienced working within the Clean Air Zone." },
      { q: "Can you help with student moves in Bristol?", a: "Yes. We regularly help students moving in and out of properties near the University of Bristol and UWE." }
    ]
  },
  "liverpool": {
    name: "Liverpool",
    title: "Man and Van Liverpool | Local Movers Who Know the City | Man and Van Club",
    description: "Reliable man and van services in Liverpool. Local movers who understand the city centre, Toxteth, Aigburth, and the docks. Get matched today.",
    badge: "Liverpool's Local Experts",
    intro: "Liverpool moves often involve narrow streets, one-way systems, and parking challenges — especially around the city centre and the docks. Our Liverpool movers know the city well and understand how to plan around these realities.",
    knowledge: "Our local movers are experienced with Liverpool’s unique layout. They know how to navigate the city centre, work around events at Anfield or Goodison, and handle moves in areas like Toxteth, Aigburth, and the waterfront with confidence.",
    areas: ["City Centre", "Toxteth", "Aigburth", "Wavertree", "Everton", "Bootle", "Crosby", "Waterfront"],
    faq: [
      { q: "How much does a man and van cost in Liverpool?", a: "Liverpool prices start from around £50 for smaller moves. A typical 2–3 bedroom house move usually falls between £280–£600 depending on the locations." },
      { q: "Do you help with student moves in Liverpool?", a: "Yes. We regularly assist students moving in and out of properties near the University of Liverpool and Liverpool John Moores." },
      { q: "Can I get a same-day move in Liverpool?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "nottingham": {
    name: "Nottingham",
    title: "Man and Van Nottingham | Local Movers Who Know the City | Man and Van Club",
    description: "Professional man and van services in Nottingham. Local movers who understand the city centre, Lenton, West Bridgford, and Beeston. Get matched today.",
    badge: "Nottingham's Local Experts",
    intro: "Nottingham moves often involve student areas, narrow streets, and tricky parking — especially in Lenton and the city centre. Our Nottingham movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Nottingham’s layout. They know how to navigate the city centre, work around the tram system, and handle moves in student-heavy areas like Lenton and the surrounding neighbourhoods with ease.",
    areas: ["City Centre", "Lenton", "West Bridgford", "Beeston", "Sherwood", "Wollaton", "Arnold", "Hyson Green"],
    faq: [
      { q: "How much does a man and van cost in Nottingham?", a: "Nottingham prices start from around £50 for smaller moves. A typical 2–3 bedroom house move usually falls between £280–£600 depending on the locations." },
      { q: "Do you help with student moves in Nottingham?", a: "Yes. We regularly assist students moving in and out of properties near the University of Nottingham and Nottingham Trent University." },
      { q: "Can I get a same-day move in Nottingham?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "sheffield": {
    name: "Sheffield",
    title: "Man and Van Sheffield | Local Movers Who Know the City | Man and Van Club",
    description: "Reliable man and van services in Sheffield. Local movers who understand the city centre, Ecclesall, Broomhill, and Hillsborough. Get matched today.",
    badge: "Sheffield's Local Experts",
    intro: "Sheffield moves often involve hills, narrow streets, and tricky parking — especially in areas like Ecclesall and Broomhill. Our Sheffield movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Sheffield’s hilly terrain and unique layout. They know how to handle moves in the city centre, Ecclesall, Broomhill, and Hillsborough with confidence and efficiency.",
    areas: ["City Centre", "Ecclesall", "Broomhill", "Hillsborough", "Nether Edge", "Walkley", "Crookes", "Fulwood"],
    faq: [
      { q: "How much does a man and van cost in Sheffield?", a: "Sheffield prices start from around £50 for smaller moves. A typical 2–3 bedroom house move usually falls between £280–£600 depending on the locations." },
      { q: "Do you help with student moves in Sheffield?", a: "Yes. We regularly assist students moving in and out of properties near the University of Sheffield and Sheffield Hallam University." },
      { q: "Can I get a same-day move in Sheffield?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "glasgow": {
    name: "Glasgow",
    title: "Man and Van Glasgow | Local Movers Who Know the City | Man and Van Club",
    description: "Professional man and van services in Glasgow. Local movers who understand the city centre, West End, Southside, and East End. Get matched today.",
    badge: "Glasgow's Local Experts",
    intro: "Glasgow moves often involve tenement buildings, narrow streets, and tricky parking — especially in the West End and Southside. Our Glasgow movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Glasgow’s unique layout. They know how to handle moves in tenement buildings, navigate the city centre, and work around events at Hampden Park or Celtic Park with confidence.",
    areas: ["City Centre", "West End", "Southside", "East End", "Partick", "Shawlands", "Pollokshields", "Dennistoun"],
    faq: [
      { q: "How much does a man and van cost in Glasgow?", a: "Glasgow prices start from around £55 for smaller moves. A typical 2–3 bedroom flat move usually ranges between £300–£650 depending on the locations and access." },
      { q: "Do you help with student moves in Glasgow?", a: "Yes. We regularly assist students moving in and out of properties near the University of Glasgow and Glasgow Caledonian University." },
      { q: "Can I get a same-day move in Glasgow?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "cardiff": {
    name: "Cardiff",
    title: "Man and Van Cardiff | Local Movers Who Know the City | Man and Van Club",
    description: "Reliable man and van services in Cardiff. Local movers who understand the city centre, Cathays, Roath, and Cardiff Bay. Get matched today.",
    badge: "Cardiff's Local Experts",
    intro: "Cardiff moves often involve narrow streets, student areas, and tricky parking — especially in Cathays and Roath. Our Cardiff movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Cardiff’s layout. They know how to navigate the city centre, work around events at the Principality Stadium, and handle moves in student-heavy areas like Cathays and Roath with ease.",
    areas: ["City Centre", "Cathays", "Roath", "Cardiff Bay", "Canton", "Llandaff", "Penarth", "Splott"],
    faq: [
      { q: "How much does a man and van cost in Cardiff?", a: "Cardiff prices start from around £50 for smaller moves. A typical 2–3 bedroom flat move usually ranges between £280–£600 depending on the locations." },
      { q: "Do you help with student moves in Cardiff?", a: "Yes. We regularly assist students moving in and out of properties near Cardiff University and Cardiff Metropolitan University." },
      { q: "Can I get a same-day move in Cardiff?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "edinburgh": {
    name: "Edinburgh",
    title: "Man and Van Edinburgh | Local Movers Who Know the City | Man and Van Club",
    description: "Professional man and van services in Edinburgh. Local movers who understand the New Town, Old Town, Leith, and Morningside. Get matched today.",
    badge: "Edinburgh's Local Experts",
    intro: "Edinburgh moves often involve narrow streets, steep hills, and tricky parking — especially in the New Town and Old Town. Our Edinburgh movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Edinburgh’s unique layout. They know how to handle moves in tenement buildings, navigate the steep hills, and work around events during the Edinburgh Festival with confidence and efficiency.",
    areas: ["New Town", "Old Town", "Leith", "Morningside", "Stockbridge", "Portobello", "Corstorphine", "Marchmont"],
    faq: [
      { q: "How much does a man and van cost in Edinburgh?", a: "Edinburgh prices start from around £60 for smaller moves. A typical 2–3 bedroom flat move usually ranges between £350–£700 depending on the locations and access." },
      { q: "Do you help with student moves in Edinburgh?", a: "Yes. We regularly assist students moving in and out of properties near the University of Edinburgh and Edinburgh Napier University." },
      { q: "Can I get a same-day move in Edinburgh?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "wolverhampton": {
    name: "Wolverhampton",
    title: "Man and Van Wolverhampton | Local Movers Who Know the City | Man and Van Club",
    description: "Reliable man and van services in Wolverhampton. Local movers who understand the city centre, Tettenhall, Penn, and Bilston. Get matched today.",
    badge: "Wolverhampton's Local Experts",
    intro: "Wolverhampton moves often involve narrow streets and tricky parking — especially in the city centre and Tettenhall. Our Wolverhampton movers know the city well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Wolverhampton’s layout. They know how to navigate the city centre, work around events at Molineux Stadium, and handle moves in areas like Tettenhall, Penn, and Bilston with confidence.",
    areas: ["City Centre", "Tettenhall", "Penn", "Bilston", "Wednesfield", "Wombourne", "Codsall", "Perton"],
    faq: [
      { q: "How much does a man and van cost in Wolverhampton?", a: "Wolverhampton prices start from around £45 for smaller moves. A typical 2–3 bedroom house move usually falls between £250–£550 depending on the locations." },
      { q: "Do you help with student moves in Wolverhampton?", a: "Yes. We regularly assist students moving in and out of properties near the University of Wolverhampton." },
      { q: "Can I get a same-day move in Wolverhampton?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  },
  "walsall": {
    name: "Walsall",
    title: "Man and Van Walsall | Local Movers Who Know the City | Man and Van Club",
    description: "Professional man and van services in Walsall. Local movers who understand the town centre, Aldridge, Bloxwich, and Willenhall. Get matched today.",
    badge: "Walsall's Local Experts",
    intro: "Walsall moves often involve narrow streets and tricky parking — especially in the town centre and Aldridge. Our Walsall movers know the area well and understand how to plan around these challenges.",
    knowledge: "Our local movers are experienced with Walsall’s layout. They know how to navigate the town centre, work around events, and handle moves in areas like Aldridge, Bloxwich, and Willenhall with confidence and efficiency.",
    areas: ["Town Centre", "Aldridge", "Bloxwich", "Willenhall", "Streetly", "Pelsall", "Rushall", "Shelfield"],
    faq: [
      { q: "How much does a man and van cost in Walsall?", a: "Walsall prices start from around £45 for smaller moves. A typical 2–3 bedroom house move usually falls between £250–£550 depending on the locations." },
      { q: "Do you help with student moves in Walsall?", a: "Yes. We regularly assist students moving in and out of properties near the University of Wolverhampton’s Walsall campus." },
      { q: "Can I get a same-day move in Walsall?", a: "Same-day moves are often possible depending on availability. Submit your request and we’ll match you with the nearest available mover." }
    ]
  }
};

const defaultPage = (slug: string) => {
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    name,
    title: `${name} | Man and Van Club`,
    description: `Professional man and van services in ${name}. Get matched with a vetted local mover who knows the area.`,
    badge: `Local Experts in ${name}`,
    intro: `Looking for a reliable man and van in ${name}? Our vetted local movers understand the area and are ready to help with your move.`,
    knowledge: `Our movers in ${name} know the local roads, parking rules, and best times to move. We connect you with professionals who have real experience working in your area.`,
    areas: ["City Centre", "North", "South", "East", "West"],
    faq: [
      { q: `How much does a man and van cost in ${name}?`, a: "Prices vary depending on the size of your move and distance. Use our form for an instant estimate." },
      { q: "Are the movers insured?", a: "Yes, every mover on our platform carries full Goods in Transit and Public Liability insurance." }
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
  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "glasgow", "cardiff", "edinburgh", "wolverhampton", "walsall"];
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];
  return [...cities, ...services].map(slug => ({ slug }));
}
