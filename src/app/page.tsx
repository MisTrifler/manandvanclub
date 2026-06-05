import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Shield, Clock, Zap, Star, MapPin } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export default function Home() {
  const cities = ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Liverpool", "Nottingham", "Sheffield", "Glasgow", "Cardiff"];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center py-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=2000" 
            alt="Man loading a van" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Compare Local Man & Van Services in Minutes
              </h1>
              <ul className="space-y-4 mb-8">
                {[
                  "Compare up to 5 movers",
                  "Fixed and hourly pricing available",
                  "Vetted and reviewed local providers",
                  "No obligation — completely free",
                  "UK-wide coverage"
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <div className="bg-success rounded-full p-1">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="font-semibold text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-xl">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {[
              { t: "Tell us about your move", d: "Fill in your collection and delivery postcodes and move details." },
              { t: "See an estimated price", d: "We calculate a typical price range for your move instantly." },
              { t: "Confirm you're happy", d: "Only once you agree the price looks right do we proceed." },
              { t: "Get matched", d: "Up to 5 vetted local man & van companies receive your details." },
              { t: "Choose the best quote", d: "Compare responses, reviews and availability. Book the one you like best." },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="w-14 h-14 bg-background border-2 border-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-xl mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="font-bold mb-3">{s.t}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Are You Moving?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "House Removals", d: "Moving your whole home to a new address", i: "🏠", h: "/house-removals" },
              { t: "Flat Moves", d: "Specialist flat and apartment moving", i: "🏢", h: "/flat-removals" },
              { t: "Student Moves", d: "Affordable moves to and from university", i: "🎓", h: "/student-removals" },
              { t: "Office Relocations", d: "Desks, equipment and everything in between", i: "💼", h: "/office-removals" },
              { t: "Furniture Collection", d: "Single items from shops or private sellers", i: "🛋️", h: "/furniture-delivery" },
              { t: "Facebook Marketplace", d: "We collect so you don't have to", i: "📱", h: "/facebook-marketplace-collection" },
              { t: "Long Distance Moves", d: "Anywhere in the UK, any distance", i: "🇬🇧", h: "/long-distance-removals" },
              { t: "Same Day Man & Van", d: "Need it moved today? We can help", i: "⚡", h: "/same-day-man-and-van" },
            ].map((s) => (
              <Link key={s.t} href={s.h} className="bg-white p-8 rounded-xl border border-border hover:shadow-lg transition-all group">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{s.i}</div>
                <h3 className="font-bold text-lg mb-2">{s.t}</h3>
                <p className="text-text-secondary text-sm mb-4">{s.d}</p>
                <span className="text-accent font-bold text-xs flex items-center gap-1">Learn more <ChevronRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Use Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Thousands Choose Man & Van Club</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "Save Money", d: "Compare multiple quotes and choose the best price", i: <Zap /> },
              { t: "Multiple Quotes", d: "Up to 5 vetted movers compete for your job", i: <Check /> },
              { t: "Vetted Providers", d: "Every company on our platform is reviewed and verified", i: <Shield /> },
              { t: "Fast Response", d: "Most customers hear back within the hour", i: <Clock /> },
              { t: "Nationwide Coverage", d: "We cover every town and city in the UK", i: <MapPin /> },
              { t: "No Hidden Fees", d: "The price you see is the price you pay", i: <Star /> },
            ].map((f) => (
              <div key={f.t} className="flex gap-4">
                <div className="bg-accent/10 p-3 rounded-lg text-accent h-fit">{f.i}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{f.t}</h3>
                  <p className="text-text-secondary text-sm">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-4xl font-extrabold text-accent mb-2">14,000+</div>
              <div className="text-gray-300">Moves Completed</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-accent mb-2">850+</div>
              <div className="text-gray-300">Registered Movers</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-accent mb-2">4.8/5</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-accent mb-2">3 Years</div>
              <div className="text-gray-300">Serving the UK</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Cover */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Man & Van Services Across the UK</h2>
          <div className="max-w-4xl mx-auto mb-12 bg-gray-100 aspect-video rounded-3xl flex items-center justify-center text-gray-400 italic">
            [UK Map Graphic with City Pins]
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.map(c => (
              <Link key={c} href={`/man-and-van-${c.toLowerCase()}`} className="text-primary hover:text-accent font-medium underline underline-offset-4">
                {c}
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Link href="#quote-form" className="btn-orange">Don't see your city? Get quotes anyway →</Link>
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-10 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6">Are You a Man & Van Driver?</h2>
              <p className="text-xl text-gray-300 mb-8">Join hundreds of removal companies earning more with Man & Van Club.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {["New enquiries every day", "Only pay for accepted leads", "No monthly subscription", "Control your coverage area"].map(li => (
                  <li key={li} className="flex items-center gap-2"><Check size={18} className="text-accent" /> {li}</li>
                ))}
              </ul>
              <Link href="/for-businesses" className="btn-orange text-lg px-10">Join as a Driver →</Link>
            </div>
            <div className="hidden lg:block w-1/3 text-6xl">🚛</div>
          </div>
        </div>
      </section>
    </div>
  );
}
