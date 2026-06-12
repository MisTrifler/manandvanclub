// ─────────────────────────────────────────────────────────────────────
// Postcode-to-postcode route estimate helpers.
//
// INFORMATIONAL ONLY. Route estimates never affect pricing, deposits,
// quote validation, Stripe amounts or detail release. Map URLs contain
// postcodes only — never names, phones, emails or full addresses.
// ─────────────────────────────────────────────────────────────────────

export interface RouteEstimate {
  distanceText: string;
  durationText: string;
  distanceMeters: number;
  durationSeconds: number;
  mapUrl: string;
  provider: string;
  calculatedAt: string;
}

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const MAX_POSTCODE_LENGTH = 10;

export function normalisePostcodeForRoute(value: unknown): string {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, " ").slice(0, MAX_POSTCODE_LENGTH);
}

export function isLikelyUKPostcode(value: unknown): boolean {
  const pc = normalisePostcodeForRoute(value);
  if (!pc || pc.length < 5 || pc.length > MAX_POSTCODE_LENGTH) return false;
  return UK_POSTCODE_REGEX.test(pc.replace(/\s+/g, " "));
}

/** Postcode-to-postcode Google Maps directions URL. Postcodes only — no PII. */
export function buildGoogleMapsDirectionsUrl(collectionPostcode: string, deliveryPostcode: string): string {
  const from = encodeURIComponent(`${normalisePostcodeForRoute(collectionPostcode)}, UK`);
  const to = encodeURIComponent(`${normalisePostcodeForRoute(deliveryPostcode)}, UK`);
  return `https://www.google.com/maps/dir/${from}/${to}`;
}

export function formatDistanceMiles(distanceMeters: number): string {
  if (!Number.isFinite(distanceMeters) || distanceMeters <= 0) return "";
  const miles = distanceMeters / 1609.344;
  if (miles < 10) return `${Math.round(miles * 10) / 10} miles`;
  return `${Math.round(miles)} miles`;
}

export function formatDuration(durationSeconds: number): string {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return "";
  const totalMinutes = Math.round(durationSeconds / 60);
  if (totalMinutes < 60) return `${totalMinutes} mins`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (mins === 0) return hours === 1 ? "1 hr" : `${hours} hrs`;
  return `${hours} hr${hours > 1 ? "s" : ""} ${mins} mins`;
}

/**
 * Sanitizes a route estimate object (e.g. arriving from the client or
 * read back from the details JSON) so only expected, type-checked,
 * bounded fields survive. Returns null if the shape is unusable.
 * The map URL is always rebuilt server-side from postcodes — a
 * client-supplied URL is never trusted.
 */
export function sanitizeRouteEstimate(
  raw: unknown,
  collectionPostcode: string,
  deliveryPostcode: string
): RouteEstimate | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const distanceMeters = Number(r.distanceMeters);
  const durationSeconds = Number(r.durationSeconds);
  if (!Number.isFinite(distanceMeters) || distanceMeters <= 0 || distanceMeters > 2_000_000) return null;
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0 || durationSeconds > 24 * 3600) return null;

  return {
    distanceText: formatDistanceMiles(distanceMeters),
    durationText: formatDuration(durationSeconds),
    distanceMeters: Math.round(distanceMeters),
    durationSeconds: Math.round(durationSeconds),
    mapUrl: buildGoogleMapsDirectionsUrl(collectionPostcode, deliveryPostcode),
    provider: typeof r.provider === "string" && r.provider.length <= 32 ? r.provider : "unknown",
    calculatedAt: typeof r.calculatedAt === "string" && !Number.isNaN(Date.parse(r.calculatedAt))
      ? r.calculatedAt
      : new Date().toISOString(),
  };
}

/** Reads a sanitized route estimate out of a move request's details JSON. */
export function getRouteEstimateFromDetails(details: unknown): RouteEstimate | null {
  if (!details || typeof details !== "object") return null;
  const raw = (details as Record<string, unknown>).routeEstimate;
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const distanceMeters = Number(r.distanceMeters);
  const durationSeconds = Number(r.durationSeconds);
  if (!Number.isFinite(distanceMeters) || distanceMeters <= 0) return null;
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return null;
  const mapUrl = typeof r.mapUrl === "string" && r.mapUrl.startsWith("https://www.google.com/maps/dir/")
    ? r.mapUrl
    : "";
  return {
    distanceText: formatDistanceMiles(distanceMeters),
    durationText: formatDuration(durationSeconds),
    distanceMeters: Math.round(distanceMeters),
    durationSeconds: Math.round(durationSeconds),
    mapUrl,
    provider: typeof r.provider === "string" ? r.provider : "unknown",
    calculatedAt: typeof r.calculatedAt === "string" ? r.calculatedAt : "",
  };
}

/**
 * Server-side route computation via Google Routes API (computeRoutes).
 * Returns null when the key is missing or the API fails — callers must
 * treat this as non-blocking. Field mask restricted to distance+duration.
 */
export async function computeRouteEstimate(
  collectionPostcode: string,
  deliveryPostcode: string
): Promise<RouteEstimate | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.warn("[route-estimate] GOOGLE_MAPS_API_KEY not set — skipping route computation");
    return null;
  }

  const from = normalisePostcodeForRoute(collectionPostcode);
  const to = normalisePostcodeForRoute(deliveryPostcode);
  if (!isLikelyUKPostcode(from) || !isLikelyUKPostcode(to)) return null;

  try {
    const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin: { address: `${from}, UK` },
        destination: { address: `${to}, UK` },
        travelMode: "DRIVE",
      }),
      // Keep the form responsive even if Google is slow
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      console.warn(`[route-estimate] Routes API returned ${response.status}`);
      return null;
    }

    const data = await response.json();
    const route = data?.routes?.[0];
    const distanceMeters = Number(route?.distanceMeters);
    // duration arrives as e.g. "5700s"
    const durationSeconds = Number(String(route?.duration || "").replace(/s$/i, ""));

    if (!Number.isFinite(distanceMeters) || distanceMeters <= 0) return null;
    if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return null;

    return {
      distanceText: formatDistanceMiles(distanceMeters),
      durationText: formatDuration(durationSeconds),
      distanceMeters: Math.round(distanceMeters),
      durationSeconds: Math.round(durationSeconds),
      mapUrl: buildGoogleMapsDirectionsUrl(from, to),
      provider: "google-routes",
      calculatedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    console.warn("[route-estimate] computeRoutes failed:", err?.name || "error");
    return null;
  }
}
