import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start Your Move Request | Man and Van Club",
  description:
    "Submit your move details for free. Your details stay private until you accept a verified mover quote and pay the booking deposit.",
  alternates: {
    canonical: "https://www.manandvanclub.co.uk/get-started",
  },
};

export default function GetStartedPage() {
  return (
    <div className="bg-[#F9F9F7] py-8 lg:py-14">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="rounded-[2rem] bg-primary p-6 text-white shadow-xl lg:p-8">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/85 ring-1 ring-white/15">
            Free move request
          </p>
          <h1 className="mt-5 max-w-md text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            Move quotes without the spam
          </h1>
          <p className="mt-4 max-w-md text-base font-bold leading-relaxed text-white/90 lg:text-lg">
            Tell us the postcodes, move date and basic move details. A verified mover can review your anonymised request and send a quote before you decide whether to book.
          </p>
          <div className="mt-6 grid gap-3 text-sm font-bold text-white/90">
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              Free to submit. No obligation until you accept a mover quote.
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              Your contact details stay private until the booking deposit is paid.
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              The booking deposit is deducted from the mover&apos;s total quote.
            </div>
          </div>

          {/* Popular Areas — Internal Linking */}
          <div className="mt-6 pt-5 border-t border-white/15">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/50 mb-3">Popular areas</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/man-and-van-birmingham" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent transition-colors ring-1 ring-white/10">Birmingham</Link>
              <Link href="/man-and-van-walsall" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent transition-colors ring-1 ring-white/10">Walsall</Link>
              <Link href="/man-and-van-wolverhampton" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent transition-colors ring-1 ring-white/10">Wolverhampton</Link>
              <Link href="/man-and-van-west-midlands" className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent transition-colors ring-1 ring-white/10">West Midlands</Link>
            </div>
          </div>
        </section>

        <section aria-label="Move request form">
          <QuoteForm />
        </section>
      </div>
    </div>
  );
}
