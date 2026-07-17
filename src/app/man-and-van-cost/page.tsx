import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Clock, MapPin } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "How Much Does a Man and Van Cost? | Cheap Moving Van Prices 2026 | Man and Van Club",
  description:
    "How much is a man and van in 2026? Cheap moving van prices from £45/hr. Full cost breakdown by move type, region and access. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/man-and-van-cost`,
  },
  openGraph: {
    title: "How Much Does a Man and Van Cost? | UK Prices 2026",
    description: "UK man and van costs broken down by move type, region and access. From £45/hr. Get a free guide price before you book.",
    url: `${siteUrl}/man-and-van-cost`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("How Much Does a Man and Van Cost?")}&subtitle=${encodeURIComponent("UK Prices 2026")}`, width: 1200, height: 630, alt: "How Much Does a Man and Van Cost? UK 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Does a Man and Van Cost? | UK Prices 2026",
    description: "UK man and van costs broken down by move type, region and access. From £45/hr.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("How Much Does a Man and Van Cost?")}&subtitle=${encodeURIComponent("UK Prices 2026")}`],
  },
};

const faqItems = [
  {
    q: "How much does a man and van cost per hour in the UK?",
    a: "In 2026, UK man and van rates start from £45 per hour outside London. London rates start from £55 per hour due to Congestion Charge, ULEZ and higher parking costs. Most local moves take 2–4 hours, so you're typically looking at £100–£280 for a straightforward job.",
  },
  {
    q: "How much does a full house move cost with a man and van?",
    a: "A full 3-bedroom house move with a man and van typically costs £300–£600 depending on distance, volume, access and whether you need a second mover. A 1–2 bedroom flat move is usually £150–£350. Your final quote depends on postcodes, item list, stairs, parking and timing.",
  },
  {
    q: "Why do man and van prices vary so much?",
    a: "The seven main factors are: distance between collection and delivery, volume of items, access at both ends (stairs, lifts, parking), day of the week (weekends cost more), time of day (rush hour adds time), your location (London and South East are pricier), and how specific your item list is. Vague descriptions lead to higher quotes because movers pad for the unknown.",
  },
  {
    q: "Is it cheaper to hire a man and van or a removal company?",
    a: "A man and van is usually cheaper for flats, student moves, single items and local jobs. A removal company makes more sense for 4+ bedroom houses, moves requiring full packing services, or moves needing a dedicated crew of 3+. Man and Van Club is a marketplace — you submit one request and one verified mover reviews and quotes, rather than your details going to lots of companies.",
  },
  {
    q: "How can I get the best man and van price?",
    a: "Be specific with your item list (list every large item, don't just say '2-bed flat worth'), include both postcodes in full, mention stairs/lifts/parking details, and book a weekday morning if you can. The more detail you give, the more accurate (and often lower) your quote will be. Vague requests get padded quotes.",
  },
  {
    q: "Are there any hidden fees with a man and van?",
    a: "There shouldn't be. Ask your mover to confirm the total before you book, including any congestion charge, ULEZ, parking fees or toll costs. On Man and Van Club, the mover reviews your exact postcodes and access details before quoting, so there should be no surprises on the day.",
  },
  {
    q: "How much does a man and van cost for a single item?",
    a: "A single-item collection or delivery starts from £45 in most UK areas. This covers a sofa, bed frame, washing machine or similar. The price may increase if the item is very heavy (piano), needs two people, or is being moved a long distance between postcodes.",
  },
  {
    q: "Do man and van prices include insurance?",
    a: "Verified movers on Man and Van Club must hold Goods in Transit and Public Liability insurance before joining the network. Cover details can vary by mover, so check the specifics on your quote. Insurance is included in the mover's quote — you don't pay extra for it separately.",
  },
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
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Man and Van Cost", item: `${siteUrl}/man-and-van-cost` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Cost Guide UK 2026",
  url: `${siteUrl}/man-and-van-cost`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    telephone: "+44-121-751-1269",
    email: "support@manandvanclub.co.uk",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: "Man and van cost guide",
  description: "How much does a man and van cost in the UK in 2026? Hourly rates, full move prices and regional comparisons.",
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "GBP",
      minPrice: "50",
    },
  },
};

export default function ManAndVanCostPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">How Much Does a Man and Van Cost?</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <span className="text-accent font-black text-sm leading-none">£</span> Prices from £45
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            How Much Does a Man and Van Cost?
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            UK man and van prices in 2026 broken down by move type, region and access. From hourly rates to full house moves — here's what you'll actually pay.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Get Your Guide Price <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 hover:bg-primary/90 transition-all">
              <Phone size={18} /> Call 0121 751 1269
            </a>
          </div>
        </div>
      </section>

      {/* Quick Price Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Man and Van Prices at a Glance (2026)
          </h2>
          <div className="bg-[#F9F9F7] rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40">Move Type</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40 text-right">Typical Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { type: "Hourly rate (outside London)", price: "From £45/hr" },
                  { type: "Hourly rate (London)", price: "From £55/hr" },
                  { type: "Single item collection/delivery", price: "From £45" },
                  { type: "Studio or 1-bed flat move", price: "£150–£320" },
                  { type: "2-bed flat or small house move", price: "£220–£450" },
                  { type: "3-bed house move", price: "£300–£600" },
                  { type: "Student move (shared house)", price: "£80–£250" },
                  { type: "Same-day man and van", price: "From £55/hr" },
                  { type: "Long-distance (e.g. Birmingham–London)", price: "£300–£500" },
                  { type: "Piano move (upright)", price: "£150–£350" },
                ].map((row) => (
                  <tr key={row.type} className="hover:bg-white transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{row.type}</td>
                    <td className="px-6 py-4 text-sm font-black text-accent text-right">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-secondary text-center mt-6">
            These are guide prices for 2026. Your final quote depends on postcodes, item list, access, stairs, parking and timing. <Link href="/get-started" className="text-accent font-bold hover:underline">Submit your details for a free guide price →</Link>
          </p>
        </div>
      </section>

      {/* Regional Pricing */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Prices by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { region: "West Midlands", rate: "From £45/hr", cities: "Birmingham, Walsall, Wolverhampton, Coventry, Dudley", note: "Generally the most affordable area in the UK for man and van hire. Good road access via M6/M5/A38." },
              { region: "East Midlands", rate: "From £45/hr", cities: "Nottingham, Leicester, Derby, Northampton", note: "Comparable to West Midlands. Student areas (Nottingham, Leicester) see peak demand June–September." },
              { region: "Greater London", rate: "From £55/hr", cities: "London, Croydon, Bromley, Stratford, Ealing", note: "Higher rates due to Congestion Charge (£15/day), ULEZ (£12.50/day for non-compliant vehicles) and Controlled Parking Zones." },
              { region: "Greater Manchester", rate: "From £45/hr", cities: "Manchester, Salford, Bolton, Stockport, Oldham", note: "City centre parking and M60 congestion can add time. Suburban areas like Altrincham and Stockport are usually cheaper." },
              { region: "Yorkshire", rate: "From £45/hr", cities: "Leeds, Sheffield, Bradford, Hull, Huddersfield", note: "Competitive pricing across Yorkshire. Back-to-back terraces in Leeds and Bradford slow loading down." },
              { region: "Scotland", rate: "From £45/hr", cities: "Edinburgh, Glasgow, Aberdeen, Dundee", note: "Edinburgh Old Town and Glasgow West End have narrow streets and permit zones. Aberdeen and Dundee are typically cheaper." },
              { region: "South West", rate: "From £45/hr", cities: "Bristol, Exeter, Plymouth, Bournemouth", note: "Bristol is the priciest in the region. Rural Devon and Cornwall moves may carry a minimum charge due to distance." },
              { region: "North East", rate: "From £45/hr", cities: "Newcastle, Sunderland, Durham, Middlesbrough", note: "Affordable rates. Newcastle city centre has some parking restrictions but overall lower than the South." },
            ].map((item) => (
              <div key={item.region} className="bg-white rounded-2xl border border-border p-6 space-y-3">
                <h3 className="font-black text-primary text-lg uppercase tracking-tight">{item.region}</h3>
                <p className="text-2xl font-black text-accent">{item.rate}</p>
                <p className="text-sm text-text-secondary">{item.cities}</p>
                <p className="text-xs text-text-secondary leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Affects the Price */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            What Affects the Cost?
          </h2>
          <div className="space-y-4">
            {[
              { title: "Distance", desc: "The further the drive between your collection and delivery addresses, the more fuel, time and return travel the mover factors in. A 10-mile local move costs less than a 120-mile London-to-Birmingham move." },
              { title: "Volume of items", desc: "More items means more time loading and unloading, and potentially a larger van. A studio flat with 8 boxes takes 2 hours; a 3-bed house with 40 boxes and bulky furniture takes 6–8 hours." },
              { title: "Stairs and lifts", desc: "Every floor without a lift adds 15–30 minutes per trip. A 3rd-floor walkup in Birmingham takes significantly longer than a ground-floor move with driveway access." },
              { title: "Parking", desc: "If the van can park outside your door, loading is fast. If it's 50 metres away on a terraced street with no loading bay, the mover spends longer carrying items back and forth." },
              { title: "Day and time", desc: "Saturdays are the busiest (and most expensive) day. Tuesday and Wednesday mornings are usually cheapest. Rush-hour moves (4–7pm) add travel time." },
              { title: "Your location", desc: "London costs more because of Congestion Charge, ULEZ and parking fees. The Midlands and North are typically the most affordable." },
              { title: "Item specificity", desc: "Vague requests get higher quotes because movers pad for the unknown. '2-bed flat worth' gets a wider quote range than '1 double bed, 1 wardrobe, 1 sofa, 6 boxes, 1 TV'." },
            ].map((item, i) => (
              <div key={item.title} className="flex items-start gap-4 bg-[#F9F9F7] p-5 rounded-2xl border border-border/50">
                <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Man and Van Cost — FAQ
          </h2>
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
      <section className="py-16 bg-[#F9F9F7] text-center border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Want an Accurate Price?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free. One verified mover reviews your exact postcodes, item list and access before sending a quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Get Your Guide Price <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 hover:bg-primary/90 transition-all">
              <Phone size={18} /> Call 0121 751 1269
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Verified Movers</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-600" /> Free To Submit</span>
            <span>Prices from £45</span>
            <span>Open 7 days</span>
          </div>
        </div>
      </section>
    </div>
  );
}
