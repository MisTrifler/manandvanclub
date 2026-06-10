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
  { t: "We Match A Suitable Mover", d: "We identify a mover in your area with availability, the right capacity, and relevant experience.", icon: <UserCheck size={24} /> },
  { t: "The Mover Contacts You Directly", d: "Your matched mover will contact you by phone or email to discuss your move and provide a quote.", icon: <Phone size={24} /> },
];

const FAQ_ITEMS = [
  { q: "How does matching work?", a: "When you submit your moving details, we review your requirements including location, move size, and date. We then identify a suitable mover from our network and introduce your enquiry to them exclusively. You deal directly with the mover from that point onward." },
  { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
  { q: "Is there any obligation?", a: "No. Submitting an enquiry is completely free and without obligation. If the matched mover is not suitable, or if you decide not to proceed, you are under no obligation to book." },
  { q: "How quickly will I be contacted?", a: "We aim to have your matched mover contact you as promptly as possible. In most cases, you can expect to hear back within 24 hours, often sooner. The mover will contact you directly by phone or email to discuss your requirements." },
  { q: "Are movers vetted?", a: "We help connect customers with movers who have completed our application and verification process. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote." },
  { q: "What happens after I submit my enquiry?", a: "After submitting your enquiry, you will receive a confirmation. Our team reviews your requirements and identifies a suitable mover. Your details are introduced to that mover exclusively. The mover contacts you directly to discuss your move and provide a quote." },
  { q: "Do I need to pay to submit an enquiry?", a: "No. Submitting an enquiry through Man and Van Club is completely free for customers. There is no charge to get matched with a mover. You only pay the mover directly if you choose to book their services." },
];

const WHY_CHOOSE = [
  { t: "Verified Businesses", d: "We help connect customers with movers who have completed our application and verification process.", icon: <ShieldCheck size={24} /> },
  { t: "Secure Enquiry Process", d: "Your information is handled securely throughout the matching process.", icon: <Lock size={24} /> },
  { t: "Direct Communication", d: "Speak directly with your matched mover. No call centres or intermediaries.", icon: <Phone size={24} /> },
  { t: "Exclusive Matching", d: "Your enquiry is offered to one mover at a time. No competing companies.", icon: <Shield size={24} /> },
  { t: "Free Enquiry", d: "Submitting a move request is free and carries no obligation.", icon: <CheckCircle2 size={24} /> },
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
  { icon: <Shield size={16} />, label: "One Trusted Local Mover" },
  { icon: <BadgeCheck size={16} />, label: "Verified Business Network" },
  { icon: <Lock size={16} />, label: "Secure Enquiry Process" },
  { icon: <CheckCircle2 size={16} />, label: "Free Enquiry" },
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
      <section id="quote-form" className="relative">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT PANEL — Image + Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:w-[45%] relative flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/hero-moving.jpg"
                alt="Professional movers loading a Luton van for a residential house move"
                fill
                className="object-cover object-[center_30%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2D4F]/80 via-[#1B2D4F]/65 to-[#1B2D4F]/40" />
            </div>

            <div className="relative z-10 p-4 py-6 lg:py-5 lg:px-8 text-white">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] font-black mb-1 lg:mb-1.5 leading-[1.05] tracking-tighter max-w-[600px]"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
              >
                <span className="text-accent">Man and Van</span>{' '}
                <span className="text-white">Services Near You</span>
              </h1>

              <p
                className="text-xs lg:text-sm text-white/80 mb-1.5 max-w-[600px] font-medium leading-snug"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
              >
                Serving London, Birmingham, Manchester, Leeds, Liverpool, Bristol and locations across the UK.
              </p>

              <p
                className="text-sm lg:text-base text-white mb-2 max-w-[600px] font-medium leading-snug"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
              >
                Get matched with one verified local mover. No comparison sites. No endless quotes. No sales calls.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {TRUST_BADGES.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-white/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-primary/80"
                  >
                    <span className="text-accent">{badge.icon}</span>
                    {badge.label}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[10px]">
                <span className="font-black text-white tracking-tighter">UK-WIDE COVERAGE</span>
                <span className="text-white/40">|</span>
                <span className="font-black text-white tracking-tighter">NO OBLIGATION</span>
                <span className="text-white/40">|</span>
                <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-white/70" /><span className="text-white/80">Vetted Movers</span></span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL — Clean white, form only */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:w-[55%] w-full bg-white order-1 lg:order-2 flex flex-col justify-center pt-3 lg:pt-2 pb-3 lg:pb-2 px-4 lg:px-6"
          >
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <div className="mb-2 text-center lg:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/50">Takes less than a minute • No payment required</p>
              </div>
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── How It Works ──────────────────── */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">How It Works</h2>
            <p className="text-text-secondary mt-3">Simple, transparent, and designed around your needs.</p>
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
      <section className="py-20 bg-[#F9F9F7]">
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
      <section className="py-20 bg-white border-b border-border">
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
      <section className="py-20 bg-[#F9F9F7]">
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
      <section className="py-20 bg-white border-b border-border">
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
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-text-secondary mt-3">Everything you need to know about our matching service.</p>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ──────────────────── Final CTA ──────────────────── */}
      <section className="py-20 bg-white text-center border-b border-border">
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
