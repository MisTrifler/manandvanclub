import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Navigation, MapPin, Clock } from "lucide-react";
import { ROUTES } from "@/lib/route-data";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Routes | City-to-City Move Quotes | Man and Van Club",
  description: "Man and van quotes for popular UK city-to-city moves. London to Birmingham, Manchester to Leeds, Edinburgh to Glasgow and more. Verified movers, transparent pricing.",
  alternates: {
    canonical: `${siteUrl}/routes`,
  },
  openGraph: {
    title: "Man and Van Routes — City-to-City Move Quotes",
    description: "Man and van quotes for popular UK city-to-city moves. Verified movers, transparent pricing.",
    url: `${siteUrl}/routes`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Man and Van Routes — City-to-City Move Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Routes — City-to-City Move Quotes",
    description: "Man and van quotes for popular UK city-to-city moves. Verified movers, transparent pricing.",
    images: ["/images/og-homepage.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Routes", item: `${siteUrl}/routes` },
  ],
};

// Group routes by region for display
interface RouteGroup {
  label: string;
  routes: typeof ROUTES;
}

function groupRoutes(): RouteGroup[] {
  const seen = new Set<string>();
  const groups: RouteGroup[] = [];

  for (const route of ROUTES) {
    const key = [route.cityA, route.cityB].sort().join("-");
    if (seen.has(key)) continue;
    seen.add(key);

    // Determine group based on primary region
    const regionPair = [route.regionA, route.regionB].sort().join(" ↔ ");
    let groupLabel: string;
    if (regionPair.includes("London") || regionPair.includes("Greater London")) {
      groupLabel = "London ↔ UK Cities";
    } else if (regionPair.includes("West Midlands") && regionPair.includes("Greater Manchester")) {
      groupLabel = "Midlands ↔ North West";
    } else if (regionPair.includes("West Midlands") && regionPair.includes("South West")) {
      groupLabel = "Midlands ↔ South West";
    } else if (regionPair.includes("West Yorkshire") && regionPair.includes("Greater Manchester")) {
      groupLabel = "North West ↔ Yorkshire";
    } else if (regionPair.includes("Scotland")) {
      groupLabel = "Scotland";
    } else if (regionPair.includes("West Midlands") && regionPair.includes("West Yorkshire")) {
      groupLabel = "Midlands ↔ Yorkshire";
    } else {
      groupLabel = "Other Routes";
    }

    let group = groups.find(g => g.label === groupLabel);
    if (!group) {
      group = { label: groupLabel, routes: [] };
      groups.push(group);
    }
    group.routes.push(route);
  }

  return groups;
}

export default function RoutesIndexPage() {
  const routeGroups = groupRoutes();

  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Routes</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            <Navigation size={12} /> City-to-City Moves
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9] mb-6">
            Man and Van <span className="text-accent italic">Routes</span>
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Moving between UK cities? Find route details, pricing estimates and parking advice for popular city-to-city man and van moves.
          </p>
        </div>
      </section>

      {/* Route Groups */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          {routeGroups.map((group) => (
            <div key={group.label}>
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-6">{group.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.routes.map((route) => (
                  <Link
                    key={route.slug}
                    href={`/routes/${route.slug}`}
                    className="group bg-white rounded-2xl border border-border p-6 hover:border-accent hover:shadow-xl transition-all"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-primary uppercase tracking-tight group-hover:text-accent transition-colors leading-tight">
                        {route.cityA} → {route.cityB}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-text-secondary">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {route.distance}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {route.driveTime}</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        From <span className="font-black text-accent">{route.estimatedFrom}</span> via {route.motorway}
                      </p>
                      <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                        View route details <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">
            Do not see your route?
          </h2>
          <p className="text-text-secondary font-medium max-w-xl mx-auto">
            Man and Van Club covers moves between any UK postcodes. Submit your collection and delivery details for a free guide price.
          </p>
          <Link
            href="/get-started"
            className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3"
          >
            Start Your Move Request <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
