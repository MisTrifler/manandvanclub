import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Phone, ShieldCheck, CheckCircle2, Scale, Users, Lock, PoundSterling, Clock } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Club vs AnyVan | Honest Comparison | Man and Van Club",
  description: "Compare Man and Van Club with AnyVan. See how the marketplace models differ: driver selection, pricing transparency, commission structure and customer control. Make an informed choice.",
  alternates: {
    canonical: `${siteUrl}/vs-anyvan`,
  },
  openGraph: {
    title: "Man and Van Club vs AnyVan — Honest Comparison",
    description: "Compare Man and Van Club with AnyVan. Marketplace models, pricing transparency, commission structure and customer control.",
    url: `${siteUrl}/vs-anyvan`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Man and Van Club vs AnyVan")}&subtitle=${encodeURIComponent("Compare Moving Services")}`, width: 1200, height: 630, alt: "Man and Van Club vs AnyVan Comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Club vs AnyVan — Honest Comparison",
    description: "Compare Man and Van Club with AnyVan. Marketplace models, pricing transparency and customer control.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Man and Van Club vs AnyVan")}&subtitle=${encodeURIComponent("Compare Moving Services")}`],
  },
};

const faqItems = [
  {
    q: "Is Man and Van Club cheaper than AnyVan?",
    a: "It depends on the move. Man and Van Club does not add a commission on top of the mover's quote. You receive a quote directly from one verified mover. AnyVan operates a different model where movers compete on price, which can sometimes produce lower bids but may also result in movers cutting corners to win the job. The best way to compare is to submit your move details on both platforms and compare the actual quotes you receive."
  },
  {
    q: "How is Man and Van Club different from AnyVan?",
    a: "Man and Van Club sends your anonymised request to one verified mover who reviews the details and quotes. Your contact details are not shared until you accept. AnyVan operates a competitive bidding model where multiple movers can quote. Both are marketplaces — neither employs its own movers directly."
  },
  {
    q: "Does Man and Van Club have a minimum fee?",
    a: "No. Man and Van Club does not set a minimum fee. The mover's quote is based on your actual move details — postcodes, items, access, stairs and timing. UK man and van rates in 2026 start from £19 per hour for local jobs."
  },
  {
    q: "Can I cancel a booking on Man and Van Club?",
    a: "Yes. If you have not yet accepted the mover's quote, there is nothing to cancel — your details remain private. If you have accepted and paid the booking deposit, cancellation terms are set by the mover and outlined before you confirm."
  },
  {
    q: "Which platform is better for small moves?",
    a: "For small moves (single items, studio flats, student moves), both platforms can work. Man and Van Club's one-mover model means you get a direct quote from a mover who has reviewed your specific job details, rather than the lowest bid from a competitive auction where details may be skimmed."
  },
  {
    q: "Do both platforms insure my belongings?",
    a: "Both platforms require movers to hold Goods in Transit and Public Liability insurance. Man and Van Club verifies these documents before a mover can access customer requests. You should always confirm insurance details directly with your mover before the move, regardless of which platform you use."
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
    { "@type": "ListItem", position: 2, name: "Vs AnyVan", item: `${siteUrl}/vs-anyvan` },
  ],
};

const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Club — Marketplace Comparison",
  url: `${siteUrl}/vs-anyvan`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    telephone: "+44-121-751-1269",
    email: "support@manandvanclub.co.uk",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: "Man and van marketplace comparison",
  description: "Honest comparison between Man and Van Club and AnyVan marketplace models, covering pricing, driver selection, commission structure and customer control.",
};

const comparisonRows = [
  { feature: "How quotes work", mvc: "One verified mover reviews your details and sends a quote", anyvan: "Multiple movers bid competitively on your job" },
  { feature: "Your contact details", mvc: "Private until you accept the quote and pay the deposit", anyvan: "Shared with bidding movers when you receive quotes" },
  { feature: "Commission model", mvc: "No commission added to the mover's quote", anyvan: "Commission deducted from the mover's payment" },
  { feature: "Quote accuracy", mvc: "Mover reviews access, stairs, parking and items before quoting", anyvan: "Bids based on your description — may change on the day" },
  { feature: "Mover verification", mvc: "Goods in Transit + Public Liability insurance verified before access", anyvan: "Movers must meet platform standards; insurance required" },
  { feature: "Who handles the move", mvc: "The mover who reviewed your details — no substitutions", anyvan: "The winning bidder — could differ from who reviewed details" },
  { feature: "Price changes on the day", mvc: "Possible if actual conditions differ from the request", anyvan: "Possible if actual conditions differ from the request" },
  { feature: "UK coverage", mvc: "174+ areas across England, Scotland, Wales and Northern Ireland", anyvan: "UK-wide coverage" },
  { feature: "Pricing guide", mvc: "Free guide price shown before you decide", anyvan: "Quotes from multiple bidders to compare" },
  { feature: "Booking deposit", mvc: "Deposit paid after accepting the quote — deducted from total", anyvan: "Payment taken through the platform" },
];

export default function VsAnyVanPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Vs AnyVan</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <Scale size={12} /> Honest Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            Man and Van Club vs AnyVan
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Two different marketplace models. Here is how they actually compare — no exaggeration, no fabricated reviews, just the facts about how each platform works so you can make an informed choice.
          </p>
        </div>
      </section>

      {/* Key Differences */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-10 text-center">Key Differences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F9F9F7] rounded-2xl border border-border p-6 space-y-3 text-center">
              <Users size={28} className="text-accent mx-auto" />
              <h3 className="font-black text-primary text-sm uppercase tracking-tight">One Mover, Not an Auction</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Man and Van Club sends your request to one verified mover who reviews the details carefully. AnyVan runs a competitive bidding model where multiple movers race to offer the lowest price.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-2xl border border-border p-6 space-y-3 text-center">
              <Lock size={28} className="text-accent mx-auto" />
              <h3 className="font-black text-primary text-sm uppercase tracking-tight">Privacy Until You Accept</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Your contact details stay private until you accept a quote and pay the deposit. On competitive platforms, your details may be shared with multiple bidders when quotes come in.</p>
            </div>
            <div className="bg-[#F9F9F7] rounded-2xl border border-border p-6 space-y-3 text-center">
              <PoundSterling size={28} className="text-accent mx-auto" />
              <h3 className="font-black text-primary text-sm uppercase tracking-tight">No Commission on Top</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Man and Van Club does not add commission to the mover's quote. You see the mover's price directly. On commission-based platforms, the mover's take-home is reduced, which can affect service quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-10 text-center">Feature-by-Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-black text-primary uppercase tracking-widest text-xs">Feature</th>
                  <th className="text-left py-4 px-4 font-black text-accent uppercase tracking-widest text-xs">Man and Van Club</th>
                  <th className="text-left py-4 px-4 font-black text-primary/60 uppercase tracking-widest text-xs">AnyVan</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F9F9F7]"}>
                    <td className="py-4 px-4 font-bold text-primary">{row.feature}</td>
                    <td className="py-4 px-4 text-text-secondary leading-relaxed">{row.mvc}</td>
                    <td className="py-4 px-4 text-text-secondary leading-relaxed">{row.anyvan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary mt-6 text-center">
            Information about AnyVan is based on their publicly available website and terms as of July 2026. Features may change. Always check the platform directly before booking.
          </p>
        </div>
      </section>

      {/* When to Choose Each */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-10 text-center">When to Choose Which</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-accent/5 rounded-2xl border border-accent/20 p-8 space-y-4">
              <h3 className="font-black text-accent text-sm uppercase tracking-tight">Choose Man and Van Club if you want:</h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>A mover who carefully reviews your details before quoting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>Your contact details kept private until you accept</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>No commission added to the mover's quote</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>Consistent pricing — the mover who reviewed the job handles the move</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>A guide price before committing</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 space-y-4">
              <h3 className="font-black text-primary text-sm uppercase tracking-tight">AnyVan may suit you if you want:</h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary/40 flex-shrink-0 mt-0.5" />
                  <span>Multiple quotes to compare side by side</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary/40 flex-shrink-0 mt-0.5" />
                  <span>The lowest possible bid for a straightforward job</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary/40 flex-shrink-0 mt-0.5" />
                  <span>A well-known brand with a large existing user base</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary/40 flex-shrink-0 mt-0.5" />
                  <span>Platform-managed payment processing</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-6 text-center max-w-2xl mx-auto">
            Both platforms are marketplaces that connect customers with independent movers. Neither employs its own movers directly. The right choice depends on whether you prefer a carefully reviewed single quote or competitive bidding.
          </p>
        </div>
      </section>

      {/* Pricing Example */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Pricing Example</h2>
          <div className="bg-white rounded-2xl border border-border p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 mb-4">Illustrative example — not a quote</p>
            <h3 className="font-black text-primary text-lg uppercase tracking-tight mb-4">1-Bed Flat Move: Birmingham to London</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Man and Van Club</p>
                <p className="text-sm text-text-secondary">One verified mover reviews your flat access, stairs, parking and item list. Sends a quote based on the actual job details.</p>
                <p className="text-2xl font-black text-accent">£250 – £400</p>
                <p className="text-xs text-text-secondary">No commission added. Mover keeps the full amount.</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">AnyVan</p>
                <p className="text-sm text-text-secondary">Multiple movers bid. Lowest bid may win, but details may be skimmed to offer a lower price.</p>
                <p className="text-2xl font-black text-primary/40">£220 – £450</p>
                <p className="text-xs text-text-secondary">Platform commission deducted from mover's payment.</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-6 border-t border-border pt-4">
              These ranges are illustrative based on typical 2026 UK rates. Actual quotes depend on your specific postcodes, access, items and timing. Submit your details on both platforms to compare real quotes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="bg-[#F9F9F7] p-6 rounded-2xl border border-border/50 space-y-3">
                <h3 className="font-black text-primary text-sm leading-snug">{item.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] text-center border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">
            Try Man and Van Club
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free. One verified mover reviews your request and sends a quote. No obligation, no shared contact details until you accept.
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
