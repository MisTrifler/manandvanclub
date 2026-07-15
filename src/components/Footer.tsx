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
                  className="inline-flex items-center justify-center h-11 rounded-full border border-border bg-white shadow-sm transition-all hover:border-[#FED900] hover:shadow-md hover:scale-105 px-4"
                  aria-label="Visit Man and Van Club on Yell"
                >
                  <svg width="62" height="20" viewBox="0 0 123.9 40">
                    <path fill="#FED900" d="M41 36c0 2-1.6 3.6-3.6 3.6H5.3c-2 0-3.6-1.6-3.6-3.6V4C1.7 2 3.3.4 5.3.4h32.1C39.4.4 41 2 41 4v32.1-.1z"/>
                    <path d="M18 12.7c-.3 0-.4.1-.7.5C15.5 16 10.5 23.7 9.7 25c-.7 1.1-.9 1.9-.7 2.8.2.8.8 1.4 1.8 1.6.2 0 .5 0 .6-.3 1.3-1.6 8.7-11.5 10-13.3.2-.2.1-.4 0-.6-.3-.5-1.2-1.6-2-2.1-.5-.3-1-.5-1.3-.5H18m16.8 16.1c-1.5-3.3-9-18.6-10.6-22.1-.8-1.8-1.7-4.1-2.5-6.2h-9.2c.1 3.1.2 4.7-.3 6.2-.9 2.6-3.7 5.3-5.7 7.4-.7.7 2.1 2.7 5 .4 1.1-.8 2.8-2.5 4.1-3.6.6-.5 1.4-.7 2.2-.6 1.1.2 1.9.7 2.7 1.6.8 1 1.6 2.3 2.6 4 2 3.2 4.1 6.8 6.5 10.5 1.2 1.9 2.8 2.7 5 2.6.2 0 .2-.1.2-.3M70.8 5c.5-.7 1-1 1.7-1s1.2.2 1.6.6c.4.4.5.8.5 1.4s-.1 1-.4 1.4l-10.8 15V34c0 .6-.2 1.1-.6 1.4-.4.4-.9.6-1.5.6s-1.1-.2-1.5-.6c-.4-.4-.6-.9-.6-1.5V22.4L48.5 7.3c-.2-.4-.4-.8-.4-1.4s.2-1 .5-1.4c.4-.4.9-.6 1.6-.6.7 0 1.2.4 1.7 1l9.5 13.8 9.5-13.8-.1.1zm6.1 25.6c1.3 1.2 3.1 1.8 5.4 1.8s4.3-.4 5.8-1.2c.5-.3 1-.4 1.4-.4.4 0 .8.2 1.1.5.4.3.5.7.5 1.1 0 .8-.3 1.4-1 1.7-.6.3-1.2.6-1.7.9-.5.2-1.1.4-1.7.6-1.4.4-2.9.6-4.7.6-3.7 0-6.6-1-8.6-3.1-2.1-2.1-3.1-5-3.1-8.9 0-3.3.9-6.1 2.6-8.3 1.9-2.5 4.7-3.7 8.2-3.7 3.4 0 6.1 1.1 8 3.4 1.8 2.1 2.8 4.8 2.8 8 0 .6-.2 1.1-.6 1.4-.4.4-.9.6-1.5.6H74.6c.2 2 1 3.7 2.3 4.9m4.4-14.8c-2.7 0-4.6 1.2-5.9 3.6-.5.8-.7 1.9-.8 3H88c-.1-2.1-.9-3.8-2.4-5.1-1.2-1-2.7-1.5-4.3-1.5M96.5 3.1c.4-.4.9-.6 1.5-.6s1.1.2 1.5.6c.4.4.6.9.6 1.5V34c0 .6-.2 1.1-.6 1.4-.4.4-.9.6-1.5.6s-1.1-.2-1.5-.6c-.4-.4-.6-.9-.6-1.4V4.6c0-.6.2-1.1.6-1.5m8.9 0c.4-.4.9-.6 1.5-.6s1.1.2 1.5.6c.4.4.6.9.6 1.5V34c0 .6-.2 1.1-.6 1.5-.4.4-.9.6-1.5.6s-1.1-.2-1.5-.6c-.4-.4-.6-.9-.6-1.4V4.6c0-.6.2-1.1.6-1.5M5.3 32.4v.1c0 1.9 1.6 3.5 3.5 3.5h25c1.9 0 3.5-1.6 3.6-3.5v-.1H5.3zm111.2.2s.1.1.1.2 0 .1-.1.2l-.1.1h-1V36c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.1 0-.2-.1c0 0-.1-.1-.1-.2v-2.9h-1c-.1 0-.1 0-.1-.1l-.1-.1c0-.1 0-.1.1-.1s.1-.1.1-.1h2.5c.1 0 .1 0 .2.1m4.4-.1c.1.1.1.1.1.2v3c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.1 0-.2-.1-.1-.1-.1-.2V33l-1.2 2.9c0 .1-.1.1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1c-.1 0-.1-.1-.1-.2l-1.2-2.9v2.9c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.1 0-.2-.1c0 0-.1-.1-.1-.2v-3c0-.1 0-.2.1-.2.1-.1.1-.1.2-.1h.2c.1 0 .1 0 .2.1.1 0 .1.1.1.1l1.1 2.8 1.1-2.8c0-.1.1-.1.1-.1.1 0 .1-.1.2-.1h.2c.1 0 .2 0 .2.1"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Popular Areas — Nationwide coverage */}
          <div>
            <h4 className="font-bold text-lg mb-6">Popular Areas</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/man-and-van-birmingham" className="hover:text-accent transition-colors">Birmingham</Link></li>
              <li><Link href="/man-and-van-walsall" className="hover:text-accent transition-colors">Walsall</Link></li>
              <li><Link href="/man-and-van-london" className="hover:text-accent transition-colors">London</Link></li>
              <li><Link href="/man-and-van-manchester" className="hover:text-accent transition-colors">Manchester</Link></li>
              <li><Link href="/man-and-van-leeds" className="hover:text-accent transition-colors">Leeds</Link></li>
              <li><Link href="/man-and-van-liverpool" className="hover:text-accent transition-colors">Liverpool</Link></li>
              <li><Link href="/man-and-van-bristol" className="hover:text-accent transition-colors">Bristol</Link></li>
              <li><Link href="/man-and-van-sheffield" className="hover:text-accent transition-colors">Sheffield</Link></li>
              <li><Link href="/man-and-van-edinburgh" className="hover:text-accent transition-colors">Edinburgh</Link></li>
              <li><Link href="/man-and-van-glasgow" className="hover:text-accent transition-colors">Glasgow</Link></li>
              <li><Link href="/man-and-van-cardiff" className="hover:text-accent transition-colors">Cardiff</Link></li>
              <li><Link href="/man-and-van-newcastle-upon-tyne" className="hover:text-accent transition-colors">Newcastle</Link></li>
              <li><Link href="/man-and-van-hull" className="hover:text-accent transition-colors">Hull</Link></li>
              <li><Link href="/man-and-van-york" className="hover:text-accent transition-colors">York</Link></li>
              <li><Link href="/man-and-van-aberdeen" className="hover:text-accent transition-colors">Aberdeen</Link></li>
              <li><Link href="/man-and-van-swansea" className="hover:text-accent transition-colors">Swansea</Link></li>
              <li><Link href="/man-and-van-dundee" className="hover:text-accent transition-colors">Dundee</Link></li>
            </ul>
            <h4 className="font-bold text-lg mb-4 mt-6">Regional Hubs</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/man-and-van-west-midlands" className="hover:text-accent transition-colors">West Midlands</Link></li>
              <li><Link href="/man-and-van-east-midlands" className="hover:text-accent transition-colors">East Midlands</Link></li>
              <li><Link href="/man-and-van-london" className="hover:text-accent transition-colors">London</Link></li>
              <li><Link href="/man-and-van-manchester" className="hover:text-accent transition-colors">Greater Manchester</Link></li>
              <li><Link href="/man-and-van-leeds" className="hover:text-accent transition-colors">West Yorkshire</Link></li>
              <li><Link href="/man-and-van-liverpool" className="hover:text-accent transition-colors">Merseyside</Link></li>
              <li><Link href="/man-and-van-bristol" className="hover:text-accent transition-colors">South West</Link></li>
              <li><Link href="/man-and-van-sheffield" className="hover:text-accent transition-colors">South Yorkshire</Link></li>
              <li><Link href="/man-and-van-glasgow" className="hover:text-accent transition-colors">Scotland</Link></li>
              <li><Link href="/man-and-van-cardiff" className="hover:text-accent transition-colors">Wales</Link></li>
              <li><Link href="/man-and-van-newcastle-upon-tyne" className="hover:text-accent transition-colors">North East</Link></li>
              <li><Link href="/areas-covered" className="hover:text-accent transition-colors font-bold">All Areas Covered</Link></li>
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
              <li><Link href="/moving-cost-calculator" className="hover:text-accent transition-colors">Cost Calculator</Link></li>
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
              <li><Link href="/blog" className="hover:text-accent transition-colors">Moving Tips &amp; Blog</Link></li>
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
