import Link from "next/link";
import FAQ from "@/components/FAQ";
import { ArrowUpRight, CheckCircle2, MapPin, Route, ShieldCheck, Truck, Building2, GraduationCap, Sofa, Clock, Users, Phone } from "lucide-react";
import { HubPageData } from "@/lib/hub-page-data";
import { LOCATIONS } from "@/constants/locations";
import { isLocationIndexable } from "@/lib/seo-quality-guard";

const baseUrl = "https://www.manandvanclub.co.uk";

const services = [
  { icon: <Truck size={24} />, title: "House Removals", desc: "Family homes, terraced houses and suburban relocations.", href: "/house-removals" },
  { icon: <Building2 size={24} />, title: "Flat Moves", desc: "City-centre apartments and new-build moves.", href: "/flat-removals" },
  { icon: <GraduationCap size={24} />, title: "Student Moves", desc: "University moves, June to September.", href: "/student-removals" },
  { icon: <Sofa size={24} />, title: "Furniture Delivery", desc: "Single-item collections, marketplace pickups.", href: "/furniture-delivery-service" },
  { icon: <Clock size={24} />, title: "Same Day", desc: "Urgent local moves when available.", href: "/same-day-man-and-van" },
  { icon: <Users size={24} />, title: "Office Moves", desc: "Small office relocations and business clearing.", href: "/office-removals" },
];

export default function HubPageContent({ hub }: { hub: HubPageData }) {
  const nearbyAreas = hub.nearbyAreas
    .filter(area => isLocationIndexable(area.slug))
    .map(area => ({ ...area, href: `/man-and-van-${area.slug}` }));

  // Towns & cities within this hub's area — real links so equity flows hub → town
  const hubTowns = LOCATIONS
    .filter(l => l.slug !== hub.slug && isLocationIndexable(l.slug) && (
      l.county === hub.name || hub.neighborhoods.includes(l.name)
    ))
    .sort((a, b) => a.name.localeCompare(b.name));
  const visibleTowns = hubTowns.slice(0, 16);
  const extraTownCount = hubTowns.length - visibleTowns.length;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Man and Van ${hub.name} quote request`,
    url: `${baseUrl}/man-and-van-${hub.slug}`,
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
      name: hub.name,
      containedInPlace: { "@type": "AdministrativeArea", name: hub.region },
      containsPlace: hub.neighborhoods.slice(0, 12).map(n => ({ "@type": "Neighborhood", name: n })),
    },
    serviceType: ["Man and van quote request", "House removals", "Flat moves", "Student moves", "Furniture collection", "Office moves", "Same-day man and van"],
    description: hub.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.map((item) => ({
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
      { "@type": "ListItem", position: 2, name: `Man and Van ${hub.name}`, item: `${baseUrl}/man-and-van-${hub.slug}` },
    ],
  };

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
              <span className="text-primary font-bold">Man and Van {hub.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20"><MapPin size={14} /> {hub.badge}</div>
                <Link href="/man-and-van-near-me" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">&larr; Back to all areas</Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
                  Man and Van <span className="text-accent">{hub.name}</span>
                </h1>
                <p className="text-lg lg:text-xl text-text-secondary font-medium leading-relaxed max-w-lg">
                  {hub.heroSubtitle}
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

            {/* Context panel */}
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Route size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">{hub.contextTitle}</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed mt-2">{hub.contextText}</p>
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
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">{hub.featureLeft.title}</h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">{hub.featureLeft.text}</p>
            </div>
            <div className="bg-accent rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">{hub.featureRight.title}</h2>
              <p className="text-white font-medium leading-relaxed text-base lg:text-lg">{hub.featureRight.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Services</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Moving Services in {hub.name}</h2>
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

      {/* Towns & Cities in this hub — internal linking hub → town */}
      {visibleTowns.length > 0 && (
        <section className="py-16 bg-white border-b border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Area Guides</span>
              <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van in {hub.name} Towns</h2>
              <p className="text-text-secondary mt-3 text-sm max-w-xl mx-auto">Free move requests in every {hub.name} town below — one verified mover quotes before you decide whether to book.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleTowns.map((town) => (
                <Link key={town.slug} href={`/man-and-van-${town.slug}`} className="group flex items-center justify-between bg-[#F9F9F7] rounded-2xl border border-border p-5 hover:border-accent hover:shadow-md transition-all">
                  <span className="font-black text-primary text-xs uppercase tracking-tight group-hover:text-accent transition-colors">Man and Van {town.name}</span>
                  <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
            {extraTownCount > 0 && (
              <p className="text-center mt-6 text-sm text-text-secondary">
                Plus {extraTownCount} more areas — <Link href="/areas-covered" className="text-accent font-bold hover:underline">see all areas we cover →</Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Nearby Areas */}
      {nearbyAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">{hub.region}</span>
              <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van Near {hub.name}</h2>
              <p className="text-text-secondary mt-3 text-sm max-w-xl mx-auto">{hub.name} is our {hub.region} hub. We also cover {nearbyAreas.map(a => a.name).join(', ')} and more — with more areas coming soon.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearbyAreas.map((area) => (
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
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mt-4">Man and Van Prices in {hub.name} (2026)</h2>
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
                {hub.pricing.map((row, i) => (
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
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">{hub.name} man and van questions</h2>
          </div>
          <FAQ items={hub.faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Ready to Move in {hub.name}?</h2>
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

      {/* ── Mobile Floating Call Button ── */}
      <a
        href="tel:01217511269"
        className="floating-call-btn fixed bottom-20 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </main>
  );
}
