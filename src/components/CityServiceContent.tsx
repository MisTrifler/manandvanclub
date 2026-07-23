"use client";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import { MapPin, Star, CheckCircle2, ShieldCheck, Clock, Users, ArrowUpRight, ChevronRight, Zap, CheckCircle, Lock, PhoneOff, UserCheck, ClipboardCheck, Truck, Package, Route, Building, GraduationCap, Sofa, ArrowRight, ListChecks, ExternalLink, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { type IntentType } from "@/lib/intent-detection";
import { getGoogleMapsRouteUrl } from "@/lib/google-maps-routes";

/**
 * Splits long generated/custom local SEO text into short paragraphs so
 * mobile readers never face one massive wall of text. Respects existing
 * newlines first; otherwise groups sentences (~2 per paragraph).
 */
function splitIntoParagraphs(text: string): string[] {
  if (!text) return [];
  const byNewline = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  if (byNewline.length > 1) return byNewline;

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((s) => s.trim()).filter(Boolean) || [text];
  if (sentences.length <= 2) return [text];

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(" "));
  }
  return paragraphs;
}

function buildRouteAnchorText(move: { from: string; to: string; slug?: string }): string {
  if (move.slug) return `Man and van ${move.to}`;
  return `${move.from} to ${move.to} moving route`;
}

function getServiceFeatureIcon(icon?: string) {
  switch (icon) {
    case "home":
      return <Truck size={28} />;
    case "building":
      return <Building size={28} />;
    case "student":
      return <GraduationCap size={28} />;
    case "office":
      return <ListChecks size={28} />;
    case "furniture":
      return <Sofa size={28} />;
    case "package":
      return <Package size={28} />;
    case "route":
      return <Route size={28} />;
    case "clock":
      return <Clock size={28} />;
    case "access":
      return <Users size={28} />;
    case "check":
      return <CheckCircle2 size={28} />;
    default:
      return <ShieldCheck size={28} />;
  }
}

export default function CityServiceContent({ data, faqItems, formIntent }: { data: any, faqItems: any[], formIntent?: IntentType }) {
  const currentUrl = `https://www.manandvanclub.co.uk/${data.slug || ''}`;
  const isServicePage = data.pageType === "service";
  const isLocationPage = data.pageType === "location";

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  const safeFaqItems = Array.isArray(faqItems) ? faqItems : [];
  const hasValidFaq = safeFaqItems.length > 0;
  const defaultFeatureCards = [
    { t: "Quote Options", d: "A verified mover reviews your request and sends quote options before you decide whether to book.", icon: "clock" },
    { t: "Checked Applications", d: "Mover applications are reviewed before they can access customer enquiries.", icon: "check" },
    { t: "Insurance Checked", d: "Movers must provide Goods in Transit and Public Liability insurance before approval. Cover details can vary by mover.", icon: "check" },
    { t: "Local Access Notes", d: "Your postcode, parking, stairs, lifts and access details help the mover quote accurately.", icon: "access" },
  ];
  const featureCards = Array.isArray(data.featureCards) && data.featureCards.length > 0 ? data.featureCards : defaultFeatureCards;

  const faqSchema = data.faqSchema || (hasValidFaq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": safeFaqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null);

  // Build BreadcrumbList matching the visible breadcrumb trail.
  // West Midlands location pages get 3 levels: Home → West Midlands → City
  // Service pages and other regions get 2 levels: Home → Page Name
  const fallbackBreadcrumbItems: Record<string, any>[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.manandvanclub.co.uk"
    },
  ];

  if (isLocationPage && data.region === "West Midlands" && data.slug !== "man-and-van-west-midlands") {
    fallbackBreadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": "West Midlands",
      "item": "https://www.manandvanclub.co.uk/man-and-van-west-midlands"
    });
  }

  fallbackBreadcrumbItems.push({
    "@type": "ListItem",
    "position": fallbackBreadcrumbItems.length + 1,
    "name": data.name,
    "item": currentUrl
  });

  const breadcrumbSchema = data.breadcrumbSchema || {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fallbackBreadcrumbItems,
  };

  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      {data.localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.localBusinessSchema) }}
        />
      )}
      {data.localBusinessExtra && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.localBusinessExtra) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Visible Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            </li>
            {isLocationPage && data.region === "West Midlands" && data.slug !== "man-and-van-west-midlands" && (
              <li className="flex items-center gap-2">
                <ChevronRight size={12} className="text-primary/30" />
                <Link href="/man-and-van-west-midlands" className="hover:text-accent transition-colors">West Midlands</Link>
              </li>
            )}
            <li className="flex items-center gap-2" aria-current="page">
              <ChevronRight size={12} className="text-primary/30" />
              <span className="text-primary font-bold truncate">{data.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero Section (Optimized) ── */}
      <section className="bg-[#F9F9F7] py-10 lg:py-12 lg:min-h-[calc(100vh-100px)] border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-20 xl:gap-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:w-1/2 space-y-5 lg:space-y-6"
            >
              <div className="inline-flex items-center gap-2 lg:gap-3 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20">
                <MapPin size={12} />
                {isLocationPage ? `Verified movers in ${data.name}` : (data.badge ? data.badge : `Verified movers for ${data.name}`)}
              </div>

              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-primary/20">
                <span className="text-accent font-black text-sm leading-none">£</span>
                Prices from £19
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
                {data.h1 ? data.h1 : (
                  <>
                    Man and Van <span className="text-accent italic">{data.name}</span>
                  </>
                )}
              </h1>

              <p className="text-base lg:text-lg xl:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                {data.intro}
              </p>

              {isLocationPage && data.region === "West Midlands" && data.slug !== "man-and-van-west-midlands" && (
                <Link
                  href="/man-and-van-west-midlands"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors"
                >
                  View the West Midlands man and van hub <ArrowUpRight size={14} />
                </Link>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 pt-2 lg:pt-3">
                {[
                  { v: "Free", l: "To Submit" },
                  { v: "Verified", l: "Movers" },
                  { v: "Details", l: "Protected" }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-accent font-black text-3xl lg:text-3xl xl:text-4xl tracking-tighter leading-none">{item.v}</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary/30">{item.l}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full border border-green-100">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Open 24/7</span>
                </div>
                <span className="text-[10px] font-medium text-primary/50">24/7</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              id="quote-form"
              className="lg:w-1/2 w-full max-w-lg relative z-20 scroll-mt-28 lg:scroll-mt-36"
            >
              <QuoteForm intent={formIntent} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Coverage Signal (Step 2: top 20 locations only) ── */}
      {isLocationPage && data.coverageSignal && (
        <div className="bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800 font-medium">
              Verified movers covering <strong>{data.name}</strong> and surrounding areas. Submit your move details for free — a mover reviews your request before quoting.
            </p>
          </div>
        </div>
      )}

      {/* ── Content Section ── */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">

            <div className="lg:col-span-2 space-y-16 lg:space-y-24">

              {/* ── Moving in [Location] Made Simple ── */}
              <div className="space-y-5 lg:space-y-8">
                 <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight leading-none">
                   {isServicePage
                     ? `${data.name} Made Simple`
                     : data.h1
                       ? `${data.name} Made Simple`
                       : `Moving in ${data.name} Made Simple`}
                 </h2>
                 <p className="text-lg lg:text-xl text-text-secondary font-medium leading-relaxed">{data.knowledge}</p>
                 <div className="bg-primary/5 p-5 lg:p-10 rounded-2xl lg:rounded-[2.5rem] border border-border/40">
                   <p className="text-lg lg:text-xl text-primary font-medium leading-relaxed italic">
                     “{data.proofQuote || "Submit one clear request. An approved mover can review the details and send quote options before you decide whether to book."}”
                   </p>
                 </div>
              </div>

              {/* ── Feature Cards ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {featureCards.map((f: { t: string; d: string; icon?: string }) => (
                  <div key={f.t} className="bg-[#F9F9F7] p-6 lg:p-10 rounded-3xl lg:rounded-[2.5rem] border border-border/50 space-y-4 lg:space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="text-accent group-hover:scale-110 transition-transform origin-left">{getServiceFeatureIcon(f.icon)}</div>
                    <div className="space-y-2">
                      <h3 className="font-black text-xl text-primary uppercase tracking-tight leading-tight">{f.t}</h3>
                      <p className="text-text-secondary font-medium text-sm leading-relaxed">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── CTA Card ── */}
              <div className="bg-white p-6 lg:p-12 rounded-3xl lg:rounded-[3.5rem] text-primary space-y-6 lg:space-y-8 relative overflow-hidden shadow-2xl border border-border">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16" />
                 <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none italic">Ready to start?</h3>
                 <p className="text-text-secondary font-medium text-lg leading-relaxed">
                   {isServicePage
                     ? `It takes less than 60 seconds to submit a free request for ${data.name.toLowerCase()}.`
                     : `It takes less than 60 seconds to submit a free move request in ${data.name}.`}
                 </p>
                 <Link href="#quote-form" className="btn-orange w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 hover:scale-105 transition-all">
                    Start Your Move Request <ArrowUpRight size={22} />
                 </Link>
                 <div className="flex items-center justify-center gap-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
                   <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-accent"/> Details Protected</span>
                   <span className="flex items-center gap-1.5"><Zap size={14} className="text-accent"/> Booking Deposit Only If Accepted</span>
                 </div>
               </div>

              {/* ── Areas We Cover Near [Location] ── */}
              {data.areasWeCover && data.areasWeCover.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Areas We Cover Near {data.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {data.areasWeCover.map((area: string) => {
                      const slug = area.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                      const hasPage = data.nearbyLocations?.some((l: any) => l.slug === slug || l.name.toLowerCase() === area.toLowerCase());
                      return hasPage ? (
                        <Link
                          key={area}
                          href={`/man-and-van-${slug}`}
                          className="group flex items-center justify-between bg-[#F9F9F7] p-5 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                        >
                          <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{area}</span>
                          <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors" />
                        </Link>
                      ) : (
                        <div key={area} className="bg-[#F9F9F7] p-5 rounded-2xl border border-border/50 text-center font-black text-primary uppercase text-[10px] tracking-widest">
                          {area}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Moving in [Location] ── */}
              {data.localMovingInfo && (
                <div className="space-y-6 lg:space-y-8">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Moving in {data.name}</h3>

                  {/* Local intro split into short readable paragraphs (mobile-friendly, keeps SEO content) */}
                  <div className="space-y-4">
                    {splitIntoParagraphs(data.localMovingInfo).map((para: string, i: number) => (
                      <p key={i} className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">{para}</p>
                    ))}
                  </div>

                  {/* Compact benefit cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                    {[
                      { t: "Local access knowledge", d: "Movers understand flats, stairs, terraces, lifts and narrow streets." },
                      { t: "Parking-aware moves", d: "Helpful where loading space, permits or busy roads may affect the move." },
                      { t: "Flexible move types", d: "Useful for student moves, single items, house moves, office moves and storage runs." },
                    ].map((card) => (
                      <div key={card.t} className="bg-[#F9F9F7] p-4 lg:p-5 rounded-2xl border border-border/50">
                        <h4 className="text-xs font-black uppercase tracking-tight text-primary mb-1.5">{card.t}</h4>
                        <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">{card.d}</p>
                      </div>
                    ))}
                  </div>

                  {data.popularMoves && data.popularMoves.length > 0 && (
                  <div className="bg-[#F9F9F7] p-5 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-border/50 space-y-6">
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary/40 mb-4">Popular Moving Routes From {data.name}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {data.popularMoves.map((move: any, i: number) => {
                            const mapsUrl = getGoogleMapsRouteUrl(move.from, move.to);
                            return (
                              <div key={i} className="group bg-white rounded-xl border border-border/50 hover:border-accent hover:shadow-md transition-all duration-300 overflow-hidden">
                                {/* Primary content row */}
                                <div className="flex items-center justify-between px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-accent flex-shrink-0" />
                                    <div>
                                      <span className="text-xs font-black text-primary uppercase tracking-widest block">
                                        {move.from} <span className="text-primary/40">→</span> {move.to}
                                      </span>
                                      {move.routeInfo?.distance && move.routeInfo.distance.trim() !== "" && (
                                        <span className="text-[10px] font-bold text-primary/50 block mt-0.5">
                                          {move.routeInfo.distance} • {move.routeInfo.duration}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {move.slug && (
                                    <Link
                                      href={`/man-and-van-${move.slug}`}
                                      className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-primary transition-colors flex-shrink-0"
                                    >
                                      {buildRouteAnchorText(move)}
                                    </Link>
                                  )}
                                </div>
                                {/* Google Maps CTA */}
                                <a
                                  href={mapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-1.5 bg-[#F9F9F7] px-4 py-2.5 border-t border-border/30 text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-accent hover:bg-accent/5 transition-colors"
                                >
                                  <Route size={12} />
                                  View Route on Map
                                  <ExternalLink size={10} />
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                  </div>
                  )}
                </div>
              )}

              {/* ── Honest local proof for West Midlands launch pages ── */}
              {isLocationPage && data.region === "West Midlands" && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">{data.name} local move signals</h3>
                    <p className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">
                      These are example move requests showing the type of details customers submit — postcodes, item lists, access notes and preferred dates — so a verified mover can review the job before quoting.
                    </p>
                  </div>

                  {data.exampleMoveRequests && data.exampleMoveRequests.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {data.exampleMoveRequests.map((request: { area: string; type: string; detail: string }) => (
                        <article key={`${request.area}-${request.type}`} className="bg-[#F9F9F7] p-5 lg:p-6 rounded-2xl border border-border/50 space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-accent">
                            <Package size={13} /> Example request
                          </span>
                          <h4 className="font-black text-primary uppercase tracking-tight leading-tight">{request.type}</h4>
                          <p className="text-xs font-black uppercase tracking-widest text-primary/50">{request.area}</p>
                          <p className="text-sm text-text-secondary font-medium leading-relaxed">{request.detail}</p>
                        </article>
                      ))}
                    </div>
                  )}

                  {data.postcodeCoverage && data.postcodeCoverage.length > 0 && (
                    <div className="bg-white p-5 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-border/50 space-y-5">
                      <div className="flex items-start gap-3">
                        <MapPin size={22} className="text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-lg font-black text-primary uppercase tracking-tight">Postcode coverage examples</h4>
                          <p className="text-sm text-text-secondary font-medium leading-relaxed">
                            Customers can submit full postcodes at both ends of the route. These outward-code examples help show local relevance across {data.name}.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {data.postcodeCoverage.map((coverage: { area: string; postcodes: string[] }) => (
                          <div key={coverage.area} className="rounded-2xl bg-[#F9F9F7] border border-border/50 p-4">
                            <p className="text-xs font-black uppercase tracking-tight text-primary mb-2">{coverage.area}</p>
                            <div className="flex flex-wrap gap-2">
                              {coverage.postcodes.map((postcode) => (
                                <span key={postcode} className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary/60 border border-border/50">
                                  {postcode}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Cross-Region Nearby Areas (Step 3: stronger internal linking) ── */}
              {isLocationPage && data.crossRegionLinks && data.crossRegionLinks.length > 0 && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Also Covered Near {data.name}</h3>
                    <p className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">
                      Verified movers on the platform may also cover moves between {data.name} and these nearby areas. Submit your collection and delivery postcodes for a quote.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                    {data.crossRegionLinks.map((loc: { slug: string; name: string }) => {
                      // Use keyword-rich anchor for priority cities
                      const label = (loc.slug === "birmingham" || loc.slug === "walsall")
                        ? `Man and Van ${loc.name}`
                        : loc.name;
                      return (
                        <Link
                          key={loc.slug}
                          href={`/man-and-van-${loc.slug}`}
                          className="group flex items-center justify-between bg-white p-4 lg:p-5 rounded-xl border border-border/50 hover:border-accent hover:shadow-md transition-all duration-300"
                        >
                          <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{label}</span>
                          <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── City-to-City Route Pages (internal links to /routes/* pages) ── */}
              {isLocationPage && data.routeLinks && data.routeLinks.length > 0 && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Routes From {data.name}</h3>
                    <p className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">
                      Find detailed route information, pricing estimates and parking advice for city-to-city moves involving {data.name}.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {data.routeLinks.map((route: { slug: string; cityA: string; cityB: string; distance: string; price: string }) => (
                      <Link
                        key={route.slug}
                        href={`/routes/${route.slug}`}
                        className="group flex items-center justify-between bg-white p-4 lg:p-5 rounded-xl border border-border/50 hover:border-accent hover:shadow-md transition-all duration-300"
                      >
                        <div>
                          <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors block">
                            {route.cityA} → {route.cityB}
                          </span>
                          <span className="text-[9px] font-bold text-primary/40 block mt-0.5">
                            {route.distance} · From {route.price}
                          </span>
                        </div>
                        <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Blog Cross-Link — Pricing Guide ── */}
              {isLocationPage && (() => {
                const blogLinks: Record<string, { title: string; href: string }> = {
                  "birmingham": { title: "Man and Van Birmingham: Prices & How to Book (2026)", href: "/blog/man-and-van-birmingham-prices-how-to-book" },
                  "walsall": { title: "Man and Van Walsall: Prices & How to Book (2026)", href: "/blog/man-and-van-walsall-prices-how-to-book" },
                  "london": { title: "Man and Van London: Prices & How to Book (2026)", href: "/blog/man-and-van-london-prices-how-to-book" },
                  "manchester": { title: "Man and Van Manchester: Prices & How to Book (2026)", href: "/blog/man-and-van-manchester-prices-how-to-book" },
                  "leeds": { title: "Man and Van Leeds: Prices & How to Book (2026)", href: "/blog/man-and-van-leeds-prices-how-to-book" },
                  "sheffield": { title: "Man and Van Sheffield: Prices & How to Book (2026)", href: "/blog/man-and-van-sheffield-prices-how-to-book" },
                  "bristol": { title: "Man and Van Bristol: Prices & How to Book (2026)", href: "/blog/man-and-van-bristol-prices-how-to-book" },
                  "liverpool": { title: "Man and Van Liverpool: Prices & How to Book (2026)", href: "/blog/man-and-van-liverpool-prices-how-to-book" },
                  "edinburgh": { title: "Man and Van Edinburgh: Prices & How to Book (2026)", href: "/blog/man-and-van-edinburgh-prices-how-to-book" },
                  "cardiff": { title: "Man and Van Cardiff: Prices & How to Book (2026)", href: "/blog/man-and-van-cardiff-prices-how-to-book" },
                  "newcastle-upon-tyne": { title: "Man and Van Newcastle upon Tyne: Prices & How to Book (2026)", href: "/blog/man-and-van-newcastle-prices-how-to-book" },
                };
                const blogLink = blogLinks[data.slug?.replace("man-and-van-", "") || ""];
                return blogLink ? (
                  <div className="bg-accent/5 p-6 lg:p-8 rounded-2xl border border-accent/20 space-y-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent">Pricing Guide</p>
                    <h3 className="font-black text-primary text-lg uppercase tracking-tight leading-tight">
                      {blogLink.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Detailed prices, local area tips and step-by-step booking advice for your move in {data.name}.
                    </p>
                    <Link
                      href={blogLink.href}
                      className="inline-flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest hover:gap-3 transition-all"
                    >
                      Read the guide <ArrowUpRight size={14} />
                    </Link>
                  </div>
                ) : null;
              })()}

              {/* ── Local search guides / neighbourhood relevance ── */}
              {data.localAreaGuides && data.localAreaGuides.length > 0 && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Popular {data.name} Move Searches</h3>
                    <p className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">
                      These local notes help customers describe the move accurately and help movers account for access, timing and route details before quoting.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.localAreaGuides.map((guide: { title: string; body: string; links?: { label: string; href: string }[] }) => (
                      <article key={guide.title} className="bg-white p-5 lg:p-6 rounded-2xl border border-border/50 shadow-sm space-y-3">
                        <h4 className="text-lg font-black text-primary uppercase tracking-tight leading-tight">{guide.title}</h4>
                        <p className="text-sm lg:text-base text-text-secondary font-medium leading-relaxed">{guide.body}</p>
                        {guide.links && guide.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {guide.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary/60 hover:border-accent hover:text-accent transition-colors"
                              >
                                {link.label} <ArrowUpRight size={12} />
                              </Link>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Serving [Location] & Surrounding Areas ── */}
              {data.localLandmarks && data.localLandmarks.length > 0 && (
                <div className="space-y-5 lg:space-y-8">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Serving {data.name} & Surrounding Areas</h3>
                  <p className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">
                    Requests in {data.name} can include moves around {data.localLandmarks.slice(0, 3).join(", ")} and {data.region ? `the wider ${data.region} area` : "the wider local area"}. Your move details help a verified mover account for local access, parking restrictions and route planning before they quote.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {data.localLandmarks.map((landmark: string, i: number) => {
                      const slug = landmark.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                      const hasPage = data.nearbyLocations?.some((l: any) => l.slug === slug || l.name.toLowerCase() === landmark.toLowerCase());
                      return hasPage ? (
                        <Link key={i} href={`/man-and-van-${slug}`} className="bg-white px-5 py-3 rounded-xl border border-border/50 hover:border-accent hover:text-accent transition-all text-xs font-black uppercase tracking-widest text-primary">
                          {landmark}
                        </Link>
                      ) : (
                        <span key={i} className="bg-white px-5 py-3 rounded-xl border border-border/50 text-xs font-black uppercase tracking-widest text-primary">
                          {landmark}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Why Customers Use Man and Van Club ── */}
              <div className="space-y-5 lg:space-y-8">
                <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Why Customers Use Man and Van Club</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <ClipboardCheck size={24} />, label: "Free To Submit" },
                    { icon: <PhoneOff size={24} />, label: "No Endless Calls" },
                    { icon: <UserCheck size={24} />, label: "Customer-Confirmed Process" },
                    { icon: <Lock size={24} />, label: "Secure Enquiry Process" },
                    { icon: <MapPin size={24} />, label: "Local Mover Coverage" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#F9F9F7] p-6 rounded-2xl border border-border/50">
                      <div className="text-accent">{item.icon}</div>
                      <span className="font-black text-primary uppercase text-xs tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── What We Check ── */}
              {data.verificationChecks && data.verificationChecks.length > 0 && (
                <div className="space-y-5 lg:space-y-8">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">What We Check</h3>
                  <p className="text-base lg:text-lg text-text-secondary font-medium leading-relaxed">
                    Applications are reviewed before movers receive access to customer enquiries. We verify businesses to help maintain a reliable network.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.verificationChecks.map((check: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                        <span className="font-bold text-primary text-sm">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Before Your Move Checklist ── */}
              {data.movingChecklist && data.movingChecklist.length > 0 && (
                <div className="space-y-5 lg:space-y-8">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Before Your Move</h3>
                  <div className="bg-[#F9F9F7] p-5 lg:p-10 rounded-2xl lg:rounded-[2.5rem] border border-border/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data.movingChecklist.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">{i + 1}</span>
                          <span className="text-sm font-medium text-text-secondary leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Popular Areas ── */}
              {data.areas && data.areas.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">{isServicePage ? (data.requestTypesHeading || "Popular Request Types") : "Popular Areas"}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                    {data.areas.map((area: string) => (
                      <div key={area} className="bg-gray-50/50 p-6 rounded-2xl text-center font-black text-primary/60 border border-border/30 hover:border-accent hover:text-accent transition-all cursor-default uppercase text-[9px] tracking-widest">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Nearby Locations — Internal Linking ── */}
              {data.nearbyLocations && data.nearbyLocations.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Nearby Locations</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.nearbyLocations.map((loc: { slug: string; name: string }) => {
                      // Use keyword-rich anchor for priority cities
                      const label = (loc.slug === "birmingham" || loc.slug === "walsall")
                        ? `Man and Van ${loc.name}`
                        : loc.name;
                      return (
                        <Link
                          key={loc.slug}
                          href={`/man-and-van-${loc.slug}`}
                          className="group flex items-center justify-between bg-[#F9F9F7] p-6 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                        >
                          <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{label}</span>
                          <ArrowUpRight size={16} className="text-primary/30 group-hover:text-accent transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Service Links — Internal Linking ── */}
              {data.serviceLinks && data.serviceLinks.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">{isServicePage ? "Compare Other Moving Services" : `Services Available in ${data.name}`}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.serviceLinks.map((service: { title: string; href: string }) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group flex items-center justify-between bg-white p-6 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                      >
                        <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{service.title}</span>
                        <ArrowUpRight size={16} className="text-primary/30 group-hover:text-accent transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Popular Locations (Service Pages) ── */}
              {isServicePage && data.popularLocations && data.popularLocations.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">Popular Locations</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">Submit a free move request for any of these areas. One verified mover reviews your details before quoting.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.popularLocations.map((loc: { name: string; href: string }) => {
                      // Use keyword-rich anchor for priority cities
                      const label = (loc.href === "/man-and-van-birmingham" || loc.href === "/man-and-van-walsall")
                        ? `Man and Van ${loc.name}`
                        : loc.name;
                      return (
                        <Link
                          key={loc.href}
                          href={loc.href}
                          className="group flex items-center justify-between bg-[#F9F9F7] p-5 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                        >
                          <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{label}</span>
                          <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── County/Region Hub — Internal Linking ── */}
              {data.countyHub && (
                <div className="space-y-10">
                  <Link
                    href={`/man-and-van-${data.countyHub.slug}`}
                    className="group flex items-center justify-between bg-primary text-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                  >
                    <span className="font-black uppercase text-[11px] tracking-widest group-hover:text-accent transition-colors">Man and Van {data.countyHub.name} — Full Area Guide</span>
                    <ArrowUpRight size={18} className="text-white/60 group-hover:text-accent transition-colors" />
                  </Link>
                </div>
              )}

              {/* ── Region Cities ── */}
              {data.regionCities && data.regionCities.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">{data.region ? `More Locations in ${data.region}` : "More Nearby Locations"}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.regionCities.slice(0, 12).map((city: { name: string; slug: string }) => {
                      // Use keyword-rich anchor for priority cities
                      const label = (city.slug === "birmingham" || city.slug === "walsall")
                        ? `Man and Van ${city.name}`
                        : city.name;
                      return (
                        <Link
                          key={city.slug}
                          href={`/man-and-van-${city.slug}`}
                          className="group flex items-center justify-between bg-[#F9F9F7] p-5 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                        >
                          <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{label}</span>
                          <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-32">
               <div className="bg-[#F9F9F7] p-10 rounded-[2.5rem] border border-border/50 space-y-6">
                  <ShieldCheck size={28} className="text-accent" />
                  <p className="text-primary font-black uppercase tracking-tighter leading-tight text-sm">
                    Verified Mover Marketplace
                  </p>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">Mover applications are checked before they can access customer enquiries. Customer details stay private until a quote is accepted and booked.</p>
               </div>

               <div className="bg-white p-10 rounded-[2.5rem] border border-border/50 space-y-6">
                  <MapPin size={28} className="text-accent" />
                  <p className="text-primary font-black uppercase tracking-tighter leading-tight text-sm">
                    UK-Wide Coverage
                  </p>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">
                    {isServicePage
                      ? `We help customers submit free ${data.name.toLowerCase()} requests across the UK.`
                      : `Customers can submit free move requests in ${data.name} and nearby areas for verified movers to review.`}
                  </p>
               </div>

               {/* Phone CTA */}
               <a
                  href="tel:01217511269"
                  className="flex items-center gap-4 bg-primary text-white p-8 rounded-[2rem] hover:bg-primary/90 transition-colors group"
               >
                  <div className="bg-accent rounded-full p-3 group-hover:scale-110 transition-transform">
                     <Phone size={22} className="text-white" />
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-white/70">Prefer to talk?</p>
                     <p className="text-lg font-black tracking-tight">0121 751 1269</p>
                  </div>
               </a>

               {/* Yell Profile Link */}
               <a
                  href="https://www.yell.com/biz/man-and-van-club-walsall-11043227/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#F9F9F7] p-8 rounded-[2rem] border border-border/50 hover:border-accent hover:shadow-md transition-all group"
               >
                  <div className="bg-accent/10 rounded-full p-3 group-hover:scale-110 transition-transform">
                     <Star size={22} className="text-accent" />
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-primary/50">See us on</p>
                     <p className="text-lg font-black tracking-tight text-primary">Yell.com</p>
                  </div>
                  <ArrowUpRight size={16} className="text-primary/30 ml-auto group-hover:text-accent transition-colors" />
               </a>

               {/* Trustpilot Profile Link */}
               <a
                  href="https://uk.trustpilot.com/review/manandvanclub.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#F9F9F7] p-8 rounded-[2rem] border border-border/50 hover:border-accent hover:shadow-md transition-all group"
               >
                  <div className="bg-green-500/10 rounded-full p-3 group-hover:scale-110 transition-transform">
                     <Star size={22} className="text-green-500" />
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-primary/50">See us on</p>
                     <p className="text-lg font-black tracking-tight text-primary">Trustpilot</p>
                  </div>
                  <ArrowUpRight size={16} className="text-primary/30 ml-auto group-hover:text-accent transition-colors" />
               </a>

               {/* Reviews Summary */}
               <div className="bg-[#F9F9F7] p-8 rounded-[2rem] border border-border/50 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                     {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={20} className="text-accent fill-accent" />
                     ))}
                  </div>
                  <p className="text-2xl font-black text-primary">5.0 / 5.0</p>
                  <p className="text-xs font-bold text-primary/50 uppercase tracking-widest mt-1">11 verified reviews</p>
               </div>
            </aside>

          </div>

          {/* FAQ Section */}
          {safeFaqItems.length > 0 && (
            <div className="pt-24 lg:pt-32 mt-24 lg:mt-32 border-t border-border">
              <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
                 <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Help Centre</div>
                 <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">Your Questions Answered</h2>
              </div>
              <FAQ items={faqItems} />
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#F9F9F7] py-24 lg:py-32 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="space-y-5 lg:space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
              {isServicePage
                ? `Need ${data.name}?`
                : `Looking For A Mover In ${data.name}?`}
            </h2>
            <p className="text-xl text-text-secondary font-medium leading-relaxed">
              {isServicePage
                ? (data.bottomCtaText || `Tell us what you need. A verified mover can review your request and send quote options before you decide whether to book.`)
                : "Tell us about your move. A verified mover can review your request and send quote options before you decide whether to book."}
            </p>
            <Link href="#quote-form" className="btn-orange px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-105 inline-flex items-center gap-3 text-lg">
              Start Your Move Request <ArrowRight size={24} />
            </Link>
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
    </div>
  );
}
