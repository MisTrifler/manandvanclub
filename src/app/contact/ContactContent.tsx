"use client";

import { useState } from "react";
import { Mail, Clock, MapPin, ArrowUpRight, Phone, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Support Centre
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter">Contact Us</h1>
          <p className="text-xl text-text-secondary mt-4 max-w-md mx-auto">Have a question about your move or want to join as a mover? We're here to help.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />

              {submitted ? (
                <div className="text-center py-16 space-y-6">
                  <div className="bg-success/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-success">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight text-primary">Message Sent</h2>
                  <p className="text-text-secondary font-medium text-lg max-w-md mx-auto">
                    Thank you for contacting us. Our team will get back to you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Your Name</label>
                      <input name="name" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                      <input name="email" type="email" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="john@email.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Subject</label>
                    <select name="subject" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all cursor-pointer">
                      <option>Customer Enquiry</option>
                      <option>Business / Driver Enquiry</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Message</label>
                    <textarea name="message" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all h-48" placeholder="Tell us more about your enquiry..." required />
                  </div>

                  {error && <div className="text-red-500 text-sm font-bold">{error}</div>}

                  <button type="submit" disabled={isSubmitting} className="btn-orange w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 text-lg shadow-2xl shadow-accent/20 transition-all disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowUpRight size={22} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-6">
            {[
              { icon: <Phone size={24} />, title: "Call Us", value: "07943 617386", href: "tel:07943617386" },
              { icon: <Mail size={24} />, title: "Email Us", value: "support@manandvanclub.co.uk", href: "mailto:support@manandvanclub.co.uk" },
              { icon: <Clock size={24} />, title: "Response Time", value: "Within 2 business hours" },
              { icon: <MapPin size={24} />, title: "Coverage", value: "UK-Wide" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
                <div className="text-accent mb-4">{item.icon}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">{item.title}</p>
                {item.href ? (
                  <a href={item.href} className="text-lg font-black text-primary hover:text-accent transition-colors break-all">{item.value}</a>
                ) : (
                  <p className="text-lg font-black text-primary">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
