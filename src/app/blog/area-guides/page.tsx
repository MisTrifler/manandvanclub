import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Area Moving Guides | Man and Van Club Blog",
  description:
    "Local moving guides for UK cities and boroughs. Parking rules, access challenges, Clean Air Zones and route tips for each area.",
  alternates: {
    canonical: `${baseUrl}/blog/area-guides`,
  },
  openGraph: {
    title: "Area Moving Guides | Man and Van Club Blog",
    description: "Local moving guides for UK cities — parking, access, Clean Air Zones and route tips.",
    url: `${baseUrl}/blog/area-guides`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Area Moving Guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Area Moving Guides | Man and Van Club Blog",
    description: "Local moving guides for UK cities — parking, access, Clean Air Zones and route tips.",
    images: ["/images/og-homepage.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Area Guides", item: `${baseUrl}/blog/area-guides` },
  ],
};

const areaPosts = [
  {
    slug: "birmingham-postcode-moving-guide",
    title: "Birmingham Postcode Moving Guide",
    description: "Each Birmingham B-postcode has different access, parking and route challenges. From B1 city-centre flats to B75 Sutton Coldfield homes — what to tell your mover.",
    date: "2026-07-15",
    readTime: "8 min read",
  },
  {
    slug: "london-borough-moving-guide",
    title: "London Borough Moving Guide",
    description: "Each London borough has different parking rules, congestion charges and access challenges. From Camden CPZs to Croydon driveways — what to know before you move.",
    date: "2026-07-15",
    readTime: "9 min read",
  },
];

export default function AreaGuidesPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Area Guides</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            Area Guides
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9] mb-6">
            Area <span className="text-accent italic">Moving</span> Guides
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Parking rules, access challenges, Clean Air Zones and route tips for UK cities and boroughs.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areaPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-border p-8 hover:border-accent hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[10px] text-primary/40 font-bold">
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-primary group-hover:text-accent transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                    Read article <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Also browse all areas */}
          <div className="text-center mt-12">
            <Link href="/areas-covered" className="text-accent font-black text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              Browse all 174 areas covered <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">
            Moving to a new area?
          </h2>
          <p className="text-text-secondary font-medium max-w-xl mx-auto">
            Submit a free move request with your postcodes and item list. A verified mover reviews the specifics before quoting.
          </p>
          <Link
            href="/get-started"
            className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3"
          >
            Start Free Request <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
