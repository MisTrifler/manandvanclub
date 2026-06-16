// ─────────────────────────────────────────────────────────────────────
// UK postcode helpers.
//
// Important distinction:
// - sanitizePostcodeTyping is for the browser only and may trim input so
//   users cannot type long city names into postcode fields.
// - parseUKPostcode is the server-safe canonicaliser. It never truncates;
//   malformed or extra characters are rejected rather than silently fixed.
// ─────────────────────────────────────────────────────────────────────

export const UK_POSTCODE_EXAMPLE = "SW1A 1AA";
export const POSTCODE_ERROR_MESSAGE = `Enter a full UK postcode, e.g. ${UK_POSTCODE_EXAMPLE}`;
export const SAME_POSTCODE_ERROR_MESSAGE = "Collection and delivery postcodes must be different.";

const UK_POSTCODE_COMPACT_REGEX = /^(?:GIR0AA|[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2})$/;
const UK_POSTCODE_ALLOWED_CHARS_REGEX = /^[A-Z0-9\s]*$/i;
const MAX_COMPACT_POSTCODE_LENGTH = 7;
const MAX_DISPLAY_POSTCODE_LENGTH = 10;

export type CanonicalPostcode = {
  compact: string;
  display: string;
};

export function compactPostcode(value: unknown): string {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9]/g, "");
}

export function formatCompactPostcode(compact: string): string {
  const clean = String(compact || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length <= 3) return clean;
  return `${clean.slice(0, -3)} ${clean.slice(-3)}`.trim();
}

/**
 * Server-safe UK postcode parser. This never truncates input. A value like
 * SW1A1AAEXTRA must be rejected, not silently treated as SW1A 1AA.
 */
export function parseUKPostcode(value: unknown): CanonicalPostcode | null {
  const raw = String(value || "").trim().toUpperCase();
  if (!raw || raw.length > MAX_DISPLAY_POSTCODE_LENGTH) return null;
  if (!UK_POSTCODE_ALLOWED_CHARS_REGEX.test(raw)) return null;

  const compact = raw.replace(/\s+/g, "");
  if (compact.length < 5 || compact.length > MAX_COMPACT_POSTCODE_LENGTH) return null;
  if (!UK_POSTCODE_COMPACT_REGEX.test(compact)) return null;

  return {
    compact,
    display: formatCompactPostcode(compact),
  };
}

export function isValidUKPostcode(value: unknown): boolean {
  return parseUKPostcode(value) !== null;
}

export function isSameUKPostcode(a: unknown, b: unknown): boolean {
  const from = parseUKPostcode(a);
  const to = parseUKPostcode(b);
  return Boolean(from && to && from.compact === to.compact);
}

/**
 * Browser typing helper only. It intentionally limits length and removes
 * fake city-name input such as BIRMINGHAM before it can trigger route lookups.
 */
export function sanitizePostcodeTyping(value: unknown): string {
  let compact = String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, MAX_COMPACT_POSTCODE_LENGTH);

  // Allow the special GIR 0AA postcode as it is typed.
  if (/^GIR0?A?A?$/.test(compact)) {
    return compact.length > 3 ? formatCompactPostcode(compact) : compact;
  }

  // UK postcodes start with one or two letters followed by a number. This
  // prevents city names from becoming fake route queries in the browser.
  if (/^[A-Z]{3,}/.test(compact)) {
    compact = compact.slice(0, 2);
  }

  if (compact.length <= 4) return compact;
  return formatCompactPostcode(compact);
}

/**
 * Browser/display helper. Unlike parseUKPostcode, this can format partial
 * input for nicer UX, but callers must still validate before submitting.
 */
export function normalisePostcodeForDisplay(value: unknown): string {
  const parsed = parseUKPostcode(value);
  if (parsed) return parsed.display;

  const compact = String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, MAX_COMPACT_POSTCODE_LENGTH);

  return formatCompactPostcode(compact);
}
