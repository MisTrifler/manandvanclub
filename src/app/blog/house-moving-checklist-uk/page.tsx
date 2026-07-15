import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Ultimate House Moving Checklist UK 2026 | Man and Van Club",
  description:
    "The complete UK house moving checklist for 2026 — from 8 weeks out to the day you collect the keys. Covers conveyancing, packing, utilities, council tax, school places and every admin task between exchange and completion.",
  alternates: {
    canonical: `${baseUrl}/blog/house-moving-checklist-uk`,
  },
  openGraph: {
    title: "Ultimate House Moving Checklist UK 2026",
    description: "The complete UK house moving checklist — from 8 weeks before to the day you collect the keys. Every admin task covered.",
    url: `${baseUrl}/blog/house-moving-checklist-uk`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "House Moving Checklist UK" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate House Moving Checklist UK 2026",
    description: "The complete UK house moving checklist — from 8 weeks before to moving day. Every admin task covered.",
    images: ["/images/og-homepage.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Ultimate House Moving Checklist UK 2026",
  description: "The complete UK house moving checklist for 2026 — from 8 weeks out to moving day. Every admin task between exchange and completion.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/house-moving-checklist-uk`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "House Moving Checklist", item: `${baseUrl}/blog/house-moving-checklist-uk` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Ultimate House Moving Checklist UK 2026"
        description="Every task from 8 weeks before moving day to the moment you collect the keys — conveyancing, packing, utilities, council tax and all the admin in between."
        date="2026-07-15"
        readTime="10 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Moving house in the UK involves more admin than most people expect. It's not just packing boxes and booking a van — there's conveyancing, mortgage offers, council tax, utility transfers, school places, postal redirects and a dozen other things that fall through the cracks if you don't write them down. This checklist covers it all.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">8 weeks before: the early admin</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Instruct a conveyancer or solicitor</strong> — Get quotes from at least three. Check they're on your mortgage lender's approved panel. Ask for a fixed-fee quote including disbursements so there are no surprises.</li>
            <li><strong className="text-primary">Start the mortgage application</strong> — If you're getting a mortgage, start the application now. Lenders can take 4–6 weeks to issue an offer, and the survey needs to be booked too.</li>
            <li><strong className="text-primary">Book a survey</strong> — Don't rely on the mortgage valuation survey — it's for the lender's benefit, not yours. Pay for a HomeBuyer Report or a full structural survey depending on the property's age and condition.</li>
            <li><strong className="text-primary">Start decluttering</strong> — Every room. If you haven't used it in a year, sell it, donate it or bin it. Less to move means a cheaper, faster move.</li>
            <li><strong className="text-primary">Research movers</strong> — Get quotes from at least three movers. Check they have Goods in Transit and Public Liability insurance. Ask whether the quote is fixed or hourly.</li>
            <li><strong className="text-primary">Check school places</strong> — If you have children, contact the local authority about school place transfers. Popular schools fill up fast, especially if you're moving mid-year.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">6 weeks before: lock in the logistics</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Book your mover</strong> — Once you have a provisional moving date, book it. Good movers get booked up weeks in advance, especially on Fridays and in summer.</li>
            <li><strong className="text-primary">Order packing supplies</strong> — Boxes (small for heavy items, large for light ones), packing paper, bubble wrap, strong tape, marker pens. Buy more boxes than you think you need — you'll use them.</li>
            <li><strong className="text-primary">Start packing non-essentials</strong> — Anything you won't need in the next six weeks: loft, garage, spare room, guest bedroom, seasonal items.</li>
            <li><strong className="text-primary">Notify your landlord (if renting)</strong> — Check your tenancy agreement for the notice period. Usually one or two months. Put it in writing.</li>
            <li><strong className="text-primary">Arrange pet care for moving day</strong> — Cats and dogs do not enjoy moving day. Book them in with a friend, family member or kennels/cattery.</li>
            <li><strong className="text-primary">Redirect your post</strong> — Set up Royal Mail redirection from your old address. It costs from £33 for three months and catches anything you forgot to update.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">4 weeks before: the admin avalanche</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Notify utility providers</strong> — Gas, electricity, water. Give them your moving date and new address. Take meter readings on the day.</li>
            <li><strong className="text-primary">Arrange broadband at the new property</strong> — Book installation now. Openreach appointments can take 2–3 weeks, and that's before you factor in the engineer visit.</li>
            <li><strong className="text-primary">Contact the council</strong> — Council tax: cancel at your old address, register at the new one. Both need to be done — you can't just stop paying. Electoral roll: update your registration.</li>
            <li><strong className="text-primary">Update your address with:</strong> — Bank, building society, credit cards, pension provider, insurance companies, DVLA (driving licence and V5C logbook), GP surgery, dentist, optician, vet, employer, HMRC, TV Licensing, subscriptions (Netflix, Amazon, magazines).</li>
            <li><strong className="text-primary">Arrange buildings and contents insurance</strong> — Your new property needs buildings insurance from exchange of contracts (not completion). Your contents need covering from the day you move in.</li>
            <li><strong className="text-primary">Check parking at both properties</strong> — Does the van need a parking suspension or permit? Some councils need a week's notice for suspensions. If you're in a Controlled Parking Zone, sort the permit for the new address too.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">2 weeks before: the packing push</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Pack most rooms</strong> — Everything except what you need for the next two weeks. Label every box with the room and a brief contents list.</li>
            <li><strong className="text-primary">Defrost the fridge and freezer</strong> — At least 24 hours before moving day. A leaking freezer in the van is a mess nobody needs.</li>
            <li><strong className="text-primary">Dismantle large furniture</strong> — Beds, wardrobes, shelving units. Do this now, not on the morning of the move when you're already stressed.</li>
            <li><strong className="text-primary">Confirm details with your mover</strong> — Final check on the inventory, access, parking, start time and any changes. If you've added or removed items since the original quote, tell them now.</li>
            <li><strong className="text-primary">Arrange key collection</strong> — Confirm with the estate agent when you can collect the keys on completion day. It's usually midday, but it varies.</li>
            <li><strong className="text-primary">Pack an overnight bag</strong> — Clothes, toiletries, phone charger, kettle, mugs, teabags, milk, snacks, toilet roll, basic tools. First night in a new house is always chaotic.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">1 week before: final checks</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Finish packing</strong> — Everything except the absolute essentials (bedding, a change of clothes, toothbrush).</li>
            <li><strong className="text-primary">Take meter readings</strong> — Gas, electricity and water. Photograph them as proof. Submit them to your suppliers.</li>
            <li><strong className="text-primary">Deep clean the property</strong> — Or book a professional end-of-tenancy clean if you're renting. Your deposit depends on it.</li>
            <li><strong className="text-primary">Check the van route</strong> — Are there any road closures, low bridges or weight restrictions between the two properties? Tell your mover if there are.</li>
            <li><strong className="text-primary">Separate what's staying</strong> — If anything is included in the sale (curtains, white goods, fixtures), make sure it's clearly identified so it doesn't get loaded by mistake.</li>
            <li><strong className="text-primary">Say goodbye to the neighbours</strong> — Leave your forwarding address with the new occupants for any stray post. It's also just decent.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Moving day</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Final walkthrough</strong> — Every room, every cupboard, every shelf. Check the loft, the shed, the garage. This is your last chance to spot anything left behind.</li>
            <li><strong className="text-primary">Take final meter readings</strong> — Again. And photograph them.</li>
            <li><strong className="text-primary">Lock up and hand over keys</strong> — To the estate agent or the new owner/tenant. Make sure all windows and doors are locked.</li>
            <li><strong className="text-primary">Direct the mover at the new property</strong> — Tell them which room each box goes to. It saves you carrying boxes around later.</li>
            <li><strong className="text-primary">Check for damage</strong> — As the mover unloads, check items against the inventory. If anything is damaged, note it immediately and photograph it.</li>
            <li><strong className="text-primary">Test utilities</strong> — Gas, electric, water, heating. Make sure everything works. If it doesn't, contact the provider straight away.</li>
            <li><strong className="text-primary">Make the bed first</strong> — You'll be exhausted by the evening. Having the bed made and the kettle on makes everything else feel manageable.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">First week after moving</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Register with a new GP</strong> — Don't wait until you're ill. Register as soon as you can.</li>
            <li><strong className="text-primary">Update the electoral roll</strong> — You need to be on it to get credit at your new address.</li>
            <li><strong className="text-primary">Check council tax band</strong> — If you think your new property is in the wrong band, you can challenge it. Check the VOA website.</li>
            <li><strong className="text-primary">Unpack room by room</strong> — Start with kitchen and bedrooms. Everything else can wait.</li>
            <li><strong className="text-primary">Update your address everywhere you missed</strong> — There will be things you forgot. The Royal Mail redirect catches them.</li>
          </ul>

          <p>
            If you need a man and van for your move, <Link href="/get-started" className="text-accent font-bold hover:underline">submit a free request</Link> with your postcodes, item list and access details. A verified mover reviews the specifics before quoting — no algorithms, no ballpark figures, just a quote based on the actual job.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Start the admin at 8 weeks. Conveyancing, mortgage and school places take time.</li>
              <li>Book your mover as soon as you have a provisional date — good ones go fast.</li>
              <li>Notify everyone: utilities, council, bank, DVLA, GP. Write it all down.</li>
              <li>Pack an overnight bag with everything you need for the first evening.</li>
              <li>Take meter readings and photos on moving day — it's your proof.</li>
              <li>Make the bed first. Trust me.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
