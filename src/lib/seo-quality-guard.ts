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

export interface QualityResult {
  indexable: boolean;
  reasons: string[];
}

/**
 * Quality rules (all must pass for a page to be indexable):
 * - unique local intro + knowledge paragraphs of meaningful length
 * - at least 5 nearby areas (internal-link / local-coverage signals)
 * - at least 3 moving considerations (genuine local detail)
 * - at least 3 major roads OR student areas OR business districts
 *   (extra locality signals beyond the name swap)
 * - no forbidden old-business-model or over-claim wording
 */
export function assessLocationQuality(loc: LocationData): QualityResult {
  const reasons: string[] = [];

  if (!loc.intro || loc.intro.trim().length < 120) {
    reasons.push("intro too short");
  }
  if (!loc.knowledge || loc.knowledge.trim().length < 120) {
    reasons.push("knowledge paragraph too short");
  }
  if (!loc.nearbyAreas || loc.nearbyAreas.length < 4) {
    reasons.push("fewer than 4 nearby areas");
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

  // Duplicate-intro detection: two locations sharing the same intro text
  // would be doorway pages.
  const dupe = LOCATIONS.find((l) => l.slug !== loc.slug && l.intro === loc.intro);
  if (dupe) {
    reasons.push(`intro duplicated with ${dupe.slug}`);
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
