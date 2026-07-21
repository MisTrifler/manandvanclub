import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Office Relocation Checklist | Man and Van Club",
  description:
    "A practical office relocation checklist covering IT, furniture, comms, staff and logistics. Written for small and medium businesses moving premises — not a corporate handbook, just the things that actually matter.",
  alternates: {
    canonical: `${baseUrl}/blog/office-relocation-checklist`,
  },
  openGraph: {
    title: "Office Relocation Checklist: What to Plan Before Moving Day",
    description: "A practical office relocation checklist for small and medium businesses. IT, furniture, comms, staff and logistics.",
    url: `${baseUrl}/blog/office-relocation-checklist`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Office Relocation Checklist")}&subtitle=${encodeURIComponent("Step-by-Step Move Plan")}`, width: 1200, height: 630, alt: "Office Relocation Checklist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Relocation Checklist: What to Plan Before Moving Day",
    description: "A practical office relocation checklist for small and medium businesses moving premises.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Office Relocation Checklist")}&subtitle=${encodeURIComponent("Step-by-Step Move Plan")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Office Relocation Checklist: What to Plan Before Moving Day",
  description: "A practical office relocation checklist covering IT, furniture, comms, staff and logistics for small and medium businesses.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/office-relocation-checklist`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Office Relocation Checklist", item: `${baseUrl}/blog/office-relocation-checklist` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Office Relocation Checklist"
        description="The practical things to sort before moving your business premises — IT, furniture, comms, staff logistics and what always gets forgotten."
        date="2026-07-15"
        readTime="8 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Moving an office is more complicated than moving a house because you're coordinating around business continuity, not just logistics. The goal isn't just to move everything from A to B — it's to minimise the time your business isn't fully operational. This checklist covers the things that matter most for small and medium businesses.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">8–12 weeks before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Confirm the new lease</strong> — Make sure the contracts are signed before you commit to moving dates. Nothing worse than booking a mover for a property that falls through.</li>
            <li><strong className="text-primary">Measure the new space</strong> — Floor plan, door widths, lift dimensions, loading bay access. This determines whether your existing furniture fits and what size van can access the building.</li>
            <li><strong className="text-primary">Notify your landlord</strong> — Check the notice period on your current lease. Most commercial leases require 3–6 months' notice.</li>
            <li><strong className="text-primary">Appoint a move coordinator</strong> — One person needs to own the moving day logistics. If it's everyone's job, it's no one's job.</li>
            <li><strong className="text-primary">Set a budget</strong> — Include the mover, IT relocation, new furniture, cleaning the old premises, redirected post, and new signage. Most businesses underestimate by 30%.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">6–8 weeks before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Book the mover</strong> — Get quotes based on a full inventory. Office moves often need a larger van or two trips, and the mover needs to know about loading bay restrictions, lift access and parking at both sites.</li>
            <li><strong className="text-primary">IT audit</strong> — List every piece of IT equipment and how it connects. Servers, switches, printers, monitors, phone system. Decide what's coming, what's being replaced, and what's being decommissioned.</li>
            <li><strong className="text-primary">Arrange broadband and phone lines</strong> — Order these now. Lead times for business broadband and leased lines can be 6–12 weeks depending on the provider and the location.</li>
            <li><strong className="text-primary">Order new signage and stationery</strong> — Business cards, letterheads, email signatures, website address — anything that shows the old address needs updating.</li>
            <li><strong className="text-primary">Inform key contacts</strong> — Clients, suppliers, bank, insurance, HMRC, Companies House (if you're a limited company). Do this formally in writing.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">4–6 weeks before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Declutter and archive</strong> — You don't want to pay to move filing cabinets full of documents from 2018 that you'll never look at again. Shred what you can. Archive what you must keep. Digitise what's practical.</li>
            <li><strong className="text-primary">Plan the new office layout</strong> — Where does each desk go? Where's the printer? Where do the servers live? Do this before moving day or you'll be standing in an empty room with 30 boxes wondering where anything goes.</li>
            <li><strong className="text-primary">Staff communication</strong> — Tell your team the moving date, the new address, parking arrangements, and any changes to working patterns during the move. People worry about commute changes — address it early.</li>
            <li><strong className="text-primary">Arrange parking at both sites</strong> — This is the most commonly overlooked thing. If the van can't park near the entrance, the move takes twice as long. Some business parks and city-centre buildings need advance booking for loading bays.</li>
            <li><strong className="text-primary">Book the cleaning</strong> — Book a professional clean of the old premises for the day after you move out. Most commercial leases require the property to be returned in good condition.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">1–2 weeks before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Label everything</strong> — Every box, every desk, every chair. Label with the destination room in the new office, not where it came from. "Meeting Room 2" is more useful than "John's desk".</li>
            <li><strong className="text-primary">Back up all data</strong> — Full backup of servers and shared drives before anything gets unplugged. Cloud backup if you have it. A physical backup on a hard drive that travels with you, not in the van.</li>
            <li><strong className="text-primary">Pack non-essential items</strong> — Filing cabinets, bookshelves, spare stationery, display items. Anything not used daily can go into boxes now.</li>
            <li><strong className="text-primary">Arrange mail redirection</strong> — Royal Mail redirection takes a few days to set up. Do it now so nothing goes to the old address after you've gone.</li>
            <li><strong className="text-primary">Confirm arrangements with the mover</strong> — Final check on the inventory, access, parking, start time and any special requirements (IT equipment, heavy items, awkward access).</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Moving day</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Start with IT</strong> — If you have an IT support company, have them disconnect and pack servers, switches and networking equipment. They should be the first to set up at the new site too.</li>
            <li><strong className="text-primary">Clear the old office systematically</strong> — Room by room, top to bottom. One person walks through with the mover to point out what stays and what goes.</li>
            <li><strong className="text-primary">Do a final walkthrough</strong> — Before you leave the old premises, check every drawer, every shelf, every cupboard. It's amazing what gets left behind — usually the things you need most the next day.</li>
            <li><strong className="text-primary">Direct the mover at the new site</strong> — Have someone at the new office to tell the movers where each box and piece of furniture goes. It saves hours of rearranging later.</li>
            <li><strong className="text-primary">Test IT first</strong> — Before anyone unpacks their desk, get the internet and phone lines working. Everything else can wait — your business can't operate without connectivity.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What always gets forgotten</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The whiteboard that's screwed to the wall (and the whiteboard pens).</li>
            <li>The tea round supplies — kettle, mugs, milk, biscuits. Pack a box for day one.</li>
            <li>Toilet rolls and handwash in the new loos.</li>
            <li>Returning keys and fobs for the old building.</li>
            <li>Updating Google Business Profile and any online directory listings.</li>
            <li>Redirecting the old landline to the new number during the transition.</li>
            <li>Letting the local delivery drivers know — especially if you get regular parcels or supplier deliveries.</li>
          </ul>

          <p>
            If you're moving a small office, <Link href="/get-started" className="text-accent font-bold hover:underline">submit your move details</Link> with a full list of items and both addresses. A verified mover can review the specifics — loading bay access, lift size, parking — and quote based on the real job, not a guess.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Start planning 8–12 weeks out. The IT and broadband lead times catch people out.</li>
              <li>One person owns the move. Without a coordinator, things fall through the cracks.</li>
              <li>Parking and access at both sites are more important than you think.</li>
              <li>Label every box with the destination room in the new office.</li>
              <li>Get the internet working before anything else at the new site.</li>
              <li>Pack a day-one box with kettle, mugs, milk and toilet rolls.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
