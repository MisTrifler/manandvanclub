"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Phone } from "lucide-react";
import { LOCATIONS, LOCATION_REGIONS } from "@/constants/locations";
import { MapPin, ArrowUpRight, Search } from "lucide-react";

export default function AreasCoveredContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const filteredLocations = useMemo(() => {
    let filtered = LOCATIONS;

    if (activeRegion) {
      filtered = filtered.filter((l) => l.region === activeRegion);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.region.toLowerCase().includes(q) ||
          l.county.toLowerCase().includes(q) ||
          l.nearbyAreas.some((a) => a.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [searchQuery, activeRegion]);

  const locationsByRegion = useMemo(() => {
    const grouped: Record<string, typeof LOCATIONS> = {};
    for (const region of LOCATION_REGIONS) {
      grouped[region] = filteredLocations.filter((l) => l.region === region);
    }
    return grouped;
  }, [filteredLocations]);

  const totalLocations = LOCATIONS.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-24 lg:py-32 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-6 gap-4">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border border-primary/20 h-32 w-full" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
              UK-Wide Coverage
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
              Areas <span className="text-accent italic">We Cover</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
              Man and Van Club helps customers submit free move requests across{" "}
              {totalLocations} towns and cities, with West Midlands coverage as a priority.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative pt-4">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30"
                />
                <input
                  type="text"
                  placeholder="Search for your town or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border border-border text-primary font-black uppercase text-[10px] tracking-widest placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Regional Hub Pages */}
      <section className="py-16 border-b border-border bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.28em] border border-accent/20">
              <MapPin size={12} /> Regional Hubs
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">
              Browse by Region
            </h2>
            <p className="text-text-secondary font-medium leading-relaxed">
              Each hub page covers the local routes, postcodes, access challenges and nearby areas for its region.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { name: "West Midlands", href: "/man-and-van-west-midlands", desc: "Birmingham, Walsall, Wolverhampton, Dudley, Coventry and Black Country towns" },
              { name: "East Midlands", href: "/man-and-van-east-midlands", desc: "Nottingham, Leicester, Derby, Northampton, Lincoln and nearby areas" },
              { name: "London", href: "/man-and-van-london", desc: "Croydon, Bromley, Romford, Wembley, Ealing, Stratford and 20+ boroughs" },
              { name: "Greater Manchester", href: "/man-and-van-manchester", desc: "Salford, Bolton, Bury, Rochdale, Stockport, Wigan and nearby towns" },
              { name: "West Yorkshire", href: "/man-and-van-leeds", desc: "Bradford, Wakefield, Huddersfield, Halifax, Dewsbury and nearby towns" },
              { name: "Merseyside", href: "/man-and-van-liverpool", desc: "Bootle, Birkenhead, Wallasey, Southport, St Helens and Wirral" },
              { name: "South West", href: "/man-and-van-bristol", desc: "Bath, Weston-super-Mare, Taunton, Swindon, Cheltenham, Gloucester" },
              { name: "South Yorkshire", href: "/man-and-van-sheffield", desc: "Sheffield city centre, Hillsborough, Broomhill, Dore and surrounding areas" },
              { name: "Scotland", href: "/man-and-van-glasgow", desc: "Glasgow, Edinburgh, Aberdeen and Dundee" },
              { name: "Wales", href: "/man-and-van-cardiff", desc: "Cardiff, Swansea and surrounding areas" },
              { name: "North East", href: "/man-and-van-newcastle-upon-tyne", desc: "Newcastle upon Tyne, Jesmond, Gosforth and surrounding areas" },
            ].map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="group bg-[#F9F9F7] rounded-2xl border border-border p-6 hover:border-accent hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary group-hover:text-accent transition-colors">{hub.name}</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">{hub.desc}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-primary/30 group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* West Midlands Priority Hub */}
      <section className="py-16 border-b border-border bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.28em] border border-accent/20">
                <MapPin size={12} /> Priority Region
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">
                Man and Van West Midlands
              </h2>
              <p className="text-text-secondary font-medium leading-relaxed">
                Our West Midlands hub links Birmingham, Walsall, Wolverhampton, Dudley, Solihull, Coventry and nearby Black Country towns into one regional guide.
              </p>
            </div>
            <Link
              href="/man-and-van-west-midlands"
              className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 shrink-0"
            >
              View West Midlands Hub <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Region Filters */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveRegion(null)}
              className={`px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest transition-all border ${
                activeRegion === null
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-border hover:border-accent hover:text-accent"
              }`}
            >
              All Regions
            </button>
            {LOCATION_REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(activeRegion === region ? null : region)}
                className={`px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest transition-all border ${
                  activeRegion === region
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-border hover:border-accent hover:text-accent"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl font-black text-primary uppercase tracking-tight">
                No locations found
              </p>
              <p className="text-text-secondary mt-4 font-medium">
                Try a different search term or clear the filters.
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {LOCATION_REGIONS.map((region) => {
                const regionLocs = locationsByRegion[region];
                if (!regionLocs || regionLocs.length === 0) return null;

                return (
                  <div key={region} className="space-y-10">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-black text-primary uppercase tracking-tight border-b-4 border-accent pb-4 inline-block">
                        {region}
                      </h2>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/30 bg-[#F9F9F7] px-3 py-1 rounded-full">
                        {regionLocs.length} locations
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {regionLocs.map((loc) => {
                        // Use keyword-rich anchor for priority cities
                        const label = (loc.slug === "birmingham" || loc.slug === "walsall")
                          ? `Man and Van ${loc.name}`
                          : loc.name;
                        return (
                          <Link
                            key={loc.slug}
                            href={`/man-and-van-${loc.slug}`}
                            className="group flex items-center justify-between bg-[#F9F9F7] p-6 rounded-2xl border border-border/50 hover:border-accent hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <MapPin
                                size={14}
                                className="text-primary/30 group-hover:text-accent transition-colors"
                              />
                              <span className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent transition-colors">
                                {label}
                              </span>
                            </div>
                            <ArrowUpRight
                              size={16}
                              className="text-primary/30 group-hover:text-accent transition-colors"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
            Don&apos;t see your area?
          </h2>
          <p className="text-xl text-text-secondary font-medium max-w-xl mx-auto leading-relaxed">
            We are expanding across the UK. Submit your move details and
            we&apos;ll help one verified mover review your request where coverage is available.
          </p>
          <Link
            href="/get-started"
            className="btn-orange px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-105 inline-flex items-center gap-3"
          >
            Start Your Move Request <ArrowUpRight size={24} />
          </Link>
          <p className="text-sm text-text-secondary">
            Or call us: <a href="tel:01217511269" className="font-black text-accent hover:underline">0121 751 1269</a> · Open 7 days · From £19/hr
          </p>
        </div>
      </section>

      {/* ── Mobile Floating Call Button ── */}
      <a
        href="tel:01217511269"
        className="floating-call-btn fixed bottom-6 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </div>
  );
}
