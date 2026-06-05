import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { MapPin, Info, Star, CheckCircle2 } from "lucide-react";

// Mock data function to simulate unique content per city as requested by the prompt
function getCityData(city: string) {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  return {
    name: cityName,
    title: `Man and Van ${cityName} — Compare Local Movers`,
    intro: `Moving in ${cityName} can be a challenge, whether you're navigating the busy streets of the city centre or relocating to the quieter suburbs. At Man & Van Club, we connect you with the most reliable, vetted man and van services across ${cityName} and the surrounding areas.`,
    localKnowledge: `From parking permits in the city to the best routes during rush hour, our ${cityName} movers have the local expertise to ensure your move is smooth and stress-free.`,
    avgPrice: "£85 - £160",
    moversCount: "45+",
    areas: [`${cityName} Central`, `North ${cityName}`, `South ${cityName}`, `East ${cityName}`, `West ${cityName}`]
  };
}

export default function SlugPage({ params }: { params: { slug: string } }) {
  const isCity = params.slug.startsWith("man-and-van-");
  
  if (isCity) {
    const rawCity = params.slug.replace("man-and-van-", "");
    const data = getCityData(rawCity);
    return <CityTemplate data={data} />;
  }

  // Handle Service Template
  const serviceData = getServiceData(params.slug);
  return <ServiceTemplate data={serviceData} />;
}

function CityTemplate({ data }: { data: any }) {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 text-accent mb-4">
                <MapPin size={20} />
                <span className="font-bold uppercase tracking-widest text-sm">Local Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {data.intro}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-accent text-2xl font-bold">{data.moversCount}</div>
                  <div className="text-sm text-gray-400">Vetted Movers in Area</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-accent text-2xl font-bold">{data.avgPrice}</div>
                  <div className="text-sm text-gray-400">Average Local Price</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-xl">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none text-text-secondary">
                <h2 className="text-3xl font-bold text-primary mb-6">Moving in {data.name} Made Simple</h2>
                <p>{data.localKnowledge}</p>
                <p>
                  Whether you are moving a single item from Facebook Marketplace, a student flat for university, or a large family home, our platform makes it easy to compare quotes from local {data.name} man and van companies in seconds.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-6">Why book a man and van in {data.name} with us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Fixed and hourly rates available",
                    "Fully vetted and reviewed local drivers",
                    "Goods in transit insurance as standard",
                    "Flexible booking times to suit you"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-success" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="card bg-primary text-white">
                <h3 className="font-bold text-xl mb-4">Ready to get quotes?</h3>
                <p className="text-gray-300 mb-6 text-sm">It takes less than 60 seconds to find the best local movers in {data.name}.</p>
                <Link href="#quote-form" className="btn-orange w-full">Get Free Quotes Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceTemplate({ data }: { data: any }) {
  return (
    <div className="bg-background">
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">{data.intro}</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-gray-300" />)}
                </div>
                <div className="text-sm">
                  <div className="font-bold">4.8/5 Rating</div>
                  <div className="text-gray-400">from 1,200+ moves</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-xl">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="prose prose-lg">
              <h2 className="text-3xl font-bold text-primary">About Our {data.name} Service</h2>
              <p>{data.description}</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold mb-6">How it works</h3>
              <div className="space-y-4">
                {["Tell us what you're moving", "Get your instant price estimate", "Match with vetted specialists", "Book and move with confidence"].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">{i+1}</div>
                    <p className="font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getServiceData(slug: string) {
  const titles: Record<string, string> = {
    "house-removals": "Professional House Removals",
    "flat-removals": "Expert Flat & Apartment Moves",
    "student-removals": "Affordable Student Moves",
    "office-removals": "Commercial Office Relocations",
    "furniture-delivery": "Single Item & Furniture Delivery",
    "same-day-man-and-van": "Same Day Man & Van Services",
    "long-distance-removals": "Long Distance UK Moves",
    "facebook-marketplace-collection": "Facebook Marketplace Collection"
  };
  
  const name = titles[slug] || "Man & Van Service";
  return {
    name,
    title: name,
    intro: `Professional and reliable ${name.toLowerCase()} across the UK. Compare quotes from local experts in minutes.`,
    description: `We specialise in ${name.toLowerCase()}, providing a seamless experience from start to finish. Our network of vetted movers ensures your belongings are handled with care and delivered on time.`
  };
}

export async function generateStaticParams() {
  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "glasgow", "cardiff"].map(c => `man-and-van-${c}`);
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];
  return [...cities, ...services].map(slug => ({ slug }));
}

