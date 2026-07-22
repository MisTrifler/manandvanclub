import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, PoundSterling, BadgePercent, MapPin } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man With a Van | From £19/hr | Man and Van Club",
  description:
    "Man with a van from £19/hr across the UK. House moves, flat moves, furniture delivery and same-day help. One verified mover quotes — no spam calls. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/man-with-a-van`,
  },
  openGraph: {
    title: "Man With a Van | From £19/hr | Man and Van Club",
    description: "Man with a van from £19/hr. Verified local movers across the UK. One mover quotes — no spam. Call 0121 751 1269.",
    url: `${siteUrl}/man-with-a-van`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Man With a Van")}&subtitle=${encodeURIComponent("From £19/hr — Verified & Insured")}`, width: 1200, height: 630, alt: "Man With a Van | From £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man With a Van | From £19/hr | Man and Van Club",
    description: "Man with a van from £19/hr. Verified local movers across the UK. One mover quotes — no spam. Call 0121 751 1269.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Man With a Van")}&subtitle=${encodeURIComponent("From £19/hr — Verified & Insured")}`],
  },
};

const faqItems = [
  {
    q: "What does 'man with a van' actually mean?",
    a: "A man with a van is a van and a professional driver who moves your items from A to B. It is the same service people call man and van, man in a van or van hire with driver. You do not drive the van yourself and you do not need a licence, deposit or hire paperwork — the driver brings the van, blankets, straps and equipment to your door.",
  },
  {
    q: "Is a man with a van the same as man and van?",
    a: "Yes — they are two names for the same service. 'Man and van' is the more common search in the UK, while 'man with a van' is just as popular in many areas. Either way, you get a van and a driver from £19/hr. On Man and Van Club, both searches lead to the same verified local movers.",
  },
  {
    q: "How much does a man with a van cost?",
    a: "Man with a van prices start from £19 per hour for a self-loading service (you carry, the driver transports), or from £34 per hour with a driver who helps with loading. London moves start from £55 per hour because of ULEZ, parking and travel time. Most local moves take 1-4 hours, so a typical small move costs £60-£140. Submit your postcodes for a free guide price.",
  },
  {
    q: "What can a man with a van move?",
    a: "Anything from a single sofa or Facebook Marketplace purchase to a full 2-3 bedroom house. Common jobs include flat moves, student moves, furniture delivery, office moves, eBay collections and same-day help. For very large loads, movers can use Luton vans — just describe your items accurately so the mover brings the right van.",
  },
  {
    q: "Do I need to help with loading?",
    a: "That is your choice. The £19/hr self-loading option means you carry items to and from the van while the driver transports them — the cheapest way to move. The £34/hr driver-helps option means the driver assists with carrying, loading and unloading. Both include the van, fuel, insurance, blankets and straps.",
  },
  {
    q: "Can I get a man with a van today?",
    a: "Same-day help is often possible depending on mover availability. Submit your request with today's date, your time window and clear item details, and a verified mover can quickly check whether they can help. There are no emergency surcharges — same-day jobs are charged at standard rates.",
  },
  {
    q: "Is a man with a van cheaper than hiring a van myself?",
    a: "Usually, yes for local moves. Self-drive van hire typically costs £50-£80 per day before fuel (£20+), insurance (£15-£25) and the time you spend driving an unfamiliar vehicle. A 2-hour local move with a man with a van costs from £38 — with a professional driver doing the driving, the route planning and the parking.",
  },
  {
    q: "Do you have a man with a van near me?",
    a: "We cover 435 areas across England, Scotland, Wales and Northern Ireland — from major cities to smaller towns and suburbs. Submit your collection and delivery postcodes for free and a verified local mover can check the route and send quote options.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man With a Van",
  url: `${siteUrl}/man-with-a-van`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Man with a van", "Man and van", "Man in a van", "Van hire with driver", "Van with driver"],
  description: "Man with a van from £19/hr across the UK. House moves, flat moves, furniture delivery and same-day help. One verified mover quotes — no spam calls.",
  offers: [
    { "@type": "Offer", name: "Self-loading man with a van", price: "19", priceCurrency: "GBP", priceUnit: "hour" },
    { "@type": "Offer", name: "Driver-helps man with a van", price: "34", priceCurrency: "GBP", priceUnit: "hour" },
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
    { "@type": "ListItem", position: 2, name: "Man With a Van", item: `${siteUrl}/man-with-a-van` },
  ],
};

const popularAreas = [
  { name: "London", href: "/man-and-van-london" },
  { name: "Birmingham", href: "/man-and-van-birmingham" },
  { name: "Manchester", href: "/man-and-van-manchester" },
  { name: "Leeds", href: "/man-and-van-leeds" },
  { name: "Liverpool", href: "/man-and-van-liverpool" },
  { name: "Bristol", href: "/man-and-van-bristol" },
  { name: "Sheffield", href: "/man-and-van-sheffield" },
  { name: "Newcastle", href: "/man-and-van-newcastle-upon-tyne" },
  { name: "Nottingham", href: "/man-and-van-nottingham" },
  { name: "Leicester", href: "/man-and-van-leicester" },
  { name: "Edinburgh", href: "/man-and-van-edinburgh" },
  { name: "Glasgow", href: "/man-and-van-glasgow" },
];

const useCases = [
  { title: "Single items & Marketplace", body: "Sofa from Facebook Marketplace, eBay or Gumtree? A man with a van collects from the seller and delivers to your door. From £19 — often under one hour for local jobs." },
  { title: "Flat & apartment moves", body: "The most common man-with-a-van job. Add floor level, lift access and parking notes so the mover can plan. Most 1-bed flats move in 2-3 hours." },
  { title: "Student moves", body: "Halls to shared house, end-of-term clearouts, storage runs. Small loads, short distances — the cheapest moves there are. UNiDAYS members get £12 off." },
  { title: "House moves", body: "2-3 bedroom homes are well within man-with-a-van territory. 3-5 hours typical, from £100-£500 depending on load and access. No removal-company price tag." },
  { title: "Office & business moves", body: "Desks, chairs, stock and equipment moved outside working hours where possible. Include access and lift details for accurate quotes." },
  { title: "Same-day help", body: "Chain collapsed? Seller needs it gone today? Same-day man with a van is often possible depending on availability — at standard rates, no emergency fees." },
];

export default function ManWithAVanPage() {
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
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Man and van, man with a van — same thing</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Man With <span className="text-accent italic">a Van</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">From £19/hr. A van and a professional driver come to you — you never drive. Submit your move once, get a quote from one verified mover, and decide whether to book. No ringing round, no spam calls.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Self-loading</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><BadgePercent size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Driver helps</span><span className="text-2xl font-black text-primary">£34<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Included</span><span className="text-sm font-black text-primary">Fuel + insurance</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Get a Free Quote <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">What a man with a van costs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 text-[9px] font-black uppercase tracking-widest text-primary/50">Job</th>
                      <th className="text-left py-3 pr-4 text-[9px] font-black uppercase tracking-widest text-primary/50">Time</th>
                      <th className="text-left py-3 text-[9px] font-black uppercase tracking-widest text-primary/50">From</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-text-secondary font-medium">
                    <tr><td className="py-3 pr-4 font-bold text-primary">Single item collection</td><td className="py-3 pr-4">Under 1 hr</td><td className="py-3 font-black text-primary">£19</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-primary">Studio / room move</td><td className="py-3 pr-4">1-2 hrs</td><td className="py-3 font-black text-primary">£38</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-primary">1-bed flat</td><td className="py-3 pr-4">2-3 hrs</td><td className="py-3 font-black text-primary">£60</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-primary">2-bed house</td><td className="py-3 pr-4">3-4 hrs</td><td className="py-3 font-black text-primary">£100</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-primary">3-bed house</td><td className="py-3 pr-4">4-6 hrs</td><td className="py-3 font-black text-primary">£150</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-primary">London moves</td><td className="py-3 pr-4">Varies</td><td className="py-3 font-black text-primary">£55/hr</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-text-secondary/70 font-medium leading-relaxed">Guide prices based on the £19/hr self-loading rate. Driver-helps is £34/hr. Your verified mover confirms the full quote before you book — no hidden charges on the day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-12 lg:py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-6">Man with a van vs man and van — is there a difference?</h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
            <p>No — they are the same service with two names. &quot;Man and van&quot; is the most common phrase in the UK, but &quot;man with a van&quot;, &quot;man in a van&quot; and &quot;van hire with driver&quot; all describe the same thing: a van arrives with a professional driver who takes your items where they need to go.</p>
            <p>What matters is what happens after you book. On Man and Van Club you submit one free request with your postcodes, date and item list. One verified, insured mover reviews the details and sends quote options. Your contact details stay protected until you accept — so you never get five companies ringing you. That model works whether you searched for a man with a van near me, a cheap man and van or a van with a driver.</p>
            <p>It is not self-drive hire. You do not need a licence, a deposit or hire paperwork, and you never leave a credit card with a rental desk. The driver brings the van, fuel, insurance, blankets and straps — and on the £34/hr option, a pair of hands for the heavy lifting too.</p>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-12 lg:py-14 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-8">When you need a man with a van</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u) => (
              <div key={u.title} className="bg-white rounded-2xl border border-border p-6 space-y-2">
                <h3 className="text-sm font-black text-primary uppercase tracking-tight">{u.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-12 lg:py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-3">A man with a van near you</h2>
          <p className="text-sm text-text-secondary text-center max-w-2xl mx-auto mb-8 font-medium">435 UK areas covered — from city centres to smaller towns and suburbs. These are some of the busiest:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularAreas.map((a) => (
              <Link key={a.href} href={a.href} className="inline-flex items-center gap-1.5 bg-[#F9F9F7] border border-border rounded-full px-4 py-2 text-xs font-black text-primary hover:border-accent hover:text-accent transition-colors">
                <MapPin size={12} /> {a.name}
              </Link>
            ))}
            <Link href="/areas-covered" className="inline-flex items-center gap-1.5 bg-accent text-white rounded-full px-4 py-2 text-xs font-black hover:opacity-90 transition-opacity">
              View all 435 areas <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-14 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter text-center mb-8">Man with a van — FAQs</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-black text-primary mb-1">{item.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages + CTA */}
      <section className="py-12 lg:py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Link href="/cheap-man-and-van" className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Cheap man and van</Link>
            <span className="text-primary/20">·</span>
            <Link href="/man-and-van-cost" className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Man and van cost guide</Link>
            <span className="text-primary/20">·</span>
            <Link href="/cheap-van-hire-with-driver" className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Van hire with driver</Link>
            <span className="text-primary/20">·</span>
            <Link href="/furniture-delivery-service" className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Furniture delivery</Link>
            <span className="text-primary/20">·</span>
            <Link href="/help-me-move" className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Help me move</Link>
          </div>
          <div className="bg-primary rounded-[2rem] p-8 lg:p-12 text-center space-y-5">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Get your man with a van from £19/hr</h2>
            <p className="text-sm text-white/70 font-medium max-w-xl mx-auto">Free to submit. One verified mover quotes. No spam, no obligation — you decide whether to book after seeing the price.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start a Free Request <ArrowUpRight size={18} /></Link>
              <a href="tel:01217511269" className="bg-white/10 border border-white/20 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 hover:bg-white/20 transition-all"><Phone size={16} /> 0121 751 1269</a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
              {["Free to submit", "One mover quotes", "Details protected", "Rated 5.0 from 11 reviews"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/50"><CheckCircle2 size={12} className="text-accent" /> {t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
