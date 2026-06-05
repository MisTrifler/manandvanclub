import Link from "next/link";
import { Facebook, Instagram, Twitter, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-white/10 p-1.5 rounded group-hover:bg-accent transition-colors">
                <span className="text-white font-black text-sm leading-none">M&V</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tighter">
                MAN<span className="text-accent">&</span>VAN<span className="opacity-70"> CLUB</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The UK's trusted marketplace for comparing and booking local man & van services. Fast, free, and fully vetted.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Customers</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/#quote-form" className="hover:text-accent transition-colors">Get Free Quotes</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="/areas" className="hover:text-accent transition-colors">Areas We Cover</Link></li>
              <li><Link href="/reviews" className="hover:text-accent transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/house-removals" className="hover:text-accent transition-colors">House Removals</Link></li>
              <li><Link href="/flat-removals" className="hover:text-accent transition-colors">Flat Moves</Link></li>
              <li><Link href="/office-removals" className="hover:text-accent transition-colors">Office Relocations</Link></li>
              <li><Link href="/long-distance-removals" className="hover:text-accent transition-colors">Long Distance</Link></li>
              <li><Link href="/same-day-man-and-van" className="hover:text-accent transition-colors">Same Day</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Businesses</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/for-businesses" className="hover:text-accent transition-colors">Join as a Driver</Link></li>
              <li><Link href="/marketplace" className="hover:text-accent transition-colors">Lead Marketplace</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Driver Pricing</Link></li>
              <li><Link href="/login" className="hover:text-accent transition-colors">Driver Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & Badges */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>© {currentYear} Man & Van Club Ltd.</span>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <ShieldCheck size={16} className="text-green-500" />
              <span>SSL Secure</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
