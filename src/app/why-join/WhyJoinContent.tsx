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
    a: "There is no monthly subscription and no fee to submit quotes. A platform fee only applies when a customer accepts your quote. The customer pays a Booking Deposit through Man and Van Club, which is retained by Man and Van Club as the platform booking/introduction fee and deducted from your total quote. The current maximum platform fee deducted from an accepted quote is £50.",
  },
  {
    q: "What documents do I need?",
    a: "Before approval, you must email valid Goods in Transit, Public Liability and suitable vehicle insurance documents to partners@manandvanclub.co.uk. We review these before granting access to customer enquiries.",
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
    text: "After applying, email Goods in Transit, Public Liability and suitable vehicle insurance documents to partners@manandvanclub.co.uk so we can review your application.",
    icon: <FileCheck size={24} />,
  },
  {
    title: "Get approved",
    text: "Once checked, you receive platform access for suitable enquiries in your service area.",
    icon: <BadgeCheck size={24} />,
  },
  {
    title: "Fill quiet slots",
    text: "Review suitable enquiries, quote the jobs that fit your diary, then receive customer details after acceptance.",
    icon: <Phone size={24} />,
  },
];

const QUICK_BENEFITS = [
  { title: "No monthly subscription", icon: <Wallet size={20} /> },
  { title: "No fee to submit quotes", icon: <CheckCircle2 size={20} /> },
  { title: "Max £50 platform fee", icon: <BadgeCheck size={20} /> },
  { title: "Protected customer details", icon: <Lock size={20} /> },
  { title: "Approved service areas", icon: <MapPin size={20} /> },
  { title: "Fit jobs around your diary", icon: <Eye size={20} /> },
];

const WHAT_YOU_NEED = [
  "Business or trading name",
  "Contact name, phone and email",
  "Main service area and work radius",
  "Usual job types and weekly capacity",
  "Goods in Transit insurance",
  "Public Liability insurance",
  "Suitable vehicle insurance",
];

const BOOKING_DEPOSIT_TIERS = [
  { quote: "£45–£100", deposit: "£10", example: "£90 quote → customer pays you £80" },
  { quote: "£101–£250", deposit: "£15", example: "£200 quote → customer pays you £185" },
  { quote: "£251–£500", deposit: "£25", example: "£300 quote → customer pays you £275" },
  { quote: "£501–£1,000", deposit: "£35", example: "£800 quote → customer pays you £765" },
  { quote: "Over £1,000", deposit: "£50 maximum", example: "£1,200 quote → customer pays you £1,150" },
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
        <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-4 lg:space-y-5">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.28em]">
                <CheckCircle2 size={14} /> West Midlands founding mover network
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[0.92] text-primary max-w-4xl">
                  Easy mover sign-up. Fill quiet days with suitable moving jobs.
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-text-secondary max-w-2xl leading-relaxed font-medium">
                  Apply in a few minutes, send your insurance documents, then access suitable enquiries for furniture collections, flat moves, house removals, office moves and same-day jobs that fit your diary and service area.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/apply-to-join"
                  className="btn-orange inline-flex items-center justify-center gap-3 px-7 md:px-8 py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Apply to Join <ArrowRight size={20} />
                </Link>
                <a
                  href="mailto:partners@manandvanclub.co.uk?subject=Mover%20insurance%20documents"
                  className="bg-white border-2 border-primary text-primary px-7 md:px-8 py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all"
                >
                  Send Insurance <ArrowUpRight size={20} />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-3xl">
                {[
                  "No monthly subscription",
                  "No fee to quote",
                  "Max £50 platform fee",
                  "Details released after acceptance",
                ].map((item) => (
                  <div key={item} className="bg-white border border-border rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-wider text-primary/70 flex items-center gap-2">
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
              className="bg-white rounded-[1.75rem] border border-border shadow-lg p-5 md:p-6 space-y-5"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-accent mb-2">Apply in minutes</p>
                <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-primary leading-tight">
                  Simple mover application
                </h2>
                <p className="text-sm text-text-secondary font-medium mt-3 leading-relaxed">
                  Complete the short online form first. Insurance documents can be emailed afterwards when you are ready.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Business and contact details",
                  "Service area and work radius",
                  "Usual job types and capacity",
                  "Insurance documents after applying",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-primary/80">
                    <CheckCircle2 size={17} className="text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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

      <section className="scroll-mt-32 py-14 lg:py-20 bg-[#F9F9F7] border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
            <div className="bg-white border border-border rounded-[2rem] p-7 lg:p-9 shadow-sm space-y-5">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-accent mb-2">Before you apply</p>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-primary">Have the basics ready</h2>
              </div>
              <p className="text-text-secondary font-medium leading-relaxed">
                The application is quicker when these details are to hand. Insurance documents can be emailed after you submit the form.
              </p>
              <Link href="/apply-to-join" className="inline-flex items-center gap-3 bg-accent text-white px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-lg transition-all">
                Apply now <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT_YOU_NEED.map((item) => (
                <div key={item} className="bg-white border border-border rounded-2xl p-5 flex items-center gap-3 shadow-sm">
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
            <h2 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-tighter">Built around your working day</h2>
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

      <section className="py-14 lg:py-20 bg-[#F9F9F7] border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
            <div className="space-y-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Platform fee</p>
              <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tighter leading-tight">
                Clear charges before you quote
              </h2>
              <p className="text-text-secondary font-medium leading-relaxed">
                There is no monthly subscription and no fee to submit quotes. A platform fee only applies when a customer accepts your quote. The customer pays a Booking Deposit through Man and Van Club, Man and Van Club keeps that Booking Deposit as the platform booking/introduction fee, and you collect the remaining balance from the customer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  "No subscription",
                  "No fee to quote",
                  "£50 current maximum",
                ].map((item) => (
                  <div key={item} className="bg-white border border-border rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2 shadow-sm">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Simple example</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-[#F9F9F7] border border-border p-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-text-secondary">Accepted quote</p>
                    <p className="text-2xl font-black text-primary mt-1">£300</p>
                  </div>
                  <div className="rounded-xl bg-[#F9F9F7] border border-border p-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-text-secondary">Platform fee</p>
                    <p className="text-2xl font-black text-accent mt-1">£25</p>
                  </div>
                  <div className="rounded-xl bg-[#F9F9F7] border border-border p-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-text-secondary">Customer pays you</p>
                    <p className="text-2xl font-black text-primary mt-1">£275</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary font-medium leading-relaxed">
                  The customer should not be charged the Booking Deposit again unless the job changes or extra work is agreed.
                </p>
              </div>
            </div>

            <div className="bg-white border border-border rounded-[2rem] shadow-sm overflow-hidden">
              <div className="px-5 py-4 bg-primary text-white">
                <h3 className="text-base font-black uppercase tracking-widest">Booking Deposit / platform fee table</h3>
                <p className="text-xs text-white/70 font-medium mt-1">Current maximum platform fee deducted from an accepted quote is £50.</p>
              </div>
              <div className="divide-y divide-border">
                {BOOKING_DEPOSIT_TIERS.map((tier) => (
                  <div key={tier.quote} className="grid grid-cols-1 sm:grid-cols-[1fr_150px_1.2fr] gap-3 px-5 py-4 items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Customer accepted quote</p>
                      <p className="text-base font-black text-primary mt-1">{tier.quote}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Platform fee kept</p>
                      <p className="text-base font-black text-accent mt-1">{tier.deposit}</p>
                    </div>
                    <div className="text-sm font-bold text-primary/75 leading-relaxed">{tier.example}</div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 bg-[#F9F9F7] border-t border-border">
                <p className="text-xs text-text-secondary font-medium leading-relaxed">
                  The Booking Deposit is deducted from the mover&apos;s total quote, not added on top of the customer&apos;s move cost. The mover does not pay anything upfront to join or to submit quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-14 pb-8 bg-[#F9F9F7]">
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

      <section className="scroll-mt-32 py-8 lg:py-10 bg-white border-t border-border/70">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Popular areas — Internal Linking */}
          <div className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 mb-3">Popular areas</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/man-and-van-birmingham" className="text-xs font-black uppercase tracking-widest text-primary/50 hover:text-accent transition-colors">Man and Van Birmingham</Link>
              <span className="text-primary/20">·</span>
              <Link href="/man-and-van-walsall" className="text-xs font-black uppercase tracking-widest text-primary/50 hover:text-accent transition-colors">Man and Van Walsall</Link>
              <span className="text-primary/20">·</span>
              <Link href="/man-and-van-west-midlands" className="text-xs font-black uppercase tracking-widest text-primary/50 hover:text-accent transition-colors">West Midlands Hub</Link>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#142f63] text-white rounded-[1.75rem] px-5 py-7 sm:px-8 md:px-10 md:py-9 shadow-lg shadow-primary/10 border border-white/10 text-center">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/15 blur-2xl" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff8a2a] mb-3">Mover applications</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mb-3 text-white">
                Ready to join the mover network?
              </h2>
              <p className="text-white text-sm md:text-base font-semibold leading-relaxed mx-auto max-w-xl">
                Apply online, then email your insurance documents to <span className="font-black text-white underline decoration-white/50 underline-offset-4">partners@manandvanclub.co.uk</span> when ready. Applications are reviewed manually before access is granted.
              </p>
              <Link
                href="/apply-to-join"
                className="mt-5 bg-accent text-white inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 md:px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-black/20 hover:translate-y-[-1px] active:translate-y-0 transition-all"
              >
                Start mover application <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
