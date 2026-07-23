import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van vs Removal Company | Man and Van Club",
  description:
    "Understand when a man and van is the better choice over a full removal company, and when you might need the extra capacity, crew and packing services.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-vs-removal-company-guide`,
  },
  openGraph: {
    title: "Man and Van vs Removal Company: Which Is Right for You?",
    description: "Understand when a man and van is the better choice over a full removal company, and when you might need the extra capacity, crew and packing services.",
    url: `${baseUrl}/blog/man-and-van-vs-removal-company-guide`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van vs Removal Company")}&subtitle=${encodeURIComponent("Which Should You Choose?")}`, width: 1200, height: 630, alt: "Man and Van vs Removal Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van vs Removal Company: Which Is Right for You?",
    description: "Understand when a man and van is the better choice over a full removal company.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van vs Removal Company")}&subtitle=${encodeURIComponent("Which Should You Choose?")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van vs Removal Company: Which Is Right for You?",
  description: "Understand when a man and van is the better choice over a full removal company, and when you might need the extra capacity.",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-vs-removal-company-guide`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van vs Removal Company", item: `${baseUrl}/blog/man-and-van-vs-removal-company-guide` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van vs Removal Company"
        description="Understand when a man and van is the better choice, and when you might need a full removal company with extra crew and packing services."
        date="2026-07-14"
        readTime="5 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            The choice between a man and van and a removal company usually comes down to the size of your move, your budget and how much help you need. Here is a straightforward comparison to help you decide.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What is a man and van?</h2>
          <p>
            A man and van is typically one driver with a van (usually a Luton or Sprinter-sized vehicle) who helps you load, transport and unload your belongings. Some man and van operators work with a second person. The service is flexible — it can cover anything from a single-item furniture collection to a full house move.
          </p>
          <p>
            Man and van services are often independent operators or small teams. They tend to be more affordable than full removal companies and are well-suited to smaller moves, same-day requests and local jobs.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What is a removal company?</h2>
          <p>
            A removal company is a larger operation with a bigger vehicle (or fleet of vehicles), a team of movers, and often additional services like packing, storage and insurance upgrades. Removal companies typically handle larger house moves and may offer a more structured process with surveys, inventories and fixed-price quotes.
          </p>
          <p>
            Removal companies tend to cost more because you are paying for more people, more capacity and more services. They are the right choice for very large moves, long-distance relocations, or when you want someone else to handle the packing.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">When a man and van is the better choice</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Studio or one-bedroom flat moves</strong> — A man and van can handle this in 2–3 hours.</li>
            <li><strong className="text-primary">Single-item collections</strong> — Sofa, bed, appliance or marketplace purchase. A removal company is overkill.</li>
            <li><strong className="text-primary">Student moves</strong> — Boxes, bags and a few small furniture items between term-time accommodation.</li>
            <li><strong className="text-primary">Same-day or short-notice moves</strong> — Man and van operators can often respond faster than a removal company with a booked schedule.</li>
            <li><strong className="text-primary">Local moves within the same city</strong> — Short distances mean lower costs and faster turnaround.</li>
            <li><strong className="text-primary">Budget-conscious moves</strong> — If you can pack yourself and help with loading, a man and van keeps costs down.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">When a removal company might be better</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Large family homes</strong> — Four or more bedrooms with a lot of furniture, white goods and garden items.</li>
            <li><strong className="text-primary">You want packing included</strong> — Removal companies often offer full or partial packing services.</li>
            <li><strong className="text-primary">Long-distance moves</strong> — Cross-country or international relocations with complex logistics.</li>
            <li><strong className="text-primary">High-value items</strong> — Art, antiques, wine collections or specialist equipment that needs custom packing and higher insurance cover.</li>
            <li><strong className="text-primary">You need storage</strong> — Many removal companies offer containerised storage as part of the package.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Price comparison</h2>
          <p>
            As a rough guide:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Man and van</strong> — from £19/hr (or from £26/hr in London). A typical one-bedroom flat move costs around £100–£165.</li>
            <li><strong className="text-primary">Removal company</strong> — typically £300–£800+ for a one to two-bedroom move, depending on distance and services included.</li>
          </ul>
          <p>
            The price gap narrows for larger moves, but a man and van is almost always cheaper for anything up to a two-bedroom house if you can handle your own packing.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How Man and Van Club works</h2>
          <p>
            Man and Van Club is a marketplace — not a removal company. You submit your move details for free, a verified independent mover reviews them, and you receive a quote before deciding whether to book. Your details are not sent to multiple companies, and your contact information stays private until you accept a quote.
          </p>
          <p>
            This means you get the personal service of an independent man and van, with the reassurance that the mover has been verified and the transaction is handled through a secure platform.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Submit your move request</h3>
            <p className="mb-4">
              Whether you need a man and van for a single item or a full house move, submit your details and a verified mover will review them. Free to submit — you only pay if you accept the quote.
            </p>
            <Link
              href="/get-started"
              className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3"
            >
              Start Free Request
            </Link>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-black text-primary uppercase tracking-widest mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/man-and-van-vs-removal-company" className="text-sm text-accent font-bold hover:underline">Full Comparison Guide</Link>
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
                <Link href="/house-removals" className="text-sm text-accent font-bold hover:underline">House Removals</Link>
                <Link href="/flat-removals" className="text-sm text-accent font-bold hover:underline">Flat Moves</Link>
                <Link href="/furniture-delivery" className="text-sm text-accent font-bold hover:underline">Furniture Delivery</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
