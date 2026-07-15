import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Moving Cost Guides | Man and Van Club Blog",
  description:
    "Practical cost guides for UK house moves, flat moves and furniture deliveries. Real pricing data based on actual man and van quotes — not inflated estimates.",
  alternates: {
    canonical: `${baseUrl}/blog/cost-guides`,
  },
  openGraph: {
    title: "Moving Cost Guides | Man and Van Club Blog",
    description: "Real pricing data for UK moves — based on actual man and van quotes.",
    url: `${baseUrl}/blog/cost-guides`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Moving Cost Guides")}&subtitle=${encodeURIComponent("UK Man and Van Pricing Advice")}`, width: 1200, height: 630, alt: "Moving Cost Guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Cost Guides | Man and Van Club Blog",
    description: "Real pricing data for UK moves — based on actual man and van quotes.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Moving Cost Guides")}&subtitle=${encodeURIComponent("UK Man and Van Pricing Advice")}`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Cost Guides", item: `${baseUrl}/blog/cost-guides` },
  ],
};

const costPosts = [
  {
    slug: "how-much-does-man-and-van-cost",
    title: "How Much Does a Man and Van Cost in 2026?",
    description: "A breakdown of man and van pricing across the UK, from West Midlands to London, including what affects the quote and how to get the best price for your move.",
    date: "2026-07-14",
    readTime: "6 min read",
  },
  {
    slug: "what-affects-man-and-van-prices",
    title: "What Affects Man and Van Prices?",
    description: "The seven factors that determine your man and van quote — distance, volume, access, stairs, timing, location and day of the week.",
    date: "2026-07-15",
    readTime: "5 min read",
  },
  {
    slug: "average-cost-3-bedroom-house-move",
    title: "Average Cost of a 3-Bedroom House Move in the UK (2026)",
    description: "Real cost breakdowns for moving a 3-bed house — by distance, region and access type. Based on actual man and van quotes, not inflated estimates.",
    date: "2026-07-15",
    readTime: "7 min read",
  },
];

export default function CostGuidesPage() {
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
              <span className="text-primary font-bold">Cost Guides</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            Cost Guides
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9] mb-6">
            Moving <span className="text-accent italic">Cost</span> Guides
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Real pricing data for UK house moves, flat moves and furniture deliveries — based on actual quotes, not inflated estimates.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costPosts.map((post) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">
            Want a real quote?
          </h2>
          <p className="text-text-secondary font-medium max-w-xl mx-auto">
            Submit a free move request and let a verified mover review your details before quoting. No algorithms, no ballpark figures.
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
