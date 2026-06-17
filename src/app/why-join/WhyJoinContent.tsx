"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileCheck,
  HelpCircle,
  Lock,
  MapPin,
  Phone,
  QrCode,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import FAQ from "@/components/FAQ";

const FAQ_ITEMS = [
  {
    q: "Is it quick to apply?",
    a: "Yes. The online form asks for your business name, contact details, main service area, usual job types and weekly capacity. You can complete the first step in a few minutes.",
  },
  {
    q: "Do I need to pay to join?",
    a: "There is no monthly subscription for the main marketplace flow. Approved movers can submit quotes for suitable enquiries. Customer details are released only when the customer accepts a quote and pays the booking deposit, which is deducted from the mover's quote.",
  },
  {
    q: "What documents do I need?",
    a: "Before approval, you must email valid Goods in Transit and Public Liability insurance documents to support@manandvanclub.co.uk. We review these before granting access to customer enquiries.",
  },
  {
    q: "Will I be competing with lots of other movers?",
    a: "The platform is designed around a one-mover quote process. Customer details are not sent to lots of businesses at once, which helps avoid spammy competition and repeated calls to the customer.",
  },
  {
    q: "Can I choose where I work?",
    a: "Yes. You tell us your main service area and work radius. Approved movers can access suitable enquiries as they become available in their approved service area.",
  },
  {
    q: "When do I get the customer's contact details?",
    a: "Customer details stay protected until the customer accepts your quote and pays the booking deposit. After that, the job details and customer contact information are released so you can arrange the move directly.",
  },
];

const SIMPLE_STEPS = [
  {
    title: "Apply online",
    text: "Tell us your business name, contact details, main area and preferred job types.",
    icon: <ClipboardList size={24} />,
  },
  {
    title: "Send insurance",
    text: "Email Goods in Transit and Public Liability documents so we can review your application.",
    icon: <FileCheck size={24} />,
  },
  {
    title: "Get approved",
    text: "Once checked, you receive platform access for suitable enquiries in your service area.",
    icon: <BadgeCheck size={24} />,
  },
  {
    title: "Quote jobs you want",
    text: "Review move details, submit a total quote, then receive customer details after acceptance.",
    icon: <Phone size={24} />,
  },
];

const QUICK_BENEFITS = [
  { title: "No monthly subscription", icon: <Wallet size={20} /> },
  { title: "Simple online application", icon: <Smartphone size={20} /> },
  { title: "Protected customer details", icon: <Lock size={20} /> },
  { title: "Approved service areas", icon: <MapPin size={20} /> },
  { title: "One-mover quote process", icon: <ShieldCheck size={20} /> },
  { title: "Choose enquiries to quote", icon: <Eye size={20} /> },
];

const WHAT_YOU_NEED = [
  "Business or trading name",
  "Contact name, phone and email",
  "Main service area and work radius",
  "Usual job types and weekly capacity",
  "Goods in Transit insurance",
  "Public Liability insurance",
];

export default function WhyJoinContent() {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden bg-[#F9F9F7] border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,122,24,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(17,38,74,0.08),transparent_30%)]" />
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em]">
                <CheckCircle2 size={14} /> West Midlands founding mover network
              </div>
              <div className="space-y-5">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-primary">
                  Easy mover sign-up. Quote jobs you actually want.
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-medium">
                  Apply in a few minutes, send your insurance documents, then access suitable customer enquiries as they become available in your approved service area.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply-to-join"
                  className="btn-orange inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Apply to Join <ArrowRight size={20} />
                </Link>
                <a
                  href="mailto:support@manandvanclub.co.uk?subject=Mover%20insurance%20documents"
                  className="bg-white border-2 border-primary text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all"
                >
                  Send Insurance <ArrowUpRight size={20} />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                {[
                  "No monthly subscription",
                  "No mass lead sharing",
                  "Customer accepts before details release",
                ].map((item) => (
                  <div key={item} className="bg-white border border-border rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary/70 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-accent flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="bg-white rounded-[2.5rem] border border-border shadow-2xl p-8 lg:p-10 space-y-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-3">Mobile friendly</p>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-primary leading-none">Scan or tap to apply</h2>
                  <p className="text-sm text-text-secondary font-medium mt-4 leading-relaxed">
                    Perfect for movers on the road. Open the application on your phone and complete the first step quickly.
                  </p>
                </div>
                <QrCode size={34} className="text-accent flex-shrink-0" />
              </div>
              <div className="bg-[#F9F9F7] rounded-[2rem] p-6 border border-border text-center space-y-4">
                <img
                  src="/apply-to-join-qr.svg"
                  alt="QR code linking to the Man and Van Club mover application page"
                  className="w-48 h-48 mx-auto bg-white rounded-2xl p-3 border border-border"
                />
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/50">
                  On mobile, tap the button below instead
                </p>
              </div>
              <Link
                href="/apply-to-join"
                className="btn-orange w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center justify-center gap-3"
              >
                Start application <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Simple process</p>
            <h2 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-tighter">How it works for movers</h2>
            <p className="text-text-secondary mt-4 font-medium">
              No complicated driver app. No confusing setup. Just a clear application, manual approval, and access to suitable enquiries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIMPLE_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#F9F9F7] border border-border rounded-[2rem] p-7 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent border border-border">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black italic text-primary/10">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-primary">{step.title}</h3>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
            <div className="bg-primary text-white rounded-[2.5rem] p-8 lg:p-10 space-y-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent">
                <ClipboardCheck size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">What you need</p>
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Keep it ready before you apply</h2>
              </div>
              <p className="text-white/70 font-medium leading-relaxed">
                The form is easier when you have these details to hand. Insurance documents can be emailed after submitting the application.
              </p>
              <Link href="/apply-to-join" className="inline-flex items-center gap-3 bg-accent text-white px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                Apply now <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT_YOU_NEED.map((item) => (
                <div key={item} className="bg-white border border-border rounded-2xl p-5 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                  <span className="text-sm font-black uppercase tracking-wider text-primary/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Why it feels easier</p>
            <h2 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-tighter">Built around mover control</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUICK_BENEFITS.map((benefit) => (
              <div key={benefit.title} className="bg-[#F9F9F7] border border-border rounded-2xl p-6 flex items-center gap-4">
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-accent border border-border flex-shrink-0">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-primary">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-5">
              <HelpCircle size={14} /> Mover FAQ
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-tighter">Questions movers ask first</h2>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Ready to make joining simple?
          </h2>
          <p className="text-white/70 text-lg font-medium leading-relaxed mb-8">
            Apply online, then email your insurance documents when ready. We review applications manually before granting access to customer enquiries.
          </p>
          <Link
            href="/apply-to-join"
            className="bg-accent text-white inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
          >
            Start mover application <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
