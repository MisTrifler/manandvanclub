"use client";

import { ShieldCheck, Star, Users, Globe, ArrowUpRight, Phone, Mail, Zap, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutContent() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            Reinventing Local Matching
          </h1>
          <p className="text-xl text-text-secondary">
            We've built a UK-wide network for local moving connections. Just quality introductions, no unnecessary calls.
          </p>
        </div>
      </section>

      {/* Why We Built The Network */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-6">Why We Built This Network</h2>
              <div className="space-y-6 text-lg text-text-secondary">
                <p>Moving is one of life's most stressful events. We found that finding a reliable "man with a van" was often confusing, with opaque pricing and a total lack of trust.</p>
                <p>We created Man and Van Club to change that. Our mission is to provide transparency, reliability, and ease of use to both customers and professional movers.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { t: "Verified", d: "ID and phone vetting for every mover." },
                { t: "Exclusive", d: "1-to-1 matching for premium quality." },
                { t: "UK-Wide", d: "Connecting customers across England, Scotland and Wales." },
                { t: "Transparent", d: "Clear marketplace model for everyone." },
              ].map((item, i) => (
                <div key={i} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border/50">
                  <div className="text-accent mb-4"><ShieldCheck size={28} /></div>
                  <h3 className="font-black text-primary uppercase tracking-tight mb-2">{item.t}</h3>
                  <p className="text-sm text-text-secondary">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-[#F9F9F7] py-16 text-primary">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Our Mission</h2>
          <p className="text-xl text-text-secondary">
            Man and Van Club exists because finding a trustworthy local mover shouldn't be a lottery. We built an exclusive introduction marketplace that gives customers one verified professional — not a flood of competing quotes.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-border text-center">
            <h3 className="text-3xl font-black text-primary uppercase tracking-tight mb-8">Get In Touch</h3>
            <div className="flex flex-col md:flex-row justify-center gap-12 text-left">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-accent" size={20} />
                  <span className="font-black text-sm uppercase tracking-widest text-primary/40">Call Us</span>
                </div>
                <a href="tel:01217511269" className="text-2xl font-black text-primary hover:text-accent">0121 751 1269</a>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-accent" size={20} />
                  <span className="font-black text-sm uppercase tracking-widest text-primary/40">Email Us</span>
                </div>
                <a href="mailto:support@manandvanclub.co.uk" className="text-2xl font-black text-primary hover:text-accent break-all">support@manandvanclub.co.uk</a>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/contact" className="btn-orange px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
                Send Us a Message <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
