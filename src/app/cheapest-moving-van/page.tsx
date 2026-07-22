import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Truck, PoundSterling, Timer } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Cheapest Moving Van | From £19/hr | Man and Van Club",
  description:
    "Cheapest moving van in the UK from £19/hr self-loading, £34/hr with driver help. No hidden fees. One verified mover reviews your move before quoting. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/cheapest-moving-van`,
  },
  openGraph: {
    title: "Cheapest Moving Van UK | From £19/hr | Man and Van Club",
    description: "The cheapest moving van service in the UK. From £19/hr self-loading. One verified mover. No lead blasts. Call 0121 751 1269.",
    url: `${siteUrl}/cheapest-moving-van`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Cheapest Moving Van UK")}&subtitle=${encodeURIComponent("From £19/hr — Verified Movers")}`, width: 1200, height: 630, alt: "Cheapest Moving Van UK | From £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheapest Moving Van UK | From £19/hr | Man and Van Club",
    description: "The cheapest moving van service in the UK. From £19/hr self-loading. One verified mover.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Cheapest Moving Van UK")}&subtitle=${encodeURIComponent("From £19/hr — Verified Movers")}`],
  },
};

const faqItems = [
  {
    q: "What is the cheapest moving van service in the UK?",
    a: "Man and Van Club offers the cheapest moving van from £19 per hour for self-loading. With driver help it is £34 per hour. These are among the lowest rates in the UK. You submit your move details for free, a verified mover reviews them, and you only pay if you accept the quote.",
  },
  {
    q: "How can a moving van be so cheap?",
    a: "The £19/hr rate is for self-loading — you do the lifting, the driver transports. This is the most affordable way to move. Independent movers on the platform set competitive rates because they are not paying franchise fees or large office overheads. The marketplace model keeps prices low.",
  },
  {
    q: "Is a cheap moving van reliable?",
    a: "Yes. Every mover on the platform is verified before they can see your move details. Your contact information stays anonymous until you accept a quote and pay the booking deposit. You are not dealing with an unvetted stranger — the platform screens movers first.",
  },
  {
    q: "What does £19/hr cover?",
    a: "The £19/hr self-loading rate covers the van and driver. You load your items into the van, the driver transports them to your new address, and you unload. Mileage within a reasonable local area is included. Longer distances may have a separate mileage charge — the mover confirms this in their quote.",
  },
  {
    q: "Can I get a cheap moving van for same-day moves?",
    a: "Same-day moves may be available depending on mover schedules. Submit your request with today's date and a verified mover will review it. Same-day moves are charged at the standard rates — there is no emergency surcharge.",
  },
  {
    q: "How does this compare to hiring a van myself?",
    a: "Hiring a van yourself typically costs £50–£80 per day plus fuel, insurance and any mileage charges. You also need to drive a larger vehicle and do all the lifting alone. With a man and van from £19/hr, you get a professional driver who knows the local roads, and you can opt for the driver-helps service at £34/hr if you need lifting assistance.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cheapest Moving Van UK",
  url: `${siteUrl}/cheapest-moving-van`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Cheapest moving van", "Budget man and van", "Affordable removals", "Low-cost moving"],
  description: "The cheapest moving van service in the UK. From £19/hr self-loading. One verified mover reviews your move details before quoting. No hidden fees, no lead blasts.",
  offers: [
    { "@type": "Offer", name: "Self-loading moving van", price: "19", priceCurrency: "GBP", priceUnit: "hour" },
    { "@type": "Offer", name: "Driver-helps moving van", price: "34", priceCurrency: "GBP", priceUnit: "hour" },
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
    { "@type": "ListItem", position: 2, name: "Cheapest Moving Van", item: `${siteUrl}/cheapest-moving-van` },
  ],
};

export default function CheapestMovingVanPage() {
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
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20"><PoundSterling size={14} /> Cheapest Rates</div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">&larr; All areas</Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Cheapest <span className="text-accent italic">Moving Van</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">The cheapest moving van in the UK. From £19/hr self-loading, £34/hr with driver help. One verified mover. No hidden fees.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><Timer size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Available</span><span className="text-sm font-black text-primary">24/7 including same-day</span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Verified</span><span className="text-sm font-black text-primary">Movers checked before access</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Get Free Quote <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">Why our moving van is the cheapest</h3>
              <ul className="space-y-4 text-sm text-text-secondary font-medium">
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">Independent movers.</strong> No franchise fees or corporate overheads. Movers on the platform work for themselves.</span></li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">Self-loading option.</strong> You load and unload — the driver transports. This is the most affordable way to move.</span></li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">No hidden fees.</strong> The quote you accept is the price you pay. The booking deposit comes off the total.</span></li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">Marketplace model.</strong> Competitive rates because movers set their own prices. No middleman markup.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Price comparison */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Cheap moving van prices</h2>
            <p className="text-text-secondary font-medium">Two tiers. Simple pricing. No surprises.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-4 font-black uppercase text-[10px] tracking-widest text-primary/50">Service</th>
                  <th className="text-right py-4 font-black uppercase text-[10px] tracking-widest text-primary/50">Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border"><td className="py-4 font-bold text-primary">Self-loading (you lift)</td><td className="py-4 text-right font-black text-primary text-lg">£19<span className="text-sm text-text-secondary font-bold">/hr</span></td></tr>
                <tr className="border-b border-border"><td className="py-4 font-bold text-primary">Driver helps (driver lifts too)</td><td className="py-4 text-right font-black text-accent text-lg">£34<span className="text-sm text-text-secondary font-bold">/hr</span></td></tr>
                <tr className="border-b border-border"><td className="py-4 font-bold text-primary">Single item collection</td><td className="py-4 text-right font-black text-primary text-lg">from £19</td></tr>
                <tr className="border-b border-border"><td className="py-4 font-bold text-primary">Studio / 1-bed flat (self-load)</td><td className="py-4 text-right font-black text-primary text-lg">£60–£150</td></tr>
                <tr className="border-b border-border"><td className="py-4 font-bold text-primary">2-bed house (driver helps)</td><td className="py-4 text-right font-black text-primary text-lg">£250–£450</td></tr>
                <tr><td className="py-4 font-bold text-primary">3-bed house (driver helps)</td><td className="py-4 text-right font-black text-primary text-lg">£350–£600</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Self-drive comparison */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Man and van vs self-drive hire</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-primary rounded-[2rem] p-8 space-y-4">
              <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2"><Truck size={20} className="text-accent" /> Man and van from £19/hr</h3>
              <ul className="space-y-3 text-white/80 text-sm font-medium">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Professional driver who knows the roads</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Insurance included</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> No large vehicle to drive yourself</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Driver-helps option if you need lifting</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> No deposit, no fuel top-up, no return trip</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-4">
              <h3 className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2">Self-drive van hire</h3>
              <ul className="space-y-3 text-text-secondary text-sm font-medium">
                <li className="flex gap-2">You drive an unfamiliar larger vehicle</li>
                <li className="flex gap-2">Excess insurance often extra (£10–£20/day)</li>
                <li className="flex gap-2">You do all the loading alone</li>
                <li className="flex gap-2">Fuel costs on top (£20–£40 typical)</li>
                <li className="flex gap-2">Must return van with full tank or pay a penalty</li>
                <li className="flex gap-2">Typical total cost: £70–£120 for a day</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Cheapest moving van questions</h2>
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
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Get the cheapest moving van</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">Submit your move details for free. One verified mover reviews before quoting. From £19/hr.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Get Free Quote <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
