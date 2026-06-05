"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "unverified" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate verification check
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes: if email contains "unverified" show the restriction
    if (email.toLowerCase().includes("unverified")) {
      setStatus("unverified");
    } else {
      // In a real app, redirect to dashboard
      window.location.href = "/marketplace";
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="bg-primary px-3 py-2 rounded-xl">
              <span className="text-white font-black text-xl leading-none">M&V</span>
            </div>
            <span className="text-2xl font-black text-primary tracking-tighter uppercase">Man & Van Club</span>
          </Link>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-border">
          {status === "unverified" ? (
            <div className="text-center space-y-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-amber-600">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold text-primary">Account Under Review</h2>
              <p className="text-text-secondary leading-relaxed">
                Thanks for your application! Our team is currently verifying your business documents.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl text-sm text-text-secondary">
                To maintain the quality of our marketplace, we manually verify every driver before granting access to the job feed and pricing.
              </div>
              <button 
                onClick={() => setStatus("idle")} 
                className="w-full text-accent font-bold hover:underline"
              >
                Try another account
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-black text-primary mb-2 text-center uppercase tracking-tight">Driver Login</h1>
              <p className="text-text-secondary text-center mb-8">Access the marketplace & manage jobs</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-primary/60 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="driver@company.co.uk"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-primary/60 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end text-sm">
                  <button type="button" className="text-accent font-bold hover:underline">Forgot password?</button>
                </div>

                <button 
                  disabled={status === "loading"}
                  className="btn-orange w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest mt-4"
                >
                  {status === "loading" ? <Loader2 className="animate-spin" /> : <>Login to Feed <ArrowRight size={18} /></>}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-text-secondary text-sm mb-4">Don't have a driver account yet?</p>
                <Link href="/for-businesses" className="text-primary font-black hover:text-accent transition-colors uppercase tracking-widest text-sm">Apply to Join →</Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-text-secondary text-sm font-bold hover:text-primary">← Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
