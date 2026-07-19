import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Prices UK 2026 | Cheapest Moving Van Rates From £19 | Man and Van Club",
  description:
    "UK man and van prices in 2026. Compare hourly rates, full-day costs and per-move pricing for house removals, flat moves, furniture delivery, student moves and same-day jobs across the West Midlands and UK.",
  alternates: {
    canonical: "https://www.manandvanclub.co.uk/man-and-van-prices",
  },
  openGraph: {
    title: "Man and Van Prices UK 2026 | Hourly Rates & Move Costs",
    description:
      "UK man and van prices in 2026. Compare hourly rates, full-day costs and per-move pricing for house removals, flat moves, furniture delivery and same-day jobs.",
    url: "https://www.manandvanclub.co.uk/man-and-van-prices",
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Man and Van Prices UK")}&subtitle=${encodeURIComponent("2026 Transparent Pricing")}`, width: 1200, height: 630, alt: "Man and Van Prices UK 2026 | Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Prices UK 2026 | Hourly Rates & Move Costs",
    description:
      "UK man and van prices in 2026. Compare hourly rates and per-move pricing across the West Midlands and UK.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Man and Van Prices UK")}&subtitle=${encodeURIComponent("2026 Transparent Pricing")}`],
  },
};

const faqItems = [
  {
    q: "How much does a man and van cost per hour in the UK?",
    a: "In 2026, UK man and van hourly rates typically range from £19 to £70 per hour. West Midlands rates average £19–£70/hr, London rates average £55–£80/hr, and other regions fall between £19–£70/hr. Rates depend on van size, number of helpers, distance, access and time of day.",
  },
  {
    q: "How much does a man and van cost for a full day?",
    a: "A full-day man and van booking in 2026 typically costs £350–£500 in the West Midlands, £400–£600 in London, and £350–£500 in other UK regions. Full-day rates usually cover 8–10 hours and are better value than hourly rates for larger moves.",
  },
  {
    q: "How much does a single-item furniture collection cost?",
    a: "A single-item man and van collection in 2026 typically starts from £19 locally, or £60–£100+ for longer distances. Sofas, beds and wardrobes are at the higher end due to size and handling. Add item dimensions and access details for an accurate quote.",
  },
  {
    q: "Why do man and van prices vary so much?",
    a: "Man and van prices depend on multiple factors: van size (small transit vs large Luton), number of helpers, distance between postcodes, stairs and lift access, parking restrictions, time of day, day of the week, and whether it is a same-day or advance booking. A ground-floor local collection with driveway parking costs significantly less than a 3rd-floor flat move with no lift and permit-only parking.",
  },
  {
    q: "Is a man and van cheaper than a removal company?",
    a: "Generally yes. A man and van is typically 30–50% cheaper than a full removals company for smaller moves (flats, single items, student moves, 1–2 bedroom houses). For larger 4+ bedroom house moves with packing services, a removal company may offer better value despite the higher price, because they include packing materials, more crew and larger vehicles.",
  },
  {
    q: "How much does a same-day man and van cost?",
    a: "Same-day man and van rates in 2026 are typically 15–30% higher than standard bookings, starting from £55 per hour. A local same-day furniture collection might cost £80–£150, while a same-day flat move could be £200–£400. Availability is more limited, especially on weekends and during peak moving periods.",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.manandvanclub.co.uk",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Man and Van Prices",
      item: "https://www.manandvanclub.co.uk/man-and-van-prices",
    },
  ],
};

export default function ManAndVanPricesPage() {
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
              <span className="text-primary font-bold">Man and Van Prices</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <MapPin size={12} /> UK 2026 Pricing Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            Man and Van Prices UK 2026
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            Honest UK man and van pricing for 2026. Compare hourly rates, full-day costs and per-move prices for house removals, flat moves, furniture delivery and same-day jobs.
          </p>
        </div>
      </section>

      {/* Quick Pricing Table */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van Price Guide 2026</h2>
          <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">These are typical UK price ranges based on current market rates. Your final quote depends on postcodes, item list, access, stairs, parking and timing. Submit your details for a free guide price first.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Move Type</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Typical Price Range</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">What Affects The Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { type: "Single-item furniture collection", price: "From £19", factors: "Item size, distance, stairs, parking" },
                  { type: "Studio / 1-bed flat move", price: "£150–£350", factors: "Floor level, lift access, parking, distance" },
                  { type: "2-bed flat move", price: "£250–£500", factors: "Volume, stairs, helpers, parking permits" },
                  { type: "1–2 bed house move", price: "£200–£400", factors: "Volume, distance, driveway access, packing" },
                  { type: "3-bed house move", price: "£300–£600", factors: "Volume, helpers, distance, fragile items" },
                  { type: "4+ bed house move", price: "£500–£1,000+", factors: "Large volume, multiple helpers, packing, distance" },
                  { type: "Student move (halls/shared house)", price: "£80–£350", factors: "Load size, term-time demand, access" },
                  { type: "Small office relocation", price: "£300–£600", factors: "IT equipment, timing, loading bay, after-hours" },
                  { type: "Same-day man and van", price: "From £55/hr", factors: "Availability, urgency, distance, access" },
                  { type: "Long-distance move (100+ miles)", price: "£1.00–£2.00/mile", factors: "Mileage, route time, volume, one-way vs return" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F9F9F7]"}>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{row.type}</td>
                    <td className="px-6 py-4 text-sm font-black text-accent">{row.price}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{row.factors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regional Pricing */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van Hourly Rates by Region</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { region: "West Midlands", rate: "£19–£70/hr", fullDay: "£350–£500", cities: ["Birmingham", "Walsall", "Wolverhampton", "Coventry"] },
              { region: "Greater London", rate: "£55–£80/hr", fullDay: "£400–£600", cities: ["London", "Croydon", "Stratford", "Richmond"] },
              { region: "Other UK Regions", rate: "£19–£70/hr", fullDay: "£350–£500", cities: ["Manchester", "Leeds", "Bristol", "Liverpool"] },
            ].map((region) => (
              <div key={region.region} className="bg-white rounded-2xl border border-border p-8 space-y-4">
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">{region.region}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary font-medium">Hourly rate</span>
                    <span className="text-sm font-black text-accent">{region.rate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary font-medium">Full day</span>
                    <span className="text-sm font-black text-accent">{region.fullDay}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Key areas</p>
                  <div className="flex flex-wrap gap-2">
                    {region.cities.map((city) => (
                      <Link
                        key={city}
                        href={`/man-and-van-${city.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-xs font-bold text-primary/60 hover:text-accent transition-colors"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Affects Price */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">What Affects Man and Van Prices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Van size", desc: "A small transit van costs less per hour than a large Luton van with a tail-lift. Most man and van operators charge based on the van size needed for your load." },
              { title: "Helpers", desc: "One driver is cheapest. Adding a second or third helper increases the hourly rate but can reduce the total time needed for the job." },
              { title: "Stairs and lifts", desc: "Upper-floor moves without lift access take longer and cost more. Add floor level and lift availability so the mover can quote accurately." },
              { title: "Parking", desc: "Permit-only zones, loading bay restrictions, controlled parking zones and narrow streets all add time. Suburban driveway moves are usually quickest." },
              { title: "Distance", desc: "Local moves are cheapest. Long-distance moves (100+ miles) are typically priced per mile or as a fixed quote based on route time." },
              { title: "Timing", desc: "Weekend and end-of-month dates are busiest and can cost more. Mid-week, mid-month bookings may be cheaper. Same-day requests carry a premium." },
            ].map((item) => (
              <div key={item.title} className="bg-[#F9F9F7] p-6 rounded-2xl border border-border/50 space-y-2">
                <h3 className="font-black text-primary uppercase tracking-tight text-sm">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van Pricing FAQ</h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Get Your Free Guide Price</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free and see a guide price before one verified mover reviews your request and sends a quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Start Your Move Request <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-white border-2 border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> Call 0121 751 1269
            </a>
            <Link href="/moving-cost-calculator" className="bg-white border-2 border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
              Try the Cost Calculator <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Details Protected</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-600" /> Free To Submit</span>
            <span className="flex items-center gap-1.5"><Phone size={14} className="text-accent" /> From £19/hr</span>
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
