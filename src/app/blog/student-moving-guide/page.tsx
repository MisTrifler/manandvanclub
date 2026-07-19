import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Student Moving Guide: How to Move on a Budget | Man and Van Club",
  description:
    "Practical advice for university students moving between term-time accommodation, including packing tips, timing, and how to keep man and van costs down.",
  alternates: {
    canonical: `${baseUrl}/blog/student-moving-guide`,
  },
  openGraph: {
    title: "Student Moving Guide: How to Move on a Budget",
    description: "Practical advice for university students moving between term-time accommodation, including packing tips, timing, and how to keep man and van costs down.",
    url: `${baseUrl}/blog/student-moving-guide`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Student Moving Guide")}&subtitle=${encodeURIComponent("Affordable Moves for Students")}`, width: 1200, height: 630, alt: "Student Moving Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Moving Guide: How to Move on a Budget",
    description: "Practical advice for university students moving between term-time accommodation, including packing tips and how to keep costs down.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Student Moving Guide")}&subtitle=${encodeURIComponent("Affordable Moves for Students")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Student Moving Guide: How to Move on a Budget",
  description: "Practical advice for university students moving between term-time accommodation, including packing tips and how to keep costs down.",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/student-moving-guide`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Student Moving Guide", item: `${baseUrl}/blog/student-moving-guide` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Student Moving Guide"
        description="Practical advice for university students moving between term-time accommodation — packing tips, timing, and how to keep costs down."
        date="2026-07-14"
        readTime="5 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Moving between student houses, halls and home is a regular part of university life. The good news is that student moves are usually small and straightforward — boxes, bags, a few small furniture items and a lot of textbooks. The challenge is doing it affordably and without losing anything in the process.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Typical student move costs</h2>
          <p>
            A student move — typically boxes, suitcases and small furniture from a shared house or halls — usually takes 1–2 hours with a man and van. At £19 per hour (or £55 in London), that means a total cost of roughly £19–£110 (or £55–£120 in London).
          </p>
          <p>
            Split between housemates, this can be very affordable. If three of you are moving from the same house on the same day, you could share the van and split the cost three ways.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Packing tips for students</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Use suitcases first</strong> — They are free, sturdy and easy to carry. Reserve them for heavy items like books.</li>
            <li><strong className="text-primary">Bin bags for soft items</strong> — Bedding, clothes and towels travel well in heavy-duty bin bags. Label them clearly.</li>
            <li><strong className="text-primary">Ask local shops for boxes</strong> — Supermarkets and off-licences often have sturdy boxes they are happy to give away.</li>
            <li><strong className="text-primary">Wrap fragile items in clothes</strong> — Plates, mugs and glasses can be wrapped in t-shirts and jumpers instead of bubble wrap.</li>
            <li><strong className="text-primary">Label everything with your name and new room</strong> — Especially in shared houses where multiple people are moving at once.</li>
            <li><strong className="text-primary">Take photos of shared items</strong> — If you are splitting furniture with housemates, photograph the condition before the move in case of disputes.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Timing your student move</h2>
          <p>
            Student move dates cluster around the end of June and start of September. These are the busiest periods for man and van operators in university cities like Birmingham, Nottingham, Leeds and London. To keep costs down:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Book early</strong> — Movers get booked up quickly around term-end. Submit your request at least a week in advance.</li>
            <li><strong className="text-primary">Move mid-week</strong> — Tuesday to Thursday is less busy and may be easier to schedule.</li>
            <li><strong className="text-primary">Avoid the last weekend of June</strong> — This is the single busiest weekend for student moves in the UK.</li>
            <li><strong className="text-primary">Coordinate with housemates</strong> — If you can all move on the same day from the same address, you can share the van and the cost.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Access notes that help your mover</h2>
          <p>
            Student accommodation often has access challenges that affect how long the move takes. Tell your mover about:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking</strong> — Is there a parking space near the building, or will the van need to park on the street? Are there permit-only zones?</li>
            <li><strong className="text-primary">Stairs vs lifts</strong> — Which floor are you on? Is there a lift, and is it big enough for boxes and furniture?</li>
            <li><strong className="text-primary">Narrow corridors</strong> — Halls of residence and older terraced houses often have tight corners and narrow hallways.</li>
            <li><strong className="text-primary">Key fobs or entry codes</strong> — If the building requires fob access or has a gate code, share this in advance.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What not to move</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Perishable food</strong> — Use it up or bin it. Do not put open food in the van.</li>
            <li><strong className="text-primary">Broken furniture</strong> — If it was falling apart in your old house, do not pay to move it to the new one.</li>
            <li><strong className="text-primary">Other people&apos;s stuff</strong> — Make sure everything you are moving belongs to you or your housemates, not the landlord.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Student moves on Man and Van Club</h2>
          <p>
            Man and Van Club lets you submit your move details for free. A verified mover reviews your postcodes, item list and access notes, then sends a quote. Your contact details stay private until you accept the quote. This means no unwanted calls from multiple companies — just one quote from one verified mover.
          </p>
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 mt-4 flex items-start gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-sm font-black text-primary">£12 off student moves</p>
              <p className="text-xs text-text-secondary mt-0.5">UNiDAYS-verified students get £12 off. Open the <strong className="text-accent">UNiDAYS app</strong>, find Man and Van Club, and copy the promo code into the discount field when you submit your student move request.</p>
            </div>
          </div>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Submit your student move request</h3>
            <p className="mb-4">
              Enter your postcodes, item list and access notes. A verified mover reviews the details and sends a quote. Free to submit — you only pay a booking deposit if you accept.
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
                <Link href="/student-removals" className="text-sm text-accent font-bold hover:underline">Student Moves</Link>
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
                <Link href="/man-and-van-birmingham" className="text-sm text-accent font-bold hover:underline">Birmingham</Link>
                <Link href="/man-and-van-coventry" className="text-sm text-accent font-bold hover:underline">Coventry</Link>
                <Link href="/man-and-van-nottingham" className="text-sm text-accent font-bold hover:underline">Nottingham</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
