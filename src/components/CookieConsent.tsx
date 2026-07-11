"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { applyCookieConsent, updateCookieConsent } from "@/lib/analytics";

type ConsentLevel = "all" | "necessary" | "none";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (consent === "accepted" || consent === "all") {
      applyCookieConsent("accepted");
      return;
    }
    if (consent === "necessary" || consent === "declined") {
      applyCookieConsent("declined");
      return;
    }

    setShowBanner(true);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    updateCookieConsent("accepted");
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem("cookie-consent", "necessary");
    updateCookieConsent("declined");
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    if (analytics && marketing) {
      handleAcceptAll();
    } else if (!analytics && !marketing) {
      handleDeclineAll();
    } else {
      // Partial consent — only analytics or marketing
      localStorage.setItem("cookie-consent", analytics ? "accepted" : "necessary");
      updateCookieConsent(analytics ? "accepted" : "declined");
    }
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

            {!showPreferences ? (
              <>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">
                  We use cookies to enhance your experience and analyse our traffic. You can choose which cookies to allow. Read our <Link href="/cookies" className="text-primary font-bold hover:underline">Cookie Policy</Link>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="btn-orange flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="bg-gray-100 text-primary flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors"
                  >
                    Manage Preferences
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="bg-white border border-border text-primary/60 flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-colors"
                  >
                    Reject All
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="mt-1 accent-accent"
                      id="cookie-necessary"
                    />
                    <label htmlFor="cookie-necessary" className="text-sm text-text-secondary leading-relaxed">
                      <span className="font-bold text-primary">Necessary</span> — required for the site to function. Always on.
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="mt-1 accent-accent"
                      id="cookie-analytics"
                    />
                    <label htmlFor="cookie-analytics" className="text-sm text-text-secondary leading-relaxed">
                      <span className="font-bold text-primary">Analytics</span> — help us understand how visitors use the site so we can improve it.
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="mt-1 accent-accent"
                      id="cookie-marketing"
                    />
                    <label htmlFor="cookie-marketing" className="text-sm text-text-secondary leading-relaxed">
                      <span className="font-bold text-primary">Marketing</span> — used to track visitors across websites for advertising purposes.
                    </label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="btn-orange flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="bg-gray-100 text-primary flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
