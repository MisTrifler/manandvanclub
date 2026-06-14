"use client";

import Link from "next/link";
import { Search, Calculator, CheckCircle, Zap, Truck, ArrowUpRight, ShieldCheck, CreditCard } from "lucide-react";
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
      desc: "We show a guide price range based on the move details provided. This is not the final mover quote.",
      icon: <Calculator className="w-8 h-8" />,
    },
    {
      title: "A Vetted Mover Sends a Quote",
      desc: "Approved local movers can review anonymised move details and submit a mover quote if they can help.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Accept or Decline Securely",
      desc: "You receive a secure quote review link. Your contact details are not released unless you accept the quote and pay the booking deposit. The deposit is deducted from the mover quote.",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      title: "Mover Contacts You Directly",
      desc: "After the booking deposit is paid, your details are released only to that mover. You pay the remaining balance directly to the mover on moving day.",
      icon: <Truck className="w-8 h-8" />,
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            Simple Customer-Confirmed Process
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            How It Works
          </h1>
          <p className="text-xl text-text-secondary">
            One vetted local mover. No spam. No multiple sales calls. Your details stay protected until you accept a mover quote.
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

      <section className="py-20 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">For Approved Movers</h2>
            <p className="text-text-secondary">Movers submit quotes for free and receive customer details only after a customer-confirmed booking.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              "See anonymised local requests",
              "Submit a mover quote for free",
              "Customer accepts or declines",
              "Details released after deposit is paid",
              "Customer pays you the remaining balance",
            ].map((item, index) => (
              <div key={item} className="bg-white border border-border rounded-2xl p-5 text-center">
                <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-black">{index + 1}</div>
                <p className="text-sm font-bold text-primary leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 text-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-black uppercase tracking-widest">
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-accent" /> Vetted Movers</div>
            <div className="flex items-center gap-2"><Zap size={18} className="text-accent" /> Customer-Confirmed Bookings</div>
            <div className="flex items-center gap-2"><CheckCircle size={18} className="text-accent" /> No Multiple Sales Calls</div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-8 max-w-md mx-auto">It takes less than 60 seconds to request a quote from a vetted local mover.</p>
          <Link href="/get-started" className="btn-orange px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
            Start Your Move <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
