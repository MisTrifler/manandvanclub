import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Shield, Clock, Zap, Star, MapPin } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export default function Home() {
  const cities = ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Liverpool", "Nottingham", "Sheffield", "Glasgow", "Cardiff"];

  const steps = [
    { t: "Tell us about your move", d: "Fill in your collection and delivery postcodes and move details." },
    { t: "See an estimated price", d: "We calculate a typical price range for your move instantly." },
    { t: "Confirm you're happy", d: "Only once you agree the price looks right do we proceed." },
    { t: "Matched Local Mover", d: "Verified local movers are notified about your move request." },
    { t: "Mover contacts you directly", d: "Compare responses, reviews and availability. Book the one you like best." },
  ];

  const reviews = [
    { name: "Sarah Jenkins", star: 5, quote: "Found a brilliant mover in under 20 minutes. The price was exactly what I expected based on the estimate.", city: "Manchester" },
    { name: "David Wilson", star: 5, quote: "Excellent service. I was moving a single sofa and got 3 great quotes within the hour. Saved about £40.", city: "London" },
    { name: "Michael Reed", star: 5, quote: "Really easy to use. The vetted movers gave me peace of mind for my 3-bedroom house move.", city: "Birmingham" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 bg-white overflow-hidden">
        {/* Abstract Background Design - Modern & Light */}
        <div className="absolute top-0 right-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[120%] bg-[#F9F9F7] rounded-l-[100px] transform rotate-3" />
          <div className="absolute top-[20%] right-[5%] w-[40%] h-[60%] opacity-20">
             <img 
              src="https://images.unsplash.com/photo-1549194388-2469d59ec142?auto=format&fit=crop&q=80&w=1500" 
              alt="" 
              className="w-full h-full object-contain grayscale"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-left">
              <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                UK's #1 Mover Marketplace
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-[1.05] text-primary tracking-tight">
                Find <span className="text-accent italic">Trusted</span> Local Movers
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-xl font-medium leading-relaxed">
                Get up to 5 confirmed quotes from vetted local movers. Save up to 35% on your move today.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Fixed Price Quotes",
                  "Vetted & Insured",
                  "No Booking Fees",
                  "Nationwide Coverage"
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3 bg-white border border-border/50 p-3 rounded-xl shadow-sm">
                    <div className="bg-success/10 rounded-full p-1.5 shrink-0">
                      <Check size={18} className="text-success" />
                    </div>
                    <span className="font-bold text-primary/80">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-xl">
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                <QuoteForm />
              </div>
              
              {/* Trust Section below form */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-8 text-sm text-text-secondary font-black uppercase tracking-wider">
                  <span className="flex items-center gap-2"><Shield size={20} className="text-success" /> SSL Secure</span>
                  <span className="flex items-center gap-2"><Star size={20} className="text-accent fill-accent" /> 4.8/5 Rating</span>
                </div>
                <div className="h-px w-24 bg-border" />
                <div className="text-xs text-text-secondary font-medium">Trusted by 14,000+ UK households</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="w-16 h-16 bg-background border-2 border-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-2xl mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-3">{s.t}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Are You Moving?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <Link key={s.t} href={s.h} className="bg-white p-10 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">{s.i}</div>
                <h3 className="font-bold text-xl mb-3">{s.t}</h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">{s.d}</p>
                <span className="text-accent font-bold text-sm flex items-center gap-1">Learn more <ChevronRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Use Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Thousands Choose Man & Van Club</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10">
            {[
              { t: "Save Money", d: "Compare multiple quotes and choose the best price", i: <Zap /> },
              { t: "Multiple Quotes", d: "Up to 5 vetted movers compete for your job", i: <Check /> },
              { t: "Vetted Providers", d: "Every company on our platform is reviewed and verified", i: <Shield /> },
              { t: "Fast Response", d: "Most customers hear back within the hour", i: <Clock /> },
              { t: "Nationwide Coverage", d: "We cover every town and city in the UK", i: <MapPin /> },
              { t: "No Hidden Fees", d: "The price you see is the price you pay", i: <Star /> },
            ].map((f) => (
              <div key={f.t} className="flex gap-5 p-6 rounded-xl border border-border/50 hover:bg-gray-50 transition-colors">
                <div className="bg-accent/10 p-4 rounded-xl text-accent h-fit shrink-0">{f.i}</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{f.t}</h3>
                  <p className="text-text-secondary text-base leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats & Reviews */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center mb-24">
            <div>
              <div className="text-5xl font-extrabold text-accent mb-3">14,000+</div>
              <div className="text-gray-300 font-bold uppercase tracking-wider text-sm">Moves Completed</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-accent mb-3">850+</div>
              <div className="text-gray-300 font-bold uppercase tracking-wider text-sm">Registered Movers</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-accent mb-3">4.8/5</div>
              <div className="text-gray-300 font-bold uppercase tracking-wider text-sm">Customer Rating</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-accent mb-3">3 Years</div>
              <div className="text-gray-300 font-bold uppercase tracking-wider text-sm">Serving the UK</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                <div className="flex gap-1 text-accent mb-4">
                  {[...Array(r.star)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-200 italic mb-6 leading-relaxed">"{r.quote}"</p>
                <div>
                  <div className="font-bold text-white">{r.name}</div>
                  <div className="text-sm text-gray-400">{r.city}, UK</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Cover */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Man & Van Services Across the UK</h2>
          <div className="max-w-4xl mx-auto mb-12 bg-gray-100 aspect-video rounded-3xl flex items-center justify-center text-gray-400 italic">
            [UK Map Graphic with City Pins]
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.map(c => (
              <Link key={c} href={`/man-and-van-${c.toLowerCase()}`} className="text-primary hover:text-accent font-bold underline underline-offset-4 decoration-accent/30 hover:decoration-accent">
                {c}
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Link href="#quote-form" className="btn-orange text-lg px-10">Don't see your city? Get quotes anyway →</Link>
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-10 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-2/3 text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Are You a Man & Van Driver?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-xl">Join hundreds of removal companies earning more with Man & Van Club. No monthly contracts.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                {["New enquiries every day", "Only pay for accepted leads", "No monthly subscription", "Control your coverage area"].map(li => (
                  <li key={li} className="flex items-center gap-3 font-medium"><Check size={20} className="text-accent shrink-0" /> {li}</li>
                ))}
              </ul>
              <Link href="/for-businesses" className="btn-orange text-lg px-12 py-4">Join as a Driver →</Link>
            </div>
            <div className="hidden lg:flex w-1/3 items-center justify-center text-[150px]">🚛</div>
          </div>
        </div>
      </section>
    </div>
  );
}
