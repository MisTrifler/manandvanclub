"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import type { IntentType } from "@/lib/intent-detection";

const MOVE_TYPES: { label: string; emoji: string; intent: IntentType; badge?: string }[] = [
  { label: "Moving Home", emoji: "🏠", intent: "house" },
  { label: "Furniture", emoji: "🛋️", intent: "single-item" },
  { label: "Man & Van", emoji: "🚐", intent: "general" },
  { label: "Office", emoji: "🏢", intent: "office" },
  { label: "Storage", emoji: "📦", intent: "storage" },
  { label: "Student", emoji: "🎓", intent: "student" },
];

const REVIEW_CARDS = [
  {
    name: "Mansi B.",
    platform: "Google",
    text: "Amazing service, easy and seamless. Adrian was punctual and got the job done fast. Definitely would use again!",
  },
  {
    name: "Umar M.",
    platform: "Google",
    text: "Very pleased with the service. The booking process was straightforward and communication was clear throughout.",
  },
  {
    name: "Parmod C.",
    platform: "Google",
    text: "Good price and customer service! Very pleased.",
  },
  {
    name: "Harman S.",
    platform: "Google",
    text: "Amazing! Thank you for the help.",
  },
  {
    name: "VC-17",
    platform: "Yell",
    text: "Great experience with Man and Van Club. Simple easy booking by calling, got matched with a surprisingly low fee compared to other services. Definitely will use again!",
  },
];

export default function HomeContent() {
  const [selectedIntent, setSelectedIntent] = useState<IntentType | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const autoScrollId = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const userPaused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTileClick = useCallback((intent: IntentType) => {
    setSelectedIntent(intent);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const formSection = document.getElementById("quote-form");
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  // ── Auto-scroll reviews ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Set initial scroll to 1/3 so we have room to scroll both directions
    const oneThird = el.scrollWidth / 3;
    el.scrollLeft = oneThird;

    const speed = 0.6; // px per frame — gentle, readable

    function step() {
      if (!el) return;
      if (!userPaused.current) {
        el.scrollLeft += speed;
        // Seamless loop: if we've scrolled past the first third (into the second copy),
        // reset back by one-third width to stay in the middle copy
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird * 2) {
          el.scrollLeft -= oneThird;
        }
        if (el.scrollLeft <= 0) {
          el.scrollLeft += oneThird;
        }
      }
      autoScrollId.current = requestAnimationFrame(step);
    }

    autoScrollId.current = requestAnimationFrame(step);
    return () => {
      if (autoScrollId.current) cancelAnimationFrame(autoScrollId.current);
    };
  }, []);

  // ── Mouse drag-to-scroll ──
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = el.scrollLeft;
    userPaused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    el.style.cursor = "grabbing";
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.pageX - startX.current;
    el.scrollLeft = scrollStart.current - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) el.style.cursor = "grab";
    // Resume auto-scroll after 2s of no interaction
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { userPaused.current = false; }, 2000);
  }, []);

  // ── Touch drag-to-scroll ──
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollStart.current = el.scrollLeft;
    userPaused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.touches[0].pageX - startX.current;
    el.scrollLeft = scrollStart.current - dx;
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { userPaused.current = false; }, 2000);
  }, []);

  // ── Arrow button navigation ──
  const scrollByCard = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 324; // 300px card + 24px gap
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
    // Pause briefly then resume
    userPaused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { userPaused.current = false; }, 3000);
  }, []);

  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white">

      {/* ──────────────────── Hero: Move Type Selector ──────────────────── */}
      <section
        className="relative flex items-center justify-center min-h-[calc(100dvh-56px)] lg:min-h-[calc(100vh-64px)] bg-[#0f172a]"
      >
        {/* Background image — very dark overlay for readability */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-man-and-van.jpg"
            alt="Man and van service — verified mover ready to help with your move"
            fill
            className="object-cover object-center opacity-25"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto px-5 py-10 text-center">

          {/* Headline */}
          <h1
            className="font-black tracking-tight text-white"
            style={{ fontSize: "clamp(28px, 6.5vw, 44px)", lineHeight: "1.05" }}
            data-speakable="hero-heading"
          >
            Man and Van From £19/hr<br />Verified Movers Across the UK
          </h1>

          <p className="mt-3 text-sm font-bold text-white/80 tracking-wide" data-speakable="hero-description">
            Moving home or need a van? Free to submit · Verified movers · No spam
          </p>

          {/* Move Type Selector */}
          <div className="mt-8">
            <h2
              className="font-black text-white tracking-tight mb-1"
              style={{ fontSize: "clamp(18px, 3.5vw, 24px)" }}
            >
              What do you need help moving?
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Choose the closest option. You can add details next.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {MOVE_TYPES.map((type) => (
                <button
                  key={type.label}
                  type="button"
                  onClick={() => handleTileClick(type.intent)}
                  className="group relative flex flex-col items-center gap-2.5 bg-white rounded-2xl p-4 shadow-lg hover:bg-accent transition-all duration-200 hover:scale-[1.04] active:scale-[0.97] cursor-pointer"
                >
                  {type.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-sm z-10">
                      {type.badge}
                    </span>
                  )}
                  <span className="text-3xl leading-none">{type.emoji}</span>
                  <span className="text-xs font-black text-primary group-hover:text-white tracking-tight leading-tight">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-5 text-sm text-white/60 font-medium">
              Not sure? Choose <strong className="text-accent">Man &amp; Van</strong>.
            </p>
          </div>

          {/* Call option */}
          <a
            href="tel:01217511269"
            className="inline-flex items-center gap-2 mt-6 text-sm font-black text-white/90 hover:text-accent transition-colors"
          >
            <Phone size={16} />
            0121 751 1269
          </a>

        </div>
      </section>

      {/* ──────────────────── Quote Form Section ──────────────────── */}
      <section
        id="quote-form"
        className="py-10 lg:py-14 bg-white border-b border-border scroll-mt-16 lg:scroll-mt-20"
      >
        <div className="container mx-auto px-4 max-w-xl">

          {!selectedIntent ? (
            /* ── No intent selected yet: prompt to choose above ── */ 
            <div className="text-center py-8">
              <p className="text-sm text-text-secondary mb-3">
                Choose your move type above to get started
              </p>
              <button
                type="button"
                onClick={() => {
                  const hero = document.querySelector('[data-speakable="hero-heading"]');
                  if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="btn-orange px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
              >
                ↑ Pick Your Move Type
              </button>
              <p className="mt-3 text-xs text-text-secondary/60">
                Or call us directly:{" "}
                <a href="tel:01217511269" className="font-black text-accent hover:underline">
                  0121 751 1269
                </a>
              </p>
            </div>
          ) : (
            /* ── Intent selected: show the form ── */
            <>
              <div className="text-center mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-1">Step 1 done</p>
                <h2 className="text-2xl font-black text-primary uppercase tracking-tight">
                  Tell us about your move
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Postcodes, items, date and access — takes under a minute.
                </p>
              </div>
              <QuoteForm intent={selectedIntent} />
            </>
          )}

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

      {/* ──────────────────── About the Service ──────────────────── */}
      <section className="py-12 lg:py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-6">
            How Man and Van Club works
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
            <p>
              Man and Van Club is a UK marketplace that connects you with independent, verified local movers. Whether you&apos;re moving a single sofa across town or an entire flat to another city, you submit one free request and a checked-and-approved mover reviews your details before quoting. No comparison tables, no five companies ringing you — just one quote from one verified mover.
            </p>
            <p>
              Prices start from £19/hr. Every mover on the platform holds Goods in Transit and Public Liability insurance, and their business details are verified before they can access any move requests. You stay in control: review the quote, accept or walk away, no obligation.
            </p>
          </div>
          <div className="text-center mt-6">
            <a href="#quote-form" className="btn-orange px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
              Start Your Move Request <ArrowRight size={16} />
            </a>
            <p className="mt-2 text-xs text-text-secondary/60">Free to submit · Takes under a minute</p>
          </div>
        </div>
      </section>

      {/* ──────────────────── Customer Reviews ──────────────────── */}
      <section className="py-12 lg:py-14 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-8">
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className="text-accent text-xl">★</span>
            ))}
          </div>
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">
            What our customers say
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            5.0 / 5.0 across 10 verified reviews on Google, Trustpilot & Yell
          </p>
        </div>

        {/* Scrollable review cards — auto-scrolls, drag/swipe, arrow buttons */}
        <div className="relative group/scroll">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary/5 border border-border text-primary/60 hover:bg-accent hover:text-white hover:border-accent transition-all opacity-0 group-hover/scroll:opacity-100 flex items-center justify-center"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft size={20} />
          </button>
          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary/5 border border-border text-primary/60 hover:bg-accent hover:text-white hover:border-accent transition-all opacity-0 group-hover/scroll:opacity-100 flex items-center justify-center"
            aria-label="Scroll reviews right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scroll container — triplicate for seamless infinite loop */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-none cursor-grab select-none"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-6 shrink-0">
                {REVIEW_CARDS.map((review, i) => (
                  <div
                    key={`${set}-${i}`}
                    className="w-[300px] shrink-0 bg-[#F9F9F7] border border-border/50 rounded-2xl p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="text-accent text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-black text-primary/70">{review.name}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        {review.platform}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center mt-8">
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://uk.trustpilot.com/review/manandvanclub.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-accent transition-colors"
            >
              Trustpilot →
            </a>
            <span className="text-primary/20">·</span>
            <a
              href="https://www.yell.com/biz/man-and-van-club-walsall-11043227/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-accent transition-colors"
            >
              Yell →
            </a>
            <span className="text-primary/20">·</span>
            <a
              href="https://share.google/xemGXWRByHBK5PSbN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-accent transition-colors"
            >
              Google →
            </a>
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
              View all 241 areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────── SEO Content Block ──────────────────── */}
      <section className="py-8 bg-[#F9F9F7] border-t border-border" data-speakable="seo-content">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="space-y-2 text-[11px] text-text-secondary/70 leading-relaxed">
            <p>
              Looking for a <Link href="/house-removals" className="font-bold text-accent hover:underline">house removal</Link>, <Link href="/flat-removals" className="font-bold text-accent hover:underline">flat move</Link>, <Link href="/furniture-delivery" className="font-bold text-accent hover:underline">furniture delivery</Link>, <Link href="/student-removals" className="font-bold text-accent hover:underline">student move</Link>, <Link href="/same-day-man-and-van" className="font-bold text-accent hover:underline">same-day pickup</Link> or <Link href="/long-distance-removals" className="font-bold text-accent hover:underline">long-distance relocation</Link>? Submit one free request and a verified mover quotes you — no spam, no obligation. Prices from £19/hr. Call 0121 751 1269 any day of the week.
            </p>
            <p>
              Areas covered: <Link href="/man-and-van-birmingham" className="font-bold text-accent hover:underline">Birmingham</Link>, <Link href="/man-and-van-walsall" className="font-bold text-accent hover:underline">Walsall</Link>, <Link href="/man-and-van-london" className="font-bold text-accent hover:underline">London</Link>, <Link href="/man-and-van-manchester" className="font-bold text-accent hover:underline">Manchester</Link>, <Link href="/man-and-van-leeds" className="font-bold text-accent hover:underline">Leeds</Link>, <Link href="/man-and-van-liverpool" className="font-bold text-accent hover:underline">Liverpool</Link> and <Link href="/areas-covered" className="font-bold text-accent hover:underline">229 more UK towns and cities</Link>. Not sure if you need a man and van or a full removal firm? Read our <Link href="/man-and-van-vs-removal-company" className="font-bold text-accent hover:underline">comparison guide</Link> or check our <Link href="/vs-anyvan" className="font-bold text-accent hover:underline">how we compare page</Link>.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
