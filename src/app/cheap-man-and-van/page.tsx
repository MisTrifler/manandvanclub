import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Truck, PoundSterling, Star, BadgePercent } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Cheap Man and Van | From £19/hr | Man and Van Club",
  description:
    "Cheap man and van from £19/hr. The cheapest verified man and van in the UK. Self-loading or driver-helps at £34/hr. No hidden fees. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/cheap-man-and-van`,
  },
  openGraph: {
    title: "Cheap Man and Van | From £19/hr | Man and Van Club",
    description: "The cheapest verified man and van in the UK. From £19/hr. No hidden fees. Call 0121 751 1269.",
    url: `${siteUrl}/cheap-man-and-van`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Cheap Man and Van")}&subtitle=${encodeURIComponent("From £19/hr — Verified & Insured")}`, width: 1200, height: 630, alt: "Cheap Man and Van | From £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheap Man and Van | From £19/hr | Man and Van Club",
    description: "The cheapest verified man and van in the UK. From £19/hr. No hidden fees. Call 0121 751 1269.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Cheap Man and Van")}&subtitle=${encodeURIComponent("From £19/hr — Verified & Insured")}`],
  },
};

const faqItems = [
  {
    q: "What is the cheapest man and van in the UK?",
    a: "Man and Van Club offers man and van services from £19 per hour for self-loading — among the cheapest rates in the UK. With driver help it is £34 per hour. Independent movers on the platform keep prices low because they are not paying franchise fees or large office overheads. The marketplace model passes savings to you.",
  },
  {
    q: "How can a man and van be so cheap?",
    a: "The £19/hr rate is for self-loading — you do the lifting, the driver transports. This is the most affordable way to move. Independent movers set their own competitive rates because they are not paying franchise fees or employing a large back-office team. You get a professional service without the overhead costs passed on to you.",
  },
  {
    q: "Is a cheap man and van reliable?",
    a: "Yes. Every mover is verified before they can access move requests. Your contact details stay private until you accept a quote. Movers carry Goods in Transit insurance and public liability insurance. Being affordable does not mean being unreliable — it means independent movers are competing fairly on a transparent platform.",
  },
  {
    q: "What is the difference between £19/hr and £34/hr?",
    a: "At £19/hr (self-loading), you load your items into the van and unload them at the other end. The driver transports. At £34/hr (driver-helps), the driver assists with carrying, loading and unloading. Both include the van, driver, fuel, insurance, blankets and straps.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. The hourly rate includes the van, driver, fuel, insurance, blankets and straps. For local moves, there are no extra mileage charges. For longer-distance moves between cities, the mover quotes a fixed price so you know the total before you book. No surprise charges on moving day.",
  },
  {
    q: "Is this cheaper than hiring a van myself?",
    a: "Often, yes. Self-drive van hire from companies like Enterprise or Hertz costs £50–£80 per day. Add fuel (£20–£40), insurance (£15–£25), and mileage charges — and you are at £100+ for a day. A man and van from £19/hr for a 2-hour local move is just £38. Plus you do not have to drive the van yourself.",
  },
  {
    q: "Can I get a cheap man and van on the same day?",
    a: "Same-day moves may be available depending on mover schedules. Submit your request with today's date and a mover will check availability. Same-day moves are charged at standard rates — no emergency or last-minute surcharges.",
  },
  {
    q: "Do you offer student discounts?",
    a: "Yes. UNiDAYS members get £12 off their booking. Student moves — halls of residence, shared houses, end-of-term clearouts — are some of the most affordable jobs because they tend to be smaller loads. Self-loading at £19/hr already makes student moves very budget-friendly.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cheap Man and Van",
  url: `${siteUrl}/cheap-man-and-van`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Cheap man and van", "Budget man and van", "Affordable removals", "Low-cost man and van", "Cheap moving van"],
  description: "Cheap man and van from £19/hr. The cheapest verified man and van in the UK. Self-loading or driver-helps at £34/hr. No hidden fees. Call 0121 751 1269.",
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
    { "@type": "ListItem", position: 2, name: "Cheap Man and Van", item: `${siteUrl}/cheap-man-and-van` },
  ],
};

export default function CheapManAndVanPage() {
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
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">UK&apos;s cheapest verified man and van</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Cheap Man <span className="text-accent italic">and Van</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">From £19/hr. Verified movers. No hidden fees. No ringing around. Submit your move once, get a quote from one vetted mover, and decide whether to book.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Self-loading</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><BadgePercent size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Driver helps</span><span className="text-2xl font-black text-primary">£34<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Included</span><span className="text-sm font-black text-primary">Fuel + insurance</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Get a Cheap Quote <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">How our prices compare</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 text-[9px] font-black uppercase tracking-widest text-primary/50">Service</th>
                      <th className="text-left py-3 pr-4 text-[9px] font-black uppercase tracking-widest text-primary/50">Typical cost</th>
                      <th className="text-left py-3 text-[9px] font-black uppercase tracking-widest text-primary/50">Includes</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary font-medium">
                    <tr className="border-b border-border/50 bg-accent/5">
                      <td className="py-3 pr-4 font-black text-primary">Man and Van Club</td>
                      <td className="py-3 pr-4 font-black text-accent">£19–£34/hr</td>
                      <td className="py-3">Van, driver, fuel, insurance, blankets</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Other man and van</td>
                      <td className="py-3 pr-4">£30–£50/hr</td>
                      <td className="py-3">Varies — often extra for fuel</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Self-drive van hire</td>
                      <td className="py-3 pr-4">£50–£100/day</td>
                      <td className="py-3">Van only — fuel + insurance extra</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Removal company</td>
                      <td className="py-3 pr-4">£80–£120/hr</td>
                      <td className="py-3">Full service — often overkill for small moves</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why we are cheap */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Why are we cheaper?</h2>
            <p className="text-text-secondary font-medium">Affordable does not mean cutting corners. It means a smarter business model.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <PoundSterling size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">Independent movers</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Movers on the platform are self-employed. They are not paying franchise fees, large office rents or employing a sales team. Those savings are passed to you through lower hourly rates.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <CheckCircle2 size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">No lead-selling</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Some platforms sell your details to 5 or 10 companies who all call you. That model costs you time and the movers money in lead fees — which gets added to your bill. Here, one mover reviews your request. No lead blast, no commission markup.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <Truck size={28} className="text-accent" />
              <h3 className="text-lg font-black uppercase tracking-tight text-primary">You choose the service level</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">Not every move needs a full removals team. If you can load your own boxes, pay £19/hr. If you need help carrying, pay £34/hr. You are not paying for a service you do not need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get for £19/hr */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">What is included</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">What you get for £19/hr</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🚐", label: "Transit or Luton van" },
              { icon: "🧑‍✈️", label: "Professional driver" },
              { icon: "⛽", label: "Fuel included" },
              { icon: "🛡️", label: "Goods in Transit insurance" },
              { icon: "📦", label: "Moving blankets" },
              { icon: "🔗", label: "Ratchet straps" },
              { icon: "🔧", label: "Dismantling tools (if needed)" },
              { icon: "📋", label: "No hidden fees" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-border p-5 text-center space-y-2">
                <div className="text-2xl">{item.icon}</div>
                <span className="text-xs font-black text-primary uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Cheap man and van near you</h2>
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
              { name: "Coventry", slug: "man-and-van-coventry" },
              { name: "Wolverhampton", slug: "man-and-van-wolverhampton" },
              { name: "Newcastle", slug: "man-and-van-newcastle-upon-tyne" },
              { name: "Leicester", slug: "man-and-van-leicester" },
              { name: "Derby", slug: "man-and-van-derby" },
            ].map((area) => (
              <Link key={area.slug} href={`/${area.slug}`} className="bg-[#F9F9F7] rounded-xl border border-border p-4 text-center text-sm font-bold text-primary hover:border-accent hover:text-accent transition-all">
                {area.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/areas-covered" className="text-sm font-bold text-accent hover:underline">View all 464 areas →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Cheap man and van questions</h2>
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
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Get a cheap man and van quote</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">From £19/hr. Verified movers. No hidden fees. Submit your move for free.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
