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

// ─── Page Metadata (add this to layout.tsx or a separate metadata export) ────
// export const metadata = {
//   title: "Man & Van Club | UK's #1 Removal Marketplace",
//   description: "Connect with vetted local movers across the UK. Get an instant price estimate for house removals, flat moves, student moves and more.",
// };

export default function HomeContent() {

  // ── Data ──────────────────────────────────────────────────────────────────

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
      img: "https://images.unsplash.com/photo-1600518464441-9154a4da21b5?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Flat Moves", 
      d: "Specialist flat and apartment moving", 
      i: "🏢", 
      h: "/flat-removals", 
      img: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Student Moves", 
      d: "Affordable moves to and from university", 
      i: "🎓", 
      h: "/student-removals", 
      img: "https://images.unsplash.com/photo-1603398938378-e54e4444a83d?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Office Relocations", 
      d: "Desks, equipment and everything in between", 
      i: "💼", 
      h: "/office-removals", 
      img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop" 
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
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Long Distance Moves", 
      d: "Anywhere in the UK, any distance", 
      i: "🇬🇧", 
      h: "/long-distance-removals", 
      img: "https://images.unsplash.com/photo-1501700489910-fb2163b6bc63?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      t: "Same Day Man & Van", 
      d: "Need it moved today? We can help", 
      i: "⚡", 
      h: "/same-day-man-and-van", 
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
    },
  ];

  const trustBadges = [
    { icon: <Shield size={20} className="text-accent" />, label: "Fully Insured Movers" },
    { icon: <CheckCircle2 size={20} className="text-accent" />, label: "ID Verified Network" },
    { icon: <Zap size={20} className="text-accent" />, label: "Same Day Available" },
    { icon: <Star size={20} className="text-accent" />, label: "5-Star Rated Service" },
  ];

  // ── Animation Variants ────────────────────────────────────────────────────

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section 
        id="quote-form" 
        className="relative min-h-[95vh] flex items-center pt-24 pb-20 bg-white overflow-hidden"
      >
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[75%] h-[120%] bg-[#F9F9F7] rounded-l-[300px] transform rotate-2 shadow-2xl shadow-gray-100" />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.06, x: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-[5%] right-[5%] w-[40%] h-[50%]"
          >
            <Image
              src="https://images.unsplash.com/photo-1549194388-2469d59ec142?auto=format&fit=crop&q=80&w=1000"
              alt=""
              fill
              className="object-contain grayscale"
              priority
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

            {/* Left — Copy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2 text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-accent/20">
                <span className="w-2 h-2 bg-accent rounded-full animate-ping mr-3" />
                UK's #1 Removal Marketplace
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[0.95] text-primary tracking-tighter uppercase">
                Your Move. One Vetted Mover. <span className="text-accent">Exclusively Yours.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl font-medium leading-relaxed">
                Submit your move details and get introduced to a single verified 
                local professional — no bidding wars, no spam calls, no sharing 
                your details with multiple companies.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { icon: <Shield size={20} className="text-accent" />, label: "UK-Wide Network" },
                  { icon: <Zap size={20} className="text-accent" />, label: "1-to-1 Exclusive Match" },
                  { icon: <ShieldCheck size={20} className="text-accent" />, label: "Verified & Insured Movers" },
                  { icon: <Star size={20} className="text-accent" />, label: "Free to Submit" },
                ].map((badge) => (
                  <div 
                    key={badge.label} 
                    className="flex items-center gap-3 bg-[#F9F9F7] rounded-2xl px-4 py-3 border border-border"
                  >
                    {badge.icon}
                    <span className="text-[11px] font-black uppercase tracking-widest text-primary">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="space-y-1">
                  <div className="text-3xl font-black text-primary tracking-tighter">
                    UK-Wide
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">
                    Nationwide Coverage
                  </div>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block" />
                <div className="space-y-1">
                  <div className="text-3xl font-black text-primary tracking-tighter">
                    Verified
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">
                    ID-Checked Movers
                  </div>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block" />
                <div className="space-y-1">
                  <div className="text-3xl font-black text-primary tracking-tighter">
                    Free
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">
                    No Cost to Customer
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Quote Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
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

      {/* ── Stats Bar (C5) ────────────────────────────────────────────────── */}
      <section className="bg-primary py-12 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 opacity-50" />
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

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-primary/5 text-primary/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase leading-tight">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary font-medium mt-4 max-w-xl mx-auto">
              From request to mover in minutes. No phone calls required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-border z-0" />
                )}
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-lg">
                  {i + 1}
                </div>
                <h3 className="font-black text-primary uppercase tracking-tight text-sm mb-2">
                  {step.t}
                </h3>
                <p className="text-text-secondary text-xs font-medium leading-relaxed">
                  {step.d}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA under steps */}
          <div className="text-center mt-14">
            <Link 
              href="#quote-form" 
              className="btn-orange inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-accent/20"
            >
              Start Your Move Request <ArrowUpRight size={20} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">

            {/* Left — Copy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-10"
            >
              <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Our Marketplace
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-tight uppercase">
                Connecting Customers With Professional Movers
              </h2>
              <p className="text-lg text-text-secondary font-medium leading-relaxed">
                Man & Van Club is a marketplace connecting customers with independent 
                local movers across the UK. Submit your move request once and receive 
                a direct, exclusive introduction to a vetted mover in your area.
              </p>

              <div className="space-y-5">
                {[
                  "Verified move requests matched to independent movers.",
                  "Exclusive one-to-one introductions — no bidding wars.",
                  "Covering all major UK cities and surrounding areas.",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-lg group-hover:bg-accent transition-colors shrink-0">
                      {i + 1}
                    </div>
                    <p className="font-bold text-primary tracking-tight text-base">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <Link 
                href="#quote-form" 
                className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 w-fit shadow-2xl shadow-accent/20"
              >
                Get Started Now <ArrowUpRight size={20} />
              </Link>
            </motion.div>

            {/* Right — Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="lg:w-1/2 w-full"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1000"
                  alt="Professional movers carrying furniture"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
                  <div className="text-white font-black text-sm uppercase tracking-widest mb-2 text-center">
                    Quality Verified Network
                  </div>
                  <p className="text-white/80 text-xs font-medium text-center leading-relaxed">
                    We manually review every move request to ensure the highest 
                    quality marketplace for customers and movers alike.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Services Section ──────────────────────────────────────────────── */}
      <section className="py-32 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4">

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-6">
              <div className="inline-block bg-primary/5 text-primary/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Our Services
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase leading-none">
                Smart Solutions For Every Move
              </h2>
            </div>
            <Link 
              href="/services" 
              className="text-accent font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all whitespace-nowrap"
            >
              View all services <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i % 4}
              >
                <Link 
                  href={s.h} 
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.t}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-5 left-5 bg-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:bg-accent transition-colors">
                      {s.i}
                    </div>
                  </div>
                  <div className="p-6 space-y-3 flex flex-col flex-1">
                    <h3 className="font-black text-lg text-primary uppercase tracking-tight">
                      {s.t}
                    </h3>
                    <p className="text-text-secondary text-sm font-medium leading-relaxed flex-1">
                      {s.d}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-accent transition-colors">
                      Learn More <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Areas We Cover ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-block bg-primary/5 text-primary/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Coverage
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase">
              Areas We Cover
            </h2>
            <p className="text-text-secondary font-medium mt-4 max-w-lg mx-auto">
              Our mover network spans the length and breadth of the UK. 
              Select your city to find local movers.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city, i) => (
              <motion.div
                key={city}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i % 6}
              >
                <Link
                  href={`/man-and-van-${city.toLowerCase()}`}
                  className="group flex items-center gap-2 bg-[#F9F9F7] border border-border rounded-2xl px-6 py-4 font-black text-sm uppercase tracking-widest text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <MapPin size={14} className="text-accent group-hover:text-white transition-colors" />
                  {city}
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs font-black uppercase tracking-widest text-primary/30 mt-10">
            Don't see your area? We likely cover it.{" "}
            <Link href="#quote-form" className="text-accent hover:underline">
              Submit a request
            </Link>{" "}
            and we'll match you.
          </p>

        </div>
      </section>

      {/* ── Reviews Section (C4) ─────────────────────────────────────────── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah T.", city: "London", 
                quote: "I was nervous about trusting a stranger with my belongings but Man & Van Club matched me with a brilliant local mover within hours. Smooth, professional, and no sales pressure at all." 
              },
              { 
                name: "James R.", city: "Manchester", 
                quote: "Compared to other sites where you get bombarded with 10 quotes at once, this was completely different. One mover, one call, job done. Highly recommend." 
              },
              { 
                name: "Priya K.", city: "Birmingham", 
                quote: "Used Man & Van Club for my flat move. The mover was on time, careful with my furniture, and the whole process from submitting to completion took less than 24 hours. Brilliant service." 
              }
            ].map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F9F9F7] p-10 rounded-[3rem] border border-border/50 space-y-6 relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex gap-1 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-text-secondary font-medium leading-relaxed italic">"{r.quote}"</p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-black text-primary uppercase tracking-tighter">{r.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">{r.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Driver CTA ───────────────────────────────────────────────────── */}
      <section className="py-32 bg-[#1B2D4F] text-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 rounded-[4rem] p-12 lg:p-24 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
            
            {/* BG Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-[0.02] rounded-full -ml-32 -mb-32" />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:w-2/3 text-left space-y-10 relative z-10"
            >
              <div className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Mover Network
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                Are You A Mover?
              </h2>
              <p className="text-xl text-gray-300 max-w-xl font-medium leading-relaxed">
                Join the UK's leading exclusive customer introduction marketplace. 
                Get direct access to verified move requests — no competition, 
                no bidding, just real customers ready to book.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                {[
                  "Verified Direct Introductions",
                  "No Bidding War Competition",
                  "High Conversion Potential",
                  "UK-Wide Exclusive Jobs",
                ].map((li) => (
                  <li 
                    key={li} 
                    className="flex items-center gap-4 font-black uppercase tracking-widest text-[10px] border-b border-white/10 pb-4"
                  >
                    <CheckCircle2 size={18} className="text-accent shrink-0" /> 
                    {li}
                  </li>
                ))}
              </ul>

              <Link 
                href="/for-businesses" 
                className="btn-orange text-base px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/40 hover:scale-105 transition-all w-fit flex items-center gap-3"
              >
                Join as a Driver <ArrowUpRight size={22} />
              </Link>
            </motion.div>

            <div className="hidden lg:flex w-1/3 items-center justify-center text-[200px] opacity-10 select-none relative z-10">
              🚛
            </div>

          </div>
        </div>
      </section>

      {/* ── Mobile Sticky CTA ─────────────────────────────────────────────── */}
      {/* 
        This bar is only visible on mobile and stays fixed at the bottom.
        It is the single biggest mobile conversion improvement you can make.
      */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-border shadow-2xl px-4 py-3 flex gap-3">
        <Link
          href="#quote-form"
          className="flex-1 btn-orange py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2"
        >
          <Zap size={16} /> Get a Quote
        </Link>
        <a
          href="tel:07943617386"
          className="flex-1 bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2"
        >
          <Phone size={16} /> Call Us
        </a>
      </div>

      {/* Spacer so mobile sticky bar doesn't cover footer content */}
      <div className="h-20 lg:hidden" />

    </div>
  );
}
