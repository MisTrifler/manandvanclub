"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Zap, ClipboardCheck, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyToJoinContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const successPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!submitted) return;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      successPanelRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName"),
      businessType: formData.get("businessType"),
      companyNumber: formData.get("companyNumber"),
      contactName: formData.get("contactName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      coverageArea: formData.get("coverageArea"),
      townsCovered: formData.get("townsCovered"),
      radius: formData.get("radius"),
      capacity: formData.get("capacity"),
      serviceHouse: formData.get("serviceHouse") === "on",
      serviceFlat: formData.get("serviceFlat") === "on",
      serviceStudent: formData.get("serviceStudent") === "on",
      serviceFurniture: formData.get("serviceFurniture") === "on",
      serviceOffice: formData.get("serviceOffice") === "on",
      serviceSingle: formData.get("serviceSingle") === "on",
      serviceLongDistance: formData.get("serviceLongDistance") === "on",
      hasInsurance: formData.get("insurance") === "on",
    };

    try {
      const res = await fetch("/api/driver-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center p-4">
        <motion.div
          ref={successPanelRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center space-y-8 border border-border outline-none"
        >
          <div className="bg-success/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-success">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight text-primary">Application Sent</h2>
            <p className="text-text-secondary font-medium leading-relaxed">
              Thank you for applying to Man and Van Club. To complete your application, please email your insurance documents to{" "}
              <a href="mailto:partners@manandvanclub.co.uk" className="text-accent font-bold">partners@manandvanclub.co.uk</a>.
            </p>
            <p className="text-text-secondary font-medium leading-relaxed">
              We will review your application once your insurance documents have been received. If approved, we will send your pre-filled agreement for signature or email acceptance.
            </p>
          </div>
          <Link href="/" className="btn-orange w-full block py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-accent/20">
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/why-join" className="inline-flex items-center gap-2 text-primary/40 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Mover Overview
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em]">
              <Smartphone size={14} /> Easy sign-up
            </div>
            <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">
              Apply in minutes. <span className="text-accent italic">Documents can follow.</span>
            </h1>
            <p className="text-text-secondary font-medium leading-relaxed">
              Complete the first step with your business details, main service area and preferred job types. We only approve movers after insurance documents are checked.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Zap size={16} className="text-accent" />, text: "Short online form" },
                { icon: <ShieldCheck size={16} className="text-accent" />, text: "Manual approval" },
                { icon: <ClipboardCheck size={16} className="text-accent" />, text: "Email insurance after applying" },
                { icon: <Zap size={16} className="text-accent" />, text: "No monthly subscription" },
                { icon: <ShieldCheck size={16} className="text-accent" />, text: "Quote suitable enquiries" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-primary/60 font-black uppercase tracking-widest text-[10px]">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>

            <div className="bg-white border border-border rounded-3xl p-6 space-y-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40">Before you start</p>
              <ul className="space-y-3 text-sm text-text-secondary font-bold">
                <li className="flex gap-3"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Business or trading name</li>
                <li className="flex gap-3"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Phone, email and main service area</li>
                <li className="flex gap-3"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Goods in Transit and Public Liability documents can be emailed after</li>
              </ul>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2 pb-2 border-b border-border">
                  <h2 className="text-3xl font-black uppercase tracking-tight text-primary leading-none">Apply to Join</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
                    First step takes a few minutes
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Business / Trading Name</label>
                  <input name="companyName" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="Your business or trading name" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Business Type</label>
                    <select name="businessType" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all cursor-pointer" required>
                      <option value="">Select business type</option>
                      <option>Limited company</option>
                      <option>Sole trader</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Company Number <span className="normal-case tracking-normal font-bold text-primary/30">(if limited)</span></label>
                    <input name="companyNumber" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="e.g. 12345678 or N/A" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Contact Name</label>
                    <input name="contactName" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="Your Name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Mobile Number</label>
                    <input name="phone" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="07XXX XXXXXX" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                  <input name="email" type="email" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="you@example.com" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Main Service Area</label>
                    <input name="coverageArea" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="e.g. Birmingham" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Work Radius</label>
                    <select name="radius" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all cursor-pointer">
                      <option>10 miles</option>
                      <option>25 miles</option>
                      <option>50 miles</option>
                      <option>100 miles</option>
                      <option>Nationwide</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Towns / Postcodes Covered</label>
                  <textarea name="townsCovered" rows={3} className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all resize-none" placeholder="e.g. Walsall, Brownhills, Birmingham, WS and B postcodes" required />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Preferred Job Types</label>
                  <p className="text-[10px] text-text-secondary font-medium ml-1 mb-1">This helps us understand your business, but approved movers may see all suitable jobs in their covered area.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-5 rounded-2xl border border-transparent">
                    {[
                      { name: "serviceHouse", label: "House Removals" },
                      { name: "serviceFlat", label: "Flat Moves" },
                      { name: "serviceStudent", label: "Student Moves" },
                      { name: "serviceFurniture", label: "Furniture Collection" },
                      { name: "serviceOffice", label: "Office Moves" },
                      { name: "serviceSingle", label: "Single Item Delivery" },
                      { name: "serviceLongDistance", label: "Long Distance Moves" },
                    ].map((service) => (
                      <label key={service.name} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name={service.name} className="h-5 w-5 accent-accent rounded cursor-pointer" />
                        <span className="text-sm font-bold text-primary/80">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Typical weekly capacity</label>
                  <select name="capacity" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all cursor-pointer" required>
                    <option value="">Select capacity</option>
                    <option>1–5</option>
                    <option>6–10</option>
                    <option>11–20</option>
                    <option>20+</option>
                  </select>
                </div>

                <div className="bg-[#F9F9F7] p-6 rounded-2xl border border-border">
                  <div className="flex items-start gap-4">
                    <input name="insurance" type="checkbox" className="mt-1.5 h-5 w-5 accent-accent rounded cursor-pointer" required />
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase tracking-tight text-primary">Insurance Confirmation</p>
                      <p className="text-[10px] text-text-secondary font-medium leading-relaxed uppercase tracking-wider">
                        I understand that my application cannot be approved until I email valid insurance documents to partners@manandvanclub.co.uk, including hire-or-reward/commercial vehicle cover where applicable.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/30 text-center">
                    Insurance is required before approval. You must email valid insurance documents to partners@manandvanclub.co.uk before your application can be approved.
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent/70 text-center">
                    We carefully review every application before granting access to customer enquiries.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-widest">
                    Error: {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-orange w-full py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 text-lg shadow-2xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Send application →"}
                </button>
              </form>
            </div>

            {/* What Happens Next */}
            <div className="mt-16 space-y-8">
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight text-center">What Happens Next</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: "01", title: "Submit the short form", desc: "Send your basic business, contact and service-area details." },
                  { step: "02", title: "Email your insurance", desc: "Send insurance documents to partners@manandvanclub.co.uk. We check them before approval." },
                  { step: "03", title: "Get approved access", desc: "Once checked, approved movers can access suitable customer enquiries as they become available." },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-border/50 space-y-4 shadow-sm">
                    <div className="text-accent font-black text-xl italic tracking-tighter">Step {item.step}</div>
                    <h4 className="font-black text-primary uppercase tracking-tight text-sm">{item.title}</h4>
                    <p className="text-text-secondary font-medium text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
