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
  title: "Man and Van London | Verified Mover Quotes from £55",
  description:
    "Submit a free man and van request across London. From Croydon to Wembley, one verified mover reviews your details before you book. From £55/hr.",
  alternates: {
    canonical: `${baseUrl}/man-and-van-london`,
  },
  openGraph: {
    title: "Man and Van London | Verified Mover Quotes from £55",
    description: "Submit a free man and van request across London. From Croydon to Wembley, one verified mover reviews your details before you book. From £55/hr.",
    url: `${baseUrl}/man-and-van-london`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Man and Van London | Verified Mover Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van London | Verified Mover Quotes from £55",
    description: "Submit a free man and van request across London. From Croydon to Wembley, one verified mover reviews your details before you book.",
    images: ["/images/og-homepage.jpg"],
  },
};

const londonAreaCandidates = [
  { slug: "croydon", name: "Croydon", note: "South London house moves and flat relocations" },
  { slug: "bromley", name: "Bromley", note: "Kent-border suburban moves and family homes" },
  { slug: "romford", name: "Romford", note: "East London moves and Essex-border collections" },
  { slug: "ilford", name: "Ilford", note: "Redbridge moves and A406 corridor access" },
  { slug: "wembley", name: "Wembley", note: "North-west London flats and stadium-area moves" },
  { slug: "ealing", name: "Ealing", note: "West London terraces and apartment relocations" },
  { slug: "harrow", name: "Harrow", note: "North-west London suburban house moves" },
  { slug: "hounslow", name: "Hounslow", note: "Heathrow-area moves and A4 corridor access" },
  { slug: "kingston", name: "Kingston", note: "Surrey-border moves and riverside flats" },
  { slug: "twickenham", name: "Twickenham", note: "Richmond-area moves and suburban collections" },
  { slug: "enfield", name: "Enfield", note: "North London moves and M25 access routes" },
  { slug: "barnet", name: "Barnet", note: "Hertfordshire-border house moves and flats" },
  { slug: "finchley", name: "Finchley", note: "North London residential moves and A1 access" },
  { slug: "edgware", name: "Edgware", note: "North London suburban moves near the M1" },
  { slug: "stratford", name: "Stratford", note: "East London flat moves and Olympic-area access" },
  { slug: "lewisham", name: "Lewisham", note: "South-east London terraces and flat relocations" },
  { slug: "greenwich", name: "Greenwich", note: "Riverside flats and heritage-area moves" },
  { slug: "bexley", name: "Bexley", note: "Kent-border suburban moves and collections" },
  { slug: "sutton", name: "Sutton", note: "South London suburban moves near the A217" },
  { slug: "mitcham", name: "Mitcham", note: "South London moves and Croydon-border access" },
  { slug: "walthamstow", name: "Walthamstow", note: "East London moves and A406 access" },
  { slug: "wood-green", name: "Wood Green", note: "North London moves near the A10" },
  { slug: "tottenham", name: "Tottenham", note: "North London moves and A10 corridor" },
  { slug: "acton", name: "Acton", note: "West London moves near the A40" },
  { slug: "chiswick", name: "Chiswick", note: "West London riverside moves and A4 access" },
  { slug: "richmond", name: "Richmond", note: "South-west London moves near the A316" },
];

const londonAreas = londonAreaCandidates
  .filter((area) => isLocationIndexable(area.slug))
  .map((area) => ({
    ...area,
    href: `/man-and-van-${area.slug}`,
  }));

const services = [
  { title: "House removals", href: "/house-removals", icon: Truck },
  { title: "Flat moves", href: "/flat-removals", icon: Building2 },
  { title: "Student moves", href: "/student-removals", icon: GraduationCap },
  { title: "Furniture collection", href: "/furniture-delivery", icon: Sofa },
  { title: "Same-day man and van", href: "/same-day-man-and-van", icon: Route },
];

const exampleMoveRequests = [
  {
    area: "Croydon CR0 to Bromley BR1",
    type: "Flat move",
    detail: "One-bedroom flat with lift access, parking notes and weekend timing described upfront on the form.",
  },
  {
    area: "Wembley HA9 to Ealing W5",
    type: "House move",
    detail: "Three-bedroom house move with driveway access, item list and stairs noted so the mover can plan loading.",
  },
  {
    area: "Stratford E15 to Romford RM1",
    type: "Student move",
    detail: "Boxes, suitcases and small furniture from a shared house with parking restrictions and time window included.",
  },
];

const postcodeCoverage = [
  { area: "North London", postcodes: ["N1", "N7", "N10", "N22", "EN1"] },
  { area: "South London", postcodes: ["CR0", "SM1", "SE1", "BR1", "SW19"] },
  { area: "East London", postcodes: ["E1", "E5", "E10", "E15", "RM1"] },
  { area: "West London", postcodes: ["W1", "W3", "W5", "HA9", "TW1"] },
];

const faqItems = [
  {
    q: "How much does a man and van cost in London?",
    a: "London moves typically start from £55 per hour. The final quote depends on the postcodes, distance, item list, helpers required, stairs, parking and access. You can see a guide price first, then a verified mover reviews the details and sends a quote before you decide whether to book.",
  },
  {
    q: "Do you cover all London boroughs?",
    a: "Yes. You can submit free move requests across all London boroughs — north, south, east and west. Availability depends on a verified mover reviewing your move details, but coverage extends from Croydon and Bromley in the south to Enfield and Barnet in the north, and from Ealing and Hounslow in the west to Romford and Stratford in the east.",
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
    q: "Can I book a same-day man and van in London?",
    a: "Same-day moves may be possible depending on mover availability, route and access. Submit the request with the correct postcodes and move details so a verified mover can review it quickly. London traffic and Congestion Charge zones are factored into the route planning.",
  },
  {
    q: "What about parking and access in London?",
    a: "The form asks for parking and access details — whether the property has a driveway, resident permit zones, loading bays, or restricted hours. London moves often involve permit parking, Controlled Parking Zones and narrow streets, so providing these details upfront helps the mover plan the route and loading.",
  },
  {
    q: "Can I use this for single-item furniture collection in London?",
    a: "Yes. The London service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van London quote request",
  url: `${baseUrl}/man-and-van-london`,
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
    name: "Greater London",
    containsPlace: londonAreas.map((area) => ({
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
    "Free London man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
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
      name: "Man and Van London",
      item: `${baseUrl}/man-and-van-london`,
    },
  ],
};

export default function LondonPage() {
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
              <span className="text-primary font-bold">Man and Van London</span>
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
                  <MapPin size={14} /> London Hub
                </div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">
                  &larr; Back to all areas
                </Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
                  Man and Van <span className="text-accent italic">London</span>
                </h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                  Submit a free London move request, see a guide price and let one verified mover review your details before you decide whether to book. From £55/hr.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center">
                  <Package size={22} className="text-accent mx-auto mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span>
                  <span className="text-2xl font-black text-primary">£55<span className="text-sm font-bold text-text-secondary">/hr</span></span>
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
                    <h3 className="text-xl font-black uppercase tracking-tight text-primary">London moving challenges</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">London moves involve Congestion Charge zones, ULEZ restrictions, Controlled Parking Zones, narrow terrace streets and high-rise flats with lift access rules. The form captures these details so your mover can plan properly.</p>
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
                <h2 className="text-xl font-black uppercase tracking-tight text-primary">London outward postcode examples</h2>
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

          {/* London borough areas */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">London boroughs</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">London areas we cover</h2>
              <p className="text-text-secondary font-medium">Select an area for local route, access and postcode information.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {londonAreas.map((area) => (
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
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">London man and van services</h2>
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
                London routes and <span className="text-accent">access</span> matter
              </h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">
                A move from a Croydon terrace is different to a Wembley flat, a Stratford apartment or a Richmond house. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.
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
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">London man and van questions</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
