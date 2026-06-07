"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowUpRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

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
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-primary text-white py-2 border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
          <div className="flex gap-6">
            <a href="tel:07943617386" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={10} className="text-accent" />
              <span>07943 617386</span>
            </a>
            <a href="mailto:support@manandvanclub.co.uk" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail size={10} className="text-accent" />
              <span>support@manandvanclub.co.uk</span>
            </a>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <MapPin size={10} className="text-accent" />
              <span>UK-Wide Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={10} className="text-accent" />
              <span>Mon–Sun: 8 AM – 10 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl group-hover:bg-accent transition-all duration-500 shadow-xl group-hover:scale-105">
              <span className="text-white font-black text-2xl leading-none tracking-tighter">M&V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-primary tracking-tighter leading-none uppercase">
                Man<span className="text-accent">&</span>Van
              </span>
              <span className="text-[9px] font-black text-accent tracking-[0.4em] uppercase mt-1 leading-none">The Club</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/how-it-works" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              How It Works
            </Link>
            
            <div className="relative group">
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                onBlur={() => setTimeout(() => setServicesOpen(false), 200)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
              >
                Services <ChevronDown size={14} className={cn("transition-transform", servicesOpen ? "rotate-180" : "")} />
              </button>
              <div 
                id="services-menu"
                className={cn(
                  "absolute top-full -left-4 w-64 bg-white border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl transition-all p-3 z-50 mt-4",
                  servicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
              >
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
              <button 
                onClick={() => setAreasOpen(!areasOpen)}
                onBlur={() => setTimeout(() => setAreasOpen(false), 200)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors"
                aria-expanded={areasOpen}
                aria-controls="areas-menu"
              >
                Areas <ChevronDown size={14} className={cn("transition-transform", areasOpen ? "rotate-180" : "")} />
              </button>
              <div 
                id="areas-menu"
                className={cn(
                  "absolute top-full -left-4 w-56 bg-white border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl transition-all p-3 z-50 mt-4",
                  areasOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
              >
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
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-border shadow-xl p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
          <Link href="/how-it-works" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>How It Works</Link>
          
          <div className="p-2 space-y-4">
            <span className="font-black uppercase tracking-widest text-[10px] text-primary/40 block">Services</span>
            <div className="grid grid-cols-1 gap-4 pl-2">
              {services.map(s => (
                <Link key={s.href} href={s.href} className="text-sm font-bold text-primary flex justify-between items-center" onClick={() => setIsOpen(false)}>
                  {s.name} <ArrowUpRight size={14} className="text-accent"/>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-2 space-y-4">
            <span className="font-black uppercase tracking-widest text-[10px] text-primary/40 block">Areas</span>
            <div className="grid grid-cols-2 gap-4 pl-2">
              {cities.map(c => (
                <Link key={c.href} href={c.href} className="text-sm font-bold text-primary" onClick={() => setIsOpen(false)}>
                  {c.name}
                </Link>
              ))}
              <Link href="/areas" className="text-sm font-black text-accent col-span-2 mt-2" onClick={() => setIsOpen(false)}>View All Areas →</Link>
            </div>
          </div>

          <Link href="/for-businesses" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>For Movers</Link>
          <Link href="/about" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>About Us</Link>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Link href="/login" className="bg-gray-50 text-primary py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center" onClick={() => setIsOpen(false)}>Driver Login</Link>
            <Link href="/#quote-form" className="btn-orange py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center" onClick={() => setIsOpen(false)}>Get Matched</Link>
          </div>
        </div>
      )}
    </header>
  );
}
