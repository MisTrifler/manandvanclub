import Link from "next/link";
import { Facebook, Instagram, Twitter, ShieldCheck, CheckCircle2, Mail, Phone, MapPin, Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-primary pt-16 pb-24 md:pb-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-primary p-1.5 rounded group-hover:bg-accent transition-colors">
                <span className="text-white font-black text-sm leading-none">M&V</span>
              </div>
              <span className="text-xl font-bold text-primary tracking-tighter uppercase">
                Man<span className="text-accent">&</span>Van <span className="opacity-40">Club</span>
              </span>
            </Link>
            <p className="text-text-secondary mb-6 leading-relaxed">
              A marketplace connecting customers with independent local movers across the UK. We match you with one suitable mover directly.
            </p>
            <div className="space-y-3 text-sm text-text-secondary">
              <a href="mailto:support@manandvanclub.co.uk" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} className="text-accent" /> support@manandvanclub.co.uk
              </a>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-accent" /> 07943 617 386
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" /> UK-Wide Coverage
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-border text-xs text-text-secondary">
              <div className="flex items-center gap-2 mb-1 font-bold text-primary">
                <Lock size={14} className="text-green-600" /> GDPR Compliant
              </div>
              <p>Your data is handled securely and never sold or shared beyond your matched mover.</p>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Customers</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/#quote-form" className="hover:text-accent transition-colors">Get Started</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
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
            <h4 className="font-bold text-lg mb-6">Join Us</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/for-businesses" className="hover:text-accent transition-colors">Join as a Driver</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Introduction Marketplace</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Driver Pricing</Link></li>
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
