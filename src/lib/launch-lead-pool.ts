// ─────────────────────────────────────────────────────────────────────
// LAUNCH SHARED LEAD POOL (temporary, flag-controlled).
//
// For launch there are not enough movers to filter tightly by exact
// driver area/radius/service type. While LAUNCH_SHARED_LEAD_POOL is
// enabled, every approved launch-region mover sees every verified,
// unquoted, unpaid lead that starts OR ends in the launch coverage
// area. Service flags are preferences only and never hide leads.
//
// When mover density grows, set LAUNCH_SHARED_LEAD_POOL=false to
// return to strict per-driver matching (marketplace-matching.ts).
// ─────────────────────────────────────────────────────────────────────

import { leadIsAvailable, leadMatchesDriverArea, type DriverProfile } from "@/lib/marketplace-matching";

/** Server-only flag. Defaults ON for launch unless explicitly disabled. */
export function isLaunchPoolEnabled(): boolean {
  const flag = process.env.LAUNCH_SHARED_LEAD_POOL;
  if (flag === undefined || flag === "") return true; // launch default
  return flag === "true";
}

// Primary West Midlands launch prefixes + nearby practical coverage.
const WEST_MIDLANDS_CORE = ["B", "CV", "DY", "WS", "WV", "ST", "TF", "WR"];
const LAUNCH_EXTENDED = ["LE", "DE", "NG", "NN", "OX", "GL", "HR", "SY"];
const LAUNCH_PREFIXES = [...WEST_MIDLANDS_CORE, ...LAUNCH_EXTENDED];

function postcodeArea(postcode?: string | null): string | null {
  const cleaned = String(postcode || "").trim().toUpperCase().replace(/\s+/g, "");
  const match = cleaned.match(/^([A-Z]{1,2})\d/);
  return match ? match[1] : null;
}

export function isWestMidlandsPostcode(postcode?: string | null): boolean {
  const area = postcodeArea(postcode);
  if (!area) return false;
  return WEST_MIDLANDS_CORE.includes(area);
}

function isLaunchPoolPostcode(postcode?: string | null): boolean {
  const area = postcodeArea(postcode);
  if (!area) return false;
  return LAUNCH_PREFIXES.includes(area);
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
  const wmSignals = [
    "west midlands", "birmingham", "walsall", "wolverhampton", "dudley",
    "coventry", "solihull", "sutton coldfield", "west bromwich", "stourbridge",
    "halesowen", "tamworth", "lichfield", "cannock", "stafford", "stoke",
    "telford", "worcester", "midlands", "uk", "england", "nationwide",
  ];
  if (wmSignals.some((s) => cov.includes(s))) return true;
  if (isLaunchPoolPostcode(driver.postcode)) return true;

  // Launch fallback: approved driver with no clear region data still
  // sees the shared pool.
  return true;
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
