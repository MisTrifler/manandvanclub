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
  title: "Man and Van Leeds | Verified Mover Quotes from £19",
  description:
    "Submit a free man and van request across West Yorkshire. From Leeds city centre to Bradford, Huddersfield and Halifax, one verified mover reviews your details before you book.",
  alternates: {
    canonical: `${baseUrl}/man-and-van-leeds`,
  },
  openGraph: {
    title: "Man and Van Leeds | Verified Mover Quotes from £19",
    description: "Submit a free man and van request across West Yorkshire. From Leeds city centre to Bradford, Huddersfield and Halifax, one verified mover reviews your details before you book.",
    url: `${baseUrl}/man-and-van-leeds`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Leeds")}&subtitle=${encodeURIComponent("Verified Mover Quotes")}`, width: 1200, height: 630, alt: "Man and Van Leeds | Verified Mover Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Leeds | Verified Mover Quotes from £19",
    description: "Submit a free man and van request across West Yorkshire. One verified mover reviews your details before you book.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Leeds")}&subtitle=${encodeURIComponent("Verified Mover Quotes")}`],
  },
};

const westYorkshireAreaCandidates = [
  { slug: "bradford", name: "Bradford", note: "City centre terraces and A650 corridor moves" },
  { slug: "wakefield", name: "Wakefield", note: "M1 corridor moves and city centre relocations" },
  { slug: "huddersfield", name: "Huddersfield", note: "West Yorkshire moves near the M62 and A62" },
  { slug: "halifax", name: "Halifax", note: "Hillside terraces and A629 access routes" },
  { slug: "dewsbury", name: "Dewsbury", note: "Town centre moves and A638 corridor access" },
  { slug: "batley", name: "Batley", note: "Local moves and A653 corridor access" },
  { slug: "keighley", name: "Keighley", note: "Airedale moves near the A629 and A650" },
  { slug: "pudsey", name: "Pudsey", note: "West Leeds moves near the A647 and ring road" },
  { slug: "morley", name: "Morley", note: "South Leeds moves near the M62 and A643" },
];

const westYorkshireAreas = westYorkshireAreaCandidates
  .filter((area) => isLocationIndexable(area.slug))
  .map((area) => ({ ...area, href: `/man-and-van-${area.slug}` }));

const services = [
  { title: "House removals", href: "/house-removals", icon: Truck },
  { title: "Flat moves", href: "/flat-removals", icon: Building2 },
  { title: "Student moves", href: "/student-removals", icon: GraduationCap },
  { title: "Furniture collection", href: "/furniture-delivery", icon: Sofa },
  { title: "Same-day man and van", href: "/same-day-man-and-van", icon: Route },
];

const faqItems = [
  {
    q: "How much does a man and van cost in Leeds?",
    a: "Leeds moves typically start from £19 per hour. The final quote depends on the postcodes, distance, item list, helpers required, stairs, parking and access. You can see a guide price first, then a verified mover reviews the details and sends a quote before you decide whether to book.",
  },
  {
    q: "Do you cover all West Yorkshire towns?",
    a: "Yes. You can submit free move requests across West Yorkshire, including Bradford, Wakefield, Huddersfield, Halifax, Dewsbury, Batley, Keighley and surrounding towns. Availability depends on a verified mover reviewing your move details.",
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
    q: "Can I book a same-day man and van in Leeds?",
    a: "Same-day moves may be possible depending on mover availability, route and access. Submit the request with the correct postcodes and move details so a verified mover can review it quickly. The M621, A58 and inner ring road are factored into the route planning.",
  },
  {
    q: "Can I use this for single-item furniture collection?",
    a: "Yes. The West Yorkshire service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Leeds quote request",
  url: `${baseUrl}/man-and-van-leeds`,
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
    name: "West Yorkshire",
    containsPlace: westYorkshireAreas.map((area) => ({
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
    "Free Leeds and West Yorkshire man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
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
    { "@type": "ListItem", position: 2, name: "Man and Van Leeds", item: `${baseUrl}/man-and-van-leeds` },
  ],
};

export default function LeedsPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Man and Van Leeds</span>
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
                  <MapPin size={14} /> West Yorkshire Hub
                </div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">
                  &larr; Back to all areas
                </Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
                  Man and Van <span className="text-accent italic">Leeds</span>
                </h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                  Submit a free West Yorkshire move request, see a guide price and let one verified mover review your details before you decide whether to book. From £19/hr.
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
                    <h3 className="text-xl font-black uppercase tracking-tight text-primary">West Yorkshire moving challenges</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">Leeds and West Yorkshire moves involve the M621 and inner ring road congestion, student areas around Headingley and Hyde Park, narrow terraces in Bradford and Halifax hillside streets, and M62 cross-county routes. The form captures these details so your mover can plan properly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16 lg:space-y-20">
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">West Yorkshire areas</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Areas we cover around Leeds</h2>
              <p className="text-text-secondary font-medium">Select an area for local route, access and postcode information.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {westYorkshireAreas.map((area) => (
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

          <div className="space-y-6 lg:space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Services</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Leeds man and van services</h2>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-primary rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                M62, M621 and local <span className="text-accent">routes</span> matter
              </h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">
                A move from a Headingley student house is different to a Bradford terrace, a Halifax hillside home or a Wakefield family house. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.
              </p>
            </div>
            <div className="bg-accent rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">One verified mover, not a lead blast</h2>
              <p className="text-white font-medium leading-relaxed text-base lg:text-lg">
                Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit.
              </p>
            </div>
          </div>

          <div className="pt-6 lg:pt-8 border-t border-border">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Leeds man and van questions</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
