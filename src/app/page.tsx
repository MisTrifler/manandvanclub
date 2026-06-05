import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Shield, MapPin, Star, Zap, UserPlus } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export default function Home() {
  const benefits = [
    "Compare up to 5 movers",
    "Fixed and hourly pricing available",
    "Vetted and reviewed local providers",
    "No obligation — completely free",
    "UK-wide coverage"
  ];

  const steps = [
    { title: "Tell us about your move", desc: "Fill in your collection and delivery postcodes and move details." },
    { title: "See an estimated price", desc: "We calculate a typical price range for your move instantly." },
    { title: "Confirm you're happy", desc: "Only once you agree the price looks right do we proceed." },
    { title: "Get matched with local movers", desc: "Up to 5 vetted local man & van companies receive your details." },
    { title: "Choose the best quote", desc: "Compare responses, reviews and availability. Book your favorite." },
  ];

  const services = [
    { title: "House Removals", desc: "Moving your whole home to a new address", icon: "🏠", href: "/house-removals" },
    { title: "Flat Moves", desc: "Specialist flat and apartment moving", icon: "🏢", href: "/flat-removals" },
    { title: "Student Moves", desc: "Affordable moves to and from university", icon: "🎓", href: "/student-removals" },
    { title: "Office Relocations", desc: "Desks, equipment and everything in between", icon: "💼", href: "/office-removals" },
    { title: "Furniture Collection", desc: "Single items from shops or private sellers", icon: "🛋️", href: "/furniture-delivery" },
    { title: "Facebook Marketplace", desc: "We collect so you don't have to", icon: "📱", href: "/facebook-marketplace-collection" },
    { title: "Long Distance Moves", desc: "Anywhere in the UK, any distance", icon: "🇬🇧", href: "/long-distance-removals" },
    { title: "Same Day Man & Van", desc: "Need it moved today? We can help", icon: "⚡", href: "/same-day-man-and-van" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center py-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=2000" 
            alt="Man loading a van" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Compare Local Man & Van Services in Minutes
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-xl">
                Get up to 5 quotes from vetted local movers. Compare prices, reviews and availability instantly.
              </p>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <div className="bg-success rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="font-medium">{b}</span>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <div className="h-1.5 w-20 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-accent text-2xl font-bold mx-auto mb-6 border-2 border-accent/20">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t-2 border-dashed border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Are You Moving?</h2>
            <p className="text-text-secondary">Specialist services for every type of move</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="bg-white p-8 rounded-xl border border-border hover:shadow-xl transition-all group">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{s.icon}</div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{s.desc}</p>
                <span className="text-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">14,000+</div>
              <div className="text-gray-300 font-medium">Moves Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">850+</div>
              <div className="text-gray-300 font-medium">Registered Movers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">4.8/5</div>
              <div className="text-gray-300 font-medium">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">3 Years</div>
              <div className="text-gray-300 font-medium">Serving the UK</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Thousands Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex gap-4">
              <div className="bg-accent/10 p-3 rounded-lg h-fit text-accent">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Vetted Providers</h3>
                <p className="text-text-secondary leading-relaxed">Every mover on our platform is personally reviewed and verified for your peace of mind.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-accent/10 p-3 rounded-lg h-fit text-accent">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Fast Response</h3>
                <p className="text-text-secondary leading-relaxed">Don't wait for days. Most of our customers receive multiple quotes within the first hour.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-accent/10 p-3 rounded-lg h-fit text-accent">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Save Money</h3>
                <p className="text-text-secondary leading-relaxed">By comparing up to 5 quotes, our users save an average of 35% on their moving costs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-20 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl overflow-hidden relative">
            <div className="absolute right-0 top-0 w-1/3 h-full hidden lg:block">
              <Image 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                alt="Happy driver" 
                fill 
                className="object-cover opacity-50"
              />
            </div>
            <div className="p-10 lg:p-20 lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Are You a Man & Van Driver?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-xl">
                Get more moving jobs with no monthly contracts. Only pay when you accept a lead.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-white">
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-accent" /> <span>New enquiries every day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-accent" /> <span>No monthly subscription</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-accent" /> <span>Control your coverage area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-accent" /> <span>Build your reviews</span>
                </div>
              </div>
              <Link href="/for-businesses" className="btn-orange text-lg px-10 py-4">
                Join as a Driver →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { ChevronRight } from "lucide-react";
