"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

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
    <header className="bg-white border-b border-border sticky top-0 z-[100] transition-all">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-28 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="bg-primary p-3 rounded-2xl group-hover:bg-accent transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-6">
              <span className="text-white font-black text-3xl leading-none tracking-tighter">M&V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-primary tracking-tighter leading-none uppercase">
                Man<span className="text-accent">&</span>Van
              </span>
              <span className="text-[10px] font-black text-accent tracking-[0.4em] uppercase mt-2 leading-none">The Club</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/how-it-works" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              How It Works
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
                Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full -left-4 w-64 bg-white border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 z-50 mt-4">
                <div className="grid grid-cols-1 gap-1">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center justify-between px-5 py-4 hover:bg-accent/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-accent group/item transition-all">
                      {s.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
                Areas <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full -left-4 w-56 bg-white border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 z-50 mt-4">
                 <div className="grid grid-cols-1 gap-1">
                  {cities.map((c) => (
                    <Link key={c.href} href={c.href} className="flex items-center justify-between px-5 py-4 hover:bg-accent/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-accent group/item transition-all">
                      {c.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/for-businesses" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              For Movers
            </Link>
            <Link href="/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors px-4">
              Driver Login
            </Link>
            <Link href="/#quote-form" className="btn-orange text-[10px] py-4 px-8 rounded-xl uppercase tracking-[0.2em] font-black shadow-xl shadow-accent/20 hover:scale-105 active:scale-95">
              Get Matched
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
          <Link href="/#quote-form" className="btn-orange w-full" onClick={() => setIsOpen(false)}>Get Started</Link>
        </div>
      )}
    </header>
  );
}
