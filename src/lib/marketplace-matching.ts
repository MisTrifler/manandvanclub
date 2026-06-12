// ─────────────────────────────────────────────────────────────────────
// Marketplace visibility rules — shared by the /marketplace page loader
// and the /api/mover/submit-quote route so filtering cannot be bypassed
// from the browser.
//
// Business rule: a driver only sees (and can only quote) jobs that are
// genuinely available to them: verified, unquoted, unpaid, future-dated,
// inside their approved service area. Service-type flags are retained
// for future filtering/reporting, but are not enforced at launch.
// Default is restrictive: if we cannot confidently match
// the area, the job is NOT shown.
// ─────────────────────────────────────────────────────────────────────

import { LOCATIONS } from "@/constants/locations";

export const AVAILABLE_STATUSES = new Set(["available", "verified", "active"]);

// ── UK postcode area → primary city + region ────────────────────────
// Used to resolve a lead's collection/delivery postcode to an area we
// can compare against the driver's approved coverage area.
const POSTCODE_AREA_MAP: Record<string, { city: string; region: string }> = {
  // West Midlands & surroundings
  B: { city: "Birmingham", region: "West Midlands" },
  CV: { city: "Coventry", region: "West Midlands" },
  DY: { city: "Dudley", region: "West Midlands" },
  WS: { city: "Walsall", region: "West Midlands" },
  WV: { city: "Wolverhampton", region: "West Midlands" },
  ST: { city: "Stoke-on-Trent", region: "West Midlands" },
  TF: { city: "Telford", region: "West Midlands" },
  WR: { city: "Worcester", region: "West Midlands" },
  HR: { city: "Hereford", region: "West Midlands" },
  SY: { city: "Shrewsbury", region: "West Midlands" },
  // Greater London
  E: { city: "London", region: "Greater London" },
  EC: { city: "London", region: "Greater London" },
  N: { city: "London", region: "Greater London" },
  NW: { city: "London", region: "Greater London" },
  SE: { city: "London", region: "Greater London" },
  SW: { city: "London", region: "Greater London" },
  W: { city: "London", region: "Greater London" },
  WC: { city: "London", region: "Greater London" },
  BR: { city: "Bromley", region: "Greater London" },
  CR: { city: "Croydon", region: "Greater London" },
  DA: { city: "Dartford", region: "Greater London" },
  EN: { city: "Enfield", region: "Greater London" },
  HA: { city: "Harrow", region: "Greater London" },
  IG: { city: "Ilford", region: "Greater London" },
  KT: { city: "Kingston upon Thames", region: "Greater London" },
  RM: { city: "Romford", region: "Greater London" },
  SM: { city: "Sutton", region: "Greater London" },
  TW: { city: "Twickenham", region: "Greater London" },
  UB: { city: "Uxbridge", region: "Greater London" },
  WD: { city: "Watford", region: "Greater London" },
  // Greater Manchester / North West
  M: { city: "Manchester", region: "Greater Manchester" },
  OL: { city: "Oldham", region: "Greater Manchester" },
  BL: { city: "Bolton", region: "Greater Manchester" },
  SK: { city: "Stockport", region: "Greater Manchester" },
  WN: { city: "Wigan", region: "Greater Manchester" },
  WA: { city: "Warrington", region: "Greater Manchester" },
  PR: { city: "Preston", region: "North West" },
  FY: { city: "Blackpool", region: "North West" },
  LA: { city: "Lancaster", region: "North West" },
  CA: { city: "Carlisle", region: "North West" },
  // Merseyside
  L: { city: "Liverpool", region: "Merseyside" },
  CH: { city: "Birkenhead", region: "Merseyside" },
  // Yorkshire
  LS: { city: "Leeds", region: "West Yorkshire" },
  BD: { city: "Bradford", region: "West Yorkshire" },
  HX: { city: "Halifax", region: "West Yorkshire" },
  HD: { city: "Huddersfield", region: "West Yorkshire" },
  WF: { city: "Wakefield", region: "West Yorkshire" },
  S: { city: "Sheffield", region: "South Yorkshire" },
  DN: { city: "Doncaster", region: "South Yorkshire" },
  YO: { city: "York", region: "North Yorkshire" },
  HG: { city: "Harrogate", region: "North Yorkshire" },
  HU: { city: "Hull", region: "East Yorkshire" },
  // East Midlands
  NG: { city: "Nottingham", region: "East Midlands" },
  DE: { city: "Derby", region: "East Midlands" },
  LE: { city: "Leicester", region: "East Midlands" },
  LN: { city: "Lincoln", region: "East Midlands" },
  NN: { city: "Northampton", region: "East Midlands" },
  // South West
  BS: { city: "Bristol", region: "South West" },
  BA: { city: "Bath", region: "South West" },
  GL: { city: "Gloucester", region: "South West" },
  TA: { city: "Taunton", region: "South West" },
  EX: { city: "Exeter", region: "South West" },
  PL: { city: "Plymouth", region: "South West" },
  TQ: { city: "Torquay", region: "South West" },
  TR: { city: "Truro", region: "South West" },
  DT: { city: "Dorchester", region: "South West" },
  BH: { city: "Bournemouth", region: "South West" },
  SP: { city: "Salisbury", region: "South West" },
  SN: { city: "Swindon", region: "South West" },
  // North East
  NE: { city: "Newcastle upon Tyne", region: "North East" },
  SR: { city: "Sunderland", region: "North East" },
  DH: { city: "Durham", region: "North East" },
  TS: { city: "Middlesbrough", region: "North East" },
  DL: { city: "Darlington", region: "North East" },
  // South East
  OX: { city: "Oxford", region: "South East" },
  RG: { city: "Reading", region: "South East" },
  MK: { city: "Milton Keynes", region: "South East" },
  SL: { city: "Slough", region: "South East" },
  HP: { city: "High Wycombe", region: "South East" },
  GU: { city: "Guildford", region: "South East" },
  PO: { city: "Portsmouth", region: "South East" },
  SO: { city: "Southampton", region: "South East" },
  BN: { city: "Brighton", region: "South East" },
  ME: { city: "Medway", region: "South East" },
  CT: { city: "Canterbury", region: "South East" },
  TN: { city: "Tunbridge Wells", region: "South East" },
  RH: { city: "Redhill", region: "South East" },
  // East of England
  LU: { city: "Luton", region: "East of England" },
  AL: { city: "St Albans", region: "East of England" },
  SG: { city: "Stevenage", region: "East of England" },
  CM: { city: "Chelmsford", region: "East of England" },
  CO: { city: "Colchester", region: "East of England" },
  SS: { city: "Southend-on-Sea", region: "East of England" },
  IP: { city: "Ipswich", region: "East of England" },
  NR: { city: "Norwich", region: "East of England" },
  CB: { city: "Cambridge", region: "East of England" },
  PE: { city: "Peterborough", region: "East of England" },
  // Wales
  CF: { city: "Cardiff", region: "Wales" },
  SA: { city: "Swansea", region: "Wales" },
  NP: { city: "Newport", region: "Wales" },
  LL: { city: "Wrexham", region: "Wales" },
  LD: { city: "Llandrindod Wells", region: "Wales" },
  // Scotland
  G: { city: "Glasgow", region: "Scotland" },
  EH: { city: "Edinburgh", region: "Scotland" },
  AB: { city: "Aberdeen", region: "Scotland" },
  DD: { city: "Dundee", region: "Scotland" },
  FK: { city: "Falkirk", region: "Scotland" },
  KY: { city: "Kirkcaldy", region: "Scotland" },
  ML: { city: "Motherwell", region: "Scotland" },
  PA: { city: "Paisley", region: "Scotland" },
};

function norm(value?: string | null): string {
  return String(value || "").toLowerCase().trim();
}

function slugify(value: string): string {
  return norm(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function postcodeArea(postcode?: string | null): string | null {
  const cleaned = norm(postcode).replace(/\s+/g, "").toUpperCase();
  const match = cleaned.match(/^([A-Z]{1,2})\d/);
  return match ? match[1] : null;
}

interface ResolvedArea {
  city: string;
  region: string;
  county?: string;
  nearbySlugs: Set<string>;
  slug?: string;
}

function lookupLocationByName(name: string) {
  const n = norm(name);
  if (!n) return undefined;
  return (
    LOCATIONS.find((l) => norm(l.name) === n) ||
    LOCATIONS.find((l) => norm(l.name).includes(n) || n.includes(norm(l.name)))
  );
}

function resolveCity(city: string, region: string): ResolvedArea {
  const loc = lookupLocationByName(city);
  return {
    city: loc ? loc.name : city,
    region: loc ? loc.region : region,
    county: loc?.county,
    slug: loc?.slug,
    nearbySlugs: new Set((loc?.nearbyLocations || []).map(slugify)),
  };
}

export function resolveLeadAreas(collectionPostcode?: string | null, deliveryPostcode?: string | null): ResolvedArea[] {
  const out: ResolvedArea[] = [];
  for (const pc of [collectionPostcode, deliveryPostcode]) {
    const area = postcodeArea(pc);
    if (area && POSTCODE_AREA_MAP[area]) {
      const { city, region } = POSTCODE_AREA_MAP[area];
      out.push(resolveCity(city, region));
    }
  }
  return out;
}

export interface DriverProfile {
  coverage_area?: string | null;
  radius?: string | null;
  service_house?: boolean | null;
  service_flat?: boolean | null;
  service_student?: boolean | null;
  service_furniture?: boolean | null;
  service_office?: boolean | null;
  service_single?: boolean | null;
  service_long_distance?: boolean | null;
}

function isWideCoverage(driver: DriverProfile): boolean {
  const cov = norm(driver.coverage_area);
  const rad = norm(driver.radius);
  return (
    cov.includes("uk") || cov.includes("england") || cov.includes("nationwide") ||
    rad.includes("england") || rad.includes("uk") || rad.includes("nationwide")
  );
}

function radiusTier(radius?: string | null): "local" | "county" | "region" | "wide" {
  const r = norm(radius);
  if (r.includes("england") || r.includes("uk") || r.includes("nationwide")) return "wide";
  const miles = parseInt(r, 10);
  if (Number.isFinite(miles)) {
    if (miles <= 10) return "local";
    if (miles <= 25) return "county";
    return "region";
  }
  return "local"; // unknown radius → most restrictive
}

/**
 * Restrictive area match: returns true only when the lead's collection
 * or delivery postcode can be confidently placed inside the driver's
 * approved coverage. Unresolvable driver area or lead postcodes → false
 * (unless the driver is explicitly wide-coverage).
 */
export function leadMatchesDriverArea(
  lead: { collection_postcode?: string | null; delivery_postcode?: string | null },
  driver: DriverProfile
): boolean {
  if (isWideCoverage(driver)) return true;

  const driverLoc = lookupLocationByName(norm(driver.coverage_area));
  let driverArea: ResolvedArea | null = null;
  if (driverLoc) {
    driverArea = {
      city: driverLoc.name,
      region: driverLoc.region,
      county: driverLoc.county,
      slug: driverLoc.slug,
      nearbySlugs: new Set((driverLoc.nearbyLocations || []).map(slugify)),
    };
  } else {
    // fallback: coverage text matches a postcode-area city name
    const cov = norm(driver.coverage_area);
    const entry = Object.values(POSTCODE_AREA_MAP).find(
      (e) => norm(e.city) === cov || norm(e.city).includes(cov) || cov.includes(norm(e.city))
    );
    if (entry) driverArea = resolveCity(entry.city, entry.region);
  }

  if (!driverArea) return false; // cannot confidently match → hide

  const leadAreas = resolveLeadAreas(lead.collection_postcode, lead.delivery_postcode);
  if (leadAreas.length === 0) return false; // unresolvable lead → hide

  const tier = radiusTier(driver.radius);

  return leadAreas.some((la) => {
    const sameCity = norm(la.city) === norm(driverArea!.city);
    const nearby =
      (la.slug ? driverArea!.nearbySlugs.has(la.slug) : false) ||
      (driverArea!.slug ? la.nearbySlugs.has(driverArea!.slug) : false);
    const sameCounty = Boolean(la.county && driverArea!.county && norm(la.county) === norm(driverArea!.county));
    const sameRegion = norm(la.region) === norm(driverArea!.region);

    if (tier === "local") return sameCity || nearby;
    if (tier === "county") return sameCity || nearby || sameCounty;
    return sameCity || nearby || sameCounty || sameRegion; // region tier
  });
}

// ── Service type matching ────────────────────────────────────────────

function hasAnyServiceData(driver: DriverProfile): boolean {
  return [
    driver.service_house,
    driver.service_flat,
    driver.service_student,
    driver.service_furniture,
    driver.service_office,
    driver.service_single,
    driver.service_long_distance,
  ].some((v) => v === true || v === false);
}

/**
 * Returns true when the lead's move type matches one of the driver's
 * approved service types.
 *
 * NOTE (launch decision): this function is currently NOT used for
 * marketplace visibility, quote permission, or notification emails —
 * launch visibility is area-based only. Retained for future
 * filtering/reporting use.
 */
export function leadMatchesDriverServices(
  lead: { move_type?: string | null; collection_postcode?: string | null; delivery_postcode?: string | null },
  driver: DriverProfile
): boolean {
  if (!hasAnyServiceData(driver)) return true; // legacy application rows

  const type = norm(lead.move_type);
  const anyService =
    driver.service_house === true ||
    driver.service_flat === true ||
    driver.service_student === true ||
    driver.service_furniture === true ||
    driver.service_office === true ||
    driver.service_single === true ||
    driver.service_long_distance === true;

  let typeOk: boolean;
  if (type.includes("house") || type.includes("home")) typeOk = driver.service_house === true;
  else if (type.includes("flat")) typeOk = driver.service_flat === true || driver.service_house === true;
  else if (type.includes("student")) typeOk = driver.service_student === true;
  else if (type.includes("furniture")) typeOk = driver.service_furniture === true || driver.service_single === true;
  else if (type.includes("office")) typeOk = driver.service_office === true;
  else if (type.includes("single")) typeOk = driver.service_single === true || driver.service_furniture === true;
  else typeOk = anyService; // Man & Van / Storage / general → any approved service

  if (!typeOk) return false;

  // Long-distance check: if both postcodes resolve to different regions,
  // require the long-distance service (when service data is recorded).
  const areas = resolveLeadAreas(lead.collection_postcode, lead.delivery_postcode);
  if (areas.length === 2 && norm(areas[0].region) !== norm(areas[1].region)) {
    return driver.service_long_distance === true;
  }

  return true;
}

// ── Availability ─────────────────────────────────────────────────────

export function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function moveDateIsCurrent(moveDate?: string | null): boolean {
  const raw = norm(moveDate);
  if (!raw) return true; // no date recorded → don't hide on date alone
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return true;
  return d.toISOString().slice(0, 10) >= todayDateString();
}

/**
 * Core availability rules (status/ownership/payment/date). Area and
 * service matching are separate so the submit-quote route can return
 * distinct error messages.
 */
export function leadIsAvailable(lead: {
  is_verified?: boolean | null;
  status?: string | null;
  quoted_by?: string | null;
  quote_amount?: number | null;
  booking_fee_paid?: boolean | null;
  customer_details_released_at?: string | null;
  move_date?: string | null;
}): boolean {
  if (lead.is_verified !== true) return false;
  if (!AVAILABLE_STATUSES.has(norm(lead.status))) return false;
  if (lead.quoted_by) return false;
  if (lead.quote_amount !== null && lead.quote_amount !== undefined) return false;
  if (lead.booking_fee_paid === true) return false;
  if (lead.customer_details_released_at) return false;
  if (!moveDateIsCurrent(lead.move_date)) return false;
  return true;
}

/**
 * Full availability for a specific driver: status + area.
 *
 * NOTE (launch decision): service-type flags are retained for future
 * filtering/reporting, but launch visibility is area-based — approved
 * movers can see and quote ANY move type in their covered area.
 * leadMatchesDriverServices is intentionally NOT applied here.
 */
export function leadIsAvailableToDriver(
  lead: Parameters<typeof leadIsAvailable>[0] & {
    collection_postcode?: string | null;
    delivery_postcode?: string | null;
    move_type?: string | null;
  },
  driver: DriverProfile
): boolean {
  return leadIsAvailable(lead) && leadMatchesDriverArea(lead, driver);
}
