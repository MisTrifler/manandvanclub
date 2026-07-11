import Link from "next/link";
import { Facebook, ShieldCheck, CheckCircle2, Mail, Phone, MapPin, Lock, ExternalLink } from "lucide-react";
import { BrandIcon, BrandWordmark } from "./BrandLogo";

const facebookUrl = "https://www.facebook.com/profile.php?id=61590898873944";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-primary pt-16 pb-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
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
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-accent" /> 0121 751 1269
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" /> UK-Wide Coverage
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-border text-xs text-text-secondary">
              <div className="flex items-center gap-2 mb-1 font-bold text-primary">
                <Lock size={14} className="text-green-600" /> GDPR Compliant
              </div>
              <p>Your data is handled securely and only released to the mover handling your booking after you accept a quote.</p>
            </div>

            <div className="mt-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 mb-3">Find us online</p>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm transition-colors hover:border-accent hover:text-accent"
                aria-label="Visit Man and Van Club on Facebook"
              >
                <Facebook size={16} />
                Facebook
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Customers</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/get-started" className="hover:text-accent transition-colors">Get Started</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="/man-and-van-west-midlands" className="hover:text-accent transition-colors">West Midlands</Link></li>
              <li><Link href="/areas-covered" className="hover:text-accent transition-colors">Areas We Cover</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/house-removals" className="hover:text-accent transition-colors">House Removals</Link></li>
              <li><Link href="/flat-removals" className="hover:text-accent transition-colors">Flat Moves</Link></li>
              <li><Link href="/office-removals" className="hover:text-accent transition-colors">Office Relocations</Link></li>
              <li><Link href="/long-distance-removals" className="hover:text-accent transition-colors">Long Distance</Link></li>
              <li><Link href="/same-day-man-and-van" className="hover:text-accent transition-colors">Same Day</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Movers</h4>
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
            <span>© {currentYear} Man and Van Club</span>
            <div className="flex flex-wrap gap-6 mt-2">
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
              <Link href="/cookies" className="hover:text-primary">Cookie Policy</Link>
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
