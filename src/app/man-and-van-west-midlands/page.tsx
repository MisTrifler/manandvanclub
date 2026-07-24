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
  title: "Man and Van West Midlands From £19/hr | Free Quotes",
  description:
    "Man with a van in the West Midlands from £19/hr. Get a guide price, keep your details private, and receive a quote from one verified mover before you book. Rated 5.0/5 from 6 reviews.",
  alternates: {
    canonical: `${baseUrl}/man-and-van-west-midlands`,
  },
};

const westMidlandsAreaCandidates = [
  { slug: "birmingham", name: "Birmingham", note: "City centre flats, student moves and house relocations" },
  { slug: "walsall", name: "Walsall", note: "Local moves around Aldridge, Bloxwich and the Black Country" },
  { slug: "wolverhampton", name: "Wolverhampton", note: "Ring Road routes, flats, houses and furniture collections" },
  { slug: "dudley", name: "Dudley", note: "Black Country house moves, flats and single-item collections" },
  { slug: "west-bromwich", name: "West Bromwich", note: "Sandwell moves, storage runs and furniture deliveries" },
  { slug: "solihull", name: "Solihull", note: "Suburban house moves and apartment relocations" },
  { slug: "coventry", name: "Coventry", note: "Student moves, city flats and local deliveries" },
  { slug: "stourbridge", name: "Stourbridge", note: "Canal-side access, terraces and family homes" },
  { slug: "halesowen", name: "Halesowen", note: "Local routes near the Clent Hills and A456" },
  { slug: "wednesbury", name: "Wednesbury", note: "M6/A41 access, terraces and local collections" },
  { slug: "bloxwich", name: "Bloxwich", note: "A34 corridor moves and residential collections" },
  { slug: "brownhills", name: "Brownhills", note: "A5/A452 moves and nearby Walsall Wood routes" },
];

const westMidlandsAreas = westMidlandsAreaCandidates
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
    area: "Birmingham B29 to Selly Oak",
    type: "Student move",
    detail: "Boxes, suitcases and small furniture from shared accommodation with stairs and parking notes included.",
  },
  {
    area: "Walsall WS1 to Wolverhampton WV1",
    type: "Flat move",
    detail: "One-bedroom flat move with lift access, weekend timing and loading restrictions described upfront.",
  },
  {
    area: "Dudley DY1 to West Bromwich B70",
    type: "Furniture collection",
    detail: "Sofa or bulky-item collection where the customer can add item size, helpers required and access details.",
  },
];

const postcodeCoverage = [
  { area: "Birmingham", postcodes: ["B1", "B2", "B13", "B17", "B29"] },
  { area: "Black Country", postcodes: ["WV1", "WS1", "DY1", "B70"] },
  { area: "Coventry and Solihull", postcodes: ["CV1", "CV4", "B90", "B91"] },
];

const faqItems = [
  {
    q: "How much does a man and van cost in the West Midlands?",
    a: "The guide price depends on the collection and delivery postcodes, distance, item list, helpers required, stairs, parking and access. You can see a guide price first, then a verified mover reviews the details and sends a quote before you decide whether to book.",
  },
  {
    q: "Do you cover Birmingham, Walsall and Wolverhampton?",
    a: "Yes. You can submit free move requests for Birmingham, Walsall, Wolverhampton, Dudley, West Bromwich, Solihull, Coventry and surrounding West Midlands towns. Availability depends on a verified mover reviewing your move details.",
  },
  {
    q: "Will multiple movers contact me?",
    a: "No. Your details are not sent to lots of companies. A verified mover reviews your anonymised request, and your contact details are only released after you accept a quote and pay the booking deposit.",
  },
  {
    q: "Is it free to submit a move request?",
    a: "Yes. It is free to submit your request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover’s quote, and the remaining balance is paid directly to the mover on moving day.",
  },
  {
    q: "Can I book a same-day man and van in the West Midlands?",
    a: "Same-day moves may be possible depending on mover availability, route and access. Submit the request with the correct postcodes and move details so a verified mover can review it quickly.",
  },
  {
    q: "Can I use this for single-item furniture collection?",
    a: "Yes. The West Midlands service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van West Midlands quote request",
  url: `${baseUrl}/man-and-van-west-midlands`,
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
    name: "West Midlands",
    containsPlace: westMidlandsAreas.map((area) => ({
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
    "Free West Midlands man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking.",
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
      name: "Man and Van West Midlands",
      item: `${baseUrl}/man-and-van-west-midlands`,
    },
  ],
};

export default function WestMidlandsPage() {
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
              <span className="text-primary font-bold">Man and Van West Midlands</span>
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
                  <MapPin size={14} /> West Midlands Hub
                </div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">
                  ← Back to all areas
                </Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
                  Man and Van <span className="text-accent italic">West Midlands</span>
                </h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                  Submit a free West Midlands move request, see a guide price and let one verified mover review your details before you decide whether to book.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, text: "Verified movers" },
                  { icon: Lock, text: "Details protected" },
                  { icon: CheckCircle2, text: "No obligation" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="bg-white rounded-2xl border border-border px-5 py-4 flex items-center gap-3 shadow-sm">
                      <Icon size={18} className="text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full max-w-xl lg:ml-auto" id="quote-form">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight leading-none">
                West Midlands moves, without the spam
              </h2>
              <p className="text-lg text-text-secondary font-medium leading-relaxed">
                Man and Van Club is built for customers searching for a man and van or man with a van in the West Midlands without ten companies calling at once. Your request includes the postcodes, move type, item list, access notes and preferred date so a verified mover can review the job properly before quoting.
              </p>
              <p className="text-lg text-text-secondary font-medium leading-relaxed">
                The West Midlands includes busy city centre flats, Black Country terraces, student areas, suburban family homes and retail-park furniture collections. Parking, stairs, lifts, route time and property access can all affect the final quote, so the guide price is only the starting point.
              </p>
            </div>
            <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-4">
              <ShieldCheck size={30} className="text-accent" />
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">How it works</h3>
              <ul className="space-y-3 text-sm font-medium text-text-secondary leading-relaxed">
                <li>1. Enter your West Midlands move details.</li>
                <li>2. See a guide price range before submitting.</li>
                <li>3. One verified mover reviews the request.</li>
                <li>4. Your details are released only after you accept and book.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Local proof</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">West Midlands move examples and postcode coverage</h2>
              <p className="text-text-secondary font-medium leading-relaxed">
                These are example move requests showing the type of details customers submit — postcodes, item lists, access notes and preferred dates — so a verified mover can review the job before quoting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exampleMoveRequests.map((request) => (
                <article key={`${request.area}-${request.type}`} className="bg-[#F9F9F7] rounded-2xl border border-border p-6 space-y-3">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-accent">
                    <Package size={13} /> Example request
                  </span>
                  <h3 className="text-lg font-black uppercase tracking-tight text-primary">{request.type}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/50">{request.area}</p>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">{request.detail}</p>
                </article>
              ))}
            </div>

            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">West Midlands outward postcode examples</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">Customers enter full postcodes on the form; these outward-code examples add local relevance across the launch area.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

          {/* Featured Locations — Birmingham & Walsall get prominence */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Featured areas</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Man and Van Birmingham &amp; Walsall</h2>
              <p className="text-text-secondary font-medium">Our two most popular West Midlands areas. Submit a free move request for verified local mover quotes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/man-and-van-birmingham"
                className="group bg-white rounded-2xl border border-border p-8 hover:border-accent hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-accent">Most popular</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-primary group-hover:text-accent transition-colors">Man and Van Birmingham</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">City-centre flats, student moves in Selly Oak, Edgbaston family homes and Jewellery Quarter apartments. Clean Air Zone routes, lift access and parking notes included.</p>
                  </div>
                  <ArrowUpRight size={20} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </Link>
              <Link
                href="/man-and-van-walsall"
                className="group bg-white rounded-2xl border border-border p-8 hover:border-accent hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-accent">Most popular</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-primary group-hover:text-accent transition-colors">Man and Van Walsall</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">Black Country moves from Bloxwich semis to Aldridge estates. A34 and A454 route timing, town-centre terraces and furniture collections across WS postcodes.</p>
                  </div>
                  <ArrowUpRight size={20} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Popular West Midlands areas</h2>
              <p className="text-text-secondary font-medium">Use these pages for local route, access and area information across the Black Country and nearby towns.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {westMidlandsAreas.filter(a => a.slug !== "birmingham" && a.slug !== "walsall").map((area) => (
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
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Popular West Midlands man and van services</h2>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-primary rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Local routes and <span className="text-accent">access</span> matter
              </h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">
                A move from a Birmingham apartment block is different to a Walsall terrace, a Solihull driveway or a Wolverhampton student house. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.
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
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">West Midlands man and van questions</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
