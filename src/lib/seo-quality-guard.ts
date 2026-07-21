// ─────────────────────────────────────────────────────────────────────
// SEO quality guard for programmatic location pages.
//
// Purpose: prevent thin doorway pages. A location page is only
// indexable (and only included in the sitemap) when it carries enough
// genuinely useful, locally specific content. Pages that fail are
// rendered with noindex and excluded from the sitemap until their data
// is enriched.
// ─────────────────────────────────────────────────────────────────────

import { LOCATIONS, type LocationData } from "@/constants/locations";

const FORBIDDEN_PHRASES = [
  "lead fee",
  "unlock fee",
  "lead unlock",
  "booking fee",
  "fully insured",
  "guaranteed cover",
  "covered as standard",
];

// Phrases that indicate generic filler rather than real local knowledge.
// A page whose intro/knowledge is dominated by these (with no concrete
// local references) is too generic to index.
const GENERIC_FILLER_PATTERNS = [
  /our movers know every neighbourhood/i,
  /we cover all areas/i,
  /no matter where you are moving/i,
  /all types of moves at great prices/i,
];

// Launch mode keeps the national page set built but prevents weaker
// non-priority pages being indexed too early. Default is ON for a new
// site. Set SEO_LAUNCH_MODE=false when the site has enough real local
// proof, mover coverage and Search Console demand to expand nationally.
const SEO_LAUNCH_MODE = process.env.SEO_LAUNCH_MODE !== "false";

const LAUNCH_INDEXABLE_LOCATION_SLUGS = new Set([
  // ─── West Midlands (12) ───
  "birmingham",
  "walsall",
  "wolverhampton",
  "dudley",
  "west-bromwich",
  "solihull",
  "coventry",
  "stourbridge",
  "halesowen",
  "wednesbury",
  "bloxwich",
  "brownhills",
  // ─── West Midlands area pages (10) ───
  "aldridge",
  "willenhall",
  "darlaston",
  "oldbury",
  "smethwick",
  "tipton",
  "bilston",
  // ─── East Midlands (5) ───
  "nottingham",
  "leicester",
  "derby",
  "northampton",
  "lincoln",
  // ─── East Midlands area pages — Nottingham (5) ───
  "arnold",
  "beeston",
  "carlton",
  "west-bridgford",
  "hucknall",
  // ─── East Midlands area pages — Leicester (4) ───
  "oadby",
  "wigston",
  "braunstone",
  "evington",
  // ─── East Midlands area pages — Derby (4) ───
  "chaddesden",
  "mickleover",
  "alvaston",
  "littleover",
  // ─── East Midlands area pages — Northampton (3) ───
  "kingsthorpe",
  "duston",
  "abington",
  // ─── East Midlands area pages — Lincoln (1) ───
  "north-hykeham",
  // ─── East Midlands expansion (5) ───
  "rugby",
  "nuneaton",
  "tamworth",
  "cannock",
  "lichfield",
  // ─── Greater London (27) ───
  "london",
  "croydon",
  "bromley",
  "romford",
  "ilford",
  "wembley",
  "ealing",
  "harrow",
  "hounslow",
  "kingston",
  "twickenham",
  "enfield",
  "barnet",
  "finchley",
  "edgware",
  "stratford",
  "lewisham",
  "greenwich",
  "bexley",
  "sutton",
  "mitcham",
  "walthamstow",
  "wood-green",
  "tottenham",
  "acton",
  "chiswick",
  "richmond",
  // ─── Greater Manchester (14) ───
  "manchester",
  "salford",
  "bolton",
  "bury",
  "rochdale",
  "oldham",
  "stockport",
  "altrincham",
  "trafford",
  "wigan",
  "leigh",
  "ashton-under-lyne",
  "hyde",
  "stalybridge",
  // ─── West Yorkshire (10) ───
  "leeds",
  "bradford",
  "wakefield",
  "huddersfield",
  "halifax",
  "dewsbury",
  "batley",
  "keighley",
  "pudsey",
  "morley",
  // ─── Merseyside (9) ───
  "liverpool",
  "bootle",
  "birkenhead",
  "wallasey",
  "southport",
  "st-helens",
  "widnes",
  "prescot",
  "huyton",
  // ─── South West (12) ───
  "bristol",
  "bath",
  "weston-super-mare",
  "bridgwater",
  "taunton",
  "yeovil",
  "frome",
  "trowbridge",
  "swindon",
  "cheltenham",
  "gloucester",
  // ─── South Yorkshire (1) ───
  "sheffield",
  // ─── Scotland (4) ───
  "edinburgh",
  "glasgow",
  "aberdeen",
  "dundee",
  // ─── Wales (2) ───
  "cardiff",
  "swansea",
  // ─── North East (1) ───
  "newcastle-upon-tyne",
  // ─── South East (4) ───
  "southampton",
  "portsmouth",
  "oxford",
  "cambridge",
  // ─── South (1) ───
  "reading",
  // ─── West England (1) ───
  "stoke-on-trent",
  // ─── East Yorkshire (1) ───
  "hull",
  // ─── South West coast (1) ───
  "plymouth",
  // ─── North Yorkshire (1) ───
  "york",

  // ─── Northern Ireland (4 — NEW) ───
  "belfast",
  "derry",
  "lisburn",
  "newry",

  // ─── North East expansion (6 — NEW) ───
  "sunderland",
  "middlesbrough",
  "gateshead",
  "darlington",
  "durham",
  "hartlepool",

  // ─── South Yorkshire expansion (3 — NEW) ───
  "doncaster",
  "rotherham",
  "barnsley",

  // ─── South East expansion (8 — NEW) ───
  "brighton",
  "milton-keynes",
  "luton",
  "bournemouth",
  "slough",
  "medway",
  "crawley",
  "maidstone",
  "horsham",

  // ─── East of England expansion (5 — NEW) ───
  "peterborough",
  "norwich",
  "ipswich",
  "colchester",
  "basildon",

  // ─── South West expansion (3 — NEW) ───
  "exeter",
  "torquay",
  "truro",

  // ─── Wales expansion (4 — NEW) ───
  "newport",
  "wrexham",
  "bangor",
  "aberystwyth",

  // ─── Scotland expansion (7 — NEW) ───
  "inverness",
  "stirling",
  "perth",
  "paisley",
  "east-kilbride",
  "livingston",
  "falkirk",

  // ─── East Midlands — Derbyshire towns (11 NEW) ───
  "chesterfield",
  "glossop",
  "ilkeston",
  "long-eaton",
  "belper",
  "swadlincote",
  "buxton",
  "ripley",
  "heanor",
  "alfreton",
  "matlock",

  // ─── East Midlands — Leicestershire towns (7 NEW) ───
  "loughborough",
  "coalville",
  "hinckley",
  "melton-mowbray",
  "market-harborough",
  "ashby-de-la-zouch",
  "lutterworth",

  // ─── East Midlands — Lincolnshire towns (8 NEW) ───
  "grantham",
  "boston",
  "spalding",
  "stamford",
  "gainsborough",
  "sleaford",
  "skegness",
  "louth",

  // ─── East Midlands — Northamptonshire towns (5 NEW) ───
  "kettering",
  "corby",
  "wellingborough",
  "rushden",
  "daventry",

  // ─── East Midlands — Nottinghamshire towns (6 NEW) ───
  "mansfield",
  "newark-on-trent",
  "worksop",
  "sutton-in-ashfield",
  "retford",
  "kirkby-in-ashfield",

  // ─── East Midlands — Rutland (1 NEW) ───
  "oakham",

  // ─── West Midlands expansion ───
  "burton-upon-trent",

  // ─── Greater Manchester expansion (18 NEW) ───
  "warrington",
  "sale",
  "prestwich",
  "middleton",
  "eccles",
  "swinton",
  "walkden",
  "failsworth",
  "denton",
  "droylsden",
  "farnworth",
  "horwich",
  "westhoughton",
  "radcliffe",
  "heywood",
  "ashton-in-makerfield",
  "cheadle",
  // ─── Phase 3: Merseyside + Lancashire (10) ───
  "ellesmere-port",
  "bebington",
  "preston",
  "blackpool",
  "blackburn",
  "burnley",
  "lytham-st-annes",
  "chorley",
  "skelmersdale",
  "ormskirk",
]);

export function isSeoLaunchMode(): boolean {
  return SEO_LAUNCH_MODE;
}

export function isLaunchIndexableLocation(slug: string): boolean {
  return LAUNCH_INDEXABLE_LOCATION_SLUGS.has(slug);
}

export interface QualityResult {
  indexable: boolean;
  reasons: string[];
}

const slugSet = new Set(LOCATIONS.map((l) => l.slug));

/** Internal links a page can actually render: valid nearbyLocations refs + same-region cities. */
function countInternalLinks(loc: LocationData): number {
  const validNearby = (loc.nearbyLocations || []).filter((s) => slugSet.has(s)).length;
  const regionCities = LOCATIONS.filter((l) => l.region === loc.region && l.slug !== loc.slug).length;
  return validNearby + regionCities;
}

/** Mirror of generateFAQ's guaranteed output: 7 unconditional + conditionals. */
function countFaqs(loc: LocationData): number {
  let count = 7;
  if (loc.nearbyAreas.length > 0) count += 1;
  if (loc.hasStudentAreas && loc.studentAreas && loc.studentAreas.length > 0) count += 1;
  if (loc.businessDistricts && loc.businessDistricts.length > 0) count += 1;
  return count;
}

/** Does intro/knowledge mention at least one concrete local feature? */
function hasConcreteLocalContent(loc: LocationData): boolean {
  const text = `${loc.intro} ${loc.knowledge}`;
  const references = [
    ...(loc.nearbyAreas || []),
    ...(loc.majorRoads || []),
    ...(loc.studentAreas || []),
    ...(loc.businessDistricts || []),
  ];
  return references.some((ref) => ref && text.includes(ref));
}

/**
 * Tightened quality rules — ALL must pass for a page to be indexable.
 * In SEO launch mode, the page must also be in the priority West
 * Midlands launch set, so broad national pages can exist without being
 * indexed before they have proof/coverage.
 *
 * - intro + knowledge of meaningful length (unique local copy)
 * - at least 5 nearby areas
 * - at least 3 FAQs
 * - at least 3 renderable internal nearby/city links
 * - at least 3 local moving considerations
 * - at least 2 locality signals (roads/student areas/districts)
 * - unique title/meta inputs (unique name + unique intro/knowledge)
 * - no duplicate intro OR knowledge paragraph with another location
 * - no forbidden phrases
 * - not too generic: must reference at least one concrete local
 *   feature and contain no generic-filler patterns
 */
export function assessLocationQuality(loc: LocationData): QualityResult {
  const reasons: string[] = [];

  if (SEO_LAUNCH_MODE && !LAUNCH_INDEXABLE_LOCATION_SLUGS.has(loc.slug)) {
    reasons.push("launch mode: outside priority West Midlands index set");
  }

  if (!loc.intro || loc.intro.trim().length < 120) {
    reasons.push("intro too short");
  }
  if (!loc.knowledge || loc.knowledge.trim().length < 120) {
    reasons.push("knowledge paragraph too short");
  }
  if (!loc.nearbyAreas || loc.nearbyAreas.length < 5) {
    reasons.push("fewer than 5 nearby areas");
  }
  if (countFaqs(loc) < 3) {
    reasons.push("fewer than 3 FAQs");
  }
  if (countInternalLinks(loc) < 3) {
    reasons.push("fewer than 3 internal nearby/city links");
  }
  if (!loc.movingConsiderations || loc.movingConsiderations.length < 3) {
    reasons.push("fewer than 3 local moving considerations");
  }
  const localitySignals =
    (loc.majorRoads?.length || 0) +
    (loc.studentAreas?.length || 0) +
    (loc.businessDistricts?.length || 0);
  if (localitySignals < 2) {
    reasons.push("insufficient locality signals (roads/student areas/districts)");
  }

  const combined = `${loc.intro} ${loc.knowledge}`.toLowerCase();
  for (const phrase of FORBIDDEN_PHRASES) {
    if (combined.includes(phrase)) {
      reasons.push(`forbidden phrase: "${phrase}"`);
    }
  }

  // Duplicate detection: intro and knowledge must both be unique
  // (titles/meta descriptions derive from unique names + these texts).
  const introDupe = LOCATIONS.find((l) => l.slug !== loc.slug && l.intro === loc.intro);
  if (introDupe) reasons.push(`intro duplicated with ${introDupe.slug}`);
  const knowledgeDupe = LOCATIONS.find((l) => l.slug !== loc.slug && l.knowledge === loc.knowledge);
  if (knowledgeDupe) reasons.push(`knowledge duplicated with ${knowledgeDupe.slug}`);
  const nameDupe = LOCATIONS.find((l) => l.slug !== loc.slug && l.name === loc.name);
  if (nameDupe) reasons.push(`name (title/meta source) duplicated with ${nameDupe.slug}`);

  // Generic-content check
  if (!hasConcreteLocalContent(loc)) {
    reasons.push("too generic: intro/knowledge reference no concrete local feature");
  }
  for (const pattern of GENERIC_FILLER_PATTERNS) {
    if (pattern.test(combined)) {
      reasons.push("too generic: contains filler phrasing");
      break;
    }
  }

  return { indexable: reasons.length === 0, reasons };
}

export function isLocationIndexable(slug: string): boolean {
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return false;
  return assessLocationQuality(loc).indexable;
}

/** Slugs (without man-and-van- prefix) of all pages that pass the guard. */
export function getIndexableLocationSlugs(): string[] {
  return LOCATIONS.filter((l) => assessLocationQuality(l).indexable).map((l) => l.slug);
}

/** Report for build-time logging / audits. */
export function qualityReport(): { total: number; indexable: number; excluded: { slug: string; reasons: string[] }[] } {
  const excluded: { slug: string; reasons: string[] }[] = [];
  let indexable = 0;
  for (const loc of LOCATIONS) {
    const result = assessLocationQuality(loc);
    if (result.indexable) indexable += 1;
    else excluded.push({ slug: loc.slug, reasons: result.reasons });
  }
  return { total: LOCATIONS.length, indexable, excluded };
}
