import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Truck, PoundSterling, Clock, MapPin, Package, Users, HelpCircle } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Help Me Move | Man and Van from £19/hr | Man and Van Club",
  description:
    "Need help moving? Submit your details once and a verified man and van mover reviews your move before quoting. From £19/hr self-loading, £34/hr with help. No ringing around. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/help-me-move`,
  },
  openGraph: {
    title: "Help Me Move | Man and Van from £19/hr | Man and Van Club",
    description: "Need help moving? One verified mover reviews your move before quoting. From £19/hr. No ringing around. Call 0121 751 1269.",
    url: `${siteUrl}/help-me-move`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Help Me Move?")}&subtitle=${encodeURIComponent("Man and Van from £19/hr — Verified Movers")}`, width: 1200, height: 630, alt: "Help Me Move | Man and Van from £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Me Move | Man and Van from £19/hr | Man and Van Club",
    description: "Need help moving? One verified mover. From £19/hr. No ringing around.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Help Me Move?")}&subtitle=${encodeURIComponent("Man and Van from £19/hr — Verified Movers")}`],
  },
};

const faqItems = [
  {
    q: "I need help moving — how does this work?",
    a: "You submit your collection and delivery postcodes, your item list, your preferred date and any access notes (stairs, lifts, parking). A verified mover reviews your details and sends you a quote. Your contact information stays private until you accept. No ringing around, no lead blasts to dozens of companies.",
  },
  {
    q: "How quickly can someone help me move?",
    a: "Same-day help may be possible depending on mover availability in your area. Most moves are booked 3–7 days ahead. End-of-month Fridays are the busiest — book earlier if you can. Submit your request with your preferred date and a mover will confirm if they can do it.",
  },
  {
    q: "What does 'help me move' actually include?",
    a: "It depends on which service you choose. Self-loading at £19/hr means you do the lifting and the driver transports. Driver-helps at £34/hr means the driver assists with loading and unloading. Either way, the mover brings a van, blankets, straps and the equipment needed to transport your items safely.",
  },
  {
    q: "I only need help moving a few items — is that too small?",
    a: "Not at all. A lot of requests are for single items — a sofa from Facebook Marketplace, a fridge from Currys, a bed frame from IKEA. Small moves are what man and van services are built for. You are not paying for a full removals team you do not need.",
  },
  {
    q: "Can you help me move on a Sunday or bank holiday?",
    a: "Yes. The service operates 24/7, including weekends and bank holidays. Moving on a Sunday can sometimes be cheaper because parking restrictions are often relaxed and roads are quieter. Just include your preferred date in the request.",
  },
  {
    q: "Do I need to pack everything myself?",
    a: "For the standard man and van service, yes — items should be packed and ready to load. If you need a packing service, mention it in your request and the mover can include it in their quote. Most people pack their own boxes and let the mover handle the furniture and heavy items.",
  },
  {
    q: "What if I need help moving long distance?",
    a: "Long-distance moves between cities are no problem. Movers can handle Birmingham to London, Manchester to Bristol, Leeds to Edinburgh — anywhere in the UK. For longer distances, the quote is usually based on the full job rather than hourly, so you know the price upfront.",
  },
  {
    q: "How is this different from ringing a removal company?",
    a: "With a traditional removal company, you call around, wait for someone to visit your home, and then get a quote days later. Here, you submit your details once and a verified mover reviews them online. You get a quote without the sales visit, without the pressure, and without giving your phone number to multiple companies.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Help Me Move — Man and Van Service",
  url: `${siteUrl}/help-me-move`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Help me move", "Man and van", "Moving help", "Moving assistance", "Van with driver", "Furniture delivery", "House move help"],
  description: "Need help moving? Submit your details once and a verified man and van mover reviews your move before quoting. From £19/hr self-loading, £34/hr with driver help. No ringing around.",
  offers: [
    { "@type": "Offer", name: "Self-loading man and van", price: "19", priceCurrency: "GBP", priceUnit: "hour" },
    { "@type": "Offer", name: "Driver-helps man and van", price: "34", priceCurrency: "GBP", priceUnit: "hour" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Help Me Move", item: `${siteUrl}/help-me-move` },
  ],
};

export default function HelpMeMovePage() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Help me move</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Help Me <span className="text-accent italic">Move</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">Need help moving? Submit your postcodes and item list once. A verified mover reviews your details before sending a quote. From £19/hr. No ringing around.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><CheckCircle2 size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Verified</span><span className="text-sm font-black text-primary">One mover, not a lead blast</span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">24/7</span><span className="text-sm font-black text-primary">Sundays and bank holidays</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">How it works</h3>
              <ol className="space-y-4 text-sm text-text-secondary font-medium">
                <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">1</span><span>Enter your collection and delivery postcodes, item list and access notes. Takes under 2 minutes.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">2</span><span>A verified mover reviews your move details and sends a quote. Your number and email stay private until you accept.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">3</span><span>Accept the quote, pay the booking deposit, and your mover arrives on moving day with van, blankets and straps.</span></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* What kind of moving help do you need? */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Moving situations</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">What kind of help do you need?</h2>
            <p className="text-text-secondary font-medium">Whatever you are moving, a man and van can handle it — for a fraction of the cost of a full removal company.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Package size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Single item or small load</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">A sofa from Facebook Marketplace. A fridge from Currys. A bed frame from IKEA. Just one item or a few boxes — you do not need a full removals team for this. Submit the details and get a quote for exactly what you need moved.</p>
              <Link href="/single-item-delivery" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1">Single item delivery <ArrowUpRight size={14} /></Link>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Truck size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Flat or house move</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Studio, 1-bed, 2-bed or 3-bed — a man and van with driver help can handle it. Terraced houses with narrow hallways, flats with stairs-only access, maisonettes above shops. Include your access details and the mover prices it accurately.</p>
              <Link href="/moving-home" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1">Moving home <ArrowUpRight size={14} /></Link>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <HelpCircle size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Help with lifting only</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">You have a van or have hired one — you just need someone to help carry the heavy stuff. The driver-helps service at £34/hr includes loading and unloading assistance. Add details about stairs, heavy items and parking so the mover comes prepared.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Clock size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Same-day or last-minute</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Your tenancy ends tomorrow. The buyer is collecting today. You need to clear a room by tonight. Submit your request with today&apos;s date and a mover will check if they can do it. No emergency surcharge — standard rates apply.</p>
              <Link href="/same-day-man-and-van" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1">Same-day man and van <ArrowUpRight size={14} /></Link>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <MapPin size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Long distance between cities</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Moving from Birmingham to London. Manchester to Bristol. Leeds to Edinburgh. Long-distance moves are usually priced as a fixed job rather than hourly, so you know the cost before you book. Add both postcodes and your item list for an accurate quote.</p>
              <Link href="/long-distance-removals" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1">Long distance moves <ArrowUpRight size={14} /></Link>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Users size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Student move</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Halls of residence, shared houses, student flats. Usually a few boxes, a mattress and some bags. Self-loading at £19/hr keeps it affordable. UNiDAYS discount available — £12 off your booking. Term-time peaks fill up fast in June and September.</p>
              <Link href="/student-removals" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1">Student moves <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">How much does moving help cost?</h2>
            <p className="text-text-secondary font-medium">Two clear tiers. No hidden fees. No surprise charges.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-5">
              <div className="flex items-center gap-3"><Truck size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-primary">Self-loading</h3></div>
              <div><span className="text-4xl font-black text-primary">£19</span><span className="text-lg font-bold text-text-secondary">/hr</span></div>
              <p className="text-sm text-text-secondary font-medium">You load and unload. The driver transports safely. Best if you can handle the lifting yourself or have friends to help.</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Single item: from £19</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Studio/1-bed flat: £60–£150</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 2-bed flat: £100–£250</li>
              </ul>
            </div>
            <div className="bg-primary rounded-[2rem] p-8 space-y-5">
              <div className="flex items-center gap-3"><Truck size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-white">Driver helps</h3></div>
              <div><span className="text-4xl font-black text-accent">£34</span><span className="text-lg font-bold text-white/70">/hr</span></div>
              <p className="text-white/80 text-sm font-medium">The driver helps load and unload. Ideal for heavier items, stairs, or when you need an extra pair of hands.</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 1-bed flat: £100–£250</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 2-bed house: £250–£450</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 3-bed house: £350–£600</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why people struggle finding moving help */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Why finding moving help is hard</h2>
            <p className="text-text-secondary font-medium">Most people go through the same frustrating process. There is a simpler way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-tight text-red-500">The old way</h3>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-black">✕</span><span>Google &quot;man and van near me&quot; and get 50 results</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-black">✕</span><span>Call 5 different numbers. Half do not answer.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-black">✕</span><span>Get vague quotes over the phone with no detail</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-black">✕</span><span>Your phone number gets passed to other companies</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-black">✕</span><span>Someone turns up late or does not show at all</span></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-tight text-accent">The better way</h3>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-black">✓</span><span>Submit your move details once — takes under 2 minutes</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-black">✓</span><span>One verified mover reviews and quotes — no multiple calls</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-black">✓</span><span>Your quote is based on your actual items and access, not a guess</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-black">✓</span><span>Your phone number and email stay private until you accept</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-black">✓</span><span>The mover is vetted before they can see your request</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Moving help near you</h2>
            <p className="text-text-secondary font-medium">Verified movers available across the UK. Find your area below.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Birmingham", slug: "man-and-van-birmingham" },
              { name: "Walsall", slug: "man-and-van-walsall" },
              { name: "London", slug: "man-and-van-london" },
              { name: "Manchester", slug: "man-and-van-manchester" },
              { name: "Leeds", slug: "man-and-van-leeds" },
              { name: "Bristol", slug: "man-and-van-bristol" },
              { name: "Sheffield", slug: "man-and-van-sheffield" },
              { name: "Liverpool", slug: "man-and-van-liverpool" },
              { name: "Edinburgh", slug: "man-and-van-edinburgh" },
              { name: "Glasgow", slug: "man-and-van-glasgow" },
              { name: "Cardiff", slug: "man-and-van-cardiff" },
              { name: "Belfast", slug: "man-and-van-belfast" },
              { name: "Nottingham", slug: "man-and-van-nottingham" },
              { name: "Leicester", slug: "man-and-van-leicester" },
              { name: "Coventry", slug: "man-and-van-coventry" },
              { name: "Wolverhampton", slug: "man-and-van-wolverhampton" },
              { name: "Newcastle", slug: "man-and-van-newcastle-upon-tyne" },
              { name: "Derby", slug: "man-and-van-derby" },
            ].map((area) => (
              <Link key={area.slug} href={`/${area.slug}`} className="bg-white rounded-xl border border-border p-4 text-center text-sm font-bold text-primary hover:border-accent hover:text-accent transition-all">
                {area.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/areas-covered" className="text-sm font-bold text-accent hover:underline">View all 488 areas →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Help me move — your questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="bg-[#F9F9F7] rounded-2xl border border-border p-6 group">
                <summary className="cursor-pointer font-bold text-primary text-sm leading-relaxed flex items-center justify-between gap-4">{item.q}<span className="flex-shrink-0 text-accent text-xl font-black group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-4 text-sm text-text-secondary font-medium leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Ready to get moving help?</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">Submit your move details for free. A verified mover reviews before quoting. You decide whether to book.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
