"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Clock, 
  Phone,
  Star,
  Shield,
  ShieldCheck,
  Zap,
  ChevronRight
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";

export default function HomeContent() {

  const cities = [
    "London", "Birmingham", "Manchester", "Leeds", 
    "Bristol", "Liverpool", "Nottingham", "Sheffield", 
    "Glasgow", "Cardiff", "Edinburgh", "Leicester",
  ];

  const steps = [
    { 
      t: "Tell us about your move", 
      d: "Fill in your collection and delivery postcodes and move details." 
    },
    { 
      t: "See an estimated price", 
      d: "We calculate a typical price range for your move instantly." 
    },
    { 
      t: "Confirm you're happy", 
      d: "Only once you agree the price looks right do we proceed." 
    },
    { 
      t: "Matched with a local mover", 
      d: "Verified local movers are notified about your move request." 
    },
    { 
      t: "Mover contacts you directly", 
      d: "The first approved mover who unlocks your request contacts you." 
    },
  ];

  const services = [
    { 
      t: "House Removals", 
      d: "Moving your whole home to a new address", 
      i: "🏠", 
      h: "/house-removals", 
      img: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Flat Moves", 
      d: "Specialist flat and apartment moving", 
      i: "🏢", 
      h: "/flat-removals", 
      img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Student Moves", 
      d: "Affordable moves to and from university", 
      i: "🎓", 
      h: "/student-removals", 
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Office Relocations", 
      d: "Desks, equipment and everything in between", 
      i: "💼", 
      h: "/office-removals", 
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Furniture Collection", 
      d: "Single items from shops or private sellers", 
      i: "🛋️", 
      h: "/furniture-delivery", 
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Facebook Marketplace", 
      d: "We collect so you don't have to", 
      i: "📱", 
      h: "/facebook-marketplace-collection", 
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Long Distance Moves", 
      d: "Anywhere in the UK, any distance", 
      i: "🇬🇧", 
      h: "/long-distance-removals", 
      img: "https://images.unsplash.com/photo-1516542003828-597ca0b61640?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Same Day Man & Van", 
      d: "Need it moved today? We can help", 
      i: "⚡", 
      h: "/same-day-man-and-van", 
      img: "https://images.unsplash.com/photo-1600518464441-9154a4da21b5?q=80&w=800&auto=format&fit=crop" 
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section id="quote-form" className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)] flex items-center pt-4 lg:pt-0 pb-8 bg-white overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[75%] h-[120%] bg-[#F9F9F7] rounded-l-[300px] transform rotate-2 shadow-2xl shadow-gray-100" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
            {/* Left — Copy */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:w-1/2 text-left order-2 lg:order-1">
              <div className="hidden lg:inline-flex items-center bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-accent/20">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping mr-2" />
                UK's #1 Removal Marketplace
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 lg:mb-4 leading-[0.95] text-primary tracking-tighter uppercase">
                Your Move. One Vetted Mover. <span className="text-accent">Exclusively Yours.</span>
              </h1>

              <p className="text-sm lg:text-base text-text-secondary mb-4 lg:mb-6 max-w-lg font-medium leading-relaxed">
                Submit your move details and get introduced to a single verified 
                local professional — no bidding wars, no spam calls.
              </p>

              <div className="hidden lg:grid grid-cols-2 gap-2 mb-6">
                {[
                  { icon: <Shield size={16} className="text-accent" />, label: "UK-Wide Network" },
                  { icon: <Zap size={16} className="text-accent" />, label: "1-to-1 Exclusive Match" },
                  { icon: <ShieldCheck size={16} className="text-accent" />, label: "Verified & Insured Movers" },
                  { icon: <Star size={16} className="text-accent" />, label: "Free to Submit" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 bg-[#F9F9F7] rounded-xl px-3 py-2 border border-border">
                    {badge.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                <div className="space-y-0">
                  <div className="text-xl lg:text-2xl font-black text-primary tracking-tighter uppercase leading-none">UK-Wide</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-primary/40">Nationwide Coverage</div>
                </div>
                <div className="h-6 lg:h-10 w-px bg-border hidden sm:block" />
                <div className="space-y-0">
                  <div className="text-xl lg:text-2xl font-black text-primary tracking-tighter uppercase leading-none">Verified</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-primary/40">ID-Checked Movers</div>
                </div>
              </div>
            </motion.div>

            {/* Right — Quote Form */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="lg:w-1/2 w-full max-w-lg relative z-20 order-1 lg:order-2">
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-12 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center">
            <div className="space-y-2">
              <div className="text-4xl font-black text-accent tracking-tighter">UK-WIDE</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Coverage across England, Scotland & Wales</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
              <div className="text-4xl font-black text-white tracking-tighter">60 SECONDS</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Average time to submit your move request</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-white tracking-tighter">1-TO-1</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Exclusive match — only one mover sees your details</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-tight">How It Works</h2>
            <p className="text-lg text-text-secondary font-medium mt-4">From request to mover in minutes. No phone calls required.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-lg">{i + 1}</div>
                <h3 className="font-black text-primary uppercase tracking-tight text-sm mb-2">{step.t}</h3>
                <p className="text-text-secondary text-xs font-medium">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-none">Smart Solutions For Every Move</h2>
            <Link href="/areas" className="text-accent font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">View all areas <ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Link key={i} href={s.h} className="group bg-[#F9F9F7] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={s.img} alt={s.t} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-5 left-5 bg-white w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg">{s.i}</div>
                </div>
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <h3 className="font-black text-lg text-primary uppercase tracking-tight">{s.t}</h3>
                  <p className="text-text-secondary text-sm font-medium flex-1">{s.d}</p>
                  <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-accent transition-colors">
                    Learn More <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-20">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Sarah T.", city: "London", quote: "I was nervous about trusting a stranger with my belongings but Man & Van Club matched me with a brilliant local mover within hours." },
              { name: "James R.", city: "Manchester", quote: "Compared to other sites where you get bombarded with 10 quotes at once, this was completely different. One mover, one call, job done." },
              { name: "Priya K.", city: "Birmingham", quote: "Used Man & Van Club for my flat move. The mover was on time, careful with my furniture, and professional throughout." }
            ].map((r, i) => (
              <div key={i} className="bg-[#F9F9F7] p-10 rounded-[3rem] border border-border/50 space-y-6 shadow-sm">
                <div className="flex gap-1 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-primary/80 font-medium italic">"{r.quote}"</p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-black text-primary uppercase tracking-tighter">{r.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">{r.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-32 bg-white border-t border-border overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="bg-[#F9F9F7] rounded-[4rem] p-12 lg:p-24 border border-border flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
            <div className="lg:w-2/3 text-left space-y-10 relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-primary leading-[0.9] tracking-tighter uppercase">Are You A Mover?</h2>
              <p className="text-xl text-text-secondary max-w-xl font-medium">Join the UK's leading exclusive customer introduction marketplace. Get direct access to verified move requests.</p>
              <Link href="/for-businesses" className="btn-orange text-base px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/40 inline-flex items-center gap-3">
                Join as a Driver <ArrowUpRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-border shadow-2xl px-4 py-3 flex gap-3">
        <Link href="#quote-form" className="flex-1 btn-orange py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2">
          <Zap size={16} /> Get a Quote
        </Link>
        <a href="tel:07943617386" className="flex-1 bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2">
          <Phone size={16} /> Call Us
        </a>
      </div>
      <div className="h-20 lg:hidden" />
    </div>
  );
}
