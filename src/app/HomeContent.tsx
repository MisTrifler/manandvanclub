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
  {
    t: "Submit Your Move Details",
    d: "Tell us what you need moved — from one item to a full home move — plus your postcodes, date and access notes.",
    icon: <ClipboardList size={24} />,
  },
  {
    t: "We Review Your Request",
    d: "Our team reviews your requirements to understand your move size, route, and any specific needs.",
    icon: <Search size={24} />,
  },
  {
    t: "An Approved Mover Sends a Quote",
    d: "A suitable approved mover can review the job size, route and access details before sending a quote.",
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
    q: "What types of moves can I request?",
    a: "You can request help with single-item collections, furniture delivery, student moves, flat removals, house removals, office moves, same-day jobs and long-distance moves. The form adapts to the type of move you choose.",
  },
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
    a: "A verified mover can review your request and send a quote if they can help. Once you accept and pay the booking deposit, the mover receives your details and contacts you directly. You pay the remaining balance on moving day.",
  },
  {
    q: "Are movers verified?",
    a: "We help connect customers with movers who have completed our application and verification process. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote.",
  },
  {
    q: "What happens after I submit my request?",
    a: "After submitting your request, your contact details remain protected. A verified independent mover can review anonymised details and send a quote. You choose whether to accept or decline.",
  },
  {
    q: "Do I need to pay to submit a move request?",
    a: "No. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote, and that deposit is deducted from the total quote. The remaining balance is paid directly to the mover on moving day.",
  },
];

const WHY_CHOOSE = [
  {
    t: "Flexible Move Types",
    d: "Use the same simple request flow for furniture collections, flat moves, house removals, office moves and long-distance jobs.",
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
    d: "We clearly explain how your request is reviewed and when your details are released.",
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
  { icon: <BadgeCheck size={20} />, label: "Approved movers" },
  { icon: <Lock size={20} />, label: "Details protected" },
  { icon: <CheckCircle2 size={20} />, label: "One item to full home moves" },
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

  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white">
      {/* ──────────────────── Hero Section ──────────────────── */}
      <section
        id="quote-form"
        className="relative flex items-start lg:items-center min-h-[calc(100dvh-80px)] lg:min-h-[calc(100vh-80px)] overflow-hidden scroll-mt-0"
      >
        {/* Premium image background on desktop and mobile */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-moving.jpg"
            alt="Professional movers loading a Luton van for a residential house move"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.86) 0%, rgba(15,23,42,0.74) 34%, rgba(15,23,42,0.58) 66%, rgba(15,23,42,0.78) 100%)",
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.54) 28%, rgba(15,23,42,0.22) 55%, rgba(15,23,42,0.04) 82%, rgba(15,23,42,0.00) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto w-full flex flex-col lg:flex-row lg:items-start lg:gap-10 xl:gap-14 px-4 py-5 pb-8 sm:py-8 lg:py-12 xl:py-16 lg:px-10 xl:px-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[50%] xl:w-[48%] text-white"
          >
            <p className="inline-flex items-center rounded-full bg-white/12 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
              Free move request
            </p>

            <h1
              className="mt-4 font-black tracking-tighter max-w-[760px]"
              style={{
                fontSize: "clamp(38px, 8.8vw, 78px)",
                fontWeight: 800,
                lineHeight: "0.98",
                textShadow: "0 2px 14px rgba(0,0,0,0.40)",
              }}
            >
              <span className="text-white">From one item to a</span>{" "}
              <span className="text-accent">full home move</span>
            </h1>

            <p
              className="mt-4 lg:mt-5 font-bold max-w-[680px]"
              style={{
                fontSize: "clamp(16px, 1.8vw, 25px)",
                lineHeight: "1.45",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 2px 8px rgba(0,0,0,0.30)",
              }}
            >
              Submit your move once. Furniture collections, flat moves, house removals and office moves can all be reviewed by an approved mover before you decide whether to book.
            </p>

            <div className="flex flex-wrap gap-2 mt-5 lg:mt-6">
              {TRUST_BADGES.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full font-black transition-all duration-200 lg:hover:-translate-y-0.5 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "999px",
                    padding: "9px 13px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
                    fontSize: "12px",
                    color: "rgba(15,23,42,0.86)",
                  }}
                >
                  <span className="text-accent">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
              <a
                href="tel:01217511269"
                className="flex items-center gap-2 rounded-full font-black transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "999px",
                  padding: "9px 13px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
                  fontSize: "12px",
                  color: "rgba(15,23,42,0.86)",
                }}
              >
                <Phone size={14} className="text-accent" />
                <span>Call us: 0121 751 1269</span>
              </a>
            </div>

          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="w-full lg:w-[50%] xl:w-[48%] mt-5 lg:mt-0"
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
              From single-item collections to full home moves, without your details being passed around to lots of companies.
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
      <section className="py-14 lg:py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              We Verify Businesses Before They Join
            </h2>
            <p className="text-text-secondary mt-3">
              Applications are reviewed before movers receive access to customer
              enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
            {VERIFICATION_CHECKS.map((check, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border p-5 min-h-[104px] flex items-center justify-start gap-3 shadow-sm"
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
      <section className="py-14 lg:py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Popular Moving Services
            </h2>
            <p className="text-text-secondary mt-3 text-sm">
              Choose the right route for your job — from one bulky item to a full home or office move.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
            {[
              { label: "House Removals", href: "/house-removals", desc: "Full home moves, bedrooms, access and packing notes." },
              { label: "Flat Moves", href: "/flat-removals", desc: "Apartments, stairs, lifts, parking and loading access." },
              { label: "Office Relocations", href: "/office-removals", desc: "Desks, IT equipment, timing and business access details." },
              { label: "Student Moves", href: "/student-removals", desc: "Halls, shared houses, boxes, bags and term-time moves." },
              { label: "Furniture Delivery", href: "/furniture-delivery", desc: "Sofas, beds, wardrobes, appliances, marketplace buys and store collections." },
              { label: "Long Distance Moves", href: "/long-distance-removals", desc: "City-to-city and UK-wide route-based move requests." },
              { label: "Same Day Moves", href: "/same-day-man-and-van", desc: "Urgent local moves and last-minute collections." },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-2xl border border-border p-5 min-h-[132px] flex flex-col justify-between hover:border-accent hover:shadow-md transition-all"
              >
                <span className="text-sm font-black text-primary uppercase tracking-tight group-hover:text-accent transition-colors">
                  {service.label}
                </span>
                <span className="mt-4 text-xs font-medium leading-relaxed text-text-secondary">
                  {service.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── Popular in the West Midlands ──────────────────── */}
      <section className="py-14 lg:py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Popular in the West Midlands
            </h2>
            <p className="text-text-secondary mt-3 text-sm">
              Start with our West Midlands hub, then choose your town or city page.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "West Midlands", slug: "man-and-van-west-midlands" },
              { name: "Birmingham", slug: "man-and-van-birmingham" },
              { name: "Walsall", slug: "man-and-van-walsall" },
              { name: "Wolverhampton", slug: "man-and-van-wolverhampton" },
              { name: "Dudley", slug: "man-and-van-dudley" },
              { name: "West Bromwich", slug: "man-and-van-west-bromwich" },
              { name: "Solihull", slug: "man-and-van-solihull" },
              { name: "Coventry", slug: "man-and-van-coventry" },
              { name: "Stourbridge", slug: "man-and-van-stourbridge" },
              { name: "Halesowen", slug: "man-and-van-halesowen" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className="text-center bg-[#F9F9F7] rounded-2xl border border-border p-5 min-h-[88px] flex items-center justify-center hover:border-accent hover:shadow-md transition-all"
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
              View all areas <ArrowUpRight size={16} />
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
            Submit one clear request for anything from a single item to a full home move. Your contact details stay private until you accept an approved mover quote and book.
          </p>
          <Link
            href="#quote-form"
            className="btn-orange px-10 md:px-14 py-5 md:py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3"
          >
            Start Your Move Request <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* ──────────────────── SEO Content Block ──────────────────── */}
      <section className="py-16 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">
            Man and Van Services Across the West Midlands and UK
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Man and Van Club helps customers submit free move requests for everything from single-item furniture collections to full house removals, flat moves, office relocations, student moves and long-distance removals. We are focusing first on strong West Midlands coverage, especially <a href="/man-and-van-birmingham" className="font-black text-accent hover:underline">man and van Birmingham</a>, <a href="/man-and-van-walsall" className="font-black text-accent hover:underline">man and van Walsall</a>, <a href="/man-and-van-wolverhampton" className="font-black text-accent hover:underline">man and van Wolverhampton</a> and <a href="/same-day-man-and-van" className="font-black text-accent hover:underline">same-day man and van</a> requests.
          </p>
        </div>
      </section>
    </div>
  );
}
