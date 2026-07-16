import Link from "next/link";
import { Metadata } from "next";
import { LOCATIONS } from "@/constants/locations";
import { ROUTES } from "@/lib/route-data";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Sitemap | Man and Van Club",
  description: "Browse all pages on Man and Van Club — location pages, route pages, services, blog posts and more.",
  alternates: {
    canonical: `${siteUrl}/sitemap`,
  },
};

const SERVICES = [
  { name: "House Removals", href: "/house-removals" },
  { name: "Flat Removals", href: "/flat-removals" },
  { name: "Student Removals", href: "/student-removals" },
  { name: "Office Removals", href: "/office-removals" },
  { name: "Furniture Delivery", href: "/furniture-delivery" },
  { name: "Same-Day Man and Van", href: "/same-day-man-and-van" },
  { name: "Long-Distance Removals", href: "/long-distance-removals" },
  { name: "Facebook Marketplace Collection", href: "/facebook-marketplace-collection" },
  { name: "Piano Removals", href: "/piano-removals" },
  { name: "Single Item Delivery", href: "/single-item-delivery" },
];

const BLOG_POSTS = [
  { name: "How Much Does a Man and Van Cost?", href: "/blog/how-much-does-man-and-van-cost" },
  { name: "How to Prepare for Moving Day", href: "/blog/how-to-prepare-for-moving-day" },
  { name: "Man and Van vs Removal Company", href: "/blog/man-and-van-vs-removal-company-guide" },
  { name: "Student Moving Guide", href: "/blog/student-moving-guide" },
  { name: "What to Tell Your Mover Before Moving Day", href: "/blog/what-to-tell-your-mover-before-moving-day" },
  { name: "Birmingham Postcode Moving Guide", href: "/blog/birmingham-postcode-moving-guide" },
  { name: "London Borough Moving Guide", href: "/blog/london-borough-moving-guide" },
  { name: "What Affects Man and Van Prices", href: "/blog/what-affects-man-and-van-prices" },
  { name: "Same-Day Man and Van Guide", href: "/blog/same-day-move-guide" },
  { name: "How to Pack for a House Move", href: "/blog/how-to-pack-for-a-house-move" },
  { name: "3-Bed House Move Cost UK", href: "/blog/average-cost-3-bedroom-house-move" },
  { name: "Do I Need to Empty Drawers for Movers?", href: "/blog/do-i-need-to-empty-drawers-for-movers" },
  { name: "How to Move a Piano Safely", href: "/blog/how-to-move-a-piano-without-damage" },
  { name: "Office Relocation Checklist", href: "/blog/office-relocation-checklist" },
  { name: "AnyVan Review & Alternatives", href: "/blog/anyvan-review-alternatives" },
  { name: "Man and Van Insurance Guide", href: "/blog/what-insurance-does-your-man-and-van-need" },
  { name: "House Moving Checklist UK", href: "/blog/house-moving-checklist-uk" },
  { name: "Man and Van Birmingham: Prices & How to Book", href: "/blog/man-and-van-birmingham-prices-how-to-book" },
  { name: "Man and Van Walsall: Prices & How to Book", href: "/blog/man-and-van-walsall-prices-how-to-book" },
];

const OTHER_PAGES = [
  { name: "Homepage", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Get Started", href: "/get-started" },
  { name: "Man and Van Prices", href: "/man-and-van-prices" },
  { name: "Man and Van Near Me", href: "/man-and-van-near-me" },
  { name: "Man and Van vs Removal Company", href: "/man-and-van-vs-removal-company" },
  { name: "Moving Cost Calculator", href: "/moving-cost-calculator" },
  { name: "Areas Covered", href: "/areas-covered" },
  { name: "Vs AnyVan", href: "/vs-anyvan" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
  { name: "For Movers", href: "/for-businesses" },
  { name: "Why Join", href: "/why-join" },
  { name: "Apply to Join", href: "/apply-to-join" },
];

// Group locations by region
function groupLocationsByRegion() {
  const regions: Record<string, { name: string; slug: string }[]> = {};
  for (const loc of LOCATIONS) {
    const region = loc.region || "Other";
    if (!regions[region]) regions[region] = [];
    regions[region].push({ name: loc.name, slug: loc.slug });
  }
  return regions;
}

// Group routes by region pair
function groupRoutesByRegion() {
  const groups: Record<string, { slug: string; label: string; distance: string }[]> = {};
  for (const route of ROUTES) {
    const regionKey = [route.regionA, route.regionB].sort().join(" ↔ ");
    if (!groups[regionKey]) groups[regionKey] = [];
    groups[regionKey].push({
      slug: route.slug,
      label: `${route.cityA} → ${route.cityB}`,
      distance: route.distance,
    });
  }
  return groups;
}

export default function SitemapPage() {
  const locationGroups = groupLocationsByRegion();
  const routeGroups = groupRoutesByRegion();

  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Sitemap</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-[0.9] mb-4">
            Sitemap
          </h1>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto leading-relaxed">
            Browse all pages on Man and Van Club.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-14">

          {/* Key Pages */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-5">Key Pages</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {OTHER_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="text-sm text-primary hover:text-accent transition-colors py-1"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-5">Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="text-sm text-primary hover:text-accent transition-colors py-1"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations by Region */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-5">Locations ({LOCATIONS.length} areas)</h2>
            <div className="space-y-6">
              {Object.entries(locationGroups)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([region, locations]) => (
                <div key={region}>
                  <h3 className="text-sm font-black text-primary/60 uppercase tracking-wide mb-3">{region}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                    {locations
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((loc) => (
                        <Link
                          key={loc.slug}
                          href={`/man-and-van-${loc.slug}`}
                          className="text-xs text-primary hover:text-accent transition-colors py-0.5"
                        >
                          {loc.name}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Routes by Region */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-5">Routes ({ROUTES.length} routes)</h2>
            <div className="space-y-6">
              {Object.entries(routeGroups)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([region, routes]) => (
                <div key={region}>
                  <h3 className="text-sm font-black text-primary/60 uppercase tracking-wide mb-3">{region}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                    {routes.map((route) => (
                      <Link
                        key={route.slug}
                        href={`/routes/${route.slug}`}
                        className="text-xs text-primary hover:text-accent transition-colors py-0.5"
                      >
                        {route.label} <span className="text-primary/40">({route.distance})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-5">Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="text-sm text-primary hover:text-accent transition-colors py-1"
                >
                  {post.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-5">Legal</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-sm text-primary hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-primary hover:text-accent transition-colors">Terms & Conditions</Link>
              <Link href="/cookies" className="text-sm text-primary hover:text-accent transition-colors">Cookie Policy</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
