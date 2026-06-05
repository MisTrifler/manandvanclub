"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { name: "House Removals", href: "/house-removals" },
    { name: "Flat Moves", href: "/flat-removals" },
    { name: "Office Relocations", href: "/office-removals" },
    { name: "Long Distance", href: "/long-distance-removals" },
    { name: "Same Day", href: "/same-day-man-and-van" },
  ];

  const cities = [
    { name: "London", href: "/man-and-van-london" },
    { name: "Birmingham", href: "/man-and-van-birmingham" },
    { name: "Manchester", href: "/man-and-van-manchester" },
    { name: "Leeds", href: "/man-and-van-leeds" },
    { name: "Bristol", href: "/man-and-van-bristol" },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary px-3 py-2.5 rounded-xl group-hover:bg-accent transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3 shadow-lg">
              <span className="text-white font-black text-2xl leading-none tracking-tighter">M&V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-primary tracking-tighter leading-none">
                MAN<span className="text-accent">&</span>VAN
              </span>
              <span className="text-xs font-black text-accent tracking-[0.3em] uppercase mt-1 leading-none">Club</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/how-it-works" className="font-medium text-text-primary hover:text-accent transition-colors">
              How It Works
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 font-medium text-text-primary hover:text-accent">
                Services <ChevronDown size={16} />
              </button>
              <div className="absolute top-full -left-4 w-56 bg-white border border-border shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                {services.map((s) => (
                  <Link key={s.href} href={s.href} className="block px-4 py-2 hover:bg-background rounded text-sm">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 font-medium text-text-primary hover:text-accent">
                Areas <ChevronDown size={16} />
              </button>
              <div className="absolute top-full -left-4 w-48 bg-white border border-border shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                {cities.map((c) => (
                  <Link key={c.href} href={c.href} className="block px-4 py-2 hover:bg-background rounded text-sm">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/for-businesses" className="font-medium text-text-primary hover:text-accent transition-colors">
              For Businesses
            </Link>
            <Link href="/about" className="font-medium text-text-primary hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="btn-outline text-sm py-2 px-4">
              Driver Login
            </Link>
            <Link href="/#quote-form" className="btn-orange text-sm py-2 px-4">
              Get Free Quotes
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-border shadow-xl p-4 flex flex-col gap-4">
          <Link href="/how-it-works" className="font-semibold p-2">How It Works</Link>
          <div className="p-2">
            <span className="font-semibold block mb-2">Services</span>
            <div className="grid grid-cols-2 gap-2 pl-2">
              {services.map(s => <Link key={s.href} href={s.href} className="text-sm">{s.name}</Link>)}
            </div>
          </div>
          <Link href="/for-businesses" className="font-semibold p-2">For Businesses</Link>
          <Link href="/about" className="font-semibold p-2">About Us</Link>
          <Link href="/login" className="btn-outline w-full">Driver Login</Link>
          <Link href="/#quote-form" className="btn-orange w-full" onClick={() => setIsOpen(false)}>Get Free Quotes</Link>
        </div>
      )}
    </header>
  );
}
