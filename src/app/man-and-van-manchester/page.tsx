import Link from "next/link";
import FAQ from "@/components/FAQ";
import { isLocationIndexable } from "@/lib/seo-quality-guard";
import { Metadata } from "next";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Package,
  Route,
  ShieldCheck,
  Sofa,
  Truck,
} from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Manchester From £19/hr | Free Quotes",
  description:
    "Man with a van across Greater Manchester from £19/hr. From the city centre to Stockport and Bolton, one verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
  alternates: {
    canonical: `${baseUrl}/man-and-van-manchester`,
  },
  openGraph: {
    title: "Man and Van Manchester From £19/hr | Free Quotes",
    description: "Man with a van across Greater Manchester from £19/hr. From the city centre to Stockport and Bolton, one verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
    url: `${baseUrl}/man-and-van-manchester`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Manchester")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`, width: 1200, height: 630, alt: "Man and Van Manchester From £19/hr | Free Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Manchester From £19/hr | Free Quotes",
    description: "Man with a van across Greater Manchester from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Manchester")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`],
  },
};

const manchesterAreaCandidates = [
  { slug: "salford", name: "Salford", note: "Quays flats, Salford Uni moves and terraces near the A6" },
  { slug: "bolton", name: "Bolton", note: "Town centre moves and A666 corridor access" },
  { slug: "bury", name: "Bury", note: "Suburban moves and M66 access routes" },
  { slug: "rochdale", name: "Rochdale", note: "M62 corridor moves and town centre terraces" },
  { slug: "oldham", name: "Oldham", note: "Hillside terraces and A62 access" },
  { slug: "stockport", name: "Stockport", note: "South Manchester moves near the M60 and A6" },
  { slug: "altrincham", name: "Altrincham", note: "Suburban house moves near the A56" },
  { slug: "trafford", name: "Trafford", note: "M60 corridor moves and family homes" },
  { slug: "wigan", name: "Wigan", note: "West Greater Manchester moves and M6 access" },
  { slug: "leigh", name: "Leigh", note: "A580 East Lancs Road moves and collections" },
  { slug: "ashton-under-lyne", name: "Ashton-under-Lyne", note: "East Manchester moves near the M60" },
  { slug: "hyde", name: "Hyde", note: "Tameside moves and A57 corridor access" },
  { slug: "stalybridge", name: "Stalybridge", note: "Hillside moves near the M67" },
];

const manchesterAreas = manchesterAreaCandidates
  .filter((area) => isLocationIndexable(area.slug))
  .map((area) => ({
    ...area,
    href: `/man-and-van-${area.slug}`,
  }));

const services = [
  { title: "House removals", href: "/house-removals", icon: Truck },
  { title: "Flat moves", href: "/flat-removals", icon: Building2 },
  { title: "Student moves", href: "/student-removals", icon: GraduationCap },
  { title: "Furniture collection", href: "/furniture-delivery-service", icon: Sofa },
  { title: "Same-day man and van", href: "/same-day-man-and-van", icon: Route },
];

const exampleMoveRequests = [
  {
    area: "Salford M5 to Stockport SK1",
    type: "Flat move",
    detail: "One-bedroom flat with lift access, parking restrictions near the Quays and weekend timing described upfront.",
  },
  {
    area: "Bolton BL1 to Bury BL9",
    type: "House move",
    detail: "Three-bedroom house with driveway access, item list and stairs noted so the mover can plan loading.",
  },
  {
    area: "Rochdale OL12 to Oldham OL1",
    type: "Furniture collection",
    detail: "Sofa collection where the customer adds item size, helpers required and access details on the form.",
  },
];

const postcodeCoverage = [
  { area: "Manchester city", postcodes: ["M1", "M4", "M13", "M14", "M20"] },
  { area: "Salford & Wigan", postcodes: ["M5", "M6", "M27", "WN1", "WN3"] },
  { area: "Bolton & Bury", postcodes: ["BL1", "BL2", "BL3", "BL9"] },
  { area: "Stockport & Trafford", postcodes: ["SK1", "SK2", "WA14", "M32"] },
];

const faqItems = [
  {
    q: "How much does a man and van cost in Manchester?",
    a: "Manchester moves typically start from £19 per hour. The final quote depends on the postcodes, distance, item list, helpers required, stairs, parking and access. You can see a guide price first, then a verified mover reviews the details and sends a quote before you decide whether to book.",
  },
  {
    q: "Do you cover all Greater Manchester boroughs?",
    a: "Yes. You can submit free move requests across Greater Manchester, including Salford, Bolton, Bury, Rochdale, Oldham, Stockport, Altrincham, Trafford, Wigan and surrounding towns. Availability depends on a verified mover reviewing your move details.",
  },
  {
    q: "Will multiple movers contact me?",
    a: "No. Your details are not sent to lots of companies. A verified mover reviews your anonymised request, and your contact details are only released after you accept a quote and pay the booking deposit.",
  },
  {
    q: "Is it free to submit a move request?",
    a: "Yes. It is free to submit your request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover\u2019s quote, and the remaining balance is paid directly to the mover on moving day.",
  },
  {
    q: "Can I book a same-day man and van in Manchester?",
    a: "Same-day moves may be possible depending on mover availability, route and access. Submit the request with the correct postcodes and move details so a verified mover can review it quickly. The M60 ring road, M62 and M66 are factored into the route planning.",
  },
  {
    q: "Can I use this for single-item furniture collection?",
    a: "Yes. The Greater Manchester service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Manchester quote request",
  url: `${baseUrl}/man-and-van-manchester`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${baseUrl}/icon.png`,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Greater Manchester",
    containsPlace: manchesterAreas.map((area) => ({
      "@type": "Place",
      name: area.name,
      url: `${baseUrl}${area.href}`,
    })),
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
    "Free Greater Manchester man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
};

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
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Man and Van Manchester",
      item: `${baseUrl}/man-and-van-manchester`,
    },
  ],
};

export default function ManchesterPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Visible Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Man and Van Manchester</span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-6 gap-4">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="border border-primary/20 h-32" />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20">
                  <MapPin size={14} /> Greater Manchester Hub
                </div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">
                  &larr; Back to all areas
                </Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
                  Man and Van <span className="text-accent italic">Manchester</span>
                </h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                  Submit a free Greater Manchester move request, see a guide price and let one verified mover review your details before you decide whether to book. From £19/hr.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center">
                  <Package size={22} className="text-accent mx-auto mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span>
                  <span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span>
                </div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center">
                  <CheckCircle2 size={22} className="text-accent mx-auto mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Verified</span>
                  <span className="text-sm font-black text-primary">One mover, not a lead blast</span>
                </div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center">
                  <ShieldCheck size={22} className="text-accent mx-auto mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Private</span>
                  <span className="text-sm font-black text-primary">Details stay anonymous</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">
                  Start Free Request <ArrowUpRight size={18} />
                </Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
                  Call 0121 751 1269
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Route size={22} className="text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-primary">Greater Manchester moving challenges</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">Manchester moves involve the M60 ring road congestion, narrow terraced streets in areas like Salford and Oldham, student moves near the universities, and varying access from city-centre flats to hillside terraces in Rochdale and Bolton. The form captures these details so your mover can plan properly.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exampleMoveRequests.map((request, i) => (
                  <article key={i} className={`bg-white rounded-2xl border border-border p-6 space-y-3 ${i === 2 ? 'sm:col-span-2' : ''}`}>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-accent">
                      <Package size={13} /> Example request
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary">{request.type}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/50">{request.area}</p>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">{request.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16 lg:space-y-20">
          {/* Postcode coverage */}
          <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <MapPin size={22} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-primary">Greater Manchester outward postcode examples</h2>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">Customers enter full postcodes on the form; these outward-code examples add local relevance.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {postcodeCoverage.map((coverage) => (
                <div key={coverage.area} className="rounded-2xl bg-[#F9F9F7] border border-border/50 p-4">
                  <p className="text-xs font-black uppercase tracking-tight text-primary mb-2">{coverage.area}</p>
                  <div className="flex flex-wrap gap-2">
                    {coverage.postcodes.map((postcode) => (
                      <span key={postcode} className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary/60 border border-border/50">{postcode}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Greater Manchester areas */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Greater Manchester areas</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Areas we cover around Manchester</h2>
              <p className="text-text-secondary font-medium">Select an area for local route, access and postcode information.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {manchesterAreas.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="group bg-[#F9F9F7] rounded-2xl border border-border p-6 hover:border-accent hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-black uppercase tracking-tight text-primary group-hover:text-accent transition-colors">{area.name}</h3>
                      <p className="text-sm text-text-secondary font-medium leading-relaxed">{area.note}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6 lg:space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Services</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Manchester man and van services</h2>
              <p className="text-text-secondary font-medium leading-relaxed">From single-item collections to student moves and house removals, submit your request free and receive a quote from one verified mover before booking.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link key={service.href} href={service.href} className="bg-white rounded-2xl border border-border p-6 min-h-[140px] flex flex-col items-center justify-center text-center hover:border-accent hover:shadow-lg transition-all group">
                    <Icon size={26} className="text-accent mx-auto mb-4" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary group-hover:text-accent transition-colors">{service.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Trust boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-primary rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                M60, M62 and local <span className="text-accent">access</span> matter
              </h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">
                A move from a Salford Quays flat is different to a Bolton terrace, a Stockport house or a Rochdale hillside property. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.
              </p>
            </div>
            <div className="bg-accent rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">One verified mover, not a lead blast</h2>
              <p className="text-white font-medium leading-relaxed text-base lg:text-lg">
                Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="pt-6 lg:pt-8 border-t border-border">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Manchester man and van questions</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
