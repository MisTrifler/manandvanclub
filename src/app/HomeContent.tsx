"use client";

import { useEffect } from "react";
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
import { motion } from "framer-motion";
import FAQ from "@/components/FAQ";

const STEPS = [
  {
    t: "Submit Your Move Details",
    d: "Tell us where you are moving from and to, your preferred date, and a few details about your move.",
    icon: <ClipboardList size={24} />,
  },
  {
    t: "We Review Your Request",
    d: "Our team reviews your requirements to understand your move size, route, and any specific needs.",
    icon: <Search size={24} />,
  },
  {
    t: "A Vetted Mover Sends a Quote",
    d: "Approved local movers can review anonymised move details and submit a quote if they can help.",
    icon: <UserCheck size={24} />,
  },
  {
    t: "Accept or Decline Securely",
    d: "You receive a secure quote review link. Your details are released only if you accept the quote and pay the booking deposit, which is deducted from the mover quote.",
    icon: <Phone size={24} />,
  },
];

const FAQ_ITEMS = [
  {
    q: "How does matching work?",
    a: "Submit your move details for free. Approved movers see anonymised details and may submit a total quote. You receive one quote review link, pay a booking deposit only if you accept, and that deposit is deducted from the mover quote.",
  },
  {
    q: "Will multiple movers contact me?",
    a: "No. Your details are not shared with multiple companies. They are only released to the mover whose quote you accept.",
  },
  {
    q: "Is there any obligation?",
    a: "No. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote, and that deposit is deducted from the total quote.",
  },
  {
    q: "How quickly will I receive a quote?",
    a: "A vetted mover can review your request and send a quote if they can help. Once you accept and pay the booking deposit, the mover receives your details and contacts you directly. You pay the remaining balance on moving day.",
  },
  {
    q: "Are movers vetted?",
    a: "We help connect customers with movers who have completed our application and verification process. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote.",
  },
  {
    q: "What happens after I submit my request?",
    a: "After submitting your request, your contact details remain protected. A vetted local mover can review anonymised details and send a quote. You choose whether to accept or decline.",
  },
  {
    q: "Do I need to pay to submit a move request?",
    a: "No. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote, and that deposit is deducted from the total quote. The remaining balance is paid directly to the mover on moving day.",
  },
];

const WHY_CHOOSE = [
  {
    t: "Verified Businesses",
    d: "We help connect customers with movers who have completed our application and verification process.",
    icon: <ShieldCheck size={24} />,
  },
  {
    t: "Secure Enquiry Process",
    d: "Your information is handled securely throughout the matching process.",
    icon: <Lock size={24} />,
  },
  {
    t: "Direct Communication",
    d: "After you accept a quote and pay the booking deposit, your mover contacts you directly and you pay the remaining balance on moving day.",
    icon: <Phone size={24} />,
  },
  {
    t: "One Mover Process",
    d: "Your details are not shared with multiple companies or sales teams.",
    icon: <Shield size={24} />,
  },
  {
    t: "Free To Submit",
    d: "Submitting a move request is free. Booking deposit only if you accept a mover quote, and it is deducted from the quote.",
    icon: <CheckCircle2 size={24} />,
  },
  {
    t: "Transparent Process",
    d: "We clearly explain how we match you with a mover and what happens to your details.",
    icon: <Search size={24} />,
  },
];

const VERIFICATION_CHECKS = [
  "Business Details Verification",
  "Contact Information Verification",
  "Goods in Transit Insurance",
  "Public Liability Insurance",
  "Service Area Verification",
];

const TRUST_BADGES = [
  { icon: <BadgeCheck size={20} />, label: "Verified movers" },
  { icon: <Lock size={20} />, label: "Secure enquiry" },
  { icon: <CheckCircle2 size={20} />, label: "Pay balance on moving day" },
];

export default function HomeContent() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };


  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#quote-form") {
      window.history.replaceState(null, "", "/get-started");
      window.location.assign("/get-started");
    }
  }, []);

  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white">
      {/* ──────────────────── Hero Section ──────────────────── */}
      <section
        id="home-hero"
        className="relative overflow-hidden bg-primary text-white"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-mover-bg.png"
            alt="Movers loading a van outside a home"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/65 to-primary/90 lg:bg-gradient-to-r lg:from-primary/85 lg:via-primary/60 lg:to-primary/10" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-56px)] w-full max-w-[1800px] items-start px-4 pb-8 pt-7 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:items-center lg:px-14 lg:py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full max-w-3xl lg:max-w-4xl"
          >
            <p className="inline-flex rounded-full bg-white/12 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white ring-1 ring-white/15 backdrop-blur-md lg:text-xs">
              Free move request
            </p>

            <h1 className="mt-4 max-w-4xl text-[42px] font-black leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-[76px]">
              Get matched with a <span className="text-accent">verified local mover</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-white/92 sm:text-lg lg:text-2xl">
              Free to submit. No spam. Your details are only shared when you accept a quote.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[11px] font-black text-primary shadow-lg shadow-black/10 lg:px-4 lg:py-2.5 lg:text-xs"
                >
                  <span className="text-accent">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/get-started"
                className="btn-orange inline-flex w-full items-center justify-center gap-3 rounded-2xl px-7 py-5 text-xs font-black uppercase tracking-[0.18em] shadow-2xl shadow-accent/25 transition-transform active:scale-[0.98] sm:w-auto lg:text-sm"
              >
                Start free move request <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-white/12 px-7 py-5 text-xs font-black uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/18 sm:w-auto lg:text-sm"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-7 max-w-2xl rounded-[24px] bg-white/95 p-4 text-primary shadow-2xl shadow-black/15 lg:mt-9 lg:p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/45">
                How it works
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  "Tell us your move",
                  "A verified mover reviews it",
                  "Accept securely",
                ].map((item, index) => (
                  <div key={item} className="rounded-2xl bg-gray-50 px-2 py-3">
                    <div className="mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-black text-accent">
                      {index + 1}
                    </div>
                    <p className="text-[10px] font-black leading-tight text-primary lg:text-xs">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold text-text-secondary lg:text-xs">
                You only go through the move request form after choosing to start.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── How It Works ──────────────────── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              How It Works
            </h2>
            <p className="text-text-secondary mt-3">
              Free to submit, with a booking deposit only if you accept a mover
              quote. The deposit is deducted from the quote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-2">
                  {step.t}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── Why Customers Choose ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Why Customers Choose Man and Van Club
            </h2>
            <p className="text-text-secondary mt-3">
              A simpler, more trustworthy way to find a mover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl border border-border p-8 hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className="mb-4 text-accent">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-black text-xl text-primary tracking-tight mb-3">
                  {item.t}
                </h3>
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
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              We Verify Businesses Before They Join
            </h2>
            <p className="text-text-secondary mt-3">
              Applications are reviewed before movers receive access to customer
              enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VERIFICATION_CHECKS.map((check, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border p-6 flex items-center gap-3"
              >
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
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Popular Moving Services
            </h2>
            <p className="text-text-secondary mt-3 text-sm">
              Find the right service for your move.
            </p>
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
                <span className="text-sm font-black text-primary uppercase tracking-tight">
                  {service.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── Popular Areas We Cover ──────────────────── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Popular Areas We Cover
            </h2>
            <p className="text-text-secondary mt-3 text-sm">
              Local man and van services across the UK.
            </p>
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
                <span className="text-sm font-black text-primary uppercase tracking-tight">
                  {loc.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/areas-covered"
              className="text-accent font-black text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all 93 areas <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary mt-3">
              Everything you need to know about our matching service.
            </p>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ──────────────────── Final CTA ──────────────────── */}
      <section className="py-16 bg-white text-center border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-3xl mx-auto text-primary">
            Ready To Start Your Move Request?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Tell us what you need moved and we will help connect you with a
            suitable verified mover.
          </p>
          <Link
            href="/get-started"
            className="btn-orange px-10 md:px-14 py-5 md:py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3"
          >
            Start Move Request <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* ──────────────────── SEO Content Block ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">
            Man and Van Services Across the UK
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Man and Van Club helps connect customers with suitable movers for
            house removals, flat moves, office relocations, furniture
            collections, student moves and long-distance removals across the UK.
          </p>
        </div>
      </section>
    </div>
  );
}
