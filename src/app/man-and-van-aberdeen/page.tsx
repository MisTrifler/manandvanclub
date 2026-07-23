import Link from "next/link";
import FAQ from "@/components/FAQ";
import { isLocationIndexable } from "@/lib/seo-quality-guard";
import { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, MapPin, Package, Route, ShieldCheck, Truck, Building2, GraduationCap, Sofa, Clock, Users } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Aberdeen From £19/hr | Free Quotes",
  description: "Man with a van in Aberdeen from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews. City centre, West End, Bridge of Don, Cults.",
  alternates: { canonical: `${baseUrl}/man-and-van-aberdeen` },
  openGraph: {
    title: "Man and Van Aberdeen From £19/hr | Free Quotes",
    description: "Man with a van in Aberdeen from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
    url: `${baseUrl}/man-and-van-aberdeen`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Aberdeen")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`, width: 1200, height: 630, alt: "Man and Van Aberdeen From £19/hr | Free Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Aberdeen From £19/hr | Free Quotes",
    description: "Man with a van in Aberdeen from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Aberdeen")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`],
  },
};

const aberdeenAreaCandidates = [
  { slug: "aberdeen", name: "Aberdeen", note: "Granite tenements, oil-industry relocations and family homes" },
  { slug: "dundee", name: "Dundee", note: "City-centre flats, student moves and A90 corridor" },
  { slug: "edinburgh", name: "Edinburgh", note: "Capital city moves, Old Town closes and New Town flats" },
  { slug: "glasgow", name: "Glasgow", note: "Scotland's largest city, tenements and West End moves" },
];

const aberdeenAreas = aberdeenAreaCandidates
  .filter((area) => isLocationIndexable(area.slug))
  .map((area) => ({
    ...area,
    href: `/man-and-van-${area.slug}`,
  }));

const faqItems = [
  { q: "How much does a man and van cost in Aberdeen?", a: "Aberdeen moves typically start from £19 per hour. A straightforward local move usually costs £60–£130 depending on furniture volume, access (stairs, lifts, parking) and A90 traffic. A full 3-bed house move in Aberdeen could be £250–£500. Submit your postcodes and item list for a guide price first, then a verified mover reviews the details and sends a quote." },
  { q: "Will multiple movers contact me?", a: "No. Your details are not sent to lots of companies. One verified mover reviews your anonymised request, and your contact details are only released after you accept a quote and pay the booking deposit." },
  { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover\u2019s quote, and the remaining balance is paid directly to the mover on moving day." },
  { q: "Can I book a same-day man and van in Aberdeen?", a: "Same-day moves may be possible depending on mover availability, route and access. Aberdeen\u2019s Anderson Drive, the A90 and the Parkway are factored into route planning. Submit the request with the correct postcodes and move details so a verified mover can review it quickly." },
  { q: "Can I use this for single-item furniture collection?", a: "Yes. The Aberdeen service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs." },
  { q: "Do you cover West End, Bridge of Don and Cults?", a: "Yes. You can submit move requests for West End, Bridge of Don, Cults, Bieldside, Kingswells, Dyce and surrounding areas. A verified mover will review your request and can quote if they work in those areas." },
  { q: "Can you help with oil-industry relocations in Aberdeen?", a: "Yes. Aberdeen has a high turnover of moves related to the energy sector. Whether you are moving to a rental in the West End, a family home in Cults or temporary accommodation near the airport, submit your postcodes and item list and a verified mover can review the job." },
  { q: "How much does a man and van cost from Aberdeen to Dundee?", a: "An Aberdeen to Dundee move in 2026 typically costs £80–£180 depending on load, access and timing. The A90 connects both cities in around 60–70 minutes. A single-item collection might start from £19–£80. Submit your postcodes and item list for a guide price." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Aberdeen quote request",
  url: `${baseUrl}/man-and-van-aberdeen`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${baseUrl}/icon.png`,
  },
  areaServed: {
    "@type": "City",
    name: "Aberdeen",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Scotland",
    },
    containsPlace: [
      { "@type": "Neighborhood", name: "West End" },
      { "@type": "Neighborhood", name: "Bridge of Don" },
      { "@type": "Neighborhood", name: "Cults" },
      { "@type": "Neighborhood", name: "Bieldside" },
      { "@type": "Neighborhood", name: "Kingswells" },
      { "@type": "Neighborhood", name: "Dyce" },
      { "@type": "Neighborhood", name: "Rosemount" },
      { "@type": "Neighborhood", name: "Hazlehead" },
      { "@type": "City", name: "Dundee" },
      { "@type": "City", name: "Edinburgh" },
      { "@type": "City", name: "Glasgow" },
      { "@type": "City", name: "Inverness" },
      { "@type": "City", name: "Peterhead" },
    ],
  },
  serviceType: [
    "Man and van quote request",
    "House removals",
    "Flat moves",
    "Student moves",
    "Furniture collection",
    "Office moves",
    "Same-day man and van",
  ],
  description:
    "Free Aberdeen man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
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
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Man and Van Aberdeen", item: `${baseUrl}/man-and-van-aberdeen` },
  ],
};

const services = [
  { icon: <Truck size={24} />, title: "House Removals", desc: "Granite tenement moves, family homes and suburban relocations across Aberdeen.", href: "/house-removals" },
  { icon: <Building2 size={24} />, title: "Flat Moves", desc: "Granite tenement flats, West End apartments and city-centre moves.", href: "/flat-removals" },
  { icon: <GraduationCap size={24} />, title: "Student Moves", desc: "University of Aberdeen and RGU student moves, June to September.", href: "/student-removals" },
  { icon: <Sofa size={24} />, title: "Furniture Delivery", desc: "Single-item collections, marketplace pickups and store deliveries.", href: "/furniture-delivery-service" },
  { icon: <Clock size={24} />, title: "Same Day", desc: "Urgent local moves and last-minute collections when available.", href: "/same-day-man-and-van" },
  { icon: <Users size={24} />, title: "Office Moves", desc: "Energy sector relocations, IT equipment and office clearing.", href: "/office-removals" },
];

export default function AberdeenPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6" /></svg>
              <span className="text-primary font-bold">Man and Van Aberdeen</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-6 gap-4">{[...Array(30)].map((_, i) => <div key={i} className="border border-primary/20 h-32" />)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20"><MapPin size={14} /> North-East Scotland</div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">&larr; Back to all areas</Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
                  Man and Van <span className="text-accent">Aberdeen</span>
                </h1>
                <p className="text-lg lg:text-xl text-text-secondary font-medium leading-relaxed max-w-lg">
                  Submit your move details for free. One verified mover reviews your request and sends a quote — before you decide whether to book.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/get-started" className="btn-orange px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
                  Start Your Move Request <ArrowUpRight size={18} />
                </Link>
                <a href="tel:01217511269" className="bg-white border-2 border-border px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">Call 0121 751 1269</a>
              </div>
            </div>

            {/* Aberdeen context panel */}
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Route size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">Aberdeen moving challenges</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed mt-2">Aberdeen moves involve granite tenements with heavy stone staircases, narrow closes in the city centre, Anderson Drive and the A90 corridor for cross-city moves, and energy-sector relocations with high turnover in West End rentals. The form captures these details so your mover can plan properly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column feature */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-primary rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">Granite tenements, <span className="text-accent">A90</span> corridor and energy-sector moves</h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">A move from a West End granite flat is different to a Bridge of Don family home, a Cults suburban house or a Dyce relocation near the airport. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.</p>
            </div>
            <div className="bg-accent rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">One verified mover, not a lead blast</h2>
              <p className="text-white font-medium leading-relaxed text-base lg:text-lg">Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Services</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Moving Services in Aberdeen</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="group bg-white rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-4">{service.icon}</div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scotland Areas */}
      {aberdeenAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Scotland</span>
              <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van in Scotland</h2>
              <p className="text-text-secondary mt-3 text-sm max-w-xl mx-auto">Aberdeen is our north-east Scotland hub. We also cover Dundee, Edinburgh and Glasgow — with more areas coming soon.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aberdeenAreas.map((area) => (
                <Link key={area.slug} href={area.href} className="group bg-[#F9F9F7] rounded-2xl border border-border p-6 hover:border-accent hover:shadow-md transition-all">
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent transition-colors">{area.name}</h3>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed">{area.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van Prices in Aberdeen (2026)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Move Type</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Typical Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { type: "Single-item furniture collection", price: "From £19" },
                  { type: "Studio / 1-bed flat move", price: "£150–£300" },
                  { type: "2-bed flat or tenement move", price: "£200–£400" },
                  { type: "1–2 bed house move", price: "£200–£400" },
                  { type: "3-bed house move", price: "£300–£550" },
                  { type: "Student move (halls/shared house)", price: "£80–£250" },
                  { type: "Same-day man and van", price: "From £55/hr" },
                  { type: "Aberdeen to Dundee", price: "£80–£180" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F9F9F7]"}>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{row.type}</td>
                    <td className="px-6 py-4 text-sm font-black text-accent">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary text-center mt-6">Prices are typical ranges for 2026. Your final quote depends on postcodes, item list, access, stairs, parking and timing. <Link href="/man-and-van-prices" className="text-accent font-bold hover:underline">See full pricing guide →</Link></p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Aberdeen man and van questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Move in Aberdeen?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free. One verified mover reviews your request and sends a quote before you decide whether to book.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Start Your Move Request <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-white border-2 border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
              Call 0121 751 1269
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Verified Movers</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-600" /> Free To Submit</span>
          </div>
        </div>
      </section>
    </main>
  );
}
