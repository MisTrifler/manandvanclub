import Link from "next/link";
import { ArrowUpRight, Phone, MapPin, Clock, Route, ShieldCheck, CheckCircle2, Navigation, Car, AlertTriangle } from "lucide-react";
import { RouteData } from "@/lib/route-data";

const siteUrl = "https://www.manandvanclub.co.uk";

export default function RoutePageContent({ route }: { route: RouteData }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Routes", item: `${siteUrl}/routes` },
      { "@type": "ListItem", position: 3, name: `${route.cityA} to ${route.cityB}`, item: `${siteUrl}/routes/${route.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: route.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const routeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Man and Van ${route.cityA} to ${route.cityB}`,
    url: `${siteUrl}/routes/${route.slug}`,
    provider: {
      "@type": "Organization",
      name: "Man and Van Club",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      telephone: "+44-121-751-1269",
      email: "support@manandvanclub.co.uk",
    },
    areaServed: [
      {
        "@type": "City",
        name: route.cityA,
        containedInPlace: { "@type": "AdministrativeArea", name: route.regionA },
      },
      {
        "@type": "City",
        name: route.cityB,
        containedInPlace: { "@type": "AdministrativeArea", name: route.regionB },
      },
    ],
    serviceType: "Man and van move request",
    description: route.description,
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        minPrice: route.estimatedFrom.replace("£", ""),
        maxPrice: route.estimatedTo.replace("£", ""),
      },
    },
  };

  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(routeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <Link href="/routes" className="hover:text-accent transition-colors">Routes</Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">{route.cityA} to {route.cityB}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Trust Signal Strip */}
      <div className="bg-green-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" /> Free to submit
          </span>
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <ShieldCheck size={16} className="text-green-600 flex-shrink-0" /> Verified movers
          </span>
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" /> No hidden fees
          </span>
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <span className="text-accent font-black text-lg leading-none">£</span> Prices from £34
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <Navigation size={12} /> Route Move
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            {route.h1}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {route.intro}
          </p>

          {/* Route stats strip */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white rounded-2xl border border-border px-6 py-4 flex items-center gap-3">
              <MapPin size={20} className="text-accent" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Distance</p>
                <p className="font-black text-primary">{route.distance}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border px-6 py-4 flex items-center gap-3">
              <Clock size={20} className="text-accent" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Drive Time</p>
                <p className="font-black text-primary">{route.driveTime}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border px-6 py-4 flex items-center gap-3">
              <Route size={20} className="text-accent" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Via</p>
                <p className="font-black text-primary">{route.motorway}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border px-6 py-4 flex items-center gap-3">
              <span className="text-accent text-lg font-black">£</span>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">From</p>
                <p className="font-black text-primary">{route.estimatedFrom} – {route.estimatedTo}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Start Your Move Request <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-white border-2 border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> Call 0121 751 1269
            </a>
          </div>
        </div>
      </section>

      {/* Route Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Tips for Moving from {route.cityA} to {route.cityB}
          </h2>
          <div className="space-y-4">
            {route.routeTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#F9F9F7] p-5 rounded-2xl border border-border/50">
                <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black">
                  {i + 1}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parking & Access */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Parking & Access Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {route.parkingNotes.map((note, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Car size={18} className="text-accent" />
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight">{note.city}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{note.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            How Much Does {route.cityA} to {route.cityB} Cost?
          </h2>
          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40">Estimated range for 2026</p>
            <p className="text-4xl md:text-5xl font-black text-accent">
              {route.estimatedFrom} – {route.estimatedTo}
            </p>
            <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
              Based on a typical man and van move between {route.cityA} and {route.cityB} ({route.distance} via {route.motorway}). Your final quote depends on load size, access, stairs, parking and timing. Submit your details for a free guide price.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/get-started" className="btn-orange px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-2">
                Get Your Guide Price <ArrowUpRight size={16} />
              </Link>
              <Link href="/moving-cost-calculator" className="bg-white border-2 border-border px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 text-primary hover:border-accent hover:text-accent transition-all">
                Cost Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* City Links */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Local Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={route.cityALink} className="group bg-white rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 mb-2">Collection</p>
              <h3 className="text-xl font-black text-primary group-hover:text-accent transition-colors uppercase tracking-tight">
                {route.cityA} <ArrowUpRight size={16} className="inline" />
              </h3>
              <p className="text-sm text-text-secondary mt-2">Movers covering {route.cityA} and surrounding areas in {route.regionA}.</p>
            </Link>
            <Link href={route.cityBLink} className="group bg-white rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 mb-2">Delivery</p>
              <h3 className="text-xl font-black text-primary group-hover:text-accent transition-colors uppercase tracking-tight">
                {route.cityB} <ArrowUpRight size={16} className="inline" />
              </h3>
              <p className="text-sm text-text-secondary mt-2">Movers covering {route.cityB} and surrounding areas in {route.regionB}.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Routes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            Other Popular Routes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {route.relatedRoutes.map((related) => (
              <Link
                key={related.href}
                href={related.href}
                className="group bg-[#F9F9F7] rounded-2xl border border-border p-5 text-center hover:border-accent hover:shadow-md transition-all"
              >
                <span className="text-xs font-black text-primary uppercase tracking-widest group-hover:text-accent transition-colors">
                  {related.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/routes" className="text-accent font-black text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              View all routes <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">
            {route.cityA} to {route.cityB} — FAQ
          </h2>
          <div className="space-y-6">
            {route.faq.map((item) => (
              <div key={item.q} className="bg-white p-6 rounded-2xl border border-border/50 space-y-3">
                <h3 className="font-black text-primary text-sm leading-snug">{item.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#F9F9F7] text-center border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">
            Moving from {route.cityA} to {route.cityB}?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free. One verified mover reviews your request and sends a quote before you decide whether to book.
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
    </div>
  );
}
