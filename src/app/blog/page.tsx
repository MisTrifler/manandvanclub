import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Moving Tips & Guides | Man and Van Club Blog",
  description:
    "Practical moving tips, cost guides and area information for house moves, flat moves, student moves and furniture deliveries across the UK.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Moving Tips & Guides | Man and Van Club Blog",
    description: "Practical moving tips, cost guides and area information for house moves, flat moves, student moves and furniture deliveries across the UK.",
    url: `${baseUrl}/blog`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Man and Van Club Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Tips & Guides | Man and Van Club Blog",
    description: "Practical moving tips, cost guides and area information for your move across the UK.",
    images: ["/images/og-homepage.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
  ],
};

const blogPosts = [
  {
    slug: "how-much-does-man-and-van-cost",
    title: "How Much Does a Man and Van Cost in 2026?",
    description:
      "A breakdown of man and van pricing across the UK, from West Midlands to London, including what affects the quote and how to get the best price for your move.",
    date: "2026-07-14",
    readTime: "6 min read",
    category: "Cost Guides",
  },
  {
    slug: "how-to-prepare-for-moving-day",
    title: "How to Prepare for Moving Day: A Complete Checklist",
    description:
      "Everything you need to do before, during and after moving day. From packing order to access notes, this checklist covers the details movers need.",
    date: "2026-07-14",
    readTime: "7 min read",
    category: "Moving Tips",
  },
  {
    slug: "man-and-van-vs-removal-company-guide",
    title: "Man and Van vs Removal Company: Which Is Right for You?",
    description:
      "Understanding when a man and van is the better choice over a full removal company, and when you might need the extra capacity and crew.",
    date: "2026-07-14",
    readTime: "5 min read",
    category: "Guides",
  },
  {
    slug: "student-moving-guide",
    title: "Student Moving Guide: How to Move on a Budget",
    description:
      "Practical advice for university students moving between term-time accommodation, including packing tips, timing and how to keep costs down.",
    date: "2026-07-14",
    readTime: "5 min read",
    category: "Student Moves",
  },
  {
    slug: "what-to-tell-your-mover-before-moving-day",
    title: "What to Tell Your Mover Before Moving Day",
    description:
      "The details that make the difference between a smooth move and a stressful one. Parking, access, stairs, lifts, item sizes and timing explained.",
    date: "2026-07-14",
    readTime: "4 min read",
    category: "Moving Tips",
  },
  {
    slug: "birmingham-postcode-moving-guide",
    title: "Birmingham Postcode Moving Guide",
    description:
      "Each Birmingham B-postcode has different access, parking and route challenges. From B1 city-centre flats to B75 Sutton Coldfield homes — what to tell your mover.",
    date: "2026-07-15",
    readTime: "8 min read",
    category: "Area Guides",
  },
  {
    slug: "london-borough-moving-guide",
    title: "London Borough Moving Guide",
    description:
      "Each London borough has different parking rules, congestion charges and access challenges. From Camden CPZs to Croydon driveways — what to know before you move.",
    date: "2026-07-15",
    readTime: "9 min read",
    category: "Area Guides",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Blog</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            Moving Tips &amp; Guides
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9] mb-6">
            Man and Van Club <span className="text-accent italic">Blog</span>
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Practical moving tips, cost guides and area information to help you plan your move across the UK.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-border p-8 hover:border-accent hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {post.category}
                    </span>
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
            Ready to move?
          </h2>
          <p className="text-text-secondary font-medium max-w-xl mx-auto">
            Submit a free move request and let one verified mover review your details before you decide whether to book.
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
