import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "What Insurance Does Your Man and Van Need? | Man and Van Club",
  description:
    "Goods in Transit, Public Liability, employer's liability — the insurance that movers need and the cover that customers should check before booking. A straightforward guide without the jargon.",
  alternates: {
    canonical: `${baseUrl}/blog/what-insurance-does-your-man-and-van-need`,
  },
  openGraph: {
    title: "What Insurance Does Your Man and Van Need?",
    description: "Goods in Transit, Public Liability, employer's liability — the insurance movers need and customers should check before booking.",
    url: `${baseUrl}/blog/what-insurance-does-your-man-and-van-need`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Man and Van Insurance Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Insurance Does Your Man and Van Need?",
    description: "The insurance movers need and customers should check before booking. No jargon.",
    images: ["/images/og-homepage.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Insurance Does Your Man and Van Need?",
  description: "Goods in Transit, Public Liability, employer's liability — the insurance movers need and customers should check before booking.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/what-insurance-does-your-man-and-van-need`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Insurance", item: `${baseUrl}/blog/what-insurance-does-your-man-and-van-need` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="What Insurance Does Your Man and Van Need?"
        description="The cover movers need and the cover customers should check before booking. No jargon — just what each type does, what it doesn't cover, and how to verify it."
        date="2026-07-15"
        readTime="6 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Insurance is the least exciting part of booking a man and van — until something goes wrong. A dropped TV, a scratched floor, a van breakdown on the motorway — these things happen, and without the right cover, you're left arguing about who pays. This guide explains what insurance matters, what each type actually covers, and what to ask your mover before you book.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">The three types of insurance that matter</h2>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">1. Goods in Transit insurance</h3>
          <p>
            This covers your belongings while they're in the van. If the van is involved in an accident, or your furniture is damaged during loading or unloading, Goods in Transit (GiT) insurance pays out for the damage.
          </p>
          <p>
            <strong className="text-primary">What it covers:</strong> Damage to your items caused by the mover during loading, transit and unloading. This includes items dropped, knocked, or damaged by sudden braking or an accident.
          </p>
          <p>
            <strong className="text-primary">What it doesn't cover:</strong> Items you packed yourself that were already damaged. Items that weren't properly packed (loose in the van, not wrapped). Pairs and sets — if one item from a set is damaged, most policies only pay for that item, not the whole set. Excesses usually apply — the first £100–£250 of any claim comes from you.
          </p>
          <p>
            <strong className="text-primary">Typical cover level:</strong> £10,000–£20,000 per vehicle per incident. Some movers have higher limits, some lower. If you're moving high-value items (antiques, art, expensive electronics), check whether the policy limit is enough.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">2. Public Liability insurance</h3>
          <p>
            This covers damage the mover causes to property that doesn't belong to you. If the mover scratches the hallway of the house you're moving out of, or chips the doorframe of the house you're moving into, Public Liability (PL) covers it.
          </p>
          <p>
            <strong className="text-primary">What it covers:</strong> Third-party property damage caused by the mover during the job. This includes damage to both properties (old and new), damage to shared areas in flats (hallways, lifts, stairwells), and injury to third parties.
          </p>
          <p>
            <strong className="text-primary">What it doesn't cover:</strong> Damage to your own property (that's GiT). Damage caused by you or anyone helping you. Pre-existing damage to either property.
          </p>
          <p>
            <strong className="text-primary">Typical cover level:</strong> £1 million–£5 million. For most domestic moves, £1 million is standard. If you're in a high-value property or moving from a listed building, ask whether the cover level is sufficient.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">3. Employer's Liability insurance</h3>
          <p>
            This is a legal requirement if the mover employs anyone. It covers claims from employees who are injured at work. As a customer, you don't claim on this — it's there to protect the mover's employees. But if a mover doesn't have it and one of their workers is injured on your property, the legal situation gets complicated.
          </p>
          <p>
            <strong className="text-primary">Legal requirement:</strong> £5 million minimum by law. Any business with employees must have it. If your mover is a sole trader with no employees, they don't need it.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Van insurance</h2>
          <p>
            This is the mover's own vehicle insurance. It covers the van itself, not your belongings. If the van breaks down or is stolen, the van insurance pays for the vehicle — not for the delay to your move. Some van insurance policies include hire car cover, which means the mover can get a replacement van quickly. It's worth asking.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What to ask your mover before you book</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">"Do you have Goods in Transit and Public Liability insurance?"</strong> — If the answer is no, or if they're vague about it, find another mover. This is non-negotiable.</li>
            <li><strong className="text-primary">"What's the cover level and excess?"</strong> — A £10,000 GiT policy with a £500 excess is very different from a £20,000 policy with a £100 excess.</li>
            <li><strong className="text-primary">"Does the policy cover high-value items?"</strong> — Most policies have single-item limits. If you're moving a £3,000 TV or a £5,000 piano, check whether the individual item is covered.</li>
            <li><strong className="text-primary">"Can I see the certificate?"</strong> — A legitimate mover won't mind showing you their insurance certificate. If they make excuses, that's a red flag.</li>
            <li><strong className="text-primary">"What's the claims process?"</strong> — Knowing how to make a claim before something goes wrong is better than finding out afterwards.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What isn't covered (that people assume is)</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">Items you packed yourself</strong> — If a box you packed bursts and the contents are damaged, the mover's insurance usually won't pay out. They didn't pack it, so they can't be held responsible for the packing quality.</li>
            <li><strong className="text-primary">Pre-existing damage</strong> — If your sofa already had a tear in it, or your TV stand was cracked before the move, that's not a valid claim. Take photos of everything before moving day — it protects both you and the mover.</li>
            <li><strong className="text-primary">Mechanical or electrical damage</strong> — If your washing machine worked before the move but doesn't work after, proving it was caused by the move (rather than the machine's age) is difficult. Most policies exclude electrical and mechanical derangement.</li>
            <li><strong className="text-primary">Jewellery, cash and documents</strong> — Almost never covered by Goods in Transit. Carry these yourself.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Your own home insurance</h2>
          <p>
            Check whether your home contents insurance covers items in transit. Some policies include "removals cover" as standard; others don't. If it does, it might cover the gap between what the mover's insurance pays and the actual value of the item — but only if the mover's insurance is the first point of claim.
          </p>
          <p>
            Call your insurer before moving day and ask two questions: "Am I covered for items in transit during a house move?" and "Is there a limit on high-value items?" Having the answer before something goes wrong saves a lot of stress.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">On Man and Van Club</h2>
          <p>
            Every mover on Man and Van Club must hold valid Goods in Transit and Public Liability insurance before they can access customer requests. When you receive a quote, you can ask the mover for their insurance details directly. We don't hold the certificates ourselves — the mover provides them — but the requirement is a condition of using the platform.
          </p>
          <p>
            If you're planning a move, <Link href="/get-started" className="text-accent font-bold hover:underline">submit your details</Link> and ask the quoting mover about their cover levels. It's a perfectly reasonable question and any legitimate mover will answer it without hesitation.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Goods in Transit covers your items in the van. Public Liability covers damage to property. Both are essential.</li>
              <li>Ask for the cover level and excess before you book. Not all policies are equal.</li>
              <li>Items you pack yourself may not be covered if the box fails.</li>
              <li>Take photos of everything before the move — it's your proof if you need to claim.</li>
              <li>Check your own home insurance for removals cover too. It can plug the gap.</li>
              <li>Carry jewellery, cash and documents yourself. They're almost never covered in transit.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
