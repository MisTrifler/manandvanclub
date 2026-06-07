"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Shield, Clock, Zap, Star, MapPin, Phone, Lock, CheckCircle2, ArrowUpRight, Mail } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";

export default function Home() {
  const cities = ["London", "Birmingham", "Manchester", "Leeds", "Bristol", "Liverpool", "Nottingham", "Sheffield", "Glasgow", "Cardiff"];

  const steps = [
    { t: "Tell us about your move", d: "Fill in your collection and delivery postcodes and move details." },
    { t: "See an estimated price", d: "We calculate a typical price range for your move instantly." },
    { t: "Confirm you're happy", d: "Only once you agree the price looks right do we proceed." },
    { t: "Matched Local Mover", d: "Verified local movers are notified about your move request." },
    { t: "Mover contacts you directly", d: "The first approved mover who unlocks your request contacts you directly." },
  ];

  const services = [
    { t: "House Removals", d: "Moving your whole home to a new address", i: "🏠", h: "/house-removals", img: "https://images.unsplash.com/photo-1600518464441-9154a4da21b5?q=80&w=800&auto=format&fit=crop" },
    { t: "Flat Moves", d: "Specialist flat and apartment moving", i: "🏢", h: "/flat-removals", img: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=800&auto=format&fit=crop" },
    { t: "Student Moves", d: "Affordable moves to and from university", i: "🎓", h: "/student-removals", img: "https://images.unsplash.com/photo-1603398938378-e54e4444a83d?q=80&w=800&auto=format&fit=crop" },
    { t: "Office Relocations", d: "Desks, equipment and everything in between", i: "💼", h: "/office-removals", img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop" },
    { t: "Furniture Collection", d: "Single items from shops or private sellers", i: "🛋️", h: "/furniture-delivery", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" },
    { t: "Facebook Marketplace", d: "We collect so you don't have to", i: "📱", h: "/facebook-marketplace-collection", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop" },
    { t: "Long Distance Moves", d: "Anywhere in the UK, any distance", i: "🇬🇧", h: "/long-distance-removals", img: "https://images.unsplash.com/photo-1501700489910-fb2163b6bc63?q=80&w=800&auto=format&fit=crop" },
    { t: "Same Day Man & Van", d: "Need it moved today? We can help", i: "⚡", h: "/same-day-man-and-van", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
  ];

  const marqueeLogos = ["Logo 1", "Logo 2", "Logo 3", "Logo 4", "Logo 5", "Logo 6", "Logo 7"];

  return (
    <div className="flex flex-col w-full">
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-primary text-white py-3 border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs font-black uppercase tracking-widest">
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                <span>support@manandvanclub.co.uk</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                <span>UK-Wide Service</span>
              </div>
            </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-accent" />
            <span>Mon-Sun: 8 AM - 10 PM</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-20 bg-white overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[75%] h-[120%] bg-[#F9F9F7] rounded-l-[300px] transform rotate-2 shadow-2xl shadow-gray-100" />
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-[5%] right-[5%] w-[45%] h-[55%] grayscale"
          >
             <img src="https://images.unsplash.com/photo-1549194388-2469d59ec142?auto=format&fit=crop&q=80&w=1000" alt="" className="w-full h-full object-contain" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-left"
            >
              <div className="inline-flex items-center bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-accent/20">
                <span className="w-2 h-2 bg-accent rounded-full animate-ping mr-3" />
                #1 Mover Marketplace in UK
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-[100px] font-black mb-10 leading-[0.9] text-primary tracking-tighter uppercase">
                Seamless <span className="text-accent">Transport</span> Fast Delivery
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary mb-14 max-w-xl font-medium leading-relaxed">
                Connect with vetted local professionals ready to help. Submit your move request and receive exclusive one-to-one introductions.
              </p>
              
              <div className="flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-primary tracking-tighter">UK Coverage</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 leading-none">Nationwide Network</div>
                  </div>
                </div>

                <div className="h-16 w-px bg-border hidden sm:block" />

                <div className="flex items-center gap-5">
                   <div className="space-y-1">
                      <div className="text-xl font-black text-primary tracking-tighter uppercase">Verified Movers</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 leading-none">Security Checked</div>
                   </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-xl relative z-20"
            >
              <div className="relative">
                 <div className="absolute -inset-6 bg-accent/5 rounded-[3rem] blur-3xl" />
                 <QuoteForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Logo Marquee - REMOVED FAKE SOCIAL PROOF */}

      {/* Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-10">
               <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Our Marketplace</div>
               <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-tight uppercase">Connecting Customers With Professional Movers</h2>
               <p className="text-xl text-text-secondary font-medium leading-relaxed">Man & Van Club is a marketplace connecting customers with independent local movers. We specialize in facilitating seamless transport and logistics solutions, helping you find movers for anything safely across the UK.</p>
               
               <div className="space-y-6">
                  {[
                    "Verified move requests for independent movers.",
                    "Exclusive one-to-one introductions for quality service.",
                    "Connecting customers with movers across all major cities."
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                       <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-lg group-hover:bg-accent transition-colors">
                          {i + 1}
                       </div>
                       <p className="font-bold text-primary tracking-tight text-lg">{text}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-6">
                  <Link href="#quote-form" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 w-fit shadow-2xl shadow-accent/20">
                    Get Started Now <ArrowUpRight size={20} />
                  </Link>
               </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
               <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1000" alt="Moving" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
                     <div className="text-white font-black text-sm uppercase tracking-widest mb-2 text-center">Quality Verified Network</div>
                     <p className="text-white/80 text-xs font-medium text-center leading-relaxed">We manually review move requests to ensure a high quality marketplace for both customers and local movers.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-6">
               <div className="inline-block bg-primary/5 text-primary/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Our Services</div>
               <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter uppercase leading-none">Smart Solutions For Every Move</h2>
            </div>
            <Link href="#quote-form" className="text-accent font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">View all services <ArrowUpRight size={16}/></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <Link key={s.t} href={s.h} className="group bg-white rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                   <img src={s.img} alt={s.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-black/10 group-hover:bg-accent transition-colors">
                      {s.i}
                   </div>
                </div>
                <div className="p-8 space-y-4">
                   <h3 className="font-black text-xl text-primary uppercase tracking-tight">{s.t}</h3>
                   <p className="text-text-secondary text-sm font-medium leading-relaxed">{s.d}</p>
                   <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-accent transition-colors">
                      Learn More <ArrowUpRight size={14} />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats Section - REMOVED FAKE STATS */}

      {/* Testimonials Section - REMOVED FAKE REVIEWS */}

      {/* Driver CTA */}
      <section className="py-32 bg-[#1B2D4F] text-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 rounded-[4rem] p-12 lg:p-24 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-16 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full -mr-32 -mt-32" />
            <div className="lg:w-2/3 text-left space-y-10">
              <div className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Mover Network</div>
              <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">Are You A Mover?</h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-xl font-medium leading-relaxed">Join the UK's leading exclusive customer introduction marketplace. Get direct access to verified requests today.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16">
                {[
                  "Verified Direct Introductions",
                  "No Bidding War Competition",
                  "High Conversion Potential",
                  "UK-Wide Exclusive Jobs"
                ].map(li => (
                  <li key={li} className="flex items-center gap-4 font-black uppercase tracking-widest text-[10px] border-b border-white/10 pb-4"><CheckCircle2 size={18} className="text-accent shrink-0" /> {li}</li>
                ))}
              </ul>
              <Link href="/for-businesses" className="btn-orange text-lg px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/40 hover:scale-105 transition-all w-fit flex items-center gap-3">
                Join as a Driver <ArrowUpRight size={24} />
              </Link>
            </div>
            <div className="hidden lg:flex w-1/3 items-center justify-center text-[250px] opacity-10 select-none">🚛</div>
          </div>
        </div>
      </section>
    </div>
  );
}
