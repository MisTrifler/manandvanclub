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
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Club Blog")}&subtitle=${encodeURIComponent("Moving Tips, Guides & Cost Advice")}`, width: 1200, height: 630, alt: "Man and Van Club Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Tips & Guides | Man and Van Club Blog",
    description: "Practical moving tips, cost guides and area information for your move across the UK.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Club Blog")}&subtitle=${encodeURIComponent("Moving Tips, Guides & Cost Advice")}`],
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
  {
    slug: "same-day-move-guide",
    title: "Same-Day Man and Van Guide",
    description:
      "When you need a mover today rather than next week. What same-day moves involve, how pricing works, and what to have ready before you submit a request.",
    date: "2026-07-15",
    readTime: "4 min read",
    category: "Guides",
  },
  {
    slug: "what-affects-man-and-van-prices",
    title: "What Affects Man and Van Prices?",
    description:
      "The seven factors that determine your man and van quote — distance, volume, access, stairs, timing, location and day of the week. Understanding them helps you get a fairer price.",
    date: "2026-07-15",
    readTime: "5 min read",
    category: "Cost Guides",
  },
  {
    slug: "how-to-pack-for-a-house-move",
    title: "How to Pack for a House Move: Room-by-Room Guide",
    description:
      "A room-by-room packing guide covering kitchen, bedroom, living room, bathroom and more. What to pack first, what to leave to the movers, and the mistakes that slow everything down.",
    date: "2026-07-15",
    readTime: "9 min read",
    category: "Moving Tips",
  },
  {
    slug: "average-cost-3-bedroom-house-move",
    title: "Average Cost of a 3-Bedroom House Move in the UK (2026)",
    description:
      "Real cost breakdowns for moving a 3-bed house — by distance, region and access type. Based on actual man and van quotes, not inflated estimates from removal company websites.",
    date: "2026-07-15",
    readTime: "7 min read",
    category: "Cost Guides",
  },
  {
    slug: "do-i-need-to-empty-drawers-for-movers",
    title: "Do I Need to Empty Drawers for Movers?",
    description:
      "Can you leave clothes in drawers when moving house? The honest answer depends on the furniture type. Here's what to empty, what you can leave, and why getting it wrong matters.",
    date: "2026-07-15",
    readTime: "5 min read",
    category: "Moving Tips",
  },
  {
    slug: "how-to-move-a-piano-without-damage",
    title: "How to Move a Piano Without Damage",
    description:
      "Moving a piano is not like moving a sofa. This guide covers uprights, digital pianos and grands — what can go wrong, how professionals do it, and why this is one job you shouldn't attempt alone.",
    date: "2026-07-15",
    readTime: "7 min read",
    category: "Guides",
  },
  {
    slug: "office-relocation-checklist",
    title: "Office Relocation Checklist: What to Plan Before Moving Day",
    description:
      "A practical office relocation checklist for small and medium businesses. IT, furniture, comms, staff logistics and the things that always get forgotten.",
    date: "2026-07-15",
    readTime: "8 min read",
    category: "Guides",
  },
  {
    slug: "anyvan-review-alternatives",
    title: "AnyVan Review: Is It Worth It? Plus Cheaper Alternatives",
    description:
      "An honest look at how AnyVan works — the pricing model, what customers say, where it works well and where a marketplace model might be the better option.",
    date: "2026-07-15",
    readTime: "8 min read",
    category: "Reviews",
  },
  {
    slug: "what-insurance-does-your-man-and-van-need",
    title: "What Insurance Does Your Man and Van Need?",
    description:
      "Goods in Transit, Public Liability, employer's liability — the insurance movers need and the cover customers should check before booking. No jargon.",
    date: "2026-07-15",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    slug: "house-moving-checklist-uk",
    title: "Ultimate House Moving Checklist UK 2026",
    description:
      "The complete UK house moving checklist — from 8 weeks before to the day you collect the keys. Conveyancing, packing, utilities, council tax and every admin task in between.",
    date: "2026-07-15",
    readTime: "10 min read",
    category: "Moving Tips",
  },
  {
    slug: "man-and-van-birmingham-prices-how-to-book",
    title: "Man and Van Birmingham: Prices & How to Book (2026)",
    description:
      "Current Birmingham man and van prices, what affects the cost, local area tips and how to book a verified mover for your next move in Birmingham.",
    date: "2026-07-16",
    readTime: "7 min read",
    category: "Cost Guides",
  },
  {
    slug: "man-and-van-glasgow-prices-how-to-book",
    title: "Man and Van Glasgow: Prices & How to Book (2026)",
    description:
      "Current Glasgow man and van prices, what affects the cost — tenements, permits and the M8 — and how to book a verified mover for your next move in Glasgow.",
    date: "2026-07-23",
    readTime: "7 min read",
    category: "Cost Guides",
  },
  {
    slug: "man-and-van-walsall-prices-how-to-book",
    title: "Man and Van Walsall: Prices & How to Book (2026)",
    description:
      "Current Walsall man and van prices, local area tips, how to book a verified mover and what to have ready before your move day in Walsall.",
    date: "2026-07-16",
    readTime: "6 min read",
    category: "Cost Guides",
  },
  {
    slug: "man-and-van-london-prices-how-to-book",
    title: "Man and Van London: Prices & How to Book (2026)",
    description:
      "Current London man and van prices by borough, what affects the cost, how to book a verified mover and what to know before moving in London.",
    date: "2026-07-16",
    readTime: "8 min read",
    category: "Cost Guides",
  },
  {
    slug: "man-and-van-manchester-prices-how-to-book",
    title: "Man and Van Manchester: Prices & How to Book (2026)",
    description:
      "Current Manchester man and van prices, what affects the cost, how to book a verified mover and what to have ready before your move in Manchester.",
    date: "2026-07-16",
    readTime: "7 min read",
    category: "Cost Guides",
  },
  {
    slug: "man-and-van-leeds-prices-how-to-book",
    title: "Man and Van Leeds: Prices & How to Book (2026)",
    description:
      "Current Leeds man and van prices, what affects the cost, how to book a verified mover and what to have ready before your move in Leeds.",
    date: "2026-07-16",
    readTime: "6 min read",
    category: "Cost Guides",
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
