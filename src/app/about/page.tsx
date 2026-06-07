"use client";
import Link from "next/link";
import { ShieldCheck, Star, Users, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-32 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
              Our Journey
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
              Reinventing <span className="text-accent">Local</span> Matching
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
              We've built the UK's most transparent network for local moving connections. No bidding wars, just quality introductions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/2 space-y-12">
               <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight leading-none">Why We Built The Network</h2>
                  <p className="text-xl text-text-secondary font-medium leading-relaxed">
                    Moving is one of life's most stressful events. We found that the process of finding a reliable "man with a van" was often confusing, with opaque pricing and a total lack of trust. 
                  </p>
                  <p className="text-xl text-text-secondary font-medium leading-relaxed">
                    We created Man & Van Club to change that. Our mission is to provide transparency, reliability, and ease of use to both customers and professional movers.
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                  {[
                    { t: "Verified", d: "ID and phone vetting for every mover joining the platform.", i: <ShieldCheck /> },
                    { t: "Exclusive", d: "1-to-1 matching for premium service quality.", i: <Star /> },
                    { t: "UK-Wide", d: "Connecting households and businesses in major cities.", i: <Globe /> },
                    { t: "Transparent", d: "Clear marketplace model for customers and movers.", i: <Users /> }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border/50 space-y-4">
                       <div className="text-accent">{item.i}</div>
                       <h3 className="font-black text-primary uppercase tracking-widest text-xs">{item.t}</h3>
                       <p className="text-sm text-text-secondary font-medium leading-relaxed">{item.d}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 w-full sticky top-40">
               <div className="relative group">
                  <div className="absolute -inset-4 bg-accent/5 rounded-[4rem] blur-3xl group-hover:bg-accent/10 transition-all duration-700" />
                  <div className="relative aspect-square bg-gray-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=1000" alt="Moving Team" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-border bg-[#F9F9F7]">
        <div className="container mx-auto px-4 text-center">
           <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter">Ready to experience a better move?</h2>
              <Link href="/#quote-form" className="btn-orange px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-105 inline-flex items-center gap-3">
                 Start Your Request <ArrowUpRight size={24} />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
