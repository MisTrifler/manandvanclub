import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import { isLocationIndexable } from "@/lib/seo-quality-guard";
import { Metadata } from "next";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  Lock,
  MapPin,
  Package,
  Route,
  ShieldCheck,
  Sofa,
  Truck,
} from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van East Midlands From £19/hr | Free Quotes",
  description:
    "Man with a van in the East Midlands from £19/hr. Get a guide price, keep your details private, and receive a quote from one verified mover before you book. Rated 5.0/5 from 5 reviews. Covers Nottingham, Leicester, Derby, Northampton, Lincoln and surrounding areas.",
  alternates: {
    canonical: `${baseUrl}/man-and-van-east-midlands`,
  },
};

const eastMidlandsAreaCandidates = [
  // Cities
  { slug: "nottingham", name: "Nottingham", note: "Lace Market, student moves and city-centre flats" },
  { slug: "leicester", name: "Leicester", note: "Highcross area, Oadby and Wigston family moves" },
  { slug: "derby", name: "Derby", note: "A38/A52 routes, Mickleover and Pride Park moves" },
  { slug: "northampton", name: "Northampton", note: "M1 corridor, town centre and suburban estates" },
  { slug: "lincoln", name: "Lincoln", note: "Cathedral Quarter, Brayford and North Hykeham" },
  // Nottingham areas
  { slug: "arnold", name: "Arnold", note: "A60 corridor, family homes and suburban moves" },
  { slug: "beeston", name: "Beeston", note: "University area, tram interchange and M1 access" },
  { slug: "carlton", name: "Carlton", note: "Victorian terraces and post-war estates east of the city" },
  { slug: "west-bridgford", name: "West Bridgford", note: "Tree-lined streets, Lady Bay and Trent Bridge" },
  { slug: "hucknall", name: "Hucknall", note: "Tram terminus area and north Nottingham estates" },
  // Leicester areas
  { slug: "oadby", name: "Oadby", note: "University halls, family suburbs and A6 corridor" },
  { slug: "wigston", name: "Wigston", note: "South Leicester moves and residential estates" },
  { slug: "braunstone", name: "Braunstone", note: "Post-war estates and M1 junction 21 access" },
  { slug: "evington", name: "Evington", note: "Clarendon Park student area and family streets" },
  // Derby areas
  { slug: "chaddesden", name: "Chaddesden", note: "A52 corridor, Oakwood and estate moves" },
  { slug: "mickleover", name: "Mickleover", note: "Family homes, A38 access and western suburbs" },
  { slug: "alvaston", name: "Alvaston", note: "A6 London Road area and south-eastern estates" },
  { slug: "littleover", name: "Littleover", note: "Village feel, executive homes and hilly streets" },
  // Northampton areas
  { slug: "kingsthorpe", name: "Kingsthorpe", note: "Village character, Victorian terraces north of town" },
  { slug: "duston", name: "Duston", note: "Old village and new-build estates west of town" },
  { slug: "abington", name: "Abington", note: "Victorian terraces and Edwardian villas near the park" },
  // Lincoln areas
  { slug: "north-hykeham", name: "North Hykeham", note: "Growing area south of Lincoln with newer estates" },
];

const eastMidlandsAreas = eastMidlandsAreaCandidates
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
    area: "Nottingham NG7 to West Bridgford NG2",
    type: "Student move",
    detail: "Boxes, suitcases and small furniture from shared accommodation with tram-line access notes included.",
  },
  {
    area: "Leicester LE2 to Oadby LE2",
    type: "Flat move",
    detail: "One-bedroom flat move with lift access, weekend timing and university-area parking described upfront.",
  },
  {
    area: "Derby DE3 to Nottingham NG1",
    type: "Inter-city move",
    detail: "Full house move along the A52 corridor with driveway access at both addresses and furniture volume listed.",
  },
];

const postcodeCoverage = [
  { area: "Nottingham", postcodes: ["NG1", "NG2", "NG4", "NG5", "NG9", "NG15"] },
  { area: "Leicester", postcodes: ["LE1", "LE2", "LE3", "LE5", "LE18"] },
  { area: "Derby", postcodes: ["DE1", "DE3", "DE21", "DE22", "DE24"] },
  { area: "Northampton", postcodes: ["NN1", "NN2", "NN4", "NN5"] },
  { area: "Lincoln", postcodes: ["LN1", "LN2", "LN6"] },
];

const faqItems = [
  {
    q: "How much does a man and van cost in the East Midlands?",
    a: "The guide price depends on the collection and delivery postcodes, distance, item list, helpers required, stairs, parking and access. East Midlands rates in 2026 start from £19 per hour, with full-day costs around £350–£500. You can see a guide price first, then a verified mover reviews the details and sends a quote before you decide whether to book.",
  },
  {
    q: "Do you cover Nottingham, Leicester, Derby, Northampton and Lincoln?",
    a: "Yes. You can submit free move requests for Nottingham, Leicester, Derby, Northampton, Lincoln and surrounding East Midlands areas. Availability depends on a verified mover reviewing your move details.",
  },
  {
    q: "Will multiple movers contact me?",
    a: "No. Your details are not sent to lots of companies. A verified mover reviews your anonymised request, and your contact details are only released after you accept a quote and pay the booking deposit.",
  },
  {
    q: "Is it free to submit a move request?",
    a: "Yes. It is free to submit your request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and the remaining balance is paid directly to the mover on moving day.",
  },
  {
    q: "Can I book a same-day man and van in the East Midlands?",
    a: "Same-day moves may be possible depending on mover availability, route and access. Submit the request with the correct postcodes and move details so a verified mover can review it quickly.",
  },
  {
    q: "Can I use this for single-item furniture collection?",
    a: "Yes. The East Midlands service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van East Midlands quote request",
  url: `${baseUrl}/man-and-van-east-midlands`,
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
    name: "East Midlands",
    containsPlace: [
      { "@type": "Place", name: "Nottingham", url: `${baseUrl}/man-and-van-nottingham` },
      { "@type": "Place", name: "Leicester", url: `${baseUrl}/man-and-van-leicester` },
      { "@type": "Place", name: "Derby", url: `${baseUrl}/man-and-van-derby` },
      { "@type": "Place", name: "Northampton", url: `${baseUrl}/man-and-van-northampton` },
      { "@type": "Place", name: "Lincoln", url: `${baseUrl}/man-and-van-lincoln` },
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
    "Free East Midlands man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
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
      name: "Man and Van East Midlands",
      item: `${baseUrl}/man-and-van-east-midlands`,
    },
  ],
};

export default function EastMidlandsPage() {
  const cityAreas = eastMidlandsAreas.filter(a =>
    ["nottingham", "leicester", "derby", "northampton", "lincoln"].includes(a.slug)
  );
  const townAreas = eastMidlandsAreas.filter(a =>
    !["nottingham", "leicester", "derby", "northampton", "lincoln"].includes(a.slug)
  );

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
              <span className="text-primary font-bold">Man and Van East Midlands</span>
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
                  <MapPin size={14} /> East Midlands Hub
                </div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">
                  ← Back to all areas
                </Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
                  Man and Van <span className="text-accent italic">East Midlands</span>
                </h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                  Submit a free East Midlands move request, see a guide price and let one verified mover review your details before you decide whether to book.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 bg-white rounded-xl border border-border px-4 py-3">
                  <ShieldCheck size={18} className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Verified movers</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl border border-border px-4 py-3">
                  <Lock size={18} className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Protected details</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl border border-border px-4 py-3">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">From £19/hr</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-border p-6 lg:p-8 shadow-sm">
              <QuoteForm intent="house" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16 lg:space-y-24">

          {/* Featured Cities */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">East Midlands cities</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Man and Van across the East Midlands</h2>
              <p className="text-text-secondary font-medium">From Nottingham's Lace Market to Lincoln's Cathedral Quarter. Submit a free move request for verified mover quotes.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityAreas.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="group bg-white rounded-2xl border border-border p-8 hover:border-accent hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-black uppercase tracking-tight text-primary group-hover:text-accent transition-colors">Man and Van {area.name}</h3>
                      <p className="text-sm text-text-secondary font-medium leading-relaxed">{area.note}</p>
                    </div>
                    <ArrowUpRight size={20} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Area Pages */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Local area pages</h2>
              <p className="text-text-secondary font-medium">Detailed moving information for suburbs and towns across the East Midlands.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {townAreas.map((area) => (
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
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Popular East Midlands man and van services</h2>
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

          {/* Example Requests + Postcodes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Package size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">Example move requests</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">Real requests that customers submit across the East Midlands.</p>
                </div>
              </div>
              <div className="space-y-4">
                {exampleMoveRequests.map((request, i) => (
                  <article key={i} className="rounded-xl bg-[#F9F9F7] border border-border/50 p-5 space-y-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-accent">
                      <Package size={13} /> Example request
                    </span>
                    <h4 className="text-lg font-black uppercase tracking-tight text-primary">{request.type}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/50">{request.area}</p>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">{request.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">East Midlands postcode coverage</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">Customers enter full postcodes on the form; these outward-code examples show the main coverage areas.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          </div>

          {/* Two feature boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-primary rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                From Lace Market to <span className="text-accent">Cathedral Quarter</span>
              </h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">
                A Nottingham Lace Market apartment move is different to a Leicester Oadby family home, a Derby Mickleover house or a Lincoln Cathedral Quarter terrace. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.
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
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">East Midlands man and van questions</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
