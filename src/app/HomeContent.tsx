"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowUpRight,
  Star,
  Shield,
  ShieldCheck,
  Zap,
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
      {/* ========== HERO SECTION (10/10) ========== */}
      <section id="quote-form" className="relative lg:min-h-[calc(100vh-80px)] flex items-center pt-4 lg:pt-0 pb-10 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-mover-bg.png"
            alt="Professional movers loading a van"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/85 lg:bg-white/75 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Left Content */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2 text-left order-2 lg:order-1"
            >
              <div className="hidden lg:inline-flex items-center bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-5 border border-primary/20">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse mr-2" />
                UK's Most Trusted Removal Marketplace
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-5 leading-[0.95] text-primary tracking-tighter">
                Get Matched with One Trusted Local Mover.<br />No Spam. No Bidding Wars.
              </h1>

              <p className="text-lg lg:text-xl text-text-secondary mb-6 max-w-xl font-medium leading-relaxed">
                Submit your move details and get introduced to a single verified local professional across the UK. Fast, fair, and exclusive.
              </p>

              {/* Trust Badges */}
              <div className="hidden lg:flex flex-wrap gap-3 mb-8">
                {[
                  { icon: <Shield size={16} />, label: "UK-Wide Network" },
                  { icon: <Zap size={16} />, label: "1-to-1 Exclusive Match" },
                  { icon: <ShieldCheck size={16} />, label: "Vetted & Insured Movers" },
                  { icon: <Star size={16} />, label: "5-Star Rated Service" },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full text-sm font-bold text-primary/80">
                    <span className="text-accent">{badge.icon}</span>
                    {badge.label}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div>
                  <div className="font-black text-primary text-2xl tracking-tighter">UK-WIDE</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">Coverage</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="font-black text-primary text-2xl tracking-tighter">60 SECONDS</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">To Get Matched</div>
                </div>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="lg:w-1/2 w-full max-w-lg relative z-20 order-1 lg:order-2"
            >
              <div className="mb-3 text-center lg:text-left">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/50">Takes less than 60 seconds • No payment required</p>
              </div>
              <QuoteForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-10 lg:py-14 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white">
            <div>
              <div className="text-4xl font-black tracking-tighter text-accent">UK-WIDE</div>
              <p className="text-sm text-white/60 mt-1">Coverage across England, Scotland & Wales</p>
            </div>
            <div className="border-y md:border-y-0 md:border-x border-white/20 py-8 md:py-0">
              <div className="text-4xl font-black tracking-tighter text-accent">60 SECONDS</div>
              <p className="text-sm text-white/60 mt-1">Average time to submit your request</p>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tighter text-accent">1-TO-1</div>
              <p className="text-sm text-white/60 mt-1">Exclusive match — only one mover sees you</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">How It Works</h2>
            <p className="text-text-secondary mt-3">Simple. Fair. Exclusive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-5 shadow-lg">{i + 1}</div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-2">{step.t}</h3>
                <p className="text-text-secondary text-sm">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Smart Solutions For Every Move</h2>
            </div>
            <Link href="/areas" className="text-accent font-black text-sm flex items-center gap-1 hover:gap-2 transition-all">View all areas <ArrowUpRight size={16} /></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.h} className="group bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all">
                <div className="relative aspect-[4/3]">
                  <Image src={s.img} alt={s.t} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-xl text-primary tracking-tight">{s.t}</h3>
                  <p className="text-sm text-text-secondary mt-2">{s.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((r, i) => (
              <div key={i} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border">
                <div className="flex text-accent mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-primary/80 italic">"{r.quote}"</p>
                <div className="mt-6 pt-4 border-t border-border/60 text-sm">
                  <span className="font-black">{r.name}</span> — {r.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Ready to Get Matched?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-md mx-auto">It takes less than 60 seconds to find your local mover.</p>
          <Link href="#quote-form" className="btn-orange px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3">
            Start Your Move <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
