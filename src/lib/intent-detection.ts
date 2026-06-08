export type IntentType = "office" | "house" | "student" | "single-item" | "general" | "storage";

const PATH_TO_INTENT: Record<string, IntentType> = {
  "office-removals": "office",
  "house-removals": "house",
  "flat-removals": "house",
  "student-removals": "student",
  "furniture-delivery": "single-item",
  "facebook-marketplace-collection": "single-item",
  "same-day-man-and-van": "general",
  "long-distance-removals": "general",
};

const KEYWORD_TO_INTENT: Record<string, IntentType> = {
  "office": "office",
  "business": "office",
  "commercial": "office",
  "company": "office",
  "corporate": "office",
  "house": "house",
  "home": "house",
  "flat": "house",
  "apartment": "house",
  "bungalow": "house",
  "student": "student",
  "university": "student",
  "furniture": "single-item",
  "single-item": "single-item",
  "sofa": "single-item",
  "bed": "single-item",
  "table": "single-item",
  "storage": "storage",
  "general": "general",
  "man-and-van": "general",
  "van": "general",
  "small-move": "general",
};

export function detectIntent(
  pathname: string,
  searchParams?: URLSearchParams | null
): IntentType | null {
  // Check URL path for known service pages
  const lowerPath = pathname.toLowerCase();
  for (const [path, intent] of Object.entries(PATH_TO_INTENT)) {
    if (lowerPath.includes(path)) return intent;
  }

  // Check query params (type, service, utm_content, etc.)
  if (searchParams) {
    const type = searchParams.get("type") || searchParams.get("service") || searchParams.get("utm_content") || searchParams.get("campaign") || searchParams.get("keyword");
    if (type) {
      const key = type.toLowerCase().replace(/[^a-z0-9-]/g, "");
      if (KEYWORD_TO_INTENT[key]) return KEYWORD_TO_INTENT[key];
    }

    // Check all query param keys and values
    for (const [key, value] of searchParams.entries()) {
      const lowerKey = key.toLowerCase();
      const lowerValue = value.toLowerCase();
      if (KEYWORD_TO_INTENT[lowerKey]) return KEYWORD_TO_INTENT[lowerKey];
      if (KEYWORD_TO_INTENT[lowerValue]) return KEYWORD_TO_INTENT[lowerValue];
    }
  }

  // Check referrer URL for keyword hints (client-side only)
  if (typeof document !== "undefined" && document.referrer) {
    const ref = document.referrer.toLowerCase();
    if (ref.includes("office") || ref.includes("business relocation") || ref.includes("commercial move")) return "office";
    if (ref.includes("student") || ref.includes("university") || ref.includes("uni accommodation")) return "student";
    if (ref.includes("furniture") || ref.includes("sofa") || ref.includes("single item") || ref.includes("ebay delivery")) return "single-item";
    if (ref.includes("house move") || ref.includes("home removal") || ref.includes("moving house")) return "house";
    if (ref.includes("storage") || ref.includes("storage unit")) return "storage";
    if (ref.includes("man and van") || ref.includes("van hire")) return "general";
  }

  return null;
}

export function getIntentLabel(intent: IntentType): string {
  const labels: Record<IntentType, string> = {
    "office": "Office Relocation",
    "house": "House or Flat Move",
    "student": "Student Move",
    "single-item": "Single Item Delivery",
    "general": "Man and Van Hire",
    "storage": "Storage Collection",
  };
  return labels[intent] || "General Move";
}

export function getMoveTypeLabel(intent: IntentType): string {
  const labels: Record<IntentType, string> = {
    "office": "Office Move",
    "house": "House Move",
    "student": "Student Move",
    "single-item": "Single Item / Furniture",
    "general": "General Move",
    "storage": "Storage Move",
  };
  return labels[intent] || "General Move";
}
