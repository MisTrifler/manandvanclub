// ─────────────────────────────────────────────────────────────────────
// LAUNCH SHARED LEAD POOL (temporary, flag-controlled).
//
// For launch there may not be enough complete mover profile data to
// filter tightly by exact driver area/radius/service type. While
// LAUNCH_SHARED_LEAD_POOL is enabled, approved launch-region movers see
// verified, unquoted, unpaid leads that start OR end in the core West
// Midlands launch coverage. Service flags are preferences only and never
// hide leads in launch mode.
//
// Keep LAUNCH_SHARED_LEAD_POOL=true while early driver data is incomplete.
// When mover density/profile data improves, set it to false to return to
// strict per-driver matching (marketplace-matching.ts).
// ─────────────────────────────────────────────────────────────────────

import { leadIsAvailable, leadMatchesDriverArea, type DriverProfile } from "@/lib/marketplace-matching";

/** Server-only flag. Defaults ON for launch unless explicitly disabled. */
export function isLaunchPoolEnabled(): boolean {
  const flag = process.env.LAUNCH_SHARED_LEAD_POOL;
  if (flag === undefined || flag === "") return true; // launch default
  return flag === "true";
}

/**
 * Early launch safety valve. Defaults ON so approved movers with incomplete
 * coverage profile data are not accidentally hidden from the launch pool.
 * Set LAUNCH_SHARED_LEAD_POOL_ALLOW_UNKNOWN_DRIVERS=false once driver
 * postcode/coverage fields are complete enough for stricter launch scoping.
 */
function allowUnknownLaunchDrivers(): boolean {
  const flag = process.env.LAUNCH_SHARED_LEAD_POOL_ALLOW_UNKNOWN_DRIVERS;
  if (flag === undefined || flag === "") return true;
  return flag === "true";
}

// ─────────────────────────────────────────────────────────────────────
// Postcode prefixes covered by Man and Van Club.
// Originally West Midlands only. Now expanded nationwide to cover all
// 355+ locations across England, Scotland, Wales and Northern Ireland.
// Any lead that starts OR ends in a covered postcode area is visible
// to approved movers in the shared launch pool.
// ─────────────────────────────────────────────────────────────────────
const COVERED_POSTCODE_PREFIXES = [
  // West Midlands
  "B", "CV", "DY", "WS", "WV", "ST", "TF", "WR",
  // East Midlands
  "DE", "LE", "NG", "NN", "LN", "PE", "DN",
  // Greater Manchester
  "M", "BL", "OL", "SK", "WA", "WN",
  // Greater London
  "CR", "BR", "RM", "IG", "HA", "W", "TW", "KT", "EN", "N", "E", "SE", "DA", "SM", "SW",
  // West Yorkshire
  "BD", "WF", "HD", "HX", "LS",
  // Merseyside / Lancashire
  "L", "CH", "PR", "FY", "BB", "LA",
  // South West
  "BA", "BS", "TA", "SN", "GL", "EX", "PL", "TQ", "TR",
  // South Yorkshire / North East
  "S", "NE",
  // Scotland
  "EH", "G", "AB", "DD", "FK", "KY", "ML", "KA", "PA", "IV", "HS", "KW", "ZE", "TD", "DG",
  // Wales
  "CF", "SA", "NP", "LD", "SY", "LL",
  // Northern Ireland
  "BT",
  // South East
  "SO", "PO", "OX", "CB", "RG", "SL", "GU", "HP", "SG", "AL", "BN", "TN", "ME", "RH", "KT",
  // East of England
  "MK", "CM", "SS", "NR", "IP", "CO",
  // North Yorkshire / East Yorkshire
  "HG", "YO", "HU",
  // Hertfordshire / Home Counties
  "WD", "UB",
];

function postcodeArea(postcode?: string | null): string | null {
  const cleaned = String(postcode || "").trim().toUpperCase().replace(/\s+/g, "");
  const match = cleaned.match(/^([A-Z]{1,2})\d/);
  return match ? match[1] : null;
}

export function isWestMidlandsPostcode(postcode?: string | null): boolean {
  const wmPrefixes = ["B", "CV", "DY", "WS", "WV", "ST", "TF", "WR"];
  const area = postcodeArea(postcode);
  if (!area) return false;
  return wmPrefixes.includes(area);
}

function isLaunchPoolPostcode(postcode?: string | null): boolean {
  const area = postcodeArea(postcode);
  if (!area) return false;
  return COVERED_POSTCODE_PREFIXES.includes(area);
}

/** A lead belongs to the launch pool if its route starts OR ends in coverage. */
export function isWestMidlandsLead(lead: {
  collection_postcode?: string | null;
  delivery_postcode?: string | null;
}): boolean {
  return (
    isLaunchPoolPostcode(lead.collection_postcode) ||
    isLaunchPoolPostcode(lead.delivery_postcode)
  );
}

/**
 * Driver qualifies for the launch pool if approved and plausibly
 * West Midlands-based. Launch fallback: if no usable region signal
 * exists on the driver record, approved drivers still see the pool —
 * never block an approved mover because profile data is thin or their
 * service checkboxes are unset.
 */
export function driverIsInLaunchPool(driver: {
  status?: string | null;
  coverage_area?: string | null;
  radius?: string | null;
  postcode?: string | null;
}): boolean {
  if (driver.status !== "approved") return false;

  const cov = String(driver.coverage_area || "").toLowerCase();
  // Nationwide signals — any approved driver declaring coverage anywhere
  // in the UK qualifies for the launch pool. The pool now covers all
  // 355+ locations across England, Scotland, Wales and Northern Ireland.
  const coverageSignals = [
    "west midlands", "east midlands", "north west", "north east",
    "south east", "south west", "east of england", "yorkshire",
    "london", "scotland", "wales", "northern ireland",
    "birmingham", "manchester", "liverpool", "leeds", "sheffield",
    "bristol", "nottingham", "leicester", "coventry", "cardiff",
    "edinburgh", "glasgow", "belfast", "walsall", "wolverhampton",
    "midlands", "uk", "england", "nationwide", "national",
  ];
  if (coverageSignals.some((s) => cov.includes(s))) return true;
  if (isLaunchPoolPostcode(driver.postcode)) return true;

  // Launch fallback: approved driver with no clear region data can still
  // see the shared pool while early profile data is incomplete.
  return allowUnknownLaunchDrivers();
}

/** Launch-mode visibility: availability rules + launch pool membership. */
export function leadIsVisibleInLaunchPool(
  lead: Parameters<typeof leadIsAvailable>[0] & {
    collection_postcode?: string | null;
    delivery_postcode?: string | null;
  },
  driver: { status?: string | null; coverage_area?: string | null; radius?: string | null; postcode?: string | null }
): boolean {
  if (!leadIsAvailable(lead)) return false;
  if (!isWestMidlandsLead(lead)) return false;
  return driverIsInLaunchPool(driver);
}

/** Safe diagnostic: why is a lead visible/hidden? Never includes PII. */
export function explainLeadVisibility(
  lead: Parameters<typeof leadIsVisibleInLaunchPool>[0] & {
    is_verified?: boolean | null;
    status?: string | null;
    quoted_by?: string | null;
    quote_amount?: number | null;
    booking_fee_paid?: boolean | null;
    customer_details_released_at?: string | null;
    move_date?: string | null;
  },
  driver: Parameters<typeof leadIsVisibleInLaunchPool>[1]
): { visible: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (lead.is_verified !== true) reasons.push("not verified");
  const status = String(lead.status || "").toLowerCase();
  if (!["available", "verified", "active"].includes(status)) reasons.push("status not available");
  if (lead.quoted_by) reasons.push("already quoted");
  if (lead.quote_amount !== null && lead.quote_amount !== undefined) reasons.push("already quoted");
  if (lead.booking_fee_paid === true) reasons.push("booked/paid");
  if (lead.customer_details_released_at) reasons.push("details already released");
  if (lead.move_date) {
    const d = new Date(lead.move_date);
    if (!Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10)) {
      reasons.push("past move date");
    }
  }
  if (!isWestMidlandsLead(lead)) reasons.push("outside launch pool");
  if (!driverIsInLaunchPool(driver)) reasons.push("driver not in launch pool");

  const unique = Array.from(new Set(reasons));
  return { visible: unique.length === 0, reasons: unique };
}

/** Strict-mode passthrough used when the flag is off. */
export function leadIsVisibleStrict(
  lead: Parameters<typeof leadIsAvailable>[0] & {
    collection_postcode?: string | null;
    delivery_postcode?: string | null;
    move_type?: string | null;
  },
  driver: DriverProfile
): boolean {
  return leadIsAvailable(lead) && leadMatchesDriverArea(lead, driver);
}
