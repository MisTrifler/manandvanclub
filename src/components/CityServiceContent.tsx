"use client";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import { MapPin, Star, CheckCircle2, ShieldCheck, Clock, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CityServiceContent({ data, faqItems }: { data: any, faqItems: any[] }) {
  const currentUrl = `https://www.manandvanclub.co.uk/${data.slug || ''}`;
  
  const faqSchema = {
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

  const breadcrumbSchema = {
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
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-6 lg:space-y-10"
            >
              <div className="inline-flex items-center gap-2 lg:gap-3 bg-accent/10 text-accent px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
                <MapPin size={14} />
                {data.badge ? data.badge : `Local Experts in ${data.name}`}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
                {data.h1 ? data.h1 : (
                  <>
                    Man and Van <span className="text-accent">{data.name}</span>
                  </>
                )}
              </h1>
              <p className="text-lg lg:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">
                {data.intro}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-6">
                <div className="space-y-1">
                  <span className="text-accent font-black text-5xl tracking-tighter leading-none">Verified</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Local Network</p>
                </div>
                <div className="space-y-1">
                  <span className="text-accent font-black text-5xl tracking-tighter leading-none">£50+</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">From Local</p>
                </div>
                <div className="space-y-1">
                  <span className="text-accent font-black text-5xl tracking-tighter leading-none">Checked</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Security Status</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-xl relative z-20"
            >
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
            <div className="lg:col-span-2 space-y-20">
              <div className="space-y-8">
                 <h2 className="text-5xl font-black text-primary uppercase tracking-tight leading-none">
                   {data.h1 ? data.name + " Made Simple" : `Moving in ${data.name} Made Simple`}
                 </h2>
                 <p className="text-xl text-text-secondary font-medium leading-relaxed">{data.knowledge}</p>
                 <p className="text-xl text-text-secondary font-medium leading-relaxed">
                   Whether you are moving a single item from Facebook Marketplace or a large family home, our network makes it easy to get exclusively matched with a local professional in seconds. We take the stress out of moving by doing the vetting for you.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { t: "Fixed & Hourly", d: "Choose the pricing model that works best for your budget.", i: <Clock size={32} /> },
                  { t: "Fully Vetted", d: "Every driver is reviewed and verified by our team.", i: <ShieldCheck size={32} /> },
                  { t: "Full UK Insurance", d: "Your items are covered during transit as standard.", i: <CheckCircle2 size={32} /> },
                  { t: "Local Knowledge", d: "Our movers know every shortcut and parking quirk.", i: <Users size={32} /> }
                ].map(f => (
                  <div key={f.t} className="bg-[#F9F9F7] p-10 rounded-[2.5rem] border border-border/50 space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="text-accent group-hover:scale-110 transition-transform origin-left">{f.i}</div>
                    <div className="space-y-2">
                      <h3 className="font-black text-xl text-primary uppercase tracking-tight">{f.t}</h3>
                      <p className="text-text-secondary font-medium text-sm leading-relaxed">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <h3 className="text-4xl font-black text-primary uppercase tracking-tight">Popular Areas We Cover</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.areas.map((area: string) => (
                    <div key={area} className="bg-gray-50 p-6 rounded-2xl text-center font-black text-primary border border-border/50 hover:bg-accent hover:text-white hover:shadow-xl transition-all cursor-default uppercase text-[10px] tracking-widest">
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-10 sticky top-40">
               <div className="bg-primary p-12 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -mr-16 -mt-16" />
                 <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Ready to start?</h3>
                 <p className="text-gray-400 font-medium leading-relaxed">It takes less than 60 seconds to find the best local movers in {data.name}.</p>
                 <Link href="#quote-form" className="btn-orange w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    Get Matched Now <ArrowUpRight size={18} />
                 </Link>
               </div>

               <div className="bg-[#F9F9F7] p-10 rounded-[3rem] border border-border/50 space-y-6">
                  <div className="flex gap-1 text-accent">
                    <ShieldCheck size={24} />
                  </div>
                  <p className="text-primary font-black uppercase tracking-tighter leading-tight">
                    Verified Move Request Platform
                  </p>
                  <p className="text-sm text-text-secondary font-medium">We manually check move requests to ensure a high quality marketplace for both customers and movers.</p>
               </div>
            </aside>
          </div>

          <div className="pt-32 mt-32 border-t border-border">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
               <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Help Centre</div>
               <h2 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">Your Questions Answered</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
