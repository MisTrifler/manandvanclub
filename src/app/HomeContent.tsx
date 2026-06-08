"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Zap,
  Lock,
  ClipboardList,
  Search,
  UserCheck,
  Phone,
  Eye,
  Handshake,
  PhoneOff,
  BadgeCheck,
  Users,
  Star,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { SERVICES } from "@/constants/services";
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
  { q: "Are movers vetted?", a: "We aim to connect customers with reliable moving professionals. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote." },
  { q: "What happens after I submit my enquiry?", a: "After submitting your enquiry, you will receive a confirmation. Our team reviews your requirements and identifies a suitable mover. Your details are introduced to that mover exclusively. The mover contacts you directly to discuss your move and provide a quote." },
  { q: "Do I need to pay to submit an enquiry?", a: "No. Submitting an enquiry through Man and Van Club is completely free for customers. There is no charge to get matched with a mover. You only pay the mover directly if you choose to book their services." },
];

const WHY_CHOOSE = [
  { t: "Trusted Local Movers", d: "We help connect customers with movers who have completed our application and verification process.", icon: <Users size={24} /> },
  { t: "Less Time Comparing Companies", d: "Tell us about your move and we'll help connect you with a suitable mover.", icon: <Search size={24} /> },
  { t: "Reduced Spam Calls", d: "Your details are not shared with numerous moving companies.", icon: <PhoneOff size={24} /> },
  { t: "Secure Enquiry Process", d: "Your information is handled securely throughout the matching process.", icon: <Lock size={24} /> },
  { t: "Free Enquiry", d: "Submitting a move request is free and carries no obligation.", icon: <CheckCircle2 size={24} /> },
];

const VERIFICATION_CHECKS = [
  "Business Details Verification",
  "Contact Information Verification",
  "Goods in Transit Insurance",
  "Public Liability Insurance",
  "Service Area Verification",
];

const COMMITMENTS = [
  { t: "Transparent Matching", d: "We clearly explain how we match you with a mover and what happens to your details.", icon: <Eye size={24} /> },
  { t: "Vetted Movers", d: "We aim to connect customers with reliable moving professionals who meet our standards.", icon: <ShieldCheck size={24} /> },
  { t: "Simple Process", d: "No comparing multiple quotes. Submit once and let us handle the matching.", icon: <Zap size={24} /> },
  { t: "Direct Communication", d: "Speak directly with your matched mover. No call centres or intermediaries.", icon: <Handshake size={24} /> },
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
      {/* Hero Section */}
      <section id="quote-form" className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-80px)]">

          {/* LEFT PANEL — Image + Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 relative flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Background image — confined to left panel only */}
            <div className="absolute inset-0">
              <Image
                src="/images/hero-moving.jpg"
                alt="Professional movers loading a Luton van for a residential house move"
                fill
                className="object-cover object-[center_30%]"
                priority
              />
              {/* Gradient overlay: left-to-right, 80-85% left, 70% middle, 50% right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2D4F]/85 via-[#1B2D4F]/70 to-[#1B2D4F]/50" />
            </div>

            {/* Text content */}
            <div className="relative z-10 p-4 py-10 lg:p-12 lg:pl-16">
              {/* Premium content panel: semi-transparent navy with soft blur */}
              <div className="bg-[#1B2D4F]/75 backdrop-blur-md rounded-3xl p-5 lg:p-10 max-w-[620px] text-white">
                <div className="hidden lg:inline-flex items-center bg-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-5 border border-white/30">
                  UK-Wide Moving Service
                </div>

                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black mb-5 lg:mb-6 leading-[1.05] tracking-tighter max-w-[580px]"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
                >
                  Man and Van Services Near You
                </h1>

                <p
                  className="text-base sm:text-lg lg:text-xl text-white mb-7 max-w-[550px] font-medium leading-relaxed"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
                >
                  Get matched with a suitable local mover who contacts you directly. No endless quote comparisons or unnecessary sales calls.
                </p>

                {/* Trust badges — highly visible against darker image */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {TRUST_BADGES.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-bold text-primary/80"
                    >
                      <span className="text-accent">{badge.icon}</span>
                      {badge.label}
                    </div>
                  ))}
                </div>

                {/* Verification message — prominent with icon */}
                <div className="flex items-start gap-2 mb-8">
                  <ShieldCheck size={14} className="text-white/70 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/80 font-medium leading-relaxed">
                    Applications are reviewed before movers receive access to customer enquiries.
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <div className="font-black text-white text-2xl tracking-tighter">UK-WIDE</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Coverage</div>
                  </div>
                  <div className="h-8 w-px bg-white/30" />
                  <div>
                    <div className="font-black text-white text-2xl tracking-tighter">NO OBLIGATION</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Free Enquiry</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL — Clean white, form only */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:w-1/2 w-full bg-white order-1 lg:order-2 flex flex-col justify-center pt-4 lg:pt-0 pb-4 lg:pb-0 px-4 lg:px-12"
          >
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <div className="mb-3 text-center lg:text-left">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/50">Takes less than a minute • No payment required</p>
              </div>
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Supporting Text */}
      <section className="bg-white border-b border-border py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm text-text-secondary leading-relaxed">
            Man and Van Club helps connect customers with suitable local movers for house removals, flat moves, furniture collection, office relocations and long-distance moves across the UK.
          </p>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-y border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm font-bold text-primary/70">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Exclusive Matching</span>
            <span className="hidden md:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Vetted Movers</span>
            <span className="hidden md:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> UK Coverage</span>
            <span className="hidden md:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> No Obligation</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-10 lg:py-14 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-4xl font-black tracking-tighter text-primary">UK-WIDE</div>
              <p className="text-sm text-text-secondary mt-1">Nationwide coverage across the UK</p>
            </div>
            <div className="border-y md:border-y-0 md:border-x border-border py-8 md:py-0">
              <div className="text-4xl font-black tracking-tighter text-primary">NO OBLIGATION</div>
              <p className="text-sm text-text-secondary mt-1">Submit your details without commitment</p>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tighter text-primary">1-TO-1</div>
              <p className="text-sm text-text-secondary mt-1">Exclusive match — only one mover sees you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Choose Man and Van Club */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Why Customers Choose Man and Van Club</h2>
            <p className="text-text-secondary mt-3">A simpler, more trustworthy way to find a mover.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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

      {/* How It Works */}
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

      {/* What We Check */}
      <section className="py-20 bg-[#F9F9F7]">
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

      {/* Customer Reviews — Placeholder */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Customer Reviews</h2>
            <p className="text-text-secondary mt-3">Real feedback from people who have used our service.</p>
          </div>

          <div className="bg-[#F9F9F7] rounded-3xl border border-border p-12 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} className="text-border fill-border" />
              ))}
            </div>
            <p className="text-sm text-text-secondary font-medium">
              Customer reviews will appear here as our network continues to grow.
            </p>
            <p className="text-xs text-primary/40 mt-2 font-bold uppercase tracking-widest">
              Reviews Component Ready For Future Use
            </p>
          </div>

          {/* Review card design preview — hidden until reviews are available */}
          <div className="hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-3xl border border-border p-8">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-primary/80 mb-4">"Review text will go here."</p>
                <div className="text-xs font-bold text-primary/40 uppercase tracking-widest">Name, Location</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - No Images */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Smart Solutions For Every Move</h2>
            </div>
            <Link href="/areas-covered" className="text-accent font-black text-sm flex items-center gap-1 hover:gap-2 transition-all">View all areas <ArrowUpRight size={16} /></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.h} className="group bg-white rounded-3xl border border-border p-8 hover:shadow-xl transition-all flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                    {s.i}
                  </div>
                </div>
                <h3 className="font-black text-xl text-primary tracking-tight mb-3">{s.t}</h3>
                <p className="text-sm text-text-secondary flex-1">{s.d}</p>
                <div className="pt-4 text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-accent transition-colors">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Moving Services — SEO keyword section */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Popular Moving Services</h2>
            <p className="text-text-secondary mt-3 text-sm">Find the right service for your move.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { label: "House Removals", href: "/house-removals" },
              { label: "Flat Removals", href: "/flat-removals" },
              { label: "Office Relocations", href: "/office-removals" },
              { label: "Student Moves", href: "/student-removals" },
              { label: "Furniture Collection", href: "/furniture-delivery" },
              { label: "Long Distance Moves", href: "/long-distance-removals" },
              { label: "Same Day Moves", href: "/same-day-man-and-van" },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="text-center bg-[#F9F9F7] rounded-2xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
              >
                <span className="text-sm font-black text-primary uppercase tracking-tight">{service.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Areas We Cover — Local SEO section */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Popular Areas We Cover</h2>
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
                className="text-center bg-white rounded-2xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
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

      {/* Our Commitment */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Our Commitment</h2>
            <p className="text-text-secondary mt-3">How we build trust through transparency and simplicity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMMITMENTS.map((item, i) => (
              <div key={i} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border">
                <div className="flex text-accent mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-black text-primary text-lg mb-2">{item.t}</h3>
                <p className="text-primary/80 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-text-secondary mt-3">Everything you need to know about our matching service.</p>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#F9F9F7] text-center border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-3xl mx-auto text-primary">Ready To Find Your Trusted Local Mover?</h2>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">Submit your details and get matched with a suitable mover. No spam, no bidding wars, just one direct introduction.</p>
          <Link href="#quote-form" className="btn-orange px-10 md:px-14 py-5 md:py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3">
            Get Matched Now <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
