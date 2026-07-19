import CalculatorContent from "./CalculatorContent";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Phone, ShieldCheck, CheckCircle2, Calculator, MapPin, PoundSterling, Truck } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Moving Cost Calculator | Estimate Your Man and Van Price | Man and Van Club",
  description:
    "Estimate your man and van cost in seconds. Select your move type, region and access level for an instant guide price. Free to submit — get a verified mover quote before you book.",
  alternates: {
    canonical: `${baseUrl}/moving-cost-calculator`,
  },
  openGraph: {
    title: "Moving Cost Calculator | Estimate Your Man and Van Price",
    description: "Estimate your man and van cost in seconds. Select move type, region and access for an instant guide price.",
    url: `${baseUrl}/moving-cost-calculator`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Moving Cost Calculator")}&subtitle=${encodeURIComponent("Estimate Your Move Cost")}`, width: 1200, height: 630, alt: "Moving Cost Calculator — Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Cost Calculator | Estimate Your Man and Van Price",
    description: "Estimate your man and van cost in seconds. Free guide price based on move type, region and access.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Moving Cost Calculator")}&subtitle=${encodeURIComponent("Estimate Your Move Cost")}`],
  },
};

const faqItems = [
  { q: "How accurate is this moving cost calculator?", a: "This calculator gives a guide price based on typical UK rates for 2026. Your final quote from a verified mover depends on exact postcodes, item list, distance, van size, number of helpers, parking, stairs, lift access and mover availability. The estimate is a useful starting point, not a guarantee." },
  { q: "Why does London cost more?", a: "London man and van rates are typically 15–25% higher than the rest of the UK due to higher operating costs, congestion charges, the ULEZ expansion, Controlled Parking Zones and longer journey times in traffic. Our London estimates reflect these additional costs." },
  { q: "What is the booking deposit?", a: "The booking deposit secures your accepted mover quote and releases your contact details to that mover only. It is deducted from the mover's total quote, so your overall move cost stays the same. The remaining balance is paid directly to the mover on moving day." },
  { q: "Why does same-day cost more?", a: "Same-day moves typically carry a 15–30% premium because the mover may need to rearrange their schedule, and availability is more limited. Same-day man and van rates in 2026 start from £55 per hour, compared to £19 for standard bookings." },
  { q: "How much does a man and van cost per hour in the UK?", a: "In 2026, UK man and van hourly rates typically range from £19 to £70 per hour outside London, and £55 to £80 per hour in London. Rates depend on van size, number of helpers, distance, access and time of day." },
  { q: "Is it free to get an actual quote?", a: "Yes. Submitting a move request on Man and Van Club is free. A verified mover reviews your details and sends a quote. You only pay a booking deposit if you choose to accept the quote, and the deposit is deducted from the total." },
];

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
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Moving Cost Calculator", item: `${baseUrl}/moving-cost-calculator` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to estimate your man and van cost",
  description: "Use our free moving cost calculator to get an instant guide price for your man and van move anywhere in the UK.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Select your move type", text: "Choose from single item, flat move, house removal, student move or office relocation." },
    { "@type": "HowToStep", position: 2, name: "Choose your region", text: "Select West Midlands, Greater London or Other UK to get region-specific pricing." },
    { "@type": "HowToStep", position: 3, name: "Rate your access difficulty", text: "Tell us about stairs, lifts, parking and access at your properties." },
    { "@type": "HowToStep", position: 4, name: "See your estimate", text: "Get an instant guide price range based on typical 2026 UK man and van rates." },
    { "@type": "HowToStep", position: 5, name: "Submit for a real quote", text: "Enter your actual postcodes, item list and access notes for a verified mover quote before you book." },
  ],
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Man and Van Club Moving Cost Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  description: "Free UK moving cost calculator. Get an instant guide price for man and van services based on move type, region and access. No sign-up required.",
  url: `${baseUrl}/moving-cost-calculator`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
  },
};

export default function MovingCostCalculatorPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6" /></svg>
              <span className="text-primary font-bold">Moving Cost Calculator</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <Calculator size={12} /> Free Cost Calculator
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            Moving Cost Calculator
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Get an instant guide price for your man and van move. Select your move type, region and access level, then submit your details for a verified mover quote.
          </p>
        </div>
      </section>

      {/* Calculator + Result */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <CalculatorContent />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-10 text-center">How the Calculator Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <PoundSterling size={24} />, title: "Base Rates", desc: "We use typical 2026 UK man and van rates for each move type and region." },
              { icon: <Truck size={24} />, title: "Access Adjusted", desc: "Stairs, no-lift access and parking restrictions increase the estimate." },
              { icon: <MapPin size={24} />, title: "Region Weighted", desc: "West Midlands, London and other UK regions have different rate bands." },
              { icon: <CheckCircle2 size={24} />, title: "Guide Price", desc: "You get a range, not a fixed price. Submit for a real mover quote." },
            ].map((step, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto">{step.icon}</div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Moving Cost Calculator FAQ</h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready for a Real Quote?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            The calculator gives a guide price. Submit your actual move details for free and a verified mover sends a quote based on your real postcodes and item list.
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
        className="floating-call-btn fixed bottom-6 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </main>
  );
}
