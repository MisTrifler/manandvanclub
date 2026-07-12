"use client";

import Link from "next/link";
import { ShieldCheck, CheckCircle2, Mail, Phone, MapPin, Lock } from "lucide-react";
import { BrandIcon, BrandWordmark } from "./BrandLogo";

const facebookUrl = "https://www.facebook.com/profile.php?id=61590898873944";
const yellUrl = "https://www.yell.com/biz/man-and-van-club-walsall-11043227/";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-primary pt-16 pb-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group" aria-label="Man and Van Club home">
              <BrandIcon size="sm" className="shadow-none" />
              <BrandWordmark variant="inline" />
            </Link>
            <p className="text-text-secondary mb-6 leading-relaxed">
              A marketplace connecting customers with independent local movers across the UK. One suitable mover reviews your request before you decide whether to book.
            </p>
            <div className="space-y-3 text-sm text-text-secondary">
              <a href="mailto:support@manandvanclub.co.uk" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} className="text-accent" /> support@manandvanclub.co.uk
              </a>
              <a href="tel:01217511269" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={14} className="text-accent" /> 0121 751 1269
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" /> Walsall, West Midlands
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-border text-xs text-text-secondary">
              <div className="flex items-center gap-2 mb-1 font-bold text-primary">
                <Lock size={14} className="text-green-600" /> GDPR Compliant
              </div>
              <p>Your data is handled securely and only released to the mover handling your booking after you accept a quote.</p>
            </div>

            {/* Business Details — Sole Trader */}
            <div className="mt-4 text-xs text-text-secondary leading-relaxed">
              <p className="font-bold text-primary mb-1">Man and Van Club</p>
              <p>Trading as Man and Van Club</p>
              <p>Walsall, West Midlands, England</p>
            </div>

            {/* Social Links */}
            <div className="mt-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 mb-3">Find us online</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-white shadow-sm transition-all hover:border-[#1877F2] hover:shadow-md hover:scale-105"
                  aria-label="Visit Man and Van Club on Facebook"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                </a>
                <a
                  href={yellUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-white shadow-sm transition-all hover:border-[#FFC800] hover:shadow-md hover:scale-105"
                  aria-label="Visit Man and Van Club on Yell"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="13" rx="3" fill="#FFC800"/>
                    <path d="M8 17l4 4 4-4" fill="#FFC800"/>
                    <path d="M7 8h2v5H7zM11 8h2v5h-2zM15 8h2v5h-2z" fill="#fff"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Popular Areas — NEW column with Birmingham & Walsall prominently */}
          <div>
            <h4 className="font-bold text-lg mb-6">Popular Areas</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/man-and-van-birmingham" className="hover:text-accent transition-colors">Man and Van Birmingham</Link></li>
              <li><Link href="/man-and-van-walsall" className="hover:text-accent transition-colors">Man and Van Walsall</Link></li>
              <li><Link href="/man-and-van-wolverhampton" className="hover:text-accent transition-colors">Man and Van Wolverhampton</Link></li>
              <li><Link href="/man-and-van-dudley" className="hover:text-accent transition-colors">Man and Van Dudley</Link></li>
              <li><Link href="/man-and-van-coventry" className="hover:text-accent transition-colors">Man and Van Coventry</Link></li>
              <li><Link href="/man-and-van-west-midlands" className="hover:text-accent transition-colors">West Midlands Hub</Link></li>
              <li><Link href="/areas-covered" className="hover:text-accent transition-colors">All Areas Covered</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/house-removals" className="hover:text-accent transition-colors">House Removals</Link></li>
              <li><Link href="/flat-removals" className="hover:text-accent transition-colors">Flat Moves</Link></li>
              <li><Link href="/student-removals" className="hover:text-accent transition-colors">Student Moves</Link></li>
              <li><Link href="/office-removals" className="hover:text-accent transition-colors">Office Relocations</Link></li>
              <li><Link href="/furniture-delivery" className="hover:text-accent transition-colors">Furniture Delivery</Link></li>
              <li><Link href="/same-day-man-and-van" className="hover:text-accent transition-colors">Same Day</Link></li>
              <li><Link href="/long-distance-removals" className="hover:text-accent transition-colors">Long Distance</Link></li>
              <li><Link href="/man-and-van-prices" className="hover:text-accent transition-colors">Man and Van Prices</Link></li>
              <li><Link href="/man-and-van-near-me" className="hover:text-accent transition-colors">Man and Van Near Me</Link></li>
              <li><Link href="/man-and-van-vs-removal-company" className="hover:text-accent transition-colors">Man and Van vs Removals</Link></li>
            </ul>
          </div>

          {/* For Customers & Movers combined */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Customers</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/get-started" className="hover:text-accent transition-colors">Get Started</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>

            <h4 className="font-bold text-lg mb-6 mt-8">For Movers</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/why-join" className="hover:text-accent transition-colors">Become a Mover</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="/apply-to-join" className="hover:text-accent transition-colors">Apply to Join</Link></li>
              <li><Link href="/login" className="hover:text-accent transition-colors">Driver Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & Badges */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            <span>© 2024–{currentYear} Man and Van Club</span>
            <div className="flex flex-wrap gap-6 mt-2">
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
              <Link href="/cookies" className="hover:text-primary">Cookie Policy</Link>
              <button
                type="button"
                className="hover:text-primary text-left"
                onClick={() => {
                  localStorage.removeItem("cookie-consent");
                  window.location.reload();
                }}
              >
                Cookie Preferences
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <ShieldCheck size={16} className="text-green-600" />
              <span>Secure Encrypted Connection</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <CheckCircle2 size={16} className="text-green-600" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
