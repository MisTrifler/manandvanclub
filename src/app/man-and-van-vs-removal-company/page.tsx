import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone, ShieldCheck, CheckCircle2, Truck, Building2, Scale } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van vs Removal Company | Man and Van Club",
  description:
    "Man and van vs removal company — compare costs, services, and when each option is better. Man and van is 30–50% cheaper for smaller moves. Full removals suit larger homes with packing services.",
  alternates: {
    canonical: `${siteUrl}/man-and-van-vs-removal-company`,
  },
  openGraph: {
    title: "Man and Van vs Removal Company — Which Is Right for You?",
    description:
      "Compare man and van vs removal company costs, services and best use cases. Man and van is 30–50% cheaper for smaller moves.",
    url: `${siteUrl}/man-and-van-vs-removal-company`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Man and Van vs Removal Company")}&subtitle=${encodeURIComponent("Which Should You Choose?")}`, width: 1200, height: 630, alt: "Man and Van vs Removal Company Comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van vs Removal Company — Which Is Right for You?",
    description:
      "Compare man and van vs removal company costs, services and best use cases.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Man and Van vs Removal Company")}&subtitle=${encodeURIComponent("Which Should You Choose?")}`],
  },
};

const faqItems = [
  {
    q: "Is a man and van cheaper than a removal company?",
    a: "Yes. A man and van is typically 30–50% cheaper than a full removals company for smaller moves (flats, single items, student moves, 1–2 bedroom houses). This is because man and van operators have lower overheads — usually one van and one or two people rather than a fleet, warehouse and large team.",
  },
  {
    q: "When should I use a removal company instead of a man and van?",
    a: "Consider a removal company if you have a 4+ bedroom house, need professional packing services, have very fragile or high-value items requiring specialist handling, or need a guaranteed move date with a large crew. A man and van works well for most 1–3 bedroom homes, flats, student moves and single-item collections.",
  },
  {
    q: "Do man and van operators have insurance?",
    a: "On Man and Van Club, approved movers must provide Goods in Transit and Public Liability insurance before they can access customer enquiries. Always confirm cover details directly with your mover before booking, as policy limits and conditions can vary.",
  },
  {
    q: "Can a man and van handle long-distance moves?",
    a: "Yes. Many man and van operators cover long-distance and city-to-city moves across the UK. Long-distance moves are typically priced per mile or as a fixed quote based on route time, volume and access. A Birmingham to London man and van move in 2026 typically costs £300–£600.",
  },
  {
    q: "What is Man and Van Club — is it a man and van or a removal company?",
    a: "Neither. Man and Van Club is a marketplace that connects customers with independent, verified local movers. You submit a free move request and one approved mover reviews your details before sending a quote. This gives you the personal service of a man and van with the verification checks of a larger platform.",
  },
  {
    q: "How much does a man and van cost compared to a removal company?",
    a: "In 2026, a man and van for a 3-bed house move typically costs £300–£600, while a removal company for the same move might charge £600–£1,200. For a 1-bed flat, a man and van costs £150–£350 vs £400–£700 for a removal company. The gap narrows for 4+ bedroom homes where packing, crew size and specialist handling become more important.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Man and Van vs Removal Company", item: `${siteUrl}/man-and-van-vs-removal-company` },
  ],
};

export default function ManAndVanVsRemovalCompanyPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Man and Van vs Removal Company</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <Scale size={12} /> Comparison Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            Man and Van vs Removal Company
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Not sure which to choose? A man and van is typically 30–50% cheaper for smaller moves, while a removal company suits larger homes with packing services. Here is how to decide.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-accent/5 border-2 border-accent/20 rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Quick Answer</h2>
            <p className="text-text-secondary leading-relaxed">
              Choose a <strong>man and van</strong> if you are moving from a flat, student accommodation, a 1–3 bedroom house, or need a single-item collection. It is cheaper, faster to book and flexible on dates.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Choose a <strong>removal company</strong> if you have a 4+ bedroom house, need professional packing, have high-value antiques or specialist items, or want a guaranteed large crew on a specific date.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van vs Removal Company — At a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Factor</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Man and Van</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Removal Company</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { factor: "Typical cost (3-bed house)", manAndVan: "£300–£600", removal: "£600–£1,200" },
                  { factor: "Typical cost (1-bed flat)", manAndVan: "£150–£350", removal: "£400–£700" },
                  { factor: "Typical cost (single item)", manAndVan: "From £19", removal: "£150–£300 (minimum charge)" },
                  { factor: "Crew size", manAndVan: "1–2 people", removal: "2–6+ people" },
                  { factor: "Van size", manAndVan: "Transit or Luton van", removal: "Large Luton or articulated lorry" },
                  { factor: "Packing service", manAndVan: "Usually not included", removal: "Often included or available" },
                  { factor: "Booking lead time", manAndVan: "Same day to 1 week", removal: "1–4 weeks" },
                  { factor: "Insurance", manAndVan: "Goods in Transit + Public Liability", removal: "Goods in Transit + Public Liability (higher limits typical)" },
                  { factor: "Best for", manAndVan: "Flats, student moves, single items, 1–3 bed houses", removal: "4+ bed houses, fragile/valuable items, packing needed" },
                  { factor: "Flexibility", manAndVan: "High — flexible dates, same-day available", removal: "Lower — fixed schedule, minimum charges" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F9F9F7]"}>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{row.factor}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-2"><Truck size={14} className="text-accent flex-shrink-0" />{row.manAndVan}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-2"><Building2 size={14} className="text-primary/40 flex-shrink-0" />{row.removal}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to Choose Each */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Man and Van */}
            <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center"><Truck size={24} /></div>
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">Choose a Man and Van When</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Moving from a flat, studio or apartment",
                  "Student move — halls or shared house",
                  "Single-item collection (sofa, bed, appliance)",
                  "1–3 bedroom house move",
                  "Budget matters — typically 30–50% cheaper",
                  "Need flexible or same-day booking",
                  "Moving locally within the same town or city",
                  "Do not need professional packing services",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-started" className="btn-orange w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm text-center block">
                Get a Man and Van Quote
              </Link>
            </div>

            {/* Removal Company */}
            <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><Building2 size={24} /></div>
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">Choose a Removal Company When</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "4+ bedroom house with large volume of items",
                  "Need professional packing and wrapping included",
                  "Have high-value antiques or artwork requiring specialist handling",
                  "Need a guaranteed large crew on a fixed date",
                  "Moving abroad or requiring customs documentation",
                  "Need storage before or after the move",
                  "Want all materials (boxes, tape, bubble wrap) included",
                  "Complex move with multiple pick-up or drop-off points",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-primary/40 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-secondary text-center">
                For a verified man and van quote, submit your details on Man and Van Club.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison by Move Type */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Cost Comparison by Move Type (UK 2026)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Move Type</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Man and Van</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Removal Company</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Saving</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { type: "Single item (local)", mv: "From £19", rc: "£150–£300", saving: "50–75%" },
                  { type: "Studio / 1-bed flat", mv: "£150–£350", rc: "£400–£700", saving: "50–60%" },
                  { type: "2-bed flat", mv: "£250–£500", rc: "£500–£900", saving: "40–50%" },
                  { type: "1–2 bed house", mv: "£200–£400", rc: "£500–£900", saving: "40–55%" },
                  { type: "3-bed house", mv: "£300–£600", rc: "£600–£1,200", saving: "30–50%" },
                  { type: "4+ bed house", mv: "£500–£1,000+", rc: "£1,000–£2,500+", saving: "0–30%" },
                  { type: "Student move", mv: "£80–£350", rc: "£250–£600", saving: "40–65%" },
                  { type: "Same-day move", mv: "£40–£60/hr", rc: "Often not available", saving: "N/A" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F9F9F7]"}>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{row.type}</td>
                    <td className="px-6 py-4 text-sm font-black text-accent">{row.mv}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{row.rc}</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">{row.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary text-center mt-6">
            Prices are typical UK ranges for 2026. Actual quotes depend on postcodes, volume, access, stairs, parking and timing. Man and Van Club lets you submit a free request for a verified mover quote.
          </p>
        </div>
      </section>

      {/* How Man and Van Club Fits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-6 text-center">How Man and Van Club Fits</h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-8 leading-relaxed">
            Man and Van Club is not a man and van operator or a removal company — it is a marketplace that connects you with independent, verified local movers. You get the cost advantage of a man and van with the verification checks of a larger platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck size={24} />, title: "Verified Movers", desc: "Business details, contact information and insurance checked before movers can access enquiries." },
              { icon: <CheckCircle2 size={24} />, title: "One Mover, Not Many", desc: "Your details go to one mover at a time. No flood of calls from competing companies." },
              { icon: <Truck size={24} />, title: "Free To Submit", desc: "Submit your move request for free. Booking deposit only if you accept a quote, deducted from the total." },
            ].map((item, i) => (
              <div key={i} className="bg-[#F9F9F7] rounded-2xl border border-border p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto">{item.icon}</div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van vs Removal Company FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="bg-white p-6 rounded-2xl border border-border/50 space-y-3">
                <h3 className="font-black text-primary text-sm leading-snug">{item.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Compare Quotes?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free on Man and Van Club. One verified mover reviews your request and sends a quote before you decide whether to book.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Start Your Move Request <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-white border-2 border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> Call 0121 751 1269
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Verified Movers</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-600" /> Free To Submit</span>
          </div>
        </div>
      </section>

      {/* ── Mobile Floating Call Button ── */}
      <a
        href="tel:01217511269"
        className="floating-call-btn fixed bottom-20 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </div>
  );
}
