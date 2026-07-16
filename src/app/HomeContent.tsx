"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowUpRight,
  Home,
  Building2,
  GraduationCap,
  Sofa,
  Clock,
  Truck,
  Package,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import { HOME_FAQ_ITEMS } from "@/constants/home-faq";

const MOVE_TYPES = [
  {
    label: "Home Removals",
    desc: "Full house moves",
    href: "#quote-form",
    icon: <Home size={32} />,
    color: "from-blue-600 to-blue-800",
    accent: "bg-blue-500/20",
  },
  {
    label: "Flat Moves",
    desc: "Apartments & studios",
    href: "#quote-form",
    icon: <Building2 size={32} />,
    color: "from-indigo-600 to-indigo-800",
    accent: "bg-indigo-500/20",
  },
  {
    label: "Furniture Delivery",
    desc: "Sofas, beds & more",
    href: "#quote-form",
    icon: <Sofa size={32} />,
    color: "from-amber-600 to-amber-800",
    accent: "bg-amber-500/20",
  },
  {
    label: "Student Moves",
    desc: "Halls & shared houses",
    href: "#quote-form",
    icon: <GraduationCap size={32} />,
    color: "from-emerald-600 to-emerald-800",
    accent: "bg-emerald-500/20",
  },
  {
    label: "Same Day",
    desc: "Urgent & last-minute",
    href: "#quote-form",
    icon: <Clock size={32} />,
    color: "from-red-600 to-red-800",
    accent: "bg-red-500/20",
  },
  {
    label: "Long Distance",
    desc: "City-to-city UK moves",
    href: "#quote-form",
    icon: <Truck size={32} />,
    color: "from-purple-600 to-purple-800",
    accent: "bg-purple-500/20",
  },
];

const POPULAR_AREAS = [
  { name: "Birmingham", slug: "man-and-van-birmingham" },
  { name: "Walsall", slug: "man-and-van-walsall" },
  { name: "London", slug: "man-and-van-london" },
  { name: "Manchester", slug: "man-and-van-manchester" },
  { name: "Leeds", slug: "man-and-van-leeds" },
  { name: "Liverpool", slug: "man-and-van-liverpool" },
  { name: "Bristol", slug: "man-and-van-bristol" },
  { name: "Sheffield", slug: "man-and-van-sheffield" },
  { name: "Edinburgh", slug: "man-and-van-edinburgh" },
  { name: "Cardiff", slug: "man-and-van-cardiff" },
  { name: "Nottingham", slug: "man-and-van-nottingham" },
  { name: "Newcastle", slug: "man-and-van-newcastle-upon-tyne" },
];

export default function HomeContent() {
  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white">

      {/* ──────────────────── Hero: Headline + Move Type Tiles ──────────────────── */}
      <section
        id="quote-form"
        className="relative flex items-center min-h-[calc(100dvh-80px)] lg:min-h-screen overflow-hidden scroll-mt-0"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-moving.jpg"
            alt="Professional movers loading a Luton van for a residential house move"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/80 to-[#0f172a]/90" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          {/* Headline + badges */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/80 ring-1 ring-white/15 backdrop-blur-sm mb-5">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Open now · From £50
            </div>

            <h1
              className="font-black tracking-tighter text-white max-w-3xl mx-auto"
              style={{ fontSize: "clamp(36px, 7vw, 72px)", lineHeight: "0.95" }}
            >
              What do you need
              <span className="text-accent block mt-1">moving?</span>
            </h1>

            <p
              className="mt-4 font-bold text-white/80 max-w-xl mx-auto"
              style={{ fontSize: "clamp(15px, 1.6vw, 20px)", lineHeight: "1.5" }}
            >
              Tap a move type below to get started. One verified mover reviews your details before you book.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <div className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-black text-primary shadow-md">
                <ShieldCheck size={14} className="text-accent" />
                Approved movers
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-black text-primary shadow-md">
                <CheckCircle2 size={14} className="text-accent" />
                Free to submit
              </div>
              <a href="tel:01217511269" className="flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-xs font-black text-white shadow-md hover:bg-accent/90 transition-colors">
                <Phone size={14} />
                0121 751 1269
              </a>
            </div>
          </div>

          {/* ── Move Type Tiles (AnyVan-style) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 max-w-5xl mx-auto mb-10">
            {MOVE_TYPES.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 hover:border-accent/60 hover:bg-white/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] p-4 lg:p-5 text-center flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${type.accent} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <span className="text-sm lg:text-base font-black text-white tracking-tight leading-tight">
                  {type.label}
                </span>
                <span className="text-[11px] font-medium text-white/60 leading-tight">
                  {type.desc}
                </span>
              </Link>
            ))}
          </div>

          {/* ── Quote Form ── */}
          <div className="max-w-xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ──────────────────── How It Works — 3 steps, minimal ──────────────────── */}
      <section className="py-14 lg:py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter text-center mb-3">
            How It Works
          </h2>
          <p className="text-text-secondary text-center mb-10 text-sm">
            Three steps. Free to submit. Booking deposit only if you accept a quote.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Tell us what you need moved", desc: "Postcodes, items, date, access notes — takes under a minute.", icon: <Package size={24} /> },
              { step: "2", title: "A verified mover reviews it", desc: "One approved mover checks your details and sends a quote. Not a lead blast.", icon: <ShieldCheck size={24} /> },
              { step: "3", title: "Accept or walk away", desc: "If the quote works, pay the booking deposit (comes off the total). If not, no obligation.", icon: <CheckCircle2 size={24} /> },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {s.icon}
                </div>
                <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">Step {s.step}</div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-2">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── Popular Areas ──────────────────── */}
      <section className="py-14 lg:py-16 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">
              Popular Areas
            </h2>
            <p className="text-text-secondary mt-2 text-sm">
              174 areas covered across England, Scotland, Wales and Northern Ireland.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {POPULAR_AREAS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className="group flex items-center gap-3 bg-white rounded-xl border border-border p-4 hover:border-accent hover:shadow-md transition-all"
              >
                <MapPin size={16} className="text-accent flex-shrink-0" />
                <span className="text-sm font-black text-primary group-hover:text-accent transition-colors">
                  {loc.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/areas-covered"
              className="text-accent font-black text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all 174 areas <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter text-center mb-8">
            Common Questions
          </h2>
          <FAQ items={HOME_FAQ_ITEMS} />
        </div>
      </section>

      {/* ──────────────────── Final CTA ──────────────────── */}
      <section className="py-14 lg:py-16 bg-primary text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 text-white">
            Ready to move?
          </h2>
          <p className="text-white/70 mb-6 text-sm max-w-md mx-auto">
            Submit your details for free. A verified mover reviews before quoting. No spam, no lead blasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#quote-form"
              className="btn-orange px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-2"
            >
              Start Your Request <ArrowUpRight size={18} />
            </Link>
            <a
              href="tel:01217511269"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Phone size={16} />
              Call 0121 751 1269
            </a>
          </div>
          <p className="text-white/40 text-xs mt-4">Open 7 days · Mon–Sun 8am–8pm · Prices from £50</p>
        </div>
      </section>

      {/* ──────────────────── SEO Content Block ──────────────────── */}
      <section className="py-10 bg-[#F9F9F7] border-t border-border" data-speakable="seo-content">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-lg font-black text-primary uppercase tracking-tighter mb-4">
            Man and Van Services Across the UK
          </h2>
          <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
            <p>
              Man and Van Club is a UK marketplace connecting customers with independent, verified local movers. Submit a free move request for <Link href="/house-removals" className="font-bold text-accent hover:underline">house removals</Link>, <Link href="/flat-removals" className="font-bold text-accent hover:underline">flat moves</Link>, <Link href="/furniture-delivery" className="font-bold text-accent hover:underline">furniture delivery</Link>, <Link href="/student-removals" className="font-bold text-accent hover:underline">student moves</Link>, <Link href="/same-day-man-and-van" className="font-bold text-accent hover:underline">same-day man and van</Link> and <Link href="/long-distance-removals" className="font-bold text-accent hover:underline">long-distance removals</Link>. One verified mover reviews your details before quoting. Prices from £50/hr.
            </p>
            <p>
              We cover <Link href="/man-and-van-birmingham" className="font-bold text-accent hover:underline">Birmingham</Link>, <Link href="/man-and-van-walsall" className="font-bold text-accent hover:underline">Walsall</Link>, <Link href="/man-and-van-london" className="font-bold text-accent hover:underline">London</Link>, <Link href="/man-and-van-manchester" className="font-bold text-accent hover:underline">Manchester</Link>, <Link href="/man-and-van-leeds" className="font-bold text-accent hover:underline">Leeds</Link>, <Link href="/man-and-van-liverpool" className="font-bold text-accent hover:underline">Liverpool</Link>, <Link href="/man-and-van-bristol" className="font-bold text-accent hover:underline">Bristol</Link>, <Link href="/man-and-van-sheffield" className="font-bold text-accent hover:underline">Sheffield</Link>, <Link href="/man-and-van-edinburgh" className="font-bold text-accent hover:underline">Edinburgh</Link>, <Link href="/man-and-van-cardiff" className="font-bold text-accent hover:underline">Cardiff</Link> and 164 more areas across <Link href="/areas-covered" className="font-bold text-accent hover:underline">England, Scotland and Wales</Link>. Compare with our <Link href="/man-and-van-vs-removal-company" className="font-bold text-accent hover:underline">man and van vs removal company guide</Link> or <Link href="/vs-anyvan" className="font-bold text-accent hover:underline">vs AnyVan comparison</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mobile Floating Call Button ── */}
      <a
        href="tel:01217511269"
        className="floating-call-btn fixed bottom-6 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </div>
  );
}
