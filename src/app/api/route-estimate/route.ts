import { NextResponse } from "next/server";
import {
  normalisePostcodeForRoute,
  isLikelyUKPostcode,
  buildGoogleMapsDirectionsUrl,
  computeRouteEstimate,
} from "@/lib/route-estimate";

// Informational route estimate only. Never affects pricing, deposits,
// Stripe amounts or detail release. GOOGLE_MAPS_API_KEY is used
// strictly server-side inside computeRouteEstimate.

// ── Basic in-memory IP rate limiting (best-effort per instance) ─────
const ipHits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 20;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (ipHits.size > 5000) ipHits.clear();
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const rawFrom = body?.collectionPostcode;
    const rawTo = body?.deliveryPostcode;

    if (typeof rawFrom !== "string" || typeof rawTo !== "string" || rawFrom.length > 20 || rawTo.length > 20) {
      return NextResponse.json({ ok: false, error: "Invalid postcode" }, { status: 400 });
    }

    const from = normalisePostcodeForRoute(rawFrom);
    const to = normalisePostcodeForRoute(rawTo);

    if (!isLikelyUKPostcode(from) || !isLikelyUKPostcode(to)) {
      return NextResponse.json({ ok: false, error: "Invalid postcode" }, { status: 400 });
    }

    // Fallback map URL is always available (postcodes only, no PII)
    const mapUrl = buildGoogleMapsDirectionsUrl(from, to);

    const estimate = await computeRouteEstimate(from, to);
    if (!estimate) {
      return NextResponse.json({ ok: false, mapUrl });
    }

    return NextResponse.json({ ok: true, ...estimate });
  } catch {
    return NextResponse.json({ ok: false, error: "Route estimate unavailable" }, { status: 200 });
  }
}
