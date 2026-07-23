"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { applyCookieConsent, updateCookieConsent } from "@/lib/analytics";

type ConsentState = "undecided" | "accepted" | "declined" | "partial";

interface ConsentChoices {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CHOICES: ConsentChoices = {
  necessary: true, // always on
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>(DEFAULT_CHOICES);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "declined" || stored === "partial") {
      const savedChoices = localStorage.getItem("cookie-consent-choices");
      if (savedChoices) {
        try {
          const parsed = JSON.parse(savedChoices);
          setChoices(parsed);
        } catch {}
      }
      applyCookieConsent(stored === "accepted" ? "accepted" : "declined");
      return;
    }
    setShowBanner(true);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: ConsentChoices = { necessary: true, analytics: true, marketing: true };
    setChoices(allAccepted);
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-choices", JSON.stringify(allAccepted));
    updateCookieConsent("accepted");
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    const onlyNecessary: ConsentChoices = { necessary: true, analytics: false, marketing: false };
    setChoices(onlyNecessary);
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-choices", JSON.stringify(onlyNecessary));
    updateCookieConsent("declined");
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const hasNonEssential = choices.analytics || choices.marketing;
    const state: ConsentState = hasNonEssential ? "partial" : "declined";
    localStorage.setItem("cookie-consent", state);
    localStorage.setItem("cookie-consent-choices", JSON.stringify(choices));
    updateCookieConsent(hasNonEssential ? "accepted" : "declined");
    setShowBanner(false);
  };

  const toggleAnalytics = () => setChoices((prev) => ({ ...prev, analytics: !prev.analytics }));
  const toggleMarketing = () => setChoices((prev) => ({ ...prev, marketing: !prev.marketing }));

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-4 right-4 md:left-0 md:right-0 md:mx-auto md:max-w-md z-[300]"
        >
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border space-y-5">
            <div className="flex items-center gap-3 text-accent">
              <ShieldCheck size={24} />
              <span className="font-black uppercase tracking-widest text-xs">Privacy & Cookies</span>
            </div>
            <p className="text-sm text-text-secondary font-medium leading-relaxed">
              We use cookies to enhance your experience and analyse our traffic. You can choose which cookies to allow. Read our{" "}
              <Link href="/cookies" className="text-primary font-bold hover:underline">Cookie Policy</Link>.
            </p>

            {/* Granular Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-border/50">
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Necessary</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Required for the site to function</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-accent flex items-center justify-end px-1">
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </div>
              </div>

              <button
                type="button"
                onClick={toggleAnalytics}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-border/50 hover:border-accent/30 transition-colors text-left"
              >
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Analytics</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Help us understand how the site is used</p>
                </div>
                <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${choices.analytics ? "bg-accent justify-end" : "bg-gray-300 justify-start"}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </div>
              </button>

              <button
                type="button"
                onClick={toggleMarketing}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-border/50 hover:border-accent/30 transition-colors text-left"
              >
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Marketing</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Used for targeted advertising</p>
                </div>
                <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${choices.marketing ? "bg-accent justify-end" : "bg-gray-300 justify-start"}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </div>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="btn-orange flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                Accept All
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleDeclineAll}
                className="bg-gray-100 text-primary flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors"
              >
                Decline All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
