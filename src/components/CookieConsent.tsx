"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { applyCookieConsent, updateCookieConsent } from "@/lib/analytics";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (consent === "accepted" || consent === "declined") {
      applyCookieConsent(consent);
      return;
    }

    setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    updateCookieConsent("accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    updateCookieConsent("declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[300]"
        >
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border space-y-6">
            <div className="flex items-center gap-3 text-accent">
               <ShieldCheck size={24} />
               <span className="font-black uppercase tracking-widest text-xs">Privacy & Cookies</span>
            </div>
            <p className="text-sm text-text-secondary font-medium leading-relaxed">
              We use cookies to enhance your experience and analyse our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/cookies" className="text-primary font-bold hover:underline">Cookie Policy</Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAccept}
                className="btn-orange flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                Accept All
              </button>
              <button 
                onClick={handleDecline}
                className="bg-gray-100 text-primary flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
