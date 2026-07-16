"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BrandIcon, BrandWordmark } from "./BrandLogo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [driverLoggedIn, setDriverLoggedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const shouldCheckDriverSession =
      pathname?.startsWith("/marketplace") || pathname === "/login";

    if (!shouldCheckDriverSession) {
      setDriverLoggedIn(false);
      return () => {
        cancelled = true;
      };
    }

    async function checkDriverSession() {
      try {
        const res = await fetch("/api/driver/session", {
          cache: "no-store",
          credentials: "same-origin",
        });
        const data = await res.json();
        if (!cancelled) {
          setDriverLoggedIn(Boolean(data.loggedIn));
        }
      } catch {
        if (!cancelled) {
          setDriverLoggedIn(false);
        }
      }
    }

    checkDriverSession();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const handleDriverLogout = async () => {
    try {
      await fetch("/api/driver/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setDriverLoggedIn(false);
      setIsOpen(false);
      if (pathname?.startsWith("/marketplace")) {
        router.push("/login");
      } else {
        router.refresh();
      }
    }
  };

  const services = [
    { name: "House Removals", href: "/house-removals" },
    { name: "Flat Moves", href: "/flat-removals" },
    { name: "Office Relocations", href: "/office-removals" },
    { name: "Long Distance", href: "/long-distance-removals" },
    { name: "Same Day", href: "/same-day-man-and-van" },
    { name: "Cost Calculator", href: "/moving-cost-calculator" },
  ];

  const areaSections = [
    {
      heading: "Midlands",
      links: [
        { name: "West Midlands Hub", href: "/man-and-van-west-midlands" },
        { name: "Birmingham", href: "/man-and-van-birmingham" },
        { name: "Walsall", href: "/man-and-van-walsall" },
        { name: "Wolverhampton", href: "/man-and-van-wolverhampton" },
        { name: "Coventry", href: "/man-and-van-coventry" },
        { name: "Nottingham", href: "/man-and-van-nottingham" },
        { name: "Leicester", href: "/man-and-van-leicester" },
        { name: "Derby", href: "/man-and-van-derby" },
        { name: "East Midlands Hub", href: "/man-and-van-east-midlands" },
      ],
    },
    {
      heading: "London",
      links: [
        { name: "London", href: "/man-and-van-london" },
        { name: "Croydon", href: "/man-and-van-croydon" },
        { name: "Bromley", href: "/man-and-van-bromley" },
        { name: "Romford", href: "/man-and-van-romford" },
        { name: "Wembley", href: "/man-and-van-wembley" },
        { name: "Ealing", href: "/man-and-van-ealing" },
        { name: "Stratford", href: "/man-and-van-stratford" },
      ],
    },
    {
      heading: "North",
      links: [
        { name: "Manchester", href: "/man-and-van-manchester" },
        { name: "Leeds", href: "/man-and-van-leeds" },
        { name: "Liverpool", href: "/man-and-van-liverpool" },
        { name: "Sheffield", href: "/man-and-van-sheffield" },
        { name: "Newcastle", href: "/man-and-van-newcastle-upon-tyne" },
        { name: "Hull", href: "/man-and-van-hull" },
        { name: "Bradford", href: "/man-and-van-bradford" },
      ],
    },
    {
      heading: "South & Scotland",
      links: [
        { name: "Bristol", href: "/man-and-van-bristol" },
        { name: "Southampton", href: "/man-and-van-southampton" },
        { name: "Oxford", href: "/man-and-van-oxford" },
        { name: "Cambridge", href: "/man-and-van-cambridge" },
        { name: "Edinburgh", href: "/man-and-van-edinburgh" },
        { name: "Glasgow", href: "/man-and-van-glasgow" },
        { name: "Cardiff", href: "/man-and-van-cardiff" },
      ],
    },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-[100] transition-all">
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-primary text-white py-1 border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
          <div className="flex gap-6">
            <a href="mailto:support@manandvanclub.co.uk" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail size={10} className="text-accent" />
              <span>support@manandvanclub.co.uk</span>
            </a>
            <a href="tel:01217511269" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={10} className="text-accent" />
              <span>0121 751 1269</span>
            </a>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <MapPin size={10} className="text-accent" />
              <span>UK-Wide Coverage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Man and Van Club home">
            <BrandIcon />
            <BrandWordmark />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              How It Works
            </Link>

            <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              Moving Tips
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
                  "absolute top-full -left-4 w-80 bg-white border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl transition-all p-3 z-50 mt-4",
                  areasOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {areaSections.map((section) => (
                    <div key={section.heading}>
                      <p className="text-[8px] font-black uppercase tracking-[0.25em] text-primary/30 px-5 pt-3 pb-1">{section.heading}</p>
                      {section.links.map((c) => (
                        <Link key={c.href} href={c.href} className="flex items-center justify-between px-3 py-2 hover:bg-accent/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-accent group/item transition-all" onClick={() => setAreasOpen(false)}>
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <Link href="/areas-covered" className="flex items-center justify-between px-5 py-3 hover:bg-accent/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-accent hover:text-primary transition-all" onClick={() => setAreasOpen(false)}>
                    View All Areas
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/why-join" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              Become a Mover
            </Link>
            <Link href="/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            {driverLoggedIn ? (
              <>
                <Link href="/marketplace" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors px-4" aria-label="Driver marketplace">
                  Marketplace
                </Link>
                <button
                  type="button"
                  onClick={handleDriverLogout}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 hover:text-accent transition-colors px-2"
                  aria-label="Log out of driver account"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-accent transition-colors px-4" aria-label="Driver login portal">
                Driver Login
              </Link>
            )}
            <Link href="/get-started" className="btn-orange text-[10px] py-4 px-8 rounded-xl uppercase tracking-[0.2em] font-black shadow-xl shadow-accent/20 hover:scale-105 active:scale-95" aria-label="Start a free move request">
              Start Request
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:01217511269"
              className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-xl text-xs font-black"
              aria-label="Call Man and Van Club"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Call</span>
            </a>
            <button 
              className="p-2 text-primary" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-white border-b border-border shadow-xl p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
          <Link href="/how-it-works" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>How It Works</Link>
          <Link href="/blog" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>Moving Tips</Link>
          
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
            {areaSections.map((section) => (
              <div key={section.heading} className="pl-2">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/30 block mb-2">{section.heading}</span>
                <div className="grid grid-cols-2 gap-3">
                  {section.links.map(c => (
                    <Link key={c.href} href={c.href} className="text-sm font-bold text-primary" onClick={() => setIsOpen(false)}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/areas-covered" className="text-sm font-black text-accent block mt-2" onClick={() => setIsOpen(false)}>View All Areas →</Link>
          </div>

          <Link href="/why-join" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>Become a Mover</Link>
          <Link href="/about" className="font-black uppercase tracking-widest text-xs p-2" onClick={() => setIsOpen(false)}>About Us</Link>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            {driverLoggedIn ? (
              <>
                <Link href="/marketplace" className="bg-gray-50 text-primary py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center" onClick={() => setIsOpen(false)}>Marketplace</Link>
                <button type="button" onClick={handleDriverLogout} className="bg-white border border-border text-primary/60 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center">Logout</button>
              </>
            ) : (
              <Link href="/login" className="bg-gray-50 text-primary py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center" onClick={() => setIsOpen(false)}>Driver Login</Link>
            )}
            <Link href="/get-started" className="btn-orange py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center" onClick={() => setIsOpen(false)}>Start Request</Link>
          </div>
        </div>
      )}
    </header>
  );
}
