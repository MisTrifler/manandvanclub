"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyToJoinContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.manandvanclub.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "For Businesses", "item": "https://www.manandvanclub.co.uk/for-businesses" },
      { "@type": "ListItem", "position": 3, "name": "Apply to Join", "item": "https://www.manandvanclub.co.uk/apply-to-join" }
    ]
  };

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
      hasInsurance: formData.get("insurance") === "on",
    };

    try {
      const res = await fetch("/api/driver-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        const errorMsg = result.details ? `${result.error}: ${result.details}` : (result.error || "Submission failed");
        throw new Error(errorMsg);
      }

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
              Thanks for applying to Man and Van Club. Our team will review your insurance and details. You'll hear from us within 24-48 hours.
            </p>
          </div>
                  <Link href="/" className="btn-orange w-full block py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-accent/20">
            Return Home
          </Link>
          <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest opacity-40">
            © 2026 Man and Van Club
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/for-businesses" className="inline-flex items-center gap-2 text-primary/40 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Information
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-8">
            <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">Mover <span className="text-accent italic">Application</span></h1>
            <p className="text-text-secondary font-medium leading-relaxed">Join our England-focused moving network. We only accept verified, insured professionals.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary/60 font-black uppercase tracking-widest text-[10px]">
                <ShieldCheck size={16} className="text-accent" /> Verified Status
              </div>
              <div className="flex items-center gap-3 text-primary/60 font-black uppercase tracking-widest text-[10px]">
                <Zap size={16} className="text-accent" /> Exclusive Match
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-border relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />
               
               <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Company Name</label>
                   <input name="companyName" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="e.g. Swift Moves Ltd" required />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Contact Name</label>
                     <input name="contactName" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="Your Name" required />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Mobile Number</label>
                     <input name="phone" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="07XXX XXXXXX" required />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                   <input name="email" type="email" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="driver@company.co.uk" required />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Primary Coverage Area</label>
                     <input name="coverageArea" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner" placeholder="e.g. Birmingham" required />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Work Radius</label>
                     <select name="radius" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none font-bold transition-all shadow-inner cursor-pointer">
                        <option>10 miles</option>
                        <option>25 miles</option>
                        <option>50 miles</option>
                        <option>100 miles</option>
                        <option>England-wide</option>
                     </select>
                   </div>
                 </div>

                 <div className="bg-[#F9F9F7] p-6 rounded-2xl border border-border">
                    <div className="flex items-start gap-4">
                      <input name="insurance" type="checkbox" className="mt-1.5 h-5 w-5 accent-accent rounded cursor-pointer" required />
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-tight text-primary">Insurance Confirmation</p>
                        <p className="text-[10px] text-text-secondary font-medium leading-relaxed uppercase tracking-wider">I confirm I am fully insured for goods in transit and public liability.</p>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/30 text-center">
                       You will need to provide proof of goods-in-transit insurance and public liability insurance during onboarding.
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

            {/* What Happens Next (E2) */}
            <div className="mt-20 space-y-12">
               <h2 className="text-3xl font-black text-primary uppercase tracking-tight text-center">What Happens Next</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { t: "We review your application", d: "Our team checks your details within 24 hours to ensure you meet our network standards.", i: "01" },
                    { t: "We verify your insurance", d: "You'll be asked to upload your insurance documents through our secure portal.", i: "02" },
                    { t: "You get access to live jobs", d: "Once approved, you can start unlocking move requests in your chosen area immediately.", i: "03" }
                  ].map((step, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-border/50 space-y-4 shadow-sm">
                       <div className="text-accent font-black text-xl italic tracking-tighter">Step {step.i}</div>
                       <h3 className="font-black text-primary uppercase tracking-tight text-sm">{step.t}</h3>
                       <p className="text-text-secondary font-medium text-xs leading-relaxed">{step.d}</p>
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
