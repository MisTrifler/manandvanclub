import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Truck, PoundSterling, Clock, Car, Fuel, Route } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Cheap Van Hire with Driver | From £19/hr | Man and Van Club",
  description:
    "Cheap van hire with driver from £19/hr. Why rent a van yourself when you get a professional driver too? Self-loading or driver-helps. No self-drive hassle. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/cheap-van-hire-with-driver`,
  },
  openGraph: {
    title: "Cheap Van Hire with Driver | From £19/hr | Man and Van Club",
    description: "Van hire with a driver from £19/hr. Cheaper than self-drive once you add fuel and insurance. Call 0121 751 1269.",
    url: `${siteUrl}/cheap-van-hire-with-driver`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Cheap Van Hire with Driver")}&subtitle=${encodeURIComponent("From £19/hr — Cheaper Than Self-Drive")}`, width: 1200, height: 630, alt: "Cheap Van Hire with Driver | From £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheap Van Hire with Driver | From £19/hr | Man and Van Club",
    description: "Van hire with a driver from £19/hr. Cheaper than self-drive once you add fuel and insurance.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Cheap Van Hire with Driver")}&subtitle=${encodeURIComponent("From £19/hr — Cheaper Than Self-Drive")}`],
  },
};

const faqItems = [
  {
    q: "Is it cheaper to hire a van with a driver than rent one myself?",
    a: "Often, yes. Self-drive van hire looks cheap at £50–£80 per day, but add fuel (£20–£40), insurance (£15–£25), mileage charges and the hassle of driving a larger vehicle, and you are often at £100+ for a basic local move. A man and van with driver from £19/hr means someone else drives, navigates, and brings blankets and straps. For a 2-hour local move, you could pay just £38 self-loading.",
  },
  {
    q: "What size van do I get?",
    a: "Movers typically use Transit-size vans or Luton vans. A Transit van fits a studio or small 1-bed flat. A Luton van handles a 2–3 bed house. When you submit your item list, the mover matches the right van size to your job — you do not need to guess.",
  },
  {
    q: "Can the driver help me load and unload?",
    a: "Yes. Choose the driver-helps service at £34/hr and the driver assists with carrying, loading and unloading. This is still significantly cheaper than a full removal company, which typically charges £80–£120/hr for a 2-person team.",
  },
  {
    q: "Do I need a driving licence?",
    a: "No. Because the driver drives the van, you do not need a licence, you do not need to worry about insurance, and you do not need to navigate a larger vehicle through narrow streets or busy roundabouts. You just load (or help load) and go.",
  },
  {
    q: "What is included in the price?",
    a: "The van, the driver, fuel, blankets and straps for protecting your items, and Goods in Transit insurance. There are no hidden fees for mileage within the local area. For longer distances, the mover quotes a fixed price so you know the total before you book.",
  },
  {
    q: "Can I hire a van with a driver for same-day moves?",
    a: "Yes, subject to availability. Submit your request with today's date and a mover will check if they can do it. Same-day and last-minute moves are charged at the same rates — no emergency surcharges.",
  },
  {
    q: "How does this compare to hiring from Hertz, Enterprise or Europcar?",
    a: "Self-drive hire companies charge a daily rate plus fuel, insurance, and often a mileage fee. You also need a clean driving licence, a credit card for the deposit, and you have to drive the van yourself. A van with a driver from £19/hr removes all of that — no deposit, no licence needed, no driving, and the price includes fuel and insurance.",
  },
  {
    q: "Can I ride in the van with the driver?",
    a: "In most cases, yes — if there is a passenger seat available in the cab. Mention this in your request so the mover knows. You cannot ride in the cargo area for safety reasons.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cheap Van Hire with Driver",
  url: `${siteUrl}/cheap-van-hire-with-driver`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Van hire with driver", "Cheap van hire", "Man and van", "Van and driver hire", "Moving van with driver"],
  description: "Cheap van hire with driver from £19/hr. Cheaper than self-drive once you add fuel and insurance. Professional driver, blankets and straps included. Call 0121 751 1269.",
  offers: [
    { "@type": "Offer", name: "Self-loading van with driver", price: "19", priceCurrency: "GBP", priceUnit: "hour" },
    { "@type": "Offer", name: "Driver-helps van with driver", price: "34", priceCurrency: "GBP", priceUnit: "hour" },
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
    { "@type": "ListItem", position: 2, name: "Cheap Van Hire with Driver", item: `${siteUrl}/cheap-van-hire-with-driver` },
  ],
};

export default function CheapVanHireWithDriverPage() {
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
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Van + Driver</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Cheap Van Hire <span className="text-accent italic">with Driver</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">Why rent a van yourself? Get a van and a professional driver from £19/hr. No licence needed. No fuel costs. No insurance paperwork. Just help with your move.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><Fuel size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Fuel</span><span className="text-sm font-black text-primary">Included in price</span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Insurance</span><span className="text-sm font-black text-primary">Goods in Transit cover</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Get a Quote <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">Van with driver vs self-drive hire</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-red-500">Self-drive van hire</span>
                    <ul className="space-y-2 text-text-secondary font-medium">
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> Daily rate £50–£80</li>
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> Fuel: £20–£40 extra</li>
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> Insurance: £15–£25 extra</li>
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> Credit card deposit</li>
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> You drive the van</li>
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> No blankets or straps</li>
                      <li className="flex gap-2"><span className="text-red-500 text-xs">✕</span> You load alone</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent">Van + driver (us)</span>
                    <ul className="space-y-2 text-text-secondary font-medium">
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> From £19/hr</li>
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> Fuel included</li>
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> Insurance included</li>
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> No deposit needed</li>
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> Professional driver</li>
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> Blankets + straps provided</li>
                      <li className="flex gap-2"><CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" /> Driver helps (at £34/hr)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to choose van + driver */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Use cases</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">When a van with driver makes sense</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Car size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">No driving licence</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">You cannot or do not want to drive a van. With a driver, you do not need a licence, a credit card, or any driving experience. The driver handles the road — you handle your items.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Route size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Unfamiliar area</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">You are moving to a new city or navigating roads you do not know. A local driver knows the one-way systems, the clean air zones, the low bridges and the best places to park near your address.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <PoundSterling size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Cheaper overall</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Self-drive hire at £50–£80/day sounds cheap. Add fuel, insurance, the deposit hold on your card and your own time driving — and you are often paying more than £19/hr with a driver included.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Truck size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Need help with lifting</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Self-drive means you load alone. The driver-helps service at £34/hr gives you a driver who also carries your furniture, navigates stairs, and positions items carefully in the van and at your new address.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Clock size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Short-notice move</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Van hire companies often need advance booking, especially on weekends. A man and van can sometimes help same-day. Submit your request and a mover checks their availability immediately.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <CheckCircle2 size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Move and travel separately</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">You want to drive your own car or take the train while your items travel in the van. No need to return the hire van to a depot — the driver drops your items and leaves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Van + driver pricing</h2>
            <p className="text-text-secondary font-medium">Includes van, driver, fuel, insurance, blankets and straps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-5">
              <div className="flex items-center gap-3"><Truck size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-primary">Self-loading</h3></div>
              <div><span className="text-4xl font-black text-primary">£19</span><span className="text-lg font-bold text-text-secondary">/hr</span></div>
              <p className="text-sm text-text-secondary font-medium">You load and unload. Driver transports. You save the most this way — cheaper than renting a van yourself once you add fuel and insurance.</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Van + professional driver</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Fuel included</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Insurance included</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Blankets and straps provided</li>
              </ul>
            </div>
            <div className="bg-primary rounded-[2rem] p-8 space-y-5">
              <div className="flex items-center gap-3"><Truck size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-white">Driver helps</h3></div>
              <div><span className="text-4xl font-black text-accent">£34</span><span className="text-lg font-bold text-white/70">/hr</span></div>
              <p className="text-white/80 text-sm font-medium">Driver helps load and unload. Still cheaper than a full removal company and you do not have to lift a finger if you do not want to.</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Everything in self-loading</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Driver carries your items</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Help with stairs and tight access</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Careful positioning at both ends</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Van and driver hire near you</h2>
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
            ].map((area) => (
              <Link key={area.slug} href={`/${area.slug}`} className="bg-[#F9F9F7] rounded-xl border border-border p-4 text-center text-sm font-bold text-primary hover:border-accent hover:text-accent transition-all">
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
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Van with driver questions</h2>
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
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Need a van with a driver?</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">From £19/hr with fuel and insurance included. Cheaper than self-drive hire.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Get a Quote <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
