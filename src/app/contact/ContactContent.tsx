"use client";
import { Mail, Clock, MapPin, ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.manandvanclub.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.manandvanclub.co.uk/contact" }
    ]
  };

  return (
    <div className="bg-[#F9F9F7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="bg-primary text-white py-32 overflow-hidden relative border-b border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-white/20 h-32 w-full" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="inline-block bg-accent/20 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              Support
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Get In <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Have a question about your move or want to join as a mover? Our team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Form */}
            <div className="lg:w-2/3">
              <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />
                <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-12">Send A Message</h2>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Your Name</label>
                      <input className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="e.g. John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                      <input type="email" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="john@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Subject</label>
                    <select className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner appearance-none cursor-pointer">
                      <option>Customer Enquiry</option>
                      <option>Business/Driver Enquiry</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Message</label>
                    <textarea className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all h-48 shadow-inner" placeholder="Tell us more about your enquiry..." required></textarea>
                  </div>
                  <button type="button" className="btn-orange px-14 py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-105 inline-flex items-center gap-3">
                    Send Message <ArrowUpRight size={24} />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {[
                { t: "Call Us", d: "07943 617386", i: <Phone size={32} />, href: "tel:07943617386" },
                { t: "Email Us", d: "support@manandvanclub.co.uk", i: <Mail size={32} />, href: "mailto:support@manandvanclub.co.uk" },
                { t: "Response Time", d: "Within 2 business hours", i: <Clock size={32} /> },
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl transition-all group">
                   <div className="text-accent mb-6 bg-accent/5 w-fit p-4 rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors">{item.i}</div>
                   <h3 className="font-black text-primary uppercase tracking-widest text-xs mb-2">{item.t}</h3>
                   {item.href ? (
                     <a href={item.href} className="text-lg font-black text-primary hover:text-accent transition-colors tracking-tight">{item.d}</a>
                   ) : (
                     <p className="text-lg font-black text-primary/80 tracking-tight">{item.d}</p>
                   )}
                </div>
              ))}

              <div className="bg-primary p-12 rounded-[3rem] text-white space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -mr-16 -mt-16" />
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Need Help Faster?</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">Check our detailed process guide to see how we verify and match you with movers.</p>
                <Link href="/how-it-works" className="text-accent font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:gap-4 transition-all">How It Works <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
