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
import { SERVICES } from "@/constants/services";

const CITIES = [
  "London", "Birmingham", "Manchester", "Leeds",
  "Bristol", "Liverpool", "Nottingham", "Sheffield",
  "Glasgow", "Cardiff", "Edinburgh", "Leicester",
];

const STEPS = [
  { t: "Tell us about your move", d: "Fill in your collection and delivery postcodes and move details." },
  { t: "See an estimated price", d: "We calculate a typical price range for your move instantly." },
  { t: "Confirm you're happy", d: "Only once you agree the price looks right do we proceed." },
  { t: "Matched with a local mover", d: "Verified local movers are notified about your move request." },
  { t: "Mover contacts you directly", d: "The first approved mover who unlocks your request contacts you." },
];

const TESTIMONIALS = [
  { name: "Sarah T.", city: "London", quote: "I was nervous about trusting a stranger with my belongings but Man and Van Club matched me with a brilliant local mover within hours." },
  { name: "James R.", city: "Manchester", quote: "Compared to other sites where you get bombarded with 10 quotes at once, this was completely different. One mover, one call, job done." },
  { name: "Priya K.", city: "Birmingham", quote: "Used Man and Van Club for my flat move. The mover was on time, careful with my furniture, and professional throughout." }
];

export default function HomeContent() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
  };

  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section id="quote-form" className="relative lg:min-h-[calc(100vh-80px)] flex items-center pt-4 lg:pt-0 pb-6 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-mover-bg.png"
            alt="Professional movers loading a van"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80 lg:bg-white/70 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2 text-left order-2 lg:order-1"
            >
              <div className="hidden lg:inline-flex items-center bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-primary/20">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse mr-2" />
                UK's Trusted Removal Marketplace
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 lg:mb-5 leading-[0.95] text-primary tracking-tighter uppercase">
                Your Move. One Vetted Mover. <span className="text-accent italic">Exclusively Yours.</span>
              </h1>

              <p className="text-base lg:text-lg text-text-secondary mb-6 lg:mb-8 max-w-lg font-medium leading-relaxed">
                Submit your move details and get introduced to a single verified local professional across the UK. No bidding wars, no spam calls.
              </p>

              <div className="hidden lg:grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <Shield size={18} />, label: "UK-Wide Network" },
                  { icon: <Zap size={18} />, label: "1-to-1 Match" },
                  { icon: <ShieldCheck size={18} />, label: "Vetted Movers" },
                  { icon: <Star size={18} />, label: "5-Star Rated" },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-border shadow-sm">
                    <span className="text-accent">{badge.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">{badge.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                <div className="space-y-0">
                  <div className="text-2xl lg:text-3xl font-black text-primary tracking-tighter uppercase leading-none">UK-Wide</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-primary/30">Nationwide Coverage</div>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block" />
                <div className="space-y-0">
                  <div className="text-2xl lg:text-3xl font-black text-primary tracking-tighter uppercase leading-none">VERIFIED</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-primary/30">ID-Checked</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="lg:w-1/2 w-full max-w-lg relative z-20 order-1 lg:order-2"
            >
              <div>
                <QuoteForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-10 lg:py-14 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 text-center items-center">
            {[
              { v: "UK-WIDE", l: "Coverage across England, Scotland & Wales" },
              { v: "60 SECONDS", l: "Average time to submit move request" },
              { v: "1-TO-1", l: "Exclusive match — only one mover sees you" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2 group">
                <div className="text-3xl lg:text-4xl font-black text-accent tracking-tighter group-hover:scale-105 transition-transform duration-500">{stat.v}</div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 max-w-[200px] mx-auto leading-relaxed">{stat.l}</p>
              </div>
            ))}
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
            {STEPS.map((step, i) => (
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <div className="inline-block bg-primary/5 text-primary/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">Our Services</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-none">Smart Solutions For Every Move</h2>
            </div>
            <Link href="/areas" className="text-accent font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">View all areas <ArrowUpRight size={16} /></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.h} className="group bg-[#F9F9F7] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={s.img} alt={s.t} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-5 left-5 bg-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:bg-accent group-hover:text-white transition-colors">{s.i}</div>
                </div>
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <h3 className="font-black text-lg text-primary uppercase tracking-tight">{s.t}</h3>
                  <p className="text-text-secondary text-sm font-medium leading-relaxed flex-1">{s.d}</p>
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
      <section className="py-24 bg-[#F9F9F7] border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block bg-primary/5 text-primary/40 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Testimonials</div>
            <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">What Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 lg:p-12 rounded-[3rem] border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-primary/80 font-medium italic leading-relaxed">"{r.quote}"</p>
                <div className="pt-6 mt-6 border-t border-border/50">
                  <p className="font-black text-primary uppercase tracking-tighter">{r.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">{r.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 rounded-[4rem] p-12 lg:p-20 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="lg:w-2/3 text-left space-y-8 relative z-10">
              <div className="inline-block bg-white/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Professional Network</div>
              <h2 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase">Are You A Mover?</h2>
              <p className="text-xl text-gray-300 max-w-xl font-medium">Join the UK's leading exclusive introduction marketplace. Get direct access to verified move requests.</p>
              <Link href="/for-businesses" className="btn-orange text-base px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/40 inline-flex items-center gap-3 hover:scale-105 transition-all">
                Join as a Driver <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/80 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-4 py-4 flex gap-4">
        <Link href="#quote-form" className="flex-1 btn-orange py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center flex items-center justify-center gap-2 shadow-xl shadow-accent/20">
          <Zap size={16} fill="currentColor" /> Get a Quote
        </Link>
        <a href="tel:07943617386" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center flex items-center justify-center gap-2 shadow-xl shadow-black/20">
          <Phone size={16} fill="currentColor" /> Call Us
        </a>
      </div>
      <div className="h-24 lg:hidden" />
    </div>
  );
}
