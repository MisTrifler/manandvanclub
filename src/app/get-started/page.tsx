import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, CheckCircle2, Lock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Start Your Free Move Request | Man and Van Club",
  description:
    "Tell us about your move and get matched with a verified local mover. Free to submit, no spam, and your details stay protected until you accept a quote.",
  alternates: {
    canonical: "https://www.manandvanclub.co.uk/get-started",
  },
};

const BADGES = [
  { icon: <BadgeCheck size={16} />, label: "Verified movers" },
  { icon: <Lock size={16} />, label: "Details protected" },
  { icon: <CheckCircle2 size={16} />, label: "Free to submit" },
];

export default function GetStartedPage() {
  return (
    <div className="bg-[#F9F9F7]">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary/55 transition hover:text-accent"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">
                Start your move request
              </p>
              <h1 className="mt-2 text-4xl font-black leading-[0.96] tracking-tighter text-primary sm:text-5xl lg:text-6xl">
                Tell us about your move
              </h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-text-secondary sm:text-lg">
                Free to submit. No spam. Your details are only shared when you accept a mover quote.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-[24px] bg-[#F9F9F7] p-3">
              {BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-2xl bg-white px-2 py-3 text-center shadow-sm"
                >
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                    {badge.icon}
                  </div>
                  <p className="text-[10px] font-black uppercase leading-tight tracking-tight text-primary sm:text-xs">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-10">
        <QuoteForm />
        <div className="mt-4 rounded-[22px] border border-border bg-white p-4 text-center shadow-sm">
          <p className="text-xs font-semibold leading-relaxed text-text-secondary">
            A guide price range may be shown after your move details where enough information is available. Your final mover quote is provided separately by a verified mover.
          </p>
        </div>
      </section>
    </div>
  );
}
