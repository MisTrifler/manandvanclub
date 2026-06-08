"use client";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import { MapPin, Star, CheckCircle2, ShieldCheck, Clock, Users, ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function CityServiceContent({ data, faqItems }: { data: any, faqItems: any[] }) {
  const currentUrl = `https://www.manandvanclub.co.uk/${data.slug || ''}`;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  const faqSchema = data.faqSchema || {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const breadcrumbSchema = data.breadcrumbSchema || {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.manandvanclub.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": data.name,
        "item": currentUrl
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      {data.localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.localBusinessSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero Section (Optimized) ── */}
      <section className="bg-[#F9F9F7] py-16 lg:py-0 lg:h-[calc(100vh-100px)] flex items-center border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:w-1/2 space-y-6 lg:space-y-8"
            >
              <div className="inline-flex items-center gap-2 lg:gap-3 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20">
                <MapPin size={12} />
                {data.badge ? data.badge : `Local Experts in ${data.name}`}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
                {data.h1 ? data.h1 : (
                  <>
                    Man and Van <span className="text-accent italic">{data.name}</span>
                  </>
                )}
              </h1>

              <p className="text-base lg:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                {data.intro}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                {[
                  { v: "Verified", l: "Network" },
                  { v: "£50+", l: "From Local" },
                  { v: "Checked", l: "Movers" }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-accent font-black text-3xl lg:text-4xl tracking-tighter leading-none">{item.v}</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary/30">{item.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-lg relative z-20"
            >
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">

            <div className="lg:col-span-2 space-y-16 lg:space-y-24">
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight leading-none">
                   {data.h1 ? data.name + " Made Simple" : `Moving in ${data.name} Made Simple`}
                 </h2>
                 <p className="text-lg lg:text-xl text-text-secondary font-medium leading-relaxed">{data.knowledge}</p>
                 <div className="bg-primary/5 p-8 lg:p-12 rounded-[2.5rem] border border-border/40">
                   <p className="text-lg lg:text-xl text-primary font-medium leading-relaxed italic">
                     "Whether you are moving a single item or a full house relocation, our network makes it easy to get exclusively matched with a local professional in seconds. We handle the vetting so you can focus on your move."
                   </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  { t: "Fixed & Hourly", d: "Choose the pricing model that works best for your budget.", i: <Clock size={28} /> },
                  { t: "Fully Vetted", d: "Every driver is reviewed and verified by our team.", i: <ShieldCheck size={28} /> },
                  { t: "Full Insurance", d: "Your items are covered during transit as standard.", i: <CheckCircle2 size={28} /> },
                  { t: "Local Knowledge", d: "Our movers know every shortcut and parking quirk.", i: <Users size={28} /> }
                ].map(f => (
                  <div key={f.t} className="bg-[#F9F9F7] p-10 rounded-[2.5rem] border border-border/50 space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="text-accent group-hover:scale-110 transition-transform origin-left">{f.i}</div>
                    <div className="space-y-2">
                      <h3 className="font-black text-xl text-primary uppercase tracking-tight leading-tight">{f.t}</h3>
                      <p className="text-text-secondary font-medium text-sm leading-relaxed">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card — light background for readability */}
              <div className="bg-white p-12 rounded-[3.5rem] text-primary space-y-8 relative overflow-hidden shadow-2xl border border-border">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16" />
                 <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none italic">Ready to start?</h3>
                 <p className="text-text-secondary font-medium text-lg leading-relaxed">It takes less than 60 seconds to find the best local movers in {data.name}.</p>
                 <Link href="#quote-form" className="btn-orange w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 hover:scale-105 transition-all">
                    Get Matched Now <ArrowUpRight size={22} />
                 </Link>
                 <div className="flex items-center justify-center gap-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
                   <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-accent"/> Fully Insured</span>
                   <span className="flex items-center gap-1.5"><Zap size={14} className="text-accent"/> 1-to-1 Match</span>
                 </div>
               </div>

              <div className="space-y-10">
                <h3 className="text-3xl font-black text-primary uppercase tracking-tight">Popular Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                  {data.areas.map((area: string) => (
                    <div key={area} className="bg-gray-50/50 p-6 rounded-2xl text-center font-black text-primary/60 border border-border/30 hover:border-accent hover:text-accent transition-all cursor-default uppercase text-[9px] tracking-widest">
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Locations — Internal Linking */}
              {data.nearbyLocations && data.nearbyLocations.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-3xl font-black text-primary uppercase tracking-tight">Nearby Areas We Cover</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.nearbyLocations.map((loc: { slug: string; name: string }) => (
                      <Link
                        key={loc.slug}
                        href={`/man-and-van-${loc.slug}`}
                        className="group flex items-center justify-between bg-[#F9F9F7] p-6 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                      >
                        <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{loc.name}</span>
                        <ArrowUpRight size={16} className="text-primary/30 group-hover:text-accent transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Links — Internal Linking */}
              {data.serviceLinks && data.serviceLinks.length > 0 && (
                <div className="space-y-10">
                  <h3 className="text-3xl font-black text-primary uppercase tracking-tight">Services in {data.name}</h3>
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
            </div>

            {/* Vetting info remains in sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-32">
               <div className="bg-[#F9F9F7] p-10 rounded-[2.5rem] border border-border/50 space-y-6">
                  <ShieldCheck size={28} className="text-accent" />
                  <p className="text-primary font-black uppercase tracking-tighter leading-tight text-sm">
                    Verified Move Platform
                  </p>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">We manually check move requests to ensure a high quality marketplace for both customers and movers.</p>
               </div>

               {/* Coverage info */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-border/50 space-y-6">
                  <MapPin size={28} className="text-accent" />
                  <p className="text-primary font-black uppercase tracking-tighter leading-tight text-sm">
                    UK-Wide Coverage
                  </p>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">We cover {data.name} and surrounding areas with a network of vetted local movers ready to help.</p>
               </div>
            </aside>

          </div>

          {/* FAQ Section */}
          <div className="pt-24 lg:pt-32 mt-24 lg:mt-32 border-t border-border">
            <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
               <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Help Centre</div>
               <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">Your Questions Answered</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
