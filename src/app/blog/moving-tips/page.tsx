import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Moving Tips & Preparation Guides | Man and Van Club Blog",
  description:
    "Practical moving tips, packing guides and preparation checklists. Room-by-room packing, what to tell your mover, and how to make moving day run smoothly.",
  alternates: {
    canonical: `${baseUrl}/blog/moving-tips`,
  },
  openGraph: {
    title: "Moving Tips & Preparation Guides | Man and Van Club Blog",
    description: "Practical moving tips, packing guides and preparation checklists for UK moves.",
    url: `${baseUrl}/blog/moving-tips`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Moving Tips" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Tips & Preparation Guides | Man and Van Club Blog",
    description: "Practical moving tips, packing guides and preparation checklists for UK moves.",
    images: ["/images/og-homepage.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Moving Tips", item: `${baseUrl}/blog/moving-tips` },
  ],
};

const tipsPosts = [
  {
    slug: "how-to-prepare-for-moving-day",
    title: "How to Prepare for Moving Day: A Complete Checklist",
    description: "Everything you need to do before, during and after moving day. From packing order to access notes, this checklist covers the details movers need.",
    date: "2026-07-14",
    readTime: "7 min read",
  },
  {
    slug: "what-to-tell-your-mover-before-moving-day",
    title: "What to Tell Your Mover Before Moving Day",
    description: "The details that make the difference between a smooth move and a stressful one. Parking, access, stairs, lifts, item sizes and timing explained.",
    date: "2026-07-14",
    readTime: "4 min read",
  },
  {
    slug: "how-to-pack-for-a-house-move",
    title: "How to Pack for a House Move: Room-by-Room Guide",
    description: "A room-by-room packing guide covering kitchen, bedroom, living room, bathroom and more. What to pack first, what to leave to the movers, and the mistakes that slow everything down.",
    date: "2026-07-15",
    readTime: "9 min read",
  },
  {
    slug: "do-i-need-to-empty-drawers-for-movers",
    title: "Do I Need to Empty Drawers for Movers?",
    description: "The honest answer depends on the furniture type. Here's what to empty, what you can leave, and why getting it wrong matters.",
    date: "2026-07-15",
    readTime: "5 min read",
  },
  {
    slug: "house-moving-checklist-uk",
    title: "Ultimate House Moving Checklist UK 2026",
    description: "Every task from 8 weeks before moving day to the day you collect the keys — conveyancing, packing, utilities, council tax and all the admin in between.",
    date: "2026-07-15",
    readTime: "10 min read",
  },
];

export default function MovingTipsPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Moving Tips</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20 mb-6">
            Moving Tips
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9] mb-6">
            Moving <span className="text-accent italic">Tips</span> &amp; Guides
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Practical packing guides, preparation checklists and tips to make your move run smoothly.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipsPosts.map((post) => (
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
            Ready to move?
          </h2>
          <p className="text-text-secondary font-medium max-w-xl mx-auto">
            Submit a free move request and let a verified mover review your details before you decide whether to book.
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
