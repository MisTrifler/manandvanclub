"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Lock,
  ClipboardList,
  Search,
  UserCheck,
  Phone,
  BadgeCheck,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import FAQ from "@/components/FAQ";

const STEPS = [
  { t: "Submit Your Move Details", d: "Tell us where you are moving from and to, your preferred date, and a few details about your move.", icon: <ClipboardList size={24} /> },
  { t: "We Review Your Request", d: "Our team reviews your requirements to understand your move size, route, and any specific needs.", icon: <Search size={24} /> },
  { t: "A Vetted Mover Sends a Quote", d: "Approved local movers can review anonymised move details and submit a quote if they can help.", icon: <UserCheck size={24} /> },
  { t: "Accept or Decline Securely", d: "You receive a secure quote review link. Your details are released to the mover only if you accept the quote and secure your booking with a deposit.", icon: <Phone size={24} /> },
];

const FAQ_ITEMS = [
  { q: "How does matching work?", a: "Submit your move details for free. One verified local mover reviews them and sends you a total quote through a secure review link. You decide whether to accept." },
  { q: "Will multiple movers contact me?", a: "No. Your details are not shared with multiple companies. They are only released to the mover whose quote you accept." },
  { q: "Is there any obligation?", a: "No. You can request a quote for free and decide whether you want to go ahead once your mover quote is ready." },
  { q: "What is the booking deposit?", a: "The deposit secures your booking and is deducted from the mover’s quote. You pay the rest on moving day." },
  { q: "Will my total cost increase?", a: "No. Your mover quote is your total move cost. The deposit is deducted from that quote." },
  { q: "How does payment work?", a: "You request a quote for free. If you accept, you pay a deposit to secure your booking, then pay the remaining balance directly to your mover on moving day." },
  { q: "What if my plans change?", a: "We understand moving can be chaotic. If your plans change, contact us or your mover as soon as possible so we can help." },
  { q: "How quickly will I receive a quote?", a: "A vetted mover can review your request and send a quote if they can help. Once you accept and pay the booking deposit, the mover receives your details and contacts you directly. You pay the remaining balance on moving day." },
  { q: "Are movers vetted?", a: "We help connect customers with movers who have completed our application and verification process. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote." },
  { q: "What happens after I submit my request?", a: "After submitting your request, your contact details remain protected. A vetted local mover can review anonymised details and send a quote. You choose whether to accept or decline." },
  { q: "Do I need to pay to get a quote?", a: "No. You can get your quote for free and decide once it is ready." },
];

const WHY_CHOOSE = [
  { t: "Verified Businesses", d: "We help connect customers with movers who have completed our application and verification process.", icon: <ShieldCheck size={24} /> },
  { t: "Secure Enquiry Process", d: "Your information is handled securely throughout the matching process.", icon: <Lock size={24} /> },
  { t: "Direct Communication", d: "After you accept a quote and pay the booking deposit, your mover contacts you directly and you pay the remaining balance on moving day.", icon: <Phone size={24} /> },
  { t: "One Mover Process", d: "Your details are not shared with multiple companies or sales teams.", icon: <Shield size={24} /> },
  { t: "Free To Submit", d: "Get your quote free. Secure your booking with a deposit and pay the rest on moving day.", icon: <CheckCircle2 size={24} /> },
  { t: "Transparent Process", d: "We clearly explain how we match you with a mover and what happens to your details.", icon: <Search size={24} /> },
];

const VERIFICATION_CHECKS = [
  "Business Details Verification",
  "Contact Information Verification",
  "Goods in Transit Insurance",
  "Public Liability Insurance",
  "Service Area Verification",
];

const TRUST_BADGES = [
  { icon: <Shield size={20} />, label: "One Trusted Local Mover" },
  { icon: <BadgeCheck size={20} />, label: "Verified Business Network" },
  { icon: <Lock size={20} />, label: "Secure Enquiry Process" },
  { icon: <CheckCircle2 size={20} />, label: "Free To Submit" },
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
      {/* ──────────────────── Hero Section ──────────────────── */}
      <section id="quote-form" className="relative flex items-start lg:items-center min-h-[calc(100dvh-80px)] lg:min-h-[calc(100vh-80px)]">
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-moving.jpg"
            alt="Professional movers loading a Luton van for a residential house move"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Premium directional overlay — image visible, text readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.50) 25%, rgba(15,23,42,0.20) 50%, rgba(15,23,42,0.05) 75%, rgba(15,23,42,0.00) 100%)',
            }}
          />
        </div>

        {/* Content container — both panels share the same visual environment */}
        <div className="relative z-10 max-w-[1800px] mx-auto w-full flex flex-col lg:flex-row lg:items-start lg:gap-10 xl:gap-14 p-4 py-6 sm:py-8 lg:py-12 xl:py-16 lg:px-10 xl:px-14">
          {/* LEFT PANEL — Content directly on image, no heavy card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[50%] xl:w-[48%] text-white"
          >
            <h1
              className="font-black tracking-tighter"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 80px)',
                fontWeight: 800,
                lineHeight: '0.95',
                textShadow: '0 2px 12px rgba(0,0,0,0.35)',
              }}
            >
              <span className="text-accent">Man and Van</span>{' '}
              <span className="text-white">Services Near You</span>
            </h1>

            <p
              className="mt-4 lg:mt-5 font-semibold lg:font-bold"
              style={{
                fontSize: 'clamp(17px, 1.8vw, 26px)',
                lineHeight: '1.45',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 2px 8px rgba(0,0,0,0.30)',
              }}
            >
              Serving London, Birmingham, Manchester, Leeds, Liverpool, Bristol and locations across the UK.
            </p>

            <p
              className="mt-3 font-medium"
              style={{
                fontSize: 'clamp(15px, 1.4vw, 20px)',
                lineHeight: '1.55',
                color: 'rgba(255,255,255,0.92)',
                maxWidth: '600px',
                textShadow: '0 1px 6px rgba(0,0,0,0.25)',
              }}
            >
              Get your free quote. Secure your booking with a deposit and pay the rest on moving day. Plans changed? We understand moving is chaotic.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-5 lg:mt-6">
              {TRUST_BADGES.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full font-bold text-primary/85 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '999px',
                    padding: '10px 16px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
                    fontSize: '13px',
                  }}
                >
                  <span className="text-accent">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-5 lg:mt-6 text-xs lg:text-sm">
              <span className="font-black text-white tracking-tighter">UK-WIDE COVERAGE</span>
              <span className="text-white/40">|</span>
              <span className="font-black text-white tracking-tighter">FREE TO SUBMIT</span>
              <span className="text-white/40">|</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-white/70" /><span className="text-white/80">Vetted Movers</span></span>
            </div>
          </motion.div>

          {/* RIGHT PANEL — Clean white conversion card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="w-full lg:w-[50%] xl:w-[48%] mt-6 lg:mt-0"
          >
            <div className="w-full lg:max-w-[580px] lg:ml-auto">
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── How It Works ──────────────────── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">How It Works</h2>
            <p className="text-text-secondary mt-3">Get your quote free. Secure your booking with a deposit and pay the rest on moving day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
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

      {/* ──────────────────── Why Customers Choose ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Why Customers Choose Man and Van Club</h2>
            <p className="text-text-secondary mt-3">A simpler, more trustworthy way to find a mover.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl border border-border p-8 hover:shadow-xl transition-all flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-black text-xl text-primary tracking-tight mb-3">{item.t}</h3>
                <p className="text-sm text-text-secondary flex-1">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── We Verify Businesses ──────────────────── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">We Verify Businesses Before They Join</h2>
            <p className="text-text-secondary mt-3">Applications are reviewed before movers receive access to customer enquiries.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VERIFICATION_CHECKS.map((check, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <span className="text-sm font-bold text-primary">{check}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── Popular Moving Services ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Popular Moving Services</h2>
            <p className="text-text-secondary mt-3 text-sm">Find the right service for your move.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { label: "House Removals", href: "/house-removals" },
              { label: "Flat Moves", href: "/flat-removals" },
              { label: "Office Relocations", href: "/office-removals" },
              { label: "Student Moves", href: "/student-removals" },
              { label: "Furniture Collection", href: "/furniture-delivery" },
              { label: "Long Distance Moves", href: "/long-distance-removals" },
              { label: "Same Day Moves", href: "/same-day-man-and-van" },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="text-center bg-white rounded-2xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
              >
                <span className="text-sm font-black text-primary uppercase tracking-tight">{service.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── Popular Areas We Cover ──────────────────── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Popular Areas We Cover</h2>
            <p className="text-text-secondary mt-3 text-sm">Local man and van services across the UK.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Birmingham", slug: "man-and-van-birmingham" },
              { name: "London", slug: "man-and-van-london" },
              { name: "Manchester", slug: "man-and-van-manchester" },
              { name: "Leeds", slug: "man-and-van-leeds" },
              { name: "Liverpool", slug: "man-and-van-liverpool" },
              { name: "Bristol", slug: "man-and-van-bristol" },
              { name: "Wolverhampton", slug: "man-and-van-wolverhampton" },
              { name: "Walsall", slug: "man-and-van-walsall" },
              { name: "Coventry", slug: "man-and-van-coventry" },
              { name: "Dudley", slug: "man-and-van-dudley" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className="text-center bg-[#F9F9F7] rounded-2xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
              >
                <span className="text-sm font-black text-primary uppercase tracking-tight">{loc.name}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/areas-covered" className="text-accent font-black text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              View all 93 areas <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-text-secondary mt-3">Everything you need to know about our matching service.</p>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ──────────────────── Final CTA ──────────────────── */}
      <section className="py-16 bg-white text-center border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-3xl mx-auto text-primary">Ready To Get Matched With A Local Mover?</h2>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">Submit your move details and we will help connect you with a suitable mover.</p>
          <Link href="#quote-form" className="btn-orange px-10 md:px-14 py-5 md:py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3">
            Get Matched Now <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* ──────────────────── SEO Content Block ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">Man and Van Services Across the UK</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Man and Van Club helps connect customers with suitable movers for house removals, flat moves, office relocations, furniture collections, student moves and long-distance removals across the UK.
          </p>
        </div>
      </section>
    </div>
  );
}
