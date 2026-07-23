"use client";

import { useEffect, useState } from "react";
import { Star, ExternalLink } from "lucide-react";

type RatingData = { rating: number; count: number; live: boolean };

const FALLBACK: RatingData = { rating: 5.0, count: 11, live: false };

// Direct link to the Man and Van Club Google Business Profile (same URL used
// in the site's Organisation schema sameAs) so visitors land on Google itself.
const GOOGLE_REVIEWS_URL = "https://share.google/xemGXWRByHBK5PSbN";

// Both hero instances (mobile + desktop) share one request.
let sharedFetch: Promise<RatingData | null> | null = null;
function getRating(): Promise<RatingData | null> {
  if (!sharedFetch) {
    sharedFetch = fetch("/api/google-rating")
      .then((r) => (r.ok ? r.json() : null))
      .then((j: Partial<RatingData> | null) => {
        if (j && j.live === true && typeof j.rating === "number" && typeof j.count === "number") {
          return { rating: j.rating, count: j.count, live: true };
        }
        return null;
      })
      .catch(() => null);
  }
  return sharedFetch;
}

/**
 * Trustpilot-style Google reviews badge for the homepage hero.
 * Server-renders the verified static rating, then refreshes the count from
 * /api/google-rating (live Google Business Profile numbers once the Places
 * API key is configured in Vercel) so the number grows as new reviews land.
 * Clicks through to Google directly - never to an internal page.
 */
export default function GoogleRatingBadge({ className = "" }: { className?: string }) {
  const [data, setData] = useState<RatingData>(FALLBACK);

  useEffect(() => {
    let alive = true;
    getRating().then((live) => {
      if (alive && live) setData(live);
    });
    return () => {
      alive = false;
    };
  }, []);

  const rounded = Math.round(data.rating);

  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Read our reviews on Google"
      className={`inline-flex items-center gap-2 bg-white rounded-full pl-2.5 pr-4 py-2.5 shadow-xl ring-1 ring-black/5 hover:shadow-2xl hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 ${className}`}
      aria-label={`Rated ${data.rating.toFixed(1)} out of 5 from ${data.count} customer reviews. Read the reviews on Google.`}
      data-live-rating={data.live ? "true" : "false"}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            fill={i <= rounded ? "#00B67A" : "#D9D9D6"}
            className="text-[#00B67A]"
            strokeWidth={0}
          />
        ))}
      </span>
      <span className="text-sm font-black text-primary tracking-tight">
        {data.rating.toFixed(1)}/5
      </span>
      <span className="text-xs font-bold text-text-secondary tracking-tight">
        · {data.count} review{data.count === 1 ? "" : "s"}
      </span>
      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-text-secondary/70">
        {data.live ? "Live on Google" : "Google"} <ExternalLink size={9} />
      </span>
    </a>
  );
}
