"use client";
import { Mail, Clock, MapPin, ArrowUpRight, Phone, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.manandvanclub.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.manandvanclub.co.uk/contact" }
    ]
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message. Please try again.");

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F9F9F7] min-h-screen pt-20 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
            Support Centre
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none">
            Contact <span className="text-accent italic">Us</span>
          </h1>
          <p className="text-lg text-text-secondary font-medium max-w-xl leading-relaxed">
            Have a question about your move or want to join as a mover? Our team is ready to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />
                
                {submitted ? (
                  <div className="text-center py-20 space-y-6">
                    <div className="bg-success/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-success">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-primary">Message Sent</h2>
                    <p className="text-text-secondary font-medium text-lg leading-relaxed max-w-md mx-auto">
                      Thank you for contacting us. Our team has received your message and will get back to you shortly.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="text-accent font-bold hover:underline uppercase tracking-widest text-[10px]">Send another message</button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-12">Send A Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Your Name</label>
                          <input name="name" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="e.g. John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                          <input name="email" type="email" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="john@email.com" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Subject</label>
                        <select name="subject" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner appearance-none cursor-pointer">
                          <option>Customer Enquiry</option>
                          <option>Business/Driver Enquiry</option>
                          <option>Technical Support</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Message</label>
                        <textarea name="message" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all h-48 shadow-inner" placeholder="Tell us more about your enquiry..." required></textarea>
                      </div>
                      
                      {error && <p className="text-red-500 text-xs font-bold uppercase">{error}</p>}

                      <button type="submit" disabled={isSubmitting} className="btn-orange px-14 py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-105 inline-flex items-center gap-3 disabled:opacity-50">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowUpRight size={24} /></>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {[
                { t: "Email Us", d: "support@manandvanclub.co.uk", i: <Mail size={32} />, href: "mailto:support@manandvanclub.co.uk" },
                { t: "Response Time", d: "Within 2 business hours", i: <Clock size={32} /> },
                { t: "Location", d: "UK-Wide Coverage", i: <MapPin size={32} /> }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl transition-all group">
                   <div className="text-accent mb-6 bg-accent/5 w-fit p-4 rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors">{item.i}</div>
                   <h3 className="font-black text-primary uppercase tracking-widest text-xs mb-2">{item.t}</h3>
                   {item.href ? (
                     <a href={item.href} className="text-lg font-black text-primary hover:text-accent transition-colors tracking-tight break-all">{item.d}</a>
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
      </div>
    </div>
  );
}
