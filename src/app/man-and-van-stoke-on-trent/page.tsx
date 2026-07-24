import Link from "next/link";
import FAQ from "@/components/FAQ";
import { isLocationIndexable } from "@/lib/seo-quality-guard";
import { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, MapPin, Package, Route, ShieldCheck, Truck, Building2, GraduationCap, Sofa, Clock, Users } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Stoke-on-Trent From £19/hr | Free Quotes",
  description: "Man with a van in Stoke-on-Trent from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 6 reviews. Hanley, Burslem, Tunstall, Longton, Fenton.",
  alternates: { canonical: `${baseUrl}/man-and-van-stoke-on-trent` },
  openGraph: {
    title: "Man and Van Stoke-on-Trent From £19/hr | Free Quotes",
    description: "Man with a van in Stoke-on-Trent from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 6 reviews.",
    url: `${baseUrl}/man-and-van-stoke-on-trent`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Stoke-on-Trent")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`, width: 1200, height: 630, alt: "Man and Van Stoke-on-Trent From £19/hr | Free Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Stoke-on-Trent From £19/hr | Free Quotes",
    description: "Man with a van in Stoke-on-Trent from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 6 reviews.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Stoke-on-Trent")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`],
  },
};

const stokeAreaCandidates = [
  { slug: "stoke-on-trent", name: "Stoke-on-Trent", note: "The six pottery towns, A500 corridor and A50 link road" },
  { slug: "manchester", name: "Manchester", note: "Major North West hub, 45 minutes via A34" },
  { slug: "wolverhampton", name: "Wolverhampton", note: "Black Country moves, 40 minutes via M6" },
  { slug: "derby", name: "Derby", note: "East Midlands moves via A50" },
];

const stokeAreas = stokeAreaCandidates
  .filter((area) => isLocationIndexable(area.slug))
  .map((area) => ({
    ...area,
    href: `/man-and-van-${area.slug}`,
  }));

const faqItems = [
  { q: "How much does a man and van cost in Stoke-on-Trent?", a: "Stoke-on-Trent moves typically start from £19 per hour. A straightforward local move usually costs £60–£130 depending on furniture volume, access (stairs, lifts, parking) and A500 traffic. A full 3-bed house move in Stoke could be £250–£500. Submit your postcodes and item list for a guide price first, then a verified mover reviews the details and sends a quote." },
  { q: "Will multiple movers contact me?", a: "No. Your details are not sent to lots of companies. One verified mover reviews your anonymised request, and your contact details are only released after you accept a quote and pay the booking deposit." },
  { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover\u2019s quote, and the remaining balance is paid directly to the mover on moving day." },
  { q: "Can I book a same-day man and van in Stoke-on-Trent?", a: "Same-day moves may be possible depending on mover availability, route and access. Stoke-on-Trent\u2019s A500 D-road and A50 link road connect the six towns quickly, but terraced streets in Burslem and Longton can slow loading. Submit the request with the correct postcodes and move details so a verified mover can review it quickly." },
  { q: "Can I use this for single-item furniture collection?", a: "Yes. The Stoke-on-Trent service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs." },
  { q: "Do you cover Hanley, Burslem, Tunstall, Longton and Fenton?", a: "Yes. You can submit move requests for all six towns \u2014 Hanley, Burslem, Tunstall, Longton, Fenton and Stoke town itself \u2014 plus surrounding areas like Newcastle-under-Lyme, Trentham and Kidsgrove. A verified mover will review your request and can quote if they work in those areas." },
  { q: "Does Stoke-on-Trent have a Clean Air Zone?", a: "No. Unlike Birmingham and Bath, Stoke-on-Trent does not currently have a Clean Air Zone or congestion charge. This means no extra CAZ fee to factor into your move cost, though standard parking restrictions and permit zones still apply in some areas." },
  { q: "Can you help with student moves in Stoke-on-Trent?", a: "Yes. Student moves can be submitted for areas near Staffordshire University\u2019s Stoke and Leek campuses. Peak demand is June, July and September. Add your item list, access notes and preferred dates for a verified mover to review." },
  { q: "How much does a man and van cost from Stoke-on-Trent to Manchester?", a: "A Stoke-on-Trent to Manchester move in 2026 typically costs £100–£220 depending on load, access and timing. The A34 and M6 connect both cities in roughly 45–60 minutes. A single-item collection might start from £60–£90. Submit your postcodes and item list for a guide price." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Stoke-on-Trent quote request",
  url: `${baseUrl}/man-and-van-stoke-on-trent`,
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
    name: "Stoke-on-Trent",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Staffordshire",
    },
    containsPlace: [
      { "@type": "Neighborhood", name: "Hanley" },
      { "@type": "Neighborhood", name: "Burslem" },
      { "@type": "Neighborhood", name: "Tunstall" },
      { "@type": "Neighborhood", name: "Longton" },
      { "@type": "Neighborhood", name: "Fenton" },
      { "@type": "Neighborhood", name: "Stoke" },
      { "@type": "City", name: "Newcastle-under-Lyme" },
      { "@type": "City", name: "Kidsgrove" },
      { "@type": "Neighborhood", name: "Trentham" },
      { "@type": "Neighborhood", name: "Meir" },
      { "@type": "Neighborhood", name: "Blurton" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "Wolverhampton" },
      { "@type": "City", name: "Derby" },
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
    "Free Stoke-on-Trent man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
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
    { "@type": "ListItem", position: 2, name: "Man and Van Stoke-on-Trent", item: `${baseUrl}/man-and-van-stoke-on-trent` },
  ],
};

const services = [
  { icon: <Truck size={24} />, title: "House Removals", desc: "Family homes, terraced houses and suburban relocations across the six towns.", href: "/house-removals" },
  { icon: <Building2 size={24} />, title: "Flat Moves", desc: "City-centre apartments, Hanley flats and new-build moves.", href: "/flat-removals" },
  { icon: <GraduationCap size={24} />, title: "Student Moves", desc: "Staffordshire University student moves, June to September.", href: "/student-removals" },
  { icon: <Sofa size={24} />, title: "Furniture Delivery", desc: "Single-item collections, marketplace pickups and IKEA runs.", href: "/furniture-delivery-service" },
  { icon: <Clock size={24} />, title: "Same Day", desc: "Urgent local moves and last-minute collections when available.", href: "/same-day-man-and-van" },
  { icon: <Users size={24} />, title: "Office Moves", desc: "Small office relocations, IT equipment and business clearing.", href: "/office-removals" },
];

export default function StokeOnTrentPage() {
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
              <span className="text-primary font-bold">Man and Van Stoke-on-Trent</span>
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
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20"><MapPin size={14} /> Staffordshire</div>
                <Link href="/man-and-van-near-me" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">&larr; Back to all areas</Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
                  Man and Van <span className="text-accent">Stoke-on-Trent</span>
                </h1>
                <p className="text-lg lg:text-xl text-text-secondary font-medium leading-relaxed max-w-lg">
                  Moving in the six towns? Submit your postcodes, item list and access notes for free. One verified mover reviews your Stoke-on-Trent move before you decide whether to book.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-2">
                {[
                  { v: "Free", l: "To Submit" },
                  { v: "Verified", l: "Movers" },
                  { v: "Protected", l: "Details" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-accent font-black text-3xl tracking-tighter leading-none">{item.v}</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary/30">{item.l}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/get-started" className="btn-orange px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">
                  Start Your Move Request <ArrowUpRight size={18} />
                </Link>
                <a href="tel:01217511269" className="bg-white border-2 border-border px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">Call 0121 751 1269</a>
              </div>
            </div>

            {/* Stoke context panel */}
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Route size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">Stoke-on-Trent moving challenges</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed mt-2">Stoke is a federation of six pottery towns — Hanley, Burslem, Tunstall, Longton, Fenton and Stoke — spread along the A500 D-road. Each town has its own terraced streets, industrial estates and access considerations. The A50 links east to Derby and the M1; the A34 heads north to Manchester. No Clean Air Zone applies. The form captures these details so your mover can plan properly.</p>
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
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">Six towns, <span className="text-accent">A500</span> timing and terraced streets</h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">A move from a Burslem terrace is different to a Trentham family home, a Hanley apartment or a Meir suburban house. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.</p>
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
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Moving Services in Stoke-on-Trent</h2>
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

      {/* Nearby Areas */}
      {stokeAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Midlands &amp; North West</span>
              <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van Near Stoke-on-Trent</h2>
              <p className="text-text-secondary mt-3 text-sm max-w-xl mx-auto">Stoke-on-Trent is our Staffordshire hub. We also cover Manchester, Wolverhampton, Derby and more — with more areas coming soon.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stokeAreas.map((area) => (
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
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van Prices in Stoke-on-Trent (2026)</h2>
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
                  { type: "2-bed flat or terraced house move", price: "£200–£400" },
                  { type: "1–2 bed house move", price: "£200–£400" },
                  { type: "3-bed house move", price: "£300–£550" },
                  { type: "Student move (halls/shared house)", price: "£80–£250" },
                  { type: "Same-day man and van", price: "From £55/hr" },
                  { type: "Stoke-on-Trent to Manchester", price: "£100–£220" },
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
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Stoke-on-Trent man and van questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Move in Stoke-on-Trent?</h2>
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
