"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Sofa,
  Truck,
  Building2,
  Package,
  GraduationCap,
  Phone,
  ArrowRight,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

const MOVE_TYPES = [
  { label: "Moving Home", emoji: "🏠", icon: <Home size={28} />, href: "#quote-form" },
  { label: "Furniture", emoji: "🛋️", icon: <Sofa size={28} />, href: "#quote-form" },
  { label: "Man & Van", emoji: "🚐", icon: <Truck size={28} />, href: "#quote-form" },
  { label: "Office", emoji: "🏢", icon: <Building2 size={28} />, href: "#quote-form" },
  { label: "Storage", emoji: "📦", icon: <Package size={28} />, href: "#quote-form" },
  { label: "Student", emoji: "🎓", icon: <GraduationCap size={28} />, href: "#quote-form" },
];

export default function HomeContent() {
  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white">

      {/* ──────────────────── Hero: Move Type Selector ──────────────────── */}
      <section
        id="quote-form"
        className="relative flex items-center justify-center min-h-[calc(100dvh-56px)] lg:min-h-[calc(100vh-64px)] scroll-mt-0"
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/92 via-[#0f172a]/85 to-[#0f172a]/92" />
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto px-5 py-10 text-center">

          {/* Headline */}
          <h1
            className="font-black tracking-tighter text-white"
            style={{ fontSize: "clamp(32px, 7vw, 52px)", lineHeight: "0.95" }}
          >
            Start Your Move Request
          </h1>

          <p className="mt-3 text-sm font-bold text-white/70 tracking-wide">
            Free to submit · No spam · Details protected
          </p>

          {/* Move Type Selector */}
          <div className="mt-8">
            <h2
              className="font-black text-white tracking-tight mb-2"
              style={{ fontSize: "clamp(20px, 3.5vw, 26px)" }}
            >
              What do you need help moving?
            </h2>
            <p className="text-sm text-white/60 mb-5">
              Choose the closest option. You can add the details next.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {MOVE_TYPES.map((type) => (
                <a
                  key={type.label}
                  href={type.href}
                  className="group flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 hover:bg-accent hover:border-accent transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                >
                  <span className="text-3xl leading-none">{type.emoji}</span>
                  <span className="text-xs font-black text-white tracking-tight leading-tight">
                    {type.label}
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/40 font-medium">
              Not sure? Choose <strong className="text-accent">Man &amp; Van</strong>.
            </p>
          </div>

          {/* Call button */}
          <a
            href="tel:01217511269"
            className="inline-flex items-center gap-2 mt-6 text-xs font-black text-white/50 hover:text-accent transition-colors"
          >
            <Phone size={14} />
            0121 751 1269
          </a>

        </div>
      </section>

      {/* ──────────────────── Quote Form Section ──────────────────── */}
      <section className="py-10 lg:py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-1">Step 1 done</p>
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight">
              Tell us about your move
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Postcodes, items, date and access — takes under a minute.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* ──────────────────── How It Works — 3 steps ──────────────────── */}
      <section className="py-12 lg:py-14 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-8">
            What happens next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mx-auto mb-3 text-sm font-black">1</div>
              <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">You submit your details</h3>
              <p className="text-text-secondary text-xs leading-relaxed">Postcodes, items, access notes. Free, takes a minute.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mx-auto mb-3 text-sm font-black">2</div>
              <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">A verified mover reviews it</h3>
              <p className="text-text-secondary text-xs leading-relaxed">One approved mover — not five companies blowing up your phone.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mx-auto mb-3 text-sm font-black">3</div>
              <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">Accept or walk away</h3>
              <p className="text-text-secondary text-xs leading-relaxed">If the quote works, book it. If not, no obligation. Your details stay private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── Popular Areas ──────────────────── */}
      <section className="py-12 lg:py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-6">
            Popular areas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
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
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className="text-xs font-bold text-primary hover:text-accent py-2 px-3 bg-[#F9F9F7] rounded-lg hover:bg-accent/5 transition-colors text-left"
              >
                {loc.name} <ArrowRight size={10} className="inline text-accent ml-1" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/areas-covered" className="text-xs font-black text-accent hover:underline">
              View all 174 areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────── SEO Content Block ──────────────────── */}
      <section className="py-8 bg-[#F9F9F7] border-t border-border" data-speakable="seo-content">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="space-y-2 text-[11px] text-text-secondary/70 leading-relaxed">
            <p>
              Man and Van Club is a UK marketplace connecting customers with independent, verified local movers. Submit a free move request for <Link href="/house-removals" className="font-bold text-accent hover:underline">house removals</Link>, <Link href="/flat-removals" className="font-bold text-accent hover:underline">flat moves</Link>, <Link href="/furniture-delivery" className="font-bold text-accent hover:underline">furniture delivery</Link>, <Link href="/student-removals" className="font-bold text-accent hover:underline">student moves</Link>, <Link href="/same-day-man-and-van" className="font-bold text-accent hover:underline">same-day man and van</Link> and <Link href="/long-distance-removals" className="font-bold text-accent hover:underline">long-distance removals</Link>. One verified mover reviews your details before quoting. Prices from £50/hr. Call 0121 751 1269.
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
