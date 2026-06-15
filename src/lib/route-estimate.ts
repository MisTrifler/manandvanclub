// ─────────────────────────────────────────────────────────────────────
// Postcode-to-postcode route estimate helpers.
//
// INFORMATIONAL ONLY. Route estimates may feed the display-only guide
// price, but never affect mover quote prices, deposits, quote validation,
// Stripe amounts or detail release. Map URLs contain postcodes only —
// never names, phones, emails or full addresses.
//
// Free UK postcode lookup is the primary source. Postcodes.io converts
// full UK postcodes into latitude/longitude, then we estimate route-like
// mileage/time for the display-only guide price. Google Routes is optional
// and disabled by default so the checker can run without paid maps usage.
// A postcode-area centroid fallback remains as the last resort.
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

// ── Safe fallback route distance ─────────────────────────────────────
// Coordinates are broad postcode-area centroids, with a small number of
// common launch outcodes for better local accuracy. The result is clearly
// marked as a fallback and only feeds the display-only guide price.
type LatLng = { lat: number; lng: number };

const POSTCODES_IO_TIMEOUT_MS = 3500;
const POSTCODES_IO_BASE_URL = "https://api.postcodes.io/postcodes";
const postcodeCoordinateCache = new Map<string, LatLng | null>();

function postcodesIoPath(postcode: string): string {
  // Postcodes.io accepts encoded postcodes with or without spaces.
  return `${POSTCODES_IO_BASE_URL}/${encodeURIComponent(normalisePostcodeForRoute(postcode))}`;
}

async function fetchPostcodesIoCoordinate(postcode: string): Promise<LatLng | null> {
  const normalised = normalisePostcodeForRoute(postcode);
  if (!isLikelyUKPostcode(normalised)) return null;

  if (postcodeCoordinateCache.has(normalised)) {
    return postcodeCoordinateCache.get(normalised) || null;
  }

  try {
    const response = await fetch(postcodesIoPath(normalised), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(POSTCODES_IO_TIMEOUT_MS),
    });

    if (!response.ok) {
      postcodeCoordinateCache.set(normalised, null);
      return null;
    }

    const data = await response.json().catch(() => null);
    const latitude = Number(data?.result?.latitude);
    const longitude = Number(data?.result?.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      postcodeCoordinateCache.set(normalised, null);
      return null;
    }

    const coord = { lat: latitude, lng: longitude };
    postcodeCoordinateCache.set(normalised, coord);
    return coord;
  } catch {
    return null;
  } finally {
    // Prevent unbounded memory growth on long-lived server instances.
    if (postcodeCoordinateCache.size > 2500) postcodeCoordinateCache.clear();
  }
}

const POSTCODE_OUTCODE_CENTROIDS: Record<string, LatLng> = {
  // Launch/local examples and high-traffic districts
  WS1: { lat: 52.5862, lng: -1.9829 },
  WS2: { lat: 52.5859, lng: -2.0102 },
  WS3: { lat: 52.6208, lng: -2.0018 },
  WS4: { lat: 52.5999, lng: -1.9648 },
  WS5: { lat: 52.5695, lng: -1.9595 },
  WS6: { lat: 52.6574, lng: -2.0200 },
  WS7: { lat: 52.6803, lng: -1.9296 },
  WS8: { lat: 52.6478, lng: -1.9305 },
  WS9: { lat: 52.6058, lng: -1.9175 },
  B1: { lat: 52.4797, lng: -1.9027 },
  B2: { lat: 52.4793, lng: -1.8970 },
  B3: { lat: 52.4828, lng: -1.9023 },
  B4: { lat: 52.4845, lng: -1.8958 },
  B5: { lat: 52.4718, lng: -1.8970 },
  B6: { lat: 52.5036, lng: -1.8831 },
  B7: { lat: 52.4944, lng: -1.8705 },
  B8: { lat: 52.4905, lng: -1.8405 },
  B9: { lat: 52.4766, lng: -1.8463 },
  B10: { lat: 52.4706, lng: -1.8442 },
  B11: { lat: 52.4539, lng: -1.8556 },
  B12: { lat: 52.4644, lng: -1.8887 },
  B13: { lat: 52.4370, lng: -1.8823 },
  B14: { lat: 52.4172, lng: -1.8892 },
  B15: { lat: 52.4680, lng: -1.9204 },
  B16: { lat: 52.4762, lng: -1.9283 },
  B17: { lat: 52.4614, lng: -1.9621 },
  B18: { lat: 52.4892, lng: -1.9198 },
  B19: { lat: 52.4974, lng: -1.9062 },
  B20: { lat: 52.5162, lng: -1.9227 },
  B21: { lat: 52.5047, lng: -1.9392 },
  B23: { lat: 52.5294, lng: -1.8585 },
  B24: { lat: 52.5180, lng: -1.8284 },
  B42: { lat: 52.5325, lng: -1.9128 },
  B43: { lat: 52.5477, lng: -1.9329 },
  B44: { lat: 52.5485, lng: -1.8977 },
  B45: { lat: 52.3920, lng: -2.0071 },
  LE1: { lat: 52.6369, lng: -1.1398 },
  LE2: { lat: 52.6124, lng: -1.1123 },
  LE3: { lat: 52.6349, lng: -1.1776 },
  LE4: { lat: 52.6640, lng: -1.1295 },
  LE5: { lat: 52.6376, lng: -1.0810 },
  LE6: { lat: 52.6624, lng: -1.2320 },
  LE7: { lat: 52.6833, lng: -1.0634 },
  LE8: { lat: 52.5607, lng: -1.0890 },
  WV1: { lat: 52.5862, lng: -2.1287 },
  WV2: { lat: 52.5760, lng: -2.1269 },
  WV3: { lat: 52.5840, lng: -2.1543 },
  WV4: { lat: 52.5617, lng: -2.1424 },
  DY1: { lat: 52.5123, lng: -2.0811 },
  DY2: { lat: 52.4990, lng: -2.0886 },
  DY3: { lat: 52.5339, lng: -2.1240 },
  CV1: { lat: 52.4081, lng: -1.5106 },
  CV2: { lat: 52.4301, lng: -1.4725 },
  CV3: { lat: 52.3860, lng: -1.4888 },
  CV4: { lat: 52.3833, lng: -1.5600 },
  ST1: { lat: 53.0258, lng: -2.1763 },
  ST4: { lat: 52.9956, lng: -2.1810 },
  TF1: { lat: 52.7006, lng: -2.5186 },
  TF2: { lat: 52.6954, lng: -2.4385 },
  WR1: { lat: 52.1936, lng: -2.2216 },
  DE1: { lat: 52.9213, lng: -1.4761 },
  DE24: { lat: 52.8924, lng: -1.4522 },
  NG1: { lat: 52.9548, lng: -1.1581 },
  NG2: { lat: 52.9399, lng: -1.1398 },
  NN1: { lat: 52.2405, lng: -0.9027 },
  NN3: { lat: 52.2647, lng: -0.8378 },
  OX1: { lat: 51.7520, lng: -1.2577 },
  GL1: { lat: 51.8642, lng: -2.2382 },
  HR1: { lat: 52.0578, lng: -2.7150 },
  SY1: { lat: 52.7101, lng: -2.7521 },
};

const POSTCODE_AREA_CENTROIDS: Record<string, LatLng> = {
  AB: { lat: 57.1497, lng: -2.0943 }, AL: { lat: 51.7527, lng: -0.3394 }, B: { lat: 52.4862, lng: -1.8904 }, BA: { lat: 51.3811, lng: -2.3590 }, BB: { lat: 53.7486, lng: -2.4875 }, BD: { lat: 53.7950, lng: -1.7594 }, BH: { lat: 50.7192, lng: -1.8808 }, BL: { lat: 53.5769, lng: -2.4282 }, BN: { lat: 50.8225, lng: -0.1372 }, BR: { lat: 51.4060, lng: 0.0132 }, BS: { lat: 51.4545, lng: -2.5879 }, BT: { lat: 54.5973, lng: -5.9301 }, CA: { lat: 54.8925, lng: -2.9329 }, CB: { lat: 52.2053, lng: 0.1218 }, CF: { lat: 51.4816, lng: -3.1791 }, CH: { lat: 53.1934, lng: -2.8931 }, CM: { lat: 51.7356, lng: 0.4696 }, CO: { lat: 51.8959, lng: 0.8919 }, CR: { lat: 51.3762, lng: -0.0982 }, CT: { lat: 51.2798, lng: 1.0800 }, CV: { lat: 52.4068, lng: -1.5197 }, CW: { lat: 53.0979, lng: -2.4416 }, DA: { lat: 51.4462, lng: 0.2169 }, DD: { lat: 56.4620, lng: -2.9707 }, DE: { lat: 52.9225, lng: -1.4746 }, DG: { lat: 55.0709, lng: -3.6051 }, DH: { lat: 54.7753, lng: -1.5849 }, DL: { lat: 54.5243, lng: -1.5504 }, DN: { lat: 53.5228, lng: -1.1285 }, DT: { lat: 50.7151, lng: -2.4376 }, DY: { lat: 52.5123, lng: -2.0811 }, E: { lat: 51.5422, lng: -0.0022 }, EC: { lat: 51.5200, lng: -0.0970 }, EH: { lat: 55.9533, lng: -3.1883 }, EN: { lat: 51.6523, lng: -0.0807 }, EX: { lat: 50.7184, lng: -3.5339 }, FK: { lat: 56.0019, lng: -3.7839 }, FY: { lat: 53.8175, lng: -3.0357 }, G: { lat: 55.8642, lng: -4.2518 }, GL: { lat: 51.8642, lng: -2.2382 }, GU: { lat: 51.2362, lng: -0.5704 }, GY: { lat: 49.4542, lng: -2.5812 }, HA: { lat: 51.5790, lng: -0.3370 }, HD: { lat: 53.6458, lng: -1.7850 }, HG: { lat: 53.9921, lng: -1.5418 }, HP: { lat: 51.6287, lng: -0.7482 }, HR: { lat: 52.0578, lng: -2.7150 }, HS: { lat: 58.2094, lng: -6.3865 }, HU: { lat: 53.7457, lng: -0.3367 }, HX: { lat: 53.7270, lng: -1.8575 }, IG: { lat: 51.5590, lng: 0.0741 }, IM: { lat: 54.2361, lng: -4.5481 }, IP: { lat: 52.0567, lng: 1.1482 }, IV: { lat: 57.4778, lng: -4.2247 }, JE: { lat: 49.2144, lng: -2.1313 }, KA: { lat: 55.6116, lng: -4.4957 }, KT: { lat: 51.4123, lng: -0.3007 }, KW: { lat: 58.4391, lng: -3.0930 }, KY: { lat: 56.1165, lng: -3.1599 }, L: { lat: 53.4084, lng: -2.9916 }, LA: { lat: 54.0466, lng: -2.8007 }, LD: { lat: 52.2416, lng: -3.3787 }, LE: { lat: 52.6369, lng: -1.1398 }, LL: { lat: 53.1408, lng: -3.7837 }, LN: { lat: 53.2307, lng: -0.5406 }, LS: { lat: 53.8008, lng: -1.5491 }, LU: { lat: 51.8787, lng: -0.4200 }, M: { lat: 53.4808, lng: -2.2426 }, ME: { lat: 51.3896, lng: 0.5036 }, MK: { lat: 52.0406, lng: -0.7594 }, ML: { lat: 55.7776, lng: -3.9946 }, N: { lat: 51.5615, lng: -0.1083 }, NE: { lat: 54.9783, lng: -1.6178 }, NG: { lat: 52.9548, lng: -1.1581 }, NN: { lat: 52.2405, lng: -0.9027 }, NP: { lat: 51.5842, lng: -2.9977 }, NR: { lat: 52.6309, lng: 1.2974 }, NW: { lat: 51.5430, lng: -0.1931 }, OL: { lat: 53.5409, lng: -2.1114 }, OX: { lat: 51.7520, lng: -1.2577 }, PA: { lat: 55.8473, lng: -4.4400 }, PE: { lat: 52.5695, lng: -0.2405 }, PH: { lat: 56.3950, lng: -3.4308 }, PL: { lat: 50.3755, lng: -4.1427 }, PO: { lat: 50.8198, lng: -1.0880 }, PR: { lat: 53.7632, lng: -2.7031 }, RG: { lat: 51.4543, lng: -0.9781 }, RH: { lat: 51.1465, lng: -0.2084 }, RM: { lat: 51.5761, lng: 0.1807 }, S: { lat: 53.3811, lng: -1.4701 }, SA: { lat: 51.6214, lng: -3.9436 }, SE: { lat: 51.4826, lng: -0.0607 }, SG: { lat: 51.9038, lng: -0.1966 }, SK: { lat: 53.4106, lng: -2.1575 }, SL: { lat: 51.5105, lng: -0.5950 }, SM: { lat: 51.3618, lng: -0.1945 }, SN: { lat: 51.5581, lng: -1.7812 }, SO: { lat: 50.9097, lng: -1.4044 }, SP: { lat: 51.0690, lng: -1.7957 }, SR: { lat: 54.9069, lng: -1.3838 }, SS: { lat: 51.5459, lng: 0.7077 }, ST: { lat: 53.0027, lng: -2.1794 }, SW: { lat: 51.4590, lng: -0.1770 }, SY: { lat: 52.7101, lng: -2.7521 }, TA: { lat: 51.0153, lng: -3.1024 }, TD: { lat: 55.6043, lng: -2.7596 }, TF: { lat: 52.6784, lng: -2.4453 }, TN: { lat: 51.1324, lng: 0.2637 }, TQ: { lat: 50.4619, lng: -3.5253 }, TR: { lat: 50.2632, lng: -5.0510 }, TS: { lat: 54.5762, lng: -1.2348 }, TW: { lat: 51.4490, lng: -0.3904 }, UB: { lat: 51.5113, lng: -0.3754 }, W: { lat: 51.5074, lng: -0.2057 }, WA: { lat: 53.3900, lng: -2.5969 }, WC: { lat: 51.5186, lng: -0.1239 }, WD: { lat: 51.6565, lng: -0.3974 }, WF: { lat: 53.6833, lng: -1.5060 }, WN: { lat: 53.5451, lng: -2.6325 }, WR: { lat: 52.1936, lng: -2.2216 }, WS: { lat: 52.5862, lng: -1.9829 }, WV: { lat: 52.5862, lng: -2.1287 }, YO: { lat: 53.9590, lng: -1.0815 }, ZE: { lat: 60.1550, lng: -1.1450 },
};

function getPostcodeParts(postcode: string): { outcode: string; area: string } | null {
  const pc = normalisePostcodeForRoute(postcode).replace(/\s+/g, "");
  const match = pc.match(/^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/i);
  if (!match) return null;
  const outcode = match[1].toUpperCase();
  const area = (outcode.match(/^[A-Z]{1,2}/)?.[0] || "").toUpperCase();
  return { outcode, area };
}

function getFallbackCoordinate(postcode: string): LatLng | null {
  const parts = getPostcodeParts(postcode);
  if (!parts) return null;
  return POSTCODE_OUTCODE_CENTROIDS[parts.outcode] || POSTCODE_AREA_CENTROIDS[parts.area] || null;
}

function haversineMiles(a: LatLng, b: LatLng): number {
  const R = 3958.7613; // miles
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function estimateRoadMetricsFromCoordinates(
  fromCoord: LatLng,
  toCoord: LatLng,
  fromPostcode: string,
  toPostcode: string
): { distanceMeters: number; durationSeconds: number; estimatedRoadMiles: number; durationMinutes: number } {
  const straightMiles = haversineMiles(fromCoord, toCoord);

  // Straight-line distance is not road distance. These factors are tuned to
  // keep local urban routes realistic while still scaling national moves
  // such as London → Nottingham, Manchester → Bristol, etc.
  const roadFactor =
    straightMiles < 2 ? 1.8 :
    straightMiles < 10 ? 1.5 :
    straightMiles < 40 ? 1.35 :
    straightMiles < 120 ? 1.25 :
    1.18;

  const sameOutcode = getPostcodeParts(fromPostcode)?.outcode === getPostcodeParts(toPostcode)?.outcode;
  const minimumLocalMiles = sameOutcode ? 2.5 : 4;
  const estimatedRoadMiles = Math.max(minimumLocalMiles, straightMiles * roadFactor);

  // Removal vans travel slower than a car average, especially around cities,
  // parking/loading streets and A-road sections. This is a guide-time model,
  // not a promise of exact journey time.
  const averageMph =
    estimatedRoadMiles < 8 ? 18 :
    estimatedRoadMiles < 25 ? 26 :
    estimatedRoadMiles < 60 ? 36 :
    estimatedRoadMiles < 140 ? 43 :
    48;

  const durationMinutes = Math.max(12, Math.round((estimatedRoadMiles / averageMph) * 60));
  return {
    estimatedRoadMiles,
    durationMinutes,
    distanceMeters: Math.round(estimatedRoadMiles * 1609.344),
    durationSeconds: Math.round(durationMinutes * 60),
  };
}

async function computePostcodesIoRouteEstimate(
  collectionPostcode: string,
  deliveryPostcode: string
): Promise<RouteEstimate | null> {
  const from = normalisePostcodeForRoute(collectionPostcode);
  const to = normalisePostcodeForRoute(deliveryPostcode);
  if (!isLikelyUKPostcode(from) || !isLikelyUKPostcode(to)) return null;

  const [fromCoord, toCoord] = await Promise.all([
    fetchPostcodesIoCoordinate(from),
    fetchPostcodesIoCoordinate(to),
  ]);
  if (!fromCoord || !toCoord) return null;

  const { distanceMeters, durationSeconds } = estimateRoadMetricsFromCoordinates(fromCoord, toCoord, from, to);

  return {
    distanceText: formatDistanceMiles(distanceMeters),
    durationText: formatDuration(durationSeconds),
    distanceMeters,
    durationSeconds,
    mapUrl: buildGoogleMapsDirectionsUrl(from, to),
    provider: "postcodes-io-distance",
    calculatedAt: new Date().toISOString(),
  };
}

export function estimateRouteByPostcodeFallback(
  collectionPostcode: string,
  deliveryPostcode: string
): RouteEstimate | null {
  const from = normalisePostcodeForRoute(collectionPostcode);
  const to = normalisePostcodeForRoute(deliveryPostcode);
  if (!isLikelyUKPostcode(from) || !isLikelyUKPostcode(to)) return null;

  const fromCoord = getFallbackCoordinate(from);
  const toCoord = getFallbackCoordinate(to);
  if (!fromCoord || !toCoord) return null;

  const { distanceMeters, durationSeconds } = estimateRoadMetricsFromCoordinates(fromCoord, toCoord, from, to);

  return {
    distanceText: formatDistanceMiles(distanceMeters),
    durationText: formatDuration(durationSeconds),
    distanceMeters,
    durationSeconds,
    mapUrl: buildGoogleMapsDirectionsUrl(from, to),
    provider: "postcode-area-fallback",
    calculatedAt: new Date().toISOString(),
  };
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
  const mapUrl = typeof r.mapUrl === "string" && r.mapUrl.startsWith("https://www.google.com/maps/dir/")
    ? r.mapUrl
    : "";

  const hasDistance =
    Number.isFinite(distanceMeters) && distanceMeters > 0 &&
    Number.isFinite(durationSeconds) && durationSeconds > 0;

  // Fallback-only estimate: distance lookup failed but a safe
  // postcode-to-postcode map link survived. Callers should render
  // "View postcode route on map" when distanceMeters === 0.
  if (!hasDistance) {
    if (!mapUrl) return null;
    return {
      distanceText: "",
      durationText: "",
      distanceMeters: 0,
      durationSeconds: 0,
      mapUrl,
      provider: typeof r.provider === "string" ? r.provider : "fallback",
      calculatedAt: typeof r.calculatedAt === "string" ? r.calculatedAt : "",
    };
  }

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

async function computeGoogleRouteEstimate(
  collectionPostcode: string,
  deliveryPostcode: string
): Promise<RouteEstimate | null> {
  const googleEnabled = String(process.env.USE_GOOGLE_ROUTE_ESTIMATE || "").toLowerCase() === "true";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!googleEnabled || !apiKey) return null;

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
      console.warn(`[route-estimate] Routes API returned ${response.status}; using postcode fallback when possible`);
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
    console.warn("[route-estimate] computeRoutes failed; using postcode fallback when possible:", err?.name || "error");
    return null;
  }
}

/**
 * Server-side route computation. The free Postcodes.io lookup is primary.
 * Google Routes is optional and only used if USE_GOOGLE_ROUTE_ESTIMATE=true
 * and GOOGLE_MAPS_API_KEY is set. A local postcode-area fallback remains
 * for resilience if Postcodes.io is slow or unavailable.
 */
export async function computeRouteEstimate(
  collectionPostcode: string,
  deliveryPostcode: string
): Promise<RouteEstimate | null> {
  const postcodesIoEstimate = await computePostcodesIoRouteEstimate(collectionPostcode, deliveryPostcode);
  if (postcodesIoEstimate) return postcodesIoEstimate;

  const googleEstimate = await computeGoogleRouteEstimate(collectionPostcode, deliveryPostcode);
  if (googleEstimate) return googleEstimate;

  const fallbackEstimate = estimateRouteByPostcodeFallback(collectionPostcode, deliveryPostcode);
  if (fallbackEstimate) return fallbackEstimate;

  console.warn("[route-estimate] postcode route estimate unavailable");
  return null;
}
