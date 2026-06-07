"use client";
import { ShieldCheck, Star, Users, Globe, ArrowUpRight, Phone, Mail, Zap, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.manandvanclub.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.manandvanclub.co.uk/about" }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-32 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
              Our Story
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
              Reinventing <span className="text-accent">Local</span> Matching
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
              We've built the UK's most transparent network for local moving connections. No bidding wars, just quality introductions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why We Built The Network */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/2 space-y-12">
               <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight leading-none">Why We Built The Network</h2>
                  <p className="text-xl text-text-secondary font-medium leading-relaxed">
                    Moving is one of life's most stressful events. We found that the process of finding a reliable "man with a van" was often confusing, with opaque pricing and a total lack of trust. 
                  </p>
                  <p className="text-xl text-text-secondary font-medium leading-relaxed">
                    We created Man & Van Club to change that. Our mission is to provide transparency, reliability, and ease of use to both customers and professional movers.
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                  {[
                    { t: "Verified", d: "ID and phone vetting for every mover joining the platform.", i: <ShieldCheck /> },
                    { t: "Exclusive", d: "1-to-1 matching for premium service quality.", i: <Star /> },
                    { t: "UK-Wide", d: "Connecting households and businesses in major cities.", i: <Globe /> },
                    { t: "Transparent", d: "Clear marketplace model for customers and movers.", i: <Users /> }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border/50 space-y-4 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                       <div className="text-accent">{item.i}</div>
                       <h3 className="font-black text-primary uppercase tracking-widest text-xs">{item.t}</h3>
                       <p className="text-sm text-text-secondary font-medium leading-relaxed">{item.d}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 w-full sticky top-40">
               <div className="relative group">
                  <div className="absolute -inset-4 bg-accent/5 rounded-[4rem] blur-3xl group-hover:bg-accent/10 transition-all duration-700" />
                  <div className="relative aspect-square bg-gray-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=1000" alt="Moving Team" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-32 bg-primary text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full -mr-48 -mt-48" />
         <div className="container mx-auto px-4 max-w-4xl text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Our Mission</h2>
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
              Man & Van Club exists because finding a trustworthy local mover shouldn't be a lottery. We built an exclusive introduction marketplace that gives customers one verified professional — not a flood of competing quotes — and gives movers quality leads without the race to the bottom on price.
            </p>
         </div>
      </section>

      {/* How We Verify Movers */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">How We Verify Movers</h2>
             <p className="text-xl text-text-secondary font-medium">To maintain the highest standards in our network.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { t: "Application Review", d: "We manually check company names, contact details, and coverage areas of every applicant.", i: "01" },
               { t: "Insurance Verification", d: "Every mover must provide proof of goods-in-transit and public liability insurance.", i: "02" },
               { t: "Phone Vetting", d: "A member of our team speaks to every mover before they're approved on the platform.", i: "03" }
             ].map((step, i) => (
               <div key={i} className="space-y-6 relative">
                 <div className="text-8xl font-black text-primary/5 absolute -top-10 -left-4 select-none">{step.i}</div>
                 <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{step.t}</h3>
                    <p className="text-text-secondary font-medium leading-relaxed">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { l: "UK-Wide Coverage", v: "100%", i: <Globe size={24}/> },
              { l: "Submission Process", v: "60s", i: <Zap size={24}/> },
              { l: "Mover Matching", v: "1-to-1", i: <Users size={24}/> },
              { l: "Verification", v: "24h", i: <ShieldCheck size={24}/> }
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="text-accent flex justify-center mb-2">{s.i}</div>
                <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter">{s.v}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-border flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 space-y-8">
                 <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Contact Us</h2>
                 <div className="space-y-6">
                    <a href="tel:07943617386" className="flex items-center gap-4 group">
                       <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                          <Phone size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Call Us</p>
                          <p className="font-black text-primary text-lg">07943 617386</p>
                       </div>
                    </a>
                    <a href="mailto:support@manandvanclub.co.uk" className="flex items-center gap-4 group">
                       <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                          <Mail size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email Us</p>
                          <p className="font-black text-primary text-lg">support@manandvanclub.co.uk</p>
                       </div>
                    </a>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
                          <Clock size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Working Hours</p>
                          <p className="font-black text-primary text-lg uppercase tracking-tight">Mon–Sun, 8am–10pm</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="md:w-1/2 space-y-10">
                 <p className="text-text-secondary font-medium leading-relaxed">
                    Have questions about our network or your move? Our team is available 7 days a week to provide support and ensure you have the best moving experience.
                 </p>
                 <Link href="/#quote-form" className="btn-orange w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3">
                    Get Started <ArrowUpRight size={18} />
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
