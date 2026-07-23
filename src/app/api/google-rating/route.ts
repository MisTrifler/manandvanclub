import { NextResponse } from "next/server";

// Public, read-only rating endpoint used by the homepage Google reviews badge.
// When GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set on Vercel, this returns
// the live Google Business Profile rating + review count (cached for a day).
// Otherwise it returns the site's current verified static values.
export const revalidate = 86400;

const STATIC_RATING = 5.0;
const STATIC_COUNT = 11;

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (key && placeId) {
    try {
      const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: 86400 },
      });
      if (res.ok) {
        const j = (await res.json()) as { rating?: number; userRatingCount?: number };
        if (typeof j.rating === "number" && typeof j.userRatingCount === "number") {
          return NextResponse.json(
            { rating: j.rating, count: j.userRatingCount, live: true },
            { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" } }
          );
        }
      }
    } catch {
      // fall through to static values
    }
  }

  return NextResponse.json(
    { rating: STATIC_RATING, count: STATIC_COUNT, live: false },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } }
  );
}
