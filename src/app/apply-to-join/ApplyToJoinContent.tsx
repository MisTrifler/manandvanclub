"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyToJoinContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      coverageArea: formData.get("coverageArea"),
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center space-y-8 border border-border"
        >
          <div className="bg-success/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-success">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight text-primary">Application Sent</h2>
            <p className="text-text-secondary font-medium leading-relaxed">
              Thank you for applying to Man and Van Club. To complete your application, please email your Goods in Transit and Public Liability insurance documents to{" "}
              <a href="mailto:support@manandvanclub.co.uk" className="text-accent font-bold">support@manandvanclub.co.uk</a>.
            </p>
            <p className="text-text-secondary font-medium leading-relaxed">
              We will review your application once your insurance documents have been received.
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
        <Link href="/for-businesses" className="inline-flex items-center gap-2 text-primary/40 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Information
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-8">
            <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">
              Why Join <span className="text-accent italic">Man and Van Club?</span>
            </h1>
            <p className="text-text-secondary font-medium leading-relaxed">
              Join a network built around customer-confirmed move requests. What's in it for you?
            </p>

            <div className="space-y-4">
              {[
                { icon: <Zap size={16} className="text-accent" />, text: "Customer-confirmed booking opportunities" },
                { icon: <ShieldCheck size={16} className="text-accent" />, text: "No competing against multiple movers" },
                { icon: <Zap size={16} className="text-accent" />, text: "Direct customer contact" },
                { icon: <ShieldCheck size={16} className="text-accent" />, text: "Choose your own service area" },
                { icon: <Zap size={16} className="text-accent" />, text: "Grow your business on your terms" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-primary/60 font-black uppercase tracking-widest text-[10px]">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2 pb-2 border-b border-border">
                  <h2 className="text-3xl font-black uppercase tracking-tight text-primary leading-none">Apply to Join</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
                    Takes under 60 seconds to complete
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Company Name</label>
                  <input name="companyName" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="e.g. Swift Moves Ltd" required />
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
                  <input name="email" type="email" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all" placeholder="driver@company.co.uk" required />
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
                      <option>England-wide</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Which Jobs Do You Usually Prefer?</label>
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
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">How many jobs can you typically handle per week?</label>
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
                        I understand that my application cannot be approved until I email valid Goods in Transit and Public Liability insurance documents to support@manandvanclub.co.uk.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/30 text-center">
                    Insurance is required before approval. You must email valid Goods in Transit and Public Liability insurance documents to support@manandvanclub.co.uk before your application can be approved.
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
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Submit Application →"}
                </button>
              </form>
            </div>

            {/* What Happens Next */}
            <div className="mt-16 space-y-8">
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight text-center">What Happens Next</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: "01", title: "We review your application", desc: "Our team checks your details within 24 hours." },
                  { step: "02", title: "Email your insurance documents", desc: "Email your Goods in Transit and Public Liability insurance documents to support@manandvanclub.co.uk. We check them manually." },
                  { step: "03", title: "Receive Approval & Platform Access", desc: "Once your insurance is verified, approved movers receive login details and access to available customer enquiries." },
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
