import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Start Your Move Request | Man and Van Club",
  description:
    "Submit your move details for free. Your details stay private until you accept a verified mover quote and pay the booking deposit.",
  alternates: {
    canonical: "https://www.manandvanclub.co.uk/get-started",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GetStartedPage() {
  return (
    <div className="bg-[#F9F9F7] py-10 lg:py-16">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="rounded-[2rem] bg-primary p-6 text-white shadow-xl lg:p-9">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/75 ring-1 ring-white/15">
            Free move request
          </p>
          <h1 className="mt-5 text-4xl font-black uppercase tracking-tighter lg:text-6xl">
            Start your move request
          </h1>
          <p className="mt-4 text-base font-bold leading-relaxed text-white/82 lg:text-lg">
            Tell us the postcodes, move date and basic move details. A verified mover can review your anonymised request and send a quote before you decide whether to book.
          </p>
          <div className="mt-6 grid gap-3 text-sm font-bold text-white/82">
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              Free to submit. No obligation until you accept a mover quote.
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              Your contact details stay private until booking deposit is paid.
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              The booking deposit is deducted from the mover’s total quote.
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
