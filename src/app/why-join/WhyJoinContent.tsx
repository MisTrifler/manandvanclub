"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ClipboardList,
  Search,
  BadgeCheck,
  Zap,
  ArrowUpRight,
  Star,
  Phone,
  TrendingUp,
} from "lucide-react";

export default function WhyJoinContent() {
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
      <section className="relative bg-primary text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-6 gap-4">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border border-white/20 h-32 w-full" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <div className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Mover Network
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
                Get Exclusive Customer Enquiries Without Competing Against Other Movers
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Most lead generation websites sell enquiries to multiple businesses. We take a different approach. Customer enquiries are offered exclusively, helping reduce wasted spend and unnecessary competition.
              </p>
              <Link
                href="/apply-to-join"
                className="btn-orange inline-flex items-center gap-3 px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
              >
                Apply to Join <ArrowUpRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Why We're Different</h2>
            <p className="text-text-secondary mt-3">See how we compare to traditional lead generation websites.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-border space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                  <XCircle size={24} />
                </div>
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">Traditional Lead Sites</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Multiple companies receive the same enquiry",
                  "High competition",
                  "Lower conversion rates",
                  "Race to the lowest price",
                  "Shared leads",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-primary/70 font-medium text-sm">
                    <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Man and Van Club */}
            <div className="bg-primary p-10 rounded-[2.5rem] text-white space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Man and Van Club</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Exclusive enquiry opportunities",
                  "Reduced competition",
                  "Direct customer contact",
                  "Transparent lead fees",
                  "Simple process",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 font-medium text-sm">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">How It Works</h2>
            <p className="text-text-secondary mt-3">From application to your first exclusive enquiry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { t: "Apply to Join", d: "Submit your business details and service areas.", icon: <ClipboardList size={24} /> },
              { t: "Business Verification", d: "We review your company details and service coverage.", icon: <Search size={24} /> },
              { t: "Insurance Verification", d: "Provide proof of Goods in Transit and Public Liability insurance.", icon: <ShieldCheck size={24} /> },
              { t: "Account Approval", d: "Once verified, your account is approved for the platform.", icon: <BadgeCheck size={24} /> },
              { t: "Access Enquiries", d: "Start unlocking exclusive customer enquiries in your area.", icon: <Zap size={24} /> },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-2">{step.t}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Who Can Join</h2>
            <p className="text-text-secondary mt-3">We maintain high standards to ensure quality for our customers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Professional Movers", d: "Established moving businesses with experience.", icon: <Star size={24} /> },
              { t: "Goods in Transit Insurance", d: "Valid insurance covering customer belongings.", icon: <ShieldCheck size={24} /> },
              { t: "Public Liability Insurance", d: "Protection for you and your customers.", icon: <BadgeCheck size={24} /> },
              { t: "Reliable Customer Service", d: "Professional, punctual, and communicative.", icon: <Phone size={24} /> },
              { t: "Commitment to Professionalism", d: "Uphold high standards on every job.", icon: <TrendingUp size={24} /> },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-border flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">{item.t}</h3>
                  <p className="text-text-secondary text-sm">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-3xl mx-auto text-accent">
            Ready to Join?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
            Applications are reviewed manually before approval.
          </p>
          <Link
            href="/apply-to-join"
            className="btn-orange inline-flex items-center gap-3 px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
          >
            Apply to Join <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
