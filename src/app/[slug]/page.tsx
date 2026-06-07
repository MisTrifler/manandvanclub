import CityServiceContent from "@/components/CityServiceContent";

const cities: Record<string, any> = {
  london: {
    name: "London",
    intro: "London is the busiest moving market in the UK. Whether you're moving into a high-rise in Canary Wharf or a Victorian terrace in Hackney, our London movers know the capital's streets inside out.",
    knowledge: "Moving in London requires expert knowledge of Red Routes, Congestion Charges, and ULEZ restrictions. Our London-based man and van companies are fully equipped for every borough.",
    areas: ["Hackney", "Brixton", "Shoreditch", "Clapham", "Islington", "Camden Town", "Greenwich", "Richmond"],
  },
  birmingham: {
    name: "Birmingham",
    intro: "As the UK's second city, Birmingham has a diverse range of moving needs. From student moves to large house removals in Solihull, our network covers the entire West Midlands area.",
    knowledge: "With major transport routes like the M6 and the A38 passing through, timing is everything in Birmingham. Our movers account for local traffic patterns around the Bullring and beyond.",
    areas: ["Sutton Coldfield", "Solihull", "Edgbaston", "Moseley", "Harborne", "Jewellery Quarter", "Digbeth", "Erdington"],
  },
  manchester: {
    name: "Manchester",
    intro: "Manchester is a hub of relocation activity. From the city centre's modern apartment blocks to the residential streets of Didsbury, our Manchester movers offer flexible, affordable services.",
    knowledge: "Navigating the Mancunian Way and city centre traffic requires local experience. Our Manchester movers are familiar with the specific challenges of apartment moves in areas like Ancoats.",
    areas: ["Didsbury", "Chorlton", "Ancoats", "Northern Quarter", "Salford Quays", "Altrincham", "Stockport", "Prestwich"],
  }
};

const defaultCity = (city: string) => ({
  name: city.charAt(0).toUpperCase() + city.slice(1),
  intro: `Looking for a reliable man and van in ${city}? Our vetted local professionals are ready to help with your move, whether it's a single item or a full house relocation.`,
  knowledge: `Moving in ${city} is made simple with our local experts. They understand the local road networks and parking regulations to provide a seamless moving experience.`,
  areas: [`${city} City Centre`, `North ${city}`, `South ${city}`, `East ${city}`, `West ${city}`],
});

export default function CityPage({ params }: { params: { slug: string } }) {
  const cityKey = params.slug.replace("man-and-van-", "");
  const data = cities[cityKey] || defaultCity(cityKey);

  const faqItems = [
    { q: `How much does a man and van cost in ${data.name}?`, a: `Prices in ${data.name} vary based on the size of your move. Rates range from £50 for small moves up to £250+ for larger house moves. Use our form for an instant estimate.` },
    { q: `Are the movers in ${data.name} insured?`, a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
    { q: `How quickly can I get quotes for my ${data.name} move?`, a: "Most customers are matched with a mover within 15-30 minutes of submitting their request through our platform." },
    { q: `Can I book a same-day move in ${data.name}?`, a: "Yes, many of our local providers offer same-day and emergency moving services depending on their availability." },
    { q: `Do I need to help the driver with loading?`, a: "You can request a driver-only service or a full team where they handle all the heavy lifting for you." }
  ];

  return <CityServiceContent data={data} faqItems={faqItems} />;
}

export async function generateStaticParams() {
  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "glasgow", "cardiff", "walsall"].map(c => `man-and-van-${c}`);
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "sofa-collection", "ikea-collection", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];
  return [...cities, ...services].map(slug => ({ slug }));
}
