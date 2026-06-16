// ─────────────────────────────────────────────────────────────────────
// Guide price range — formula guide-v1.2.
//
// DISPLAY-ONLY. The guide price never affects Stripe amounts, deposit
// calculation, quote option validation, webhook checks, mover balances
// or detail release. The mover's submitted quote options remain the
// actual prices; the deposit derives only from the selected option.
//
// Structure: minimum callout floor + (work time × hourly guide rate)
// + mileage factor + complexity uplifts, returned as a buffered range.
// ─────────────────────────────────────────────────────────────────────

import { estimateRouteByPostcodeFallback } from "@/lib/route-estimate";

export interface GuidePriceInput {
  intent?: string | null;            // office | house | student | single-item | general | storage
  moveType?: string | null;
  routeEstimate?: { distanceMeters?: number; durationSeconds?: number } | null;
  bedrooms?: string | null;
  propertyType?: string | null;
  officeSize?: string | null;
  numberOfDesks?: string | null;
  itemType?: string | null;
  numberOfItems?: string | null;
  storageUnitSize?: string | null;
  storageDirection?: string | null;
  numberOfBoxes?: string | null;
  suitcases?: string | null;
  smallFurnitureItems?: string | null;
  loadingHelp?: string | null;
  helperPreference?: string | null;
  accessType?: string | null;
  parkingAvailable?: string | null;
  heavyItems?: string | null;
  heavyItemsDescription?: string | null;
  dismantlingRequired?: string | null;
  collectionPostcode?: string | null;
  deliveryPostcode?: string | null;
}

export interface GuidePriceResult {
  min: number;
  max: number;
  display: string;
  confidence: "route-based" | "fallback";
  formulaVersion: "guide-v1.2";
  assumptions: string[];
  inputsUsed: {
    routeMiles: number | null;
    routeDurationMinutes: number | null;
    estimatedWorkMinutes: number;
    likelyMovers: number;
    complexityLevel: "standard" | "raised" | "high";
  };
}

const GUIDE_FORMULA_VERSION = "guide-v1.2" as const;

// Internal guide rates (never shown to customers). These are intentionally
// simple and transparent: the customer sees a guide range only, while the
// mover still sends the accurate quote before booking.
const RATE_ONE_MOVER = 40;
const RATE_TWO_MOVERS = 65;
const RATE_LARGE_JOB = 75;

const MILEAGE_FREE_MILES = 10;
const MILEAGE_RATE_PER_MILE = 2.25;
const LONG_DISTANCE_POSITIONING_UPLIFT_50 = 1.12;
const LONG_DISTANCE_POSITIONING_UPLIFT_100 = 1.25;
const COMPETITIVE_DISPLAY_ADJUSTMENT = 5;

function getItemCount(input: GuidePriceInput): number {
  return num(input.numberOfItems);
}

function isSmallGeneralLocalMove(intent: string, input: GuidePriceInput, routeMiles: number): boolean {
  if (intent !== "general") return false;
  if (!Number.isFinite(routeMiles) || routeMiles > 5) return false;
  const items = getItemCount(input);
  if (items <= 0 || items > 3) return false;
  if (input.loadingHelp === "Yes, 2 movers may be needed" || input.helperPreference === "2 movers") return false;
  if (input.heavyItems === "Yes") return false;
  return true;
}

function num(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function roundGuidePrice(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  if (value < 200) return Math.round(value / 10) * 10;
  return Math.round(value / 25) * 25;
}

export function formatGuidePriceRange(min: number, max: number): string {
  return `£${min}–£${max}`;
}

function intentFromInput(input: GuidePriceInput): string {
  const intent = String(input.intent || "").toLowerCase();
  if (["office", "house", "student", "single-item", "general", "storage"].includes(intent)) return intent;
  const mt = String(input.moveType || "").toLowerCase();
  if (mt.includes("office")) return "office";
  if (mt.includes("home") || mt.includes("house")) return "house";
  if (mt.includes("student")) return "student";
  if (mt.includes("furniture") || mt.includes("single")) return "single-item";
  if (mt.includes("storage")) return "storage";
  return "general";
}

// ── A. Likely movers ─────────────────────────────────────────────────
function decideLikelyMovers(intent: string, input: GuidePriceInput, assumptions: string[]): number {
  if (input.helperPreference === "2 movers") {
    assumptions.push("2 movers (customer preference)");
    return 2;
  }
  if (input.loadingHelp === "Yes, 2 movers may be needed") {
    assumptions.push("2 movers (loading help requested)");
    return 2;
  }
  if (input.heavyItems === "Yes") {
    assumptions.push("2 movers (heavy or awkward item)");
    return 2;
  }
  const beds = String(input.bedrooms || "");
  if (intent === "house" && (beds === "2" || beds === "3" || beds === "4+")) {
    assumptions.push("2 movers (2+ bedroom move)");
    return 2;
  }
  const office = String(input.officeSize || "");
  if (intent === "office" && /medium|large|warehouse/i.test(office)) {
    assumptions.push("2 movers (office size)");
    return 2;
  }
  if (intent === "storage" && /full van/i.test(String(input.storageUnitSize || ""))) {
    assumptions.push("2 movers (full van load)");
    return 2;
  }
  assumptions.push("1 mover assumed");
  return 1;
}

// ── B. Loading/unloading minutes ─────────────────────────────────────
function estimateLoadingMinutes(intent: string, input: GuidePriceInput, assumptions: string[]): number {
  switch (intent) {
    case "single-item": {
      const heavy = input.heavyItems === "Yes" || /piano|wardrobe|sofa bed|american fridge/i.test(String(input.heavyItemsDescription || ""));
      return heavy ? 75 : 45;
    }
    case "student": {
      let minutes = 60;
      const boxes = num(input.numberOfBoxes);
      const cases = num(input.suitcases);
      minutes += Math.min(60, boxes * 2 + cases * 3);
      if (input.smallFurnitureItems && !/none/i.test(String(input.smallFurnitureItems))) {
        minutes += 30;
        assumptions.push("small furniture included");
      }
      return minutes;
    }
    case "general": {
      let minutes = 60;
      const items = num(input.numberOfItems);
      if (items > 0) {
        minutes += Math.min(120, items * 6); // ~6 min/item, capped
        assumptions.push(`${items} items`);
      }
      return minutes;
    }
    case "storage": {
      const size = String(input.storageUnitSize || "");
      if (/few items/i.test(size)) return 60;
      if (/half van/i.test(size)) return 90;
      if (/full van/i.test(size)) return 150;
      return 100; // Unsure / unknown
    }
    case "house": {
      const map: Record<string, number> = { "Studio": 75, "1": 120, "2": 180, "3": 270, "4+": 390 };
      return map[String(input.bedrooms || "")] ?? 150;
    }
    case "office": {
      const size = String(input.officeSize || "");
      if (/small/i.test(size)) return 150;
      if (/medium/i.test(size)) return 270;
      if (/large|warehouse/i.test(size)) return 480;
      return 200;
    }
    default:
      return 60;
  }
}

// ── F. Minimum callout floors ────────────────────────────────────────
function minimumFloor(intent: string, input: GuidePriceInput): number {
  switch (intent) {
    case "single-item": return 55;
    case "student": return 75;
    case "general": return 90;
    case "storage": return 95;
    case "house": {
      const map: Record<string, number> = { "Studio": 90, "1": 120, "2": 180, "3": 280, "4+": 420 };
      return map[String(input.bedrooms || "")] ?? 120;
    }
    case "office": {
      const size = String(input.officeSize || "");
      if (/small/i.test(size)) return 180;
      if (/medium/i.test(size)) return 350;
      if (/large|warehouse/i.test(size)) return 650;
      return 180;
    }
    default: return 90;
  }
}

// ── C (v1.1). Route-distance minimums for van-based move types ──────
function routeDistanceMinimum(intent: string, routeMiles: number, input?: GuidePriceInput): number {
  if (input && isSmallGeneralLocalMove(intent, input, routeMiles)) {
    const items = getItemCount(input);
    if (items <= 1) return 50;
    if (items === 2) return 60;
    return 70;
  }

  const tiers: Record<string, [number, number, number, number, number]> = {
    // [0–10mi, 11–25mi, 26–50mi, 51–100mi, 100+mi]
    general: [90, 120, 160, 240, 350],
    student: [75, 110, 150, 225, 325],
    "single-item": [55, 85, 130, 200, 300],
  };
  const tier = tiers[intent];
  if (!tier) return 0; // house/office/storage keep their own strong floors
  if (routeMiles > 100) return tier[4];
  if (routeMiles > 50) return tier[3];
  if (routeMiles > 25) return tier[2];
  if (routeMiles > 10) return tier[1];
  return tier[0];
}

// ── G. Complexity uplifts ────────────────────────────────────────────
function complexityMultiplier(input: GuidePriceInput, assumptions: string[]): { multiplier: number; level: "standard" | "raised" | "high" } {
  let pct = 0;

  if (input.accessType === "Stairs") { pct += 10; assumptions.push("stairs access"); }
  else if (input.accessType === "Not sure") { pct += 5; }

  if (input.parkingAvailable === "No") { pct += 10; assumptions.push("no parking"); }
  else if (input.parkingAvailable === "Not sure") { pct += 5; }

  if (input.heavyItems === "Yes") { pct += 10; assumptions.push("heavy items"); }
  else if (input.heavyItems === "Not sure") { pct += 5; }

  if (input.dismantlingRequired === "Yes") { pct += 10; assumptions.push("dismantling required"); }
  else if (input.dismantlingRequired === "Not sure") { pct += 5; }

  // London / central postcode signal
  const pcs = `${input.collectionPostcode || ""} ${input.deliveryPostcode || ""}`.toUpperCase();
  if (/\b(EC|WC|E1|W1|SW1|SE1|N1|NW1)\d?/.test(pcs)) { pct += 10; assumptions.push("central London area"); }

  const level: "standard" | "raised" | "high" = pct >= 25 ? "high" : pct >= 10 ? "raised" : "standard";
  return { multiplier: 1 + pct / 100, level };
}

/** Fallback when no route data exists: broad move-type guide (old table). */
export function getFallbackGuidePrice(input: GuidePriceInput): GuidePriceResult {
  const intent = intentFromInput(input);
  const base: Record<string, [number, number]> = {
    office: [300, 800],
    house: [180, 450],
    student: [80, 200],
    "single-item": [45, 120],
    general: [100, 300],
    storage: [120, 350],
  };

  let [min, max] = base[intent] || base.general;

  if (intent === "house" && input.bedrooms) {
    const map: Record<string, [number, number]> = {
      "Studio": [80, 130], "1": [100, 180], "2": [180, 280], "3": [300, 450], "4+": [500, 850],
    };
    [min, max] = map[String(input.bedrooms)] || [min, max];
  }
  if (intent === "office" && input.officeSize) {
    const map: Record<string, [number, number]> = {
      "Small office": [200, 450], "Medium office": [400, 900],
      "Large office": [800, 1800], "Warehouse / Industrial": [600, 1500],
    };
    [min, max] = map[String(input.officeSize)] || [min, max];
  }
  if (intent === "storage" && input.storageUnitSize) {
    const map: Record<string, [number, number]> = {
      "Few items": [60, 150], "Half van": [120, 250], "Full van": [200, 400], "Unsure": [120, 350],
    };
    [min, max] = map[String(input.storageUnitSize)] || [min, max];
  }

  min = roundGuidePrice(min);
  max = roundGuidePrice(Math.max(max, min + 10));

  return {
    min,
    max,
    display: formatGuidePriceRange(min, max),
    confidence: "fallback",
    formulaVersion: GUIDE_FORMULA_VERSION,
    assumptions: ["route unavailable — broad move-type guide"],
    inputsUsed: {
      routeMiles: null,
      routeDurationMinutes: null,
      estimatedWorkMinutes: 0,
      likelyMovers: 1,
      complexityLevel: "standard",
    },
  };
}

export function calculateGuidePrice(input: GuidePriceInput): GuidePriceResult {
  let usableRouteEstimate = input.routeEstimate || null;
  let distanceMeters = num(usableRouteEstimate?.distanceMeters);
  let durationSeconds = num(usableRouteEstimate?.durationSeconds);

  // If precise route data was not supplied, still try a UK-wide postcode
  // distance fallback before falling back to broad move-type bands. This is
  // what keeps local routes different from long-distance routes, even if
  // the external postcode lookup is unavailable.
  if ((distanceMeters <= 0 || durationSeconds <= 0) && input.collectionPostcode && input.deliveryPostcode) {
    usableRouteEstimate = estimateRouteByPostcodeFallback(input.collectionPostcode, input.deliveryPostcode);
    distanceMeters = num(usableRouteEstimate?.distanceMeters);
    durationSeconds = num(usableRouteEstimate?.durationSeconds);
  }

  // No usable postcode/route data → broad fallback guide
  if (distanceMeters <= 0 || durationSeconds <= 0) {
    return getFallbackGuidePrice(input);
  }

  const intent = intentFromInput(input);
  const assumptions: string[] = [];

  const routeMiles = Math.round((distanceMeters / 1609.344) * 10) / 10;
  const routeDurationMinutes = Math.round(durationSeconds / 60);

  // A. Movers
  const likelyMovers = decideLikelyMovers(intent, input, assumptions);

  // B + C. Work time = loading/unloading + effective drive time.
  // Route time is multiplied to partly account for travel to pickup and
  // return/positioning after drop-off (v1.1 calibration).
  const routeTimeMultiplier = routeMiles > 120 ? 2.15 : routeMiles > 80 ? 2 : routeMiles > 40 ? 1.75 : 1.5;
  const effectiveRouteMinutes = routeDurationMinutes * routeTimeMultiplier;
  const loadingMinutes = estimateLoadingMinutes(intent, input, assumptions);
  const estimatedWorkMinutes = loadingMinutes + effectiveRouteMinutes;

  // D. Hourly guide rate (internal only)
  const beds = String(input.bedrooms || "");
  const largeJob =
    (intent === "house" && (beds === "3" || beds === "4+")) ||
    (intent === "office" && /medium|large|warehouse/i.test(String(input.officeSize || "")));
  const hourlyRate = largeJob ? RATE_LARGE_JOB : likelyMovers >= 2 ? RATE_TWO_MOVERS : RATE_ONE_MOVER;

  let estimate = (estimatedWorkMinutes / 60) * hourlyRate;

  // E. Mileage factor (first 10 miles included)
  if (routeMiles > MILEAGE_FREE_MILES) {
    estimate += (routeMiles - MILEAGE_FREE_MILES) * MILEAGE_RATE_PER_MILE;
  }
  if (routeMiles > 100) {
    estimate *= LONG_DISTANCE_POSITIONING_UPLIFT_100;
    assumptions.push("long-distance uplift (100+ miles)");
  } else if (routeMiles > 50) {
    estimate *= LONG_DISTANCE_POSITIONING_UPLIFT_50;
    assumptions.push("long-distance uplift (50+ miles)");
  }

  // G. Complexity uplifts
  const { multiplier, level } = complexityMultiplier(input, assumptions);
  estimate *= multiplier;

  // F. Minimum callout floor (2-mover jobs carry a higher callout),
  //    plus route-distance minimums for van-based move types (v1.1).
  let floor = minimumFloor(intent, input);
  if (likelyMovers >= 2) {
    floor = Math.round(floor * 1.3);
  }
  const distanceFloor = routeDistanceMinimum(intent, routeMiles, input);
  if (distanceFloor > floor) floor = distanceFloor;
  if (isSmallGeneralLocalMove(intent, input, routeMiles)) {
    const items = getItemCount(input);
    floor = Math.min(floor, items <= 1 ? 50 : items === 2 ? 60 : 70);
    assumptions.push("small local item move");
  }

  let flooredToMinimum = false;
  if (estimate < floor) {
    estimate = floor;
    flooredToMinimum = true;
    assumptions.push("minimum callout applied");
  }

  // H. Range buffer + rounding. Floored estimates use the floor as the
  // range minimum with a tighter upper buffer, so short local jobs are
  // not over-priced while floors are respected.
  let min: number;
  let max: number;
  if (flooredToMinimum) {
    min = roundGuidePrice(floor);
    max = roundGuidePrice(floor * 1.4);
  } else {
    min = roundGuidePrice(estimate * 0.85);
    max = roundGuidePrice(estimate * 1.25);
    if (min < roundGuidePrice(floor)) min = roundGuidePrice(floor);
  }
  // Keep the guide commercially competitive without claiming to be a live
  // competitor quote. We do not copy or scrape third-party prices.
  min = Math.max(10, roundGuidePrice(min - COMPETITIVE_DISPLAY_ADJUSTMENT));
  max = Math.max(min + (min < 200 ? 30 : 50), roundGuidePrice(max - COMPETITIVE_DISPLAY_ADJUSTMENT));
  if (min < 10) min = 10;
  if (max <= min) max = min + (min < 200 ? 30 : 50);

  return {
    min,
    max,
    display: formatGuidePriceRange(min, max),
    confidence: "route-based",
    formulaVersion: GUIDE_FORMULA_VERSION,
    assumptions,
    inputsUsed: {
      routeMiles,
      routeDurationMinutes,
      estimatedWorkMinutes: Math.round(estimatedWorkMinutes),
      likelyMovers,
      complexityLevel: level,
    },
  };
}
