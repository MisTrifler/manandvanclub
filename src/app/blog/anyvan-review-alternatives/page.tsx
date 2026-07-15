import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "AnyVan Review: Is It Worth It? Plus Cheaper Alternatives | Man and Van Club",
  description:
    "An honest look at how AnyVan works — the pricing model, what customers say, where it works well and where it falls short. Plus a look at how the marketplace model works differently and when it might be the better option.",
  alternates: {
    canonical: `${baseUrl}/blog/anyvan-review-alternatives`,
  },
  openGraph: {
    title: "AnyVan Review: Is It Worth It? Plus Cheaper Alternatives",
    description: "An honest look at how AnyVan works, what customers say, and when a marketplace model might be the better option.",
    url: `${baseUrl}/blog/anyvan-review-alternatives`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("AnyVan Review & Alternatives")}&subtitle=${encodeURIComponent("Compare Man and Van Services")}`, width: 1200, height: 630, alt: "AnyVan Review & Alternatives" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnyVan Review: Is It Worth It? Plus Cheaper Alternatives",
    description: "An honest look at how AnyVan works and when a marketplace model might be better.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("AnyVan Review & Alternatives")}&subtitle=${encodeURIComponent("Compare Man and Van Services")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AnyVan Review: Is It Worth It? Plus Cheaper Alternatives",
  description: "An honest look at how AnyVan works — the pricing model, customer feedback, and when a marketplace model might be better.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/anyvan-review-alternatives`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "AnyVan Review", item: `${baseUrl}/blog/anyvan-review-alternatives` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="AnyVan Review: Is It Worth It?"
        description="An honest look at how AnyVan works, what customers say, where it falls short, and when a marketplace model might be the better option."
        date="2026-07-15"
        readTime="8 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            AnyVan is one of the best-known names in UK moving services. If you've searched for a man and van online, you've almost certainly seen their ads. But how does it actually work, what do real customers think, and is it the right choice for your move? This is an honest, transparent look — including where our own service works differently.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How AnyVan works</h2>
          <p>
            AnyVan is a lead-generation and booking platform. You enter your move details on their website, they generate a price based on their algorithm, and they allocate the job to a transport partner who carries it out. You don't choose the mover — AnyVan does.
          </p>
          <p>
            The pricing is generally competitive for standard moves because they use return-journey logistics — your move is combined with other jobs going in the same direction to reduce empty running. This keeps the headline price down but means your delivery window is often wider because the driver is doing multiple drops.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Where AnyVan works well</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single-item moves</strong> — A sofa, a bed, a washing machine. AnyVan's pricing is usually reasonable for these, especially if you're flexible on timing.</li>
            <li><strong className="text-primary">Long-distance moves</strong> — Because they combine jobs on return routes, longer moves can work out cheaper than a dedicated man and van.</li>
            <li><strong className="text-primary">Convenience</strong> — The booking process is quick. Enter your details, get a price, book it. You don't have to phone around.</li>
            <li><strong className="text-primary">Insurance cover</strong> — AnyVan provides goods-in-transit cover as standard, which gives some peace of mind.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Common complaints about AnyVan</h2>
          <p>
            The most frequent complaints from AnyVan customers tend to fall into a few categories:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">You don't know who your mover is</strong> — The driver is allocated to you, not chosen by you. Some customers have reported drivers arriving late, being unfamiliar with the area, or not matching the professional standard they expected.</li>
            <li><strong className="text-primary">Time windows can be wide</strong> — Because jobs are combined, you might be given a delivery window of several hours. That's fine if you're flexible, frustrating if you're waiting outside a house with the keys.</li>
            <li><strong className="text-primary">Price changes after booking</strong> — Some customers report being charged extra on the day because the inventory didn't match what was booked, or because access was more difficult than described. This happens with every moving service, but it comes up frequently in AnyVan reviews.</li>
            <li><strong className="text-primary">Customer service</strong> — When something goes wrong, you're dealing with a platform, not the mover. The communication chain is customer → AnyVan customer service → transport partner → driver. That adds time and can feel impersonal.</li>
            <li><strong className="text-primary">No direct relationship with the mover</strong> — If you want to ask the driver a question, check their insurance details, or discuss the route, you go through AnyVan's support team rather than speaking to the person doing the job.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How the marketplace model works differently</h2>
          <p>
            Man and Van Club operates on a different model. Instead of generating a price and allocating a driver, you submit your move details and a single verified mover reviews them before quoting. The key differences:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">The mover reviews your job before quoting</strong> — They see your postcodes, item list, access notes and preferred dates. The quote is based on the actual job, not an algorithm's estimate. If something needs adjusting, they tell you before the move, not on the day.</li>
            <li><strong className="text-primary">One mover, not a pool</strong> — Your request goes to one verified mover, not a panel of competing companies. Your contact details stay protected until you accept a quote, so you're not getting calls from five different firms.</li>
            <li><strong className="text-primary">Direct communication after booking</strong> — Once you've accepted a quote, you deal with the mover directly. If you need to change the time, add an item, or ask about parking at the new address, you speak to the person who's actually doing the job.</li>
            <li><strong className="text-primary">No combined loads</strong> — The van is for your move. Your furniture isn't sharing space with someone else's sofa from three towns over.</li>
          </ul>
          <p>
            For a more detailed comparison, see our <Link href="/vs-anyvan" className="text-accent font-bold hover:underline">Man and Van Club vs AnyVan</Link> page.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">When to choose which</h2>
          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border space-y-6">
            <div>
              <h3 className="text-lg font-black text-primary mb-2">AnyVan might be better if:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>You're moving a single item and you're flexible on delivery time.</li>
                <li>You want the absolute cheapest option for a long-distance single-item delivery.</li>
                <li>You don't mind not knowing who your mover is in advance.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-black text-primary mb-2">A marketplace model might be better if:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>You want a mover who reviews your specific job details before quoting.</li>
                <li>You value direct communication with the person doing the move.</li>
                <li>You want your furniture to be the only load in the van.</li>
                <li>You want a precise time rather than a multi-hour delivery window.</li>
                <li>You're doing a full house or flat move where access details matter.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Other alternatives worth considering</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">Local man and van (found via search or recommendation)</strong> — Often the cheapest option for local moves, but you need to check insurance, reviews and references yourself. No platform protection if something goes wrong.</li>
            <li><strong className="text-primary">Removal company</strong> — Better for large house moves (4+ bedrooms) where you need a full crew and a large vehicle. More expensive but more comprehensive. See our <Link href="/blog/man-and-van-vs-removal-company-guide" className="text-accent font-bold hover:underline">man and van vs removal company guide</Link> for a full comparison.</li>
            <li><strong className="text-primary">Hire-a-van (self-drive)</strong> — The cheapest option by far, but you're doing all the loading, driving and unloading yourself. Only makes sense if you're fit, confident driving a larger vehicle, and have willing helpers.</li>
          </ul>

          <p>
            Whichever option you go for, the most important thing is to give accurate details upfront — postcodes, item list, access notes, parking. A precise request gets a more accurate quote, whether it's through AnyVan, a marketplace, or a local mover you found on Yell.
          </p>
          <p>
            If you'd like to try the marketplace model, <Link href="/get-started" className="text-accent font-bold hover:underline">submit a free move request</Link> and a verified mover will review your details before quoting.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>AnyVan works well for single-item and long-distance moves where flexibility on timing keeps the price down.</li>
              <li>Common complaints centre on not knowing your mover, wide delivery windows, and price adjustments on the day.</li>
              <li>The marketplace model gives you a mover who reviews your job before quoting and direct communication after booking.</li>
              <li>Choose based on what matters most to you: lowest price, convenience, or direct control.</li>
              <li>Whichever platform you use, give accurate details — it's the single biggest factor in getting a fair quote.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
