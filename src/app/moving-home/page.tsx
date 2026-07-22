import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Home, Truck, PoundSterling } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Moving Home? Man and Van from £19/hr | Man and Van Club",
  description:
    "Moving home? Get a free quote from one verified man and van mover. From £19/hr self-loading, £34/hr with driver help. Covers houses, flats and studios across the UK. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/moving-home`,
  },
  openGraph: {
    title: "Moving Home? Man and Van from £19/hr | Man and Van Club",
    description: "Moving home? One verified mover reviews your move before quoting. From £19/hr. Houses, flats, studios — all UK areas covered.",
    url: `${siteUrl}/moving-home`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Moving Home? Man and Van from £19/hr")}&subtitle=${encodeURIComponent("Verified Movers Across the UK")}`, width: 1200, height: 630, alt: "Moving Home? Man and Van from £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Home? Man and Van from £19/hr | Man and Van Club",
    description: "One verified mover reviews your move before quoting. From £19/hr. All UK areas covered.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Moving Home? Man and Van from £19/hr")}&subtitle=${encodeURIComponent("Verified Movers Across the UK")}`],
  },
};

const faqItems = [
  {
    q: "How much does a man and van cost for moving home?",
    a: "Moving home with a man and van starts from £19 per hour (self-loading). With driver help, rates start from £34 per hour. A typical 1-bed flat move costs £150–£300. A 2-bed house move is usually £250–£450. A 3-bed house move can be £350–£600. Submit your postcodes and item list for a free guide price.",
  },
  {
    q: "What is the cheapest way to move home?",
    a: "The cheapest way to move home is a self-loading man and van from £19/hr. You load and unload, the driver transports. This works well for small moves — studios, 1-bed flats, or when you have friends to help. For larger moves, the driver-helps option at £34/hr still costs far less than a full removal company.",
  },
  {
    q: "Do I need a removal company or is a man and van enough?",
    a: "Most home moves do not need a full removal company. A man and van with driver help can handle flats, terraced houses and semi-detached homes. Full removal companies are only really needed for very large houses (4+ beds), piano moves, or when you want a full packing service.",
  },
  {
    q: "How far in advance should I book a man and van for moving home?",
    a: "Book at least 3–5 days ahead if possible. End-of-month and weekends are the busiest times. If you are moving on the last Friday of the month, book a week or two ahead. Same-day moves may be possible but depend on availability.",
  },
  {
    q: "What information does the mover need for a home move quote?",
    a: "Your collection and delivery postcodes, an item list (number of boxes, furniture pieces, white goods), whether you need the driver to help load and unload, any access details (stairs, lifts, parking restrictions), and your preferred moving date. The more detail you provide, the more accurate the quote.",
  },
  {
    q: "Can I move home on the same day I get the keys?",
    a: "Yes, but it is risky. If the property chain is delayed, you may not get keys until late afternoon. Most movers recommend booking the van for the day after completion if possible, or confirming a flexible time slot with your mover in case of chain delays.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van for Moving Home",
  url: `${siteUrl}/moving-home`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  serviceType: ["Moving home", "House removals", "Flat moves", "Man and van", "Furniture delivery"],
  description: "Moving home? One verified man and van mover reviews your postcodes, item list and access details before sending a quote. From £19/hr self-loading. Covers houses, flats and studios across the UK.",
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
    { "@type": "ListItem", position: 2, name: "Moving Home", item: `${siteUrl}/moving-home` },
  ],
};

export default function MovingHomePage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20"><Home size={14} /> Moving Home</div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">&larr; All areas</Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Moving <span className="text-accent italic">Home?</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">Submit your postcodes and item list for free. One verified mover reviews your move details before sending a quote. From £19/hr.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><CheckCircle2 size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Verified</span><span className="text-sm font-black text-primary">One mover, not a lead blast</span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Private</span><span className="text-sm font-black text-primary">Details stay anonymous</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">How it works when moving home</h3>
              <ol className="space-y-4 text-sm text-text-secondary font-medium">
                <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">1</span><span>Share your collection and delivery postcodes, item list, and any access notes (stairs, lifts, parking).</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">2</span><span>A verified mover reviews your move details and sends a quote. Your contact details stay anonymous until you accept.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">3</span><span>Accept the quote and pay a booking deposit. The deposit comes off the final price. Pay the rest on moving day.</span></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for home moves */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Home move prices</h2>
            <p className="text-text-secondary font-medium">Two simple pricing tiers. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-5">
              <div className="flex items-center gap-3"><Truck size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-primary">Self-loading</h3></div>
              <div><span className="text-4xl font-black text-primary">£19</span><span className="text-lg font-bold text-text-secondary">/hr</span></div>
              <p className="text-sm text-text-secondary font-medium">You load and unload. The driver transports your items safely. Best for small moves when you can handle the lifting.</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Studio or 1-bed flat: £60–£150</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 2-bed flat: £100–£250</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Single item collection: from £19</li>
              </ul>
            </div>
            <div className="bg-primary rounded-[2rem] p-8 space-y-5">
              <div className="flex items-center gap-3"><Truck size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-white">Driver helps</h3></div>
              <div><span className="text-4xl font-black text-accent">£34</span><span className="text-lg font-bold text-white/70">/hr</span></div>
              <p className="text-white/80 text-sm font-medium">The driver helps you load and unload. Best for larger moves or when you need an extra pair of hands.</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 1-bed flat: £100–£250</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 2-bed house: £250–£450</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> 3-bed house: £350–£600</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Home move types */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Types of home move</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-4">
              <Home size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Flat moves</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Studio, 1-bed or 2-bed flats. The mover needs to know about stairs, lifts and parking. Flats above shops often have narrow staircases with no lift access.</p>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-4">
              <Home size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">House moves</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Terraced, semi-detached or detached houses. Terraced houses often have narrow hallways and front doors directly onto the street. Detached houses usually have driveways.</p>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-4">
              <Home size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Student moves</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Halls of residence, shared houses or student flats. Usually smaller loads with seasonal peaks in June and September. UNiDAYS discount available — £12 off.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Popular areas for moving home</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Birmingham", slug: "man-and-van-birmingham" },
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
            ].map((area) => (
              <Link key={area.slug} href={`/${area.slug}`} className="bg-[#F9F9F7] rounded-xl border border-border p-4 text-center text-sm font-bold text-primary hover:border-accent hover:text-accent transition-all">
                {area.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/areas-covered" className="text-sm font-bold text-accent hover:underline">View all 355 areas →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Moving home questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="bg-white rounded-2xl border border-border p-6 group">
                <summary className="cursor-pointer font-bold text-primary text-sm leading-relaxed flex items-center justify-between gap-4">{item.q}<span className="flex-shrink-0 text-accent text-xl font-black group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-4 text-sm text-text-secondary font-medium leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Ready to move home?</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">Submit your postcodes and item list for free. One verified mover reviews your move before you decide.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
