"use client";

import Link from "next/link";
import { Search, Calculator, CheckCircle, Zap, Truck, ArrowUpRight, ShieldCheck, CreditCard, Banknote, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksContent() {
  const steps = [
    {
      title: "Tell Us About Your Move",
      desc: "Enter your collection and delivery postcodes, move date and move type. It takes less than 60 seconds and your quote request is free.",
      icon: <Search className="w-8 h-8" />,
    },
    {
      title: "Verify Your Email",
      desc: "Confirm your email with a quick verification code so movers only see genuine requests. We also show a guide price — this is only an estimate, not the final mover quote.",
      icon: <Calculator className="w-8 h-8" />,
    },
    {
      title: "A Vetted Mover Reviews Your Request",
      desc: "Your contact details stay protected while your request is reviewed. A verified local mover sees only anonymised move details.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: "Receive Clear Quote Options",
      desc: "A vetted mover can send clear quote options based on your move details — for example transport only, 1 man and van, or 2 men and van — each with its own total price.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Choose the Option That Suits You",
      desc: "You receive a secure quote review link. Compare the options and choose the one that suits your move best, or decline with no payment.",
      icon: <Lock className="w-8 h-8" />,
    },
    {
      title: "Pay Your Deposit to Secure the Booking",
      desc: "Pay a booking deposit on your chosen option. Your booking deposit is deducted from the mover’s selected quote. It is not an extra charge.",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      title: "Your Details Are Released to the Mover",
      desc: "Once your deposit is paid, your contact details are released only to that mover, who contacts you directly to confirm timing and access.",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      title: "Pay the Rest on Moving Day",
      desc: "You pay the remaining balance directly to the mover on moving day. Your total move cost stays the same as the option you chose.",
      icon: <Truck className="w-8 h-8" />,
    },
  ];

  const trustBadges = [
    { icon: <ShieldCheck size={18} />, label: "One Verified Mover" },
    { icon: <CheckCircle size={18} />, label: "No Spam" },
    { icon: <Lock size={18} />, label: "Secure Quote Review" },
    { icon: <CreditCard size={18} />, label: "Deposit Deducted From Quote" },
    { icon: <Banknote size={18} />, label: "Pay the Rest on Moving Day" },
  ];

  return (
    <div className="bg-white">
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            Simple Customer-Confirmed Process
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            How Man and Van Club Works
          </h1>
          <p className="text-xl font-bold text-primary mb-4">
            Get your quote for free. If you accept a mover option, pay a booking deposit to secure your booking and pay the rest on moving day.
          </p>
          <p className="text-lg text-text-secondary">
            One verified local mover. No spam. No endless calls. Your details stay protected until you accept a mover quote.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col md:flex-row gap-8 md:gap-12 items-start"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9F7] py-12 text-primary border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-black uppercase tracking-widest">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <span className="text-accent">{badge.icon}</span> {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-8 max-w-md mx-auto">It takes less than 60 seconds to request a quote from a verified local mover.</p>
          <Link href="/#quote-form" className="btn-orange px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
            Get Your Free Quote <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
