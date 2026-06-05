import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import { MapPin, Star, CheckCircle2, ShieldCheck, Clock, Users } from "lucide-react";

const cities: Record<string, any> = {
  london: {
    name: "London",
    intro: "London is the busiest moving market in the UK. Whether you're moving into a high-rise in Canary Wharf or a Victorian terrace in Hackney, our London movers know the capital's streets inside out. We help thousands of Londoners relocate every month with reliable, vetted local services.",
    knowledge: "Moving in London requires expert knowledge of Red Routes, Congestion Charges, and ULEZ restrictions. Our London-based man and van companies are fully equipped and familiar with the specific parking permit requirements for every borough, from Westminster to Greenwich.",
    areas: ["Hackney", "Brixton", "Shoreditch", "Clapham", "Islington", "Camden Town", "Greenwich", "Richmond"],
  },
  birmingham: {
    name: "Birmingham",
    intro: "As the UK's second city, Birmingham has a diverse range of moving needs. From student moves near the University of Birmingham to large house removals in Solihull or Sutton Coldfield, our network covers the entire West Midlands area.",
    knowledge: "With major transport routes like the M6 and the A38 passing through, timing is everything in Birmingham. Our movers planning your relocation will account for local traffic patterns around the Bullring and the Jewellery Quarter to ensure a prompt service.",
    areas: ["Sutton Coldfield", "Solihull", "Edgbaston", "Moseley", "Harborne", "Jewellery Quarter", "Digbeth", "Erdington"],
  },
  manchester: {
    name: "Manchester",
    intro: "Manchester is a hub of relocation activity, from the city centre's modern apartment blocks to the residential streets of Didsbury and Chorlton. Our Manchester man and van providers offer flexible, affordable services across Greater Manchester.",
    knowledge: "Navigating the Mancunian Way and city centre traffic requires local experience. Our Manchester movers are familiar with the specific challenges of apartment moves in areas like Ancoats and the Northern Quarter, including lift access and street parking.",
    areas: ["Didsbury", "Chorlton", "Ancoats", "Northern Quarter", "Salford Quays", "Altrincham", "Stockport", "Prestwich"],
  }
};

const defaultCity = (city: string) => ({
  name: city.charAt(0).toUpperCase() + city.slice(1),
  intro: `Looking for a reliable man and van in ${city}? Our vetted local professionals are ready to help with your move, whether it's a single item or a full house relocation. We offer the most competitive rates in ${city} by matching you with local experts.`,
  knowledge: `Moving in ${city} is made simple with our local experts. They understand the local road networks and parking regulations in ${city} to provide a seamless and stress-free moving experience for every customer.`,
  areas: [`${city} City Centre`, `North ${city}`, `South ${city}`, `East ${city}`, `West ${city}`],
});

export default function CityPage({ params }: { params: { slug: string } }) {
  const cityKey = params.slug.replace("man-and-van-", "");
  const data = cities[cityKey] || defaultCity(cityKey);

  const faqItems = [
    { q: `How much does a man and van cost in ${data.name}?`, a: `Prices in ${data.name} vary based on the size of your move and the distance. Typically, rates range from £50 for small local moves up to £250+ for larger house moves. Use our quote form for an instant estimate.` },
    { q: `Are the movers in ${data.name} insured?`, a: "Yes, all movers on our platform are required to have Goods in Transit and Public Liability insurance as part of our vetting process." },
    { q: `How quickly can I get quotes for my ${data.name} move?`, a: "Most customers receive their first quotes within 30 minutes of submitting their request through our platform." },
    { q: `Can I book a same-day move in ${data.name}?`, a: "Yes, many of our providers in the area offer same-day and emergency moving services depending on their current availability." },
    { q: `Do I need to help the driver with loading?`, a: "This depends on the service you choose. You can request a 'driver only' service where you help, or a 'man and van' team where they handle all the heavy lifting." }
  ];

  return (
    <div className="bg-background">
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 text-accent mb-6">
                <MapPin size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Local Experts in {data.name}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Man and Van {data.name}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-10">{data.intro}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-accent font-bold text-3xl">45+</span>
                  <span className="text-sm text-gray-400">Vetted Movers</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent font-bold text-3xl">£85+</span>
                  <span className="text-sm text-gray-400">Average Rate</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent font-bold text-3xl">4.9/5</span>
                  <span className="text-sm text-gray-400">Local Rating</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-xl">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="prose prose-lg max-w-none text-text-secondary">
              <h2 className="text-4xl font-bold text-primary mb-8 underline decoration-accent/20">Moving in {data.name} Made Simple</h2>
              <p className="text-lg leading-relaxed mb-6">{data.knowledge}</p>
              <p className="text-lg leading-relaxed">
                Whether you are moving a single item from Facebook Marketplace, a student flat for university, or a large family home, our platform makes it easy to compare quotes from local {data.name} man and van companies in seconds. We take the stress out of moving by doing the vetting for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { t: "Fixed & Hourly Rates", d: "Choose the pricing model that works best for your budget.", i: <Clock /> },
                { t: "Vetted Professionals", d: "Every driver is reviewed and verified by our team.", i: <ShieldCheck /> },
                { t: "Full UK Insurance", d: "Your items are covered during transit as standard.", i: <CheckCircle2 /> },
                { t: "Local Expertise", d: "Our movers know every shortcut and parking quirk.", i: <Users /> }
              ].map(f => (
                <div key={f.t} className="bg-background p-8 rounded-2xl border border-border flex gap-5">
                  <div className="text-accent shrink-0">{f.i}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{f.t}</h3>
                    <p className="text-text-secondary leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-3xl font-bold text-primary mb-10">Popular Areas We Cover in {data.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.areas.map((area: string) => (
                  <div key={area} className="bg-gray-50 p-5 rounded-xl text-center font-bold border border-border hover:border-accent transition-colors">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-border">
              <h2 className="text-3xl font-bold text-primary text-center mb-12">Frequently Asked Questions</h2>
              <FAQ items={faqItems} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "glasgow", "cardiff"].map(c => `man-and-van-${c}`);
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];
  return [...cities, ...services].map(slug => ({ slug }));
}
