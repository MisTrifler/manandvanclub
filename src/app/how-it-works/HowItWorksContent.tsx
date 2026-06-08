"use client";

import Link from "next/link";
import { Search, Calculator, CheckCircle, Zap, Truck, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksContent() {
  const steps = [
    {
      title: "Tell Us About Your Move",
      desc: "Enter your collection and delivery postcodes, move date, and move type. It takes less than 60 seconds.",
      icon: <Search className="w-8 h-8" />,
    },
    {
      title: "See an Estimated Price",
      desc: "We instantly calculate a typical price range for your move based on real marketplace data.",
      icon: <Calculator className="w-8 h-8" />,
    },
    {
      title: "Confirm You're Happy",
      desc: "Only proceed once you're comfortable with the estimated value. Your details stay private until you verify.",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      title: "Get Matched with a Local Mover",
      desc: "Your verified request is sent to approved local movers. The first one to unlock it gets your details exclusively.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Mover Contacts You Directly",
      desc: "The matched mover will contact you to confirm details and carry out your move. No middlemen.",
      icon: <Truck className="w-8 h-8" />,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            Simple 5-Step Process
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            How It Works
          </h1>
          <p className="text-xl text-text-secondary">
            We've removed the stress, the spam, and the bidding wars. Here's how we connect you with one trusted local mover — exclusively.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl font-black text-primary/10 tracking-tighter">{index + 1}</span>
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-lg text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-[#F9F9F7] py-12 text-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-black uppercase tracking-widest">
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-accent" /> Fully Insured Movers</div>
            <div className="flex items-center gap-2"><Zap size={18} className="text-accent" /> 1-to-1 Exclusive Matches</div>
            <div className="flex items-center gap-2"><CheckCircle size={18} className="text-accent" /> No Bidding Wars</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-8 max-w-md mx-auto">It takes less than 60 seconds to find your local mover.</p>
          <Link href="/#quote-form" className="btn-orange px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
            Start Your Move <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
