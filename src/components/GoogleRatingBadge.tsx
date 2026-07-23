"use client";

import { useEffect, useState } from "react";

type RatingData = { rating: number; count: number; live: boolean };

const FALLBACK: RatingData = { rating: 5.0, count: 11, live: false };

// Direct link to the Man and Van Club Google Business Profile (same URL used
// in the site's Organisation schema sameAs) so visitors land on Google itself.
const GOOGLE_REVIEWS_URL = "https://share.google/xemGXWRByHBK5PSbN";

const STAR_FILLED = "#FBBC04"; // Google star amber
const STAR_EMPTY = "#E4E5E7"; // Google's empty-star gray

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

function GoogleG({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.56-5.17 3.56-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.29a12 12 0 0 0 0 10.74l3.98-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.63l3.98 3.1C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}

function StarShape({ fill, className }: { fill: string; className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill} aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function StarRow({ fill }: { fill: string }) {
  return (
    <span className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarShape key={i} fill={fill} className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
      ))}
    </span>
  );
}

/**
 * Google reviews pill styled like the classic white Trustpilot hero badge
 * (logo | brand name | review count | stars) but Google-branded, clicked
 * straight through to the Google Business Profile - never an internal page.
 * Rendered by the homepage inside a fixed bottom-left wrapper so it sits
 * opposite the Ask AI widget (bottom right).
 *
 * Server-renders the verified static rating, then refreshes rating + count
 * from /api/google-rating once the Places API key is configured in Vercel,
 * so the number grows automatically as new reviews land. Stars render the
 * exact rating via a clipped overlay (e.g. 4.8 shows 80% of the 5th star).
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

  const clamped = Math.max(0, Math.min(5, data.rating));
  const fillPct = (clamped / 5) * 100;

  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Read our reviews on Google"
      className={`inline-flex items-center gap-2 sm:gap-2.5 bg-white rounded-full pl-3 pr-3.5 py-2.5 sm:pl-4 sm:pr-5 sm:py-3 shadow-xl ring-1 ring-black/5 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ${className}`}
      aria-label={`Rated ${clamped.toFixed(1)} out of 5 from ${data.count} Google reviews. Read the reviews on Google.`}
      data-live-rating={data.live ? "true" : "false"}
    >
      <GoogleG className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" />
      <span className="hidden min-[420px]:inline text-sm sm:text-base font-semibold text-[#1f1f1f] tracking-tight leading-none">
        Google
      </span>
      <span className="text-xs sm:text-sm font-medium text-[#70757a] tabular-nums leading-none">
        {data.count.toLocaleString("en-GB")}
      </span>
      <span className="relative inline-flex ml-0.5 sm:ml-1" aria-hidden="true">
        <StarRow fill={STAR_EMPTY} />
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct}%` }}>
          <StarRow fill={STAR_FILLED} />
        </span>
      </span>
    </a>
  );
}
