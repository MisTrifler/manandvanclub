"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

type RatingData = { rating: number; count: number; live: boolean };

const FALLBACK: RatingData = { rating: 5.0, count: 11, live: false };

/**
 * Trustpilot-style Google reviews badge for the homepage hero.
 * Server-renders the verified static rating, then refreshes the count from
 * /api/google-rating (live Google Business Profile numbers once the Places
 * API key is configured in Vercel) so the number grows as new reviews land.
 */
export default function GoogleRatingBadge({ className = "" }: { className?: string }) {
  const [data, setData] = useState<RatingData>(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch("/api/google-rating")
      .then((r) => (r.ok ? r.json() : null))
      .then((j: Partial<RatingData> | null) => {
        if (!alive || !j) return;
        if (j.live === true && typeof j.rating === "number" && typeof j.count === "number") {
          setData({ rating: j.rating, count: j.count, live: true });
        }
      })
      .catch(() => {
        /* keep static values */
      });
    return () => {
      alive = false;
    };
  }, []);

  const rounded = Math.round(data.rating);

  return (
    <Link
      href="/man-and-van-reviews"
      title="Read real customer reviews"
      className={`inline-flex items-center gap-2 bg-white rounded-full pl-2.5 pr-4 py-2 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ${className}`}
      aria-label={`Rated ${data.rating.toFixed(1)} out of 5 from ${data.count} customer reviews. Read the reviews.`}
      data-live-rating={data.live ? "true" : "false"}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            className="text-[#00B67A]"
            fill={i <= rounded ? "#00B67A" : "#D9D9D6"}
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
      <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/70">
        {data.live ? "Live on Google" : "Verified"}
      </span>
    </Link>
  );
}
