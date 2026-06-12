// ─── UK Postcode Formatter ─────────────────────────────────────
export function formatUKPostcode(value?: string | null): string {
  if (!value || value.trim() === "") return "";
  const cleaned = value.replace(/\s+/g, "").toUpperCase();
  if (cleaned.length <= 3) return cleaned;
  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
}

// ─── Display Date Formatter ─────────────────────────────────────
export function formatDisplayDate(dateString?: string | null): string {
  if (!dateString || dateString.trim() === "") return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Relative Time (e.g. "2 hours ago") ─────────────────────────────
export function relativeTime(dateString?: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return formatDisplayDate(dateString);
}

// ─── Move Type Formatter ───────────────────────────────────────────
export function formatMoveType(raw?: string | null): string {
  if (!raw) return "Move";
  const map: Record<string, string> = {
    "Office Move": "Office Move",
    "Home Move": "House Move",
    "Student Move": "Student Move",
    "Furniture Delivery": "Furniture Delivery",
    "Man & Van Service": "Man & Van",
    "Storage Collection": "Storage Collection",
    "Man & Van": "Man & Van",
    "Man &amp; Van Service": "Man & Van",
  };
  return map[raw] || raw;
}

// ─── Badge / Urgency helpers ───────────────────────────────────────
export function isUrgent(moveDate?: string | null): boolean {
  if (!moveDate) return false;
  const date = new Date(moveDate);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 3;
}

// ─── Extract summary from move request details ───────────────────
export interface MoveDetails {
  bedrooms?: string;
  propertyType?: string;
  floorLevel?: string;
  liftAccess?: string;
  officeSize?: string;
  numberOfDesks?: string;
  itEquipment?: string;
  filingCabinets?: string;
  meetingRoomFurniture?: string;
  businessName?: string;
  university?: string;
  accommodationType?: string;
  numberOfBoxes?: string;
  suitcases?: string;
  smallFurnitureItems?: string;
  itemType?: string;
  numberOfItems?: string;
  additionalHelpers?: string;
  storageDirection?: string;
  storageFacility?: string;
  storageUnitSize?: string;
  storageItems?: string;
  packingRequired?: string;
  accessNotes?: string;
  notes?: string;
  // Shared move requirements (anonymised, shown to drivers pre-quote)
  loadingHelp?: string;
  helperPreference?: string;
  accessType?: string;
  parkingAvailable?: string;
  heavyItems?: string;
  heavyItemsDescription?: string;
  dismantlingRequired?: string;
  customerMoveNotes?: string;
  routeEstimate?: {
    distanceText?: string;
    durationText?: string;
    distanceMeters?: number;
    durationSeconds?: number;
    mapUrl?: string;
    provider?: string;
    calculatedAt?: string;
  };
}

// ─── Contact-detail masking ─────────────────────────────────────────
// Customer free-text may be shown to drivers before the deposit is
// paid, so any contact details inside it must be masked.
const CONTACT_PATTERNS: RegExp[] = [
  /(?:\+44[\s-]?7|07)\d{2}[\s-]?\d{3}[\s-]?\d{3,4}/g,         // UK mobile numbers
  /(?:\+44[\s-]?|0)\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4}/g,        // UK landlines
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,          // emails
  /(?:https?:\/\/|www\.)\S+/gi,                                // URLs
  /\b\S+\.(?:com|co\.uk|uk|net|org|io)\b/gi,                   // bare domains
  /\bwhats\s?app\b[^.,;]*/gi,                                  // whatsapp mentions
  /(?:@|insta(?:gram)?\s*[:\s]|facebook\s*[:\s]|fb\s*[:\s])\s*[a-zA-Z0-9._]{3,}/gi, // social handles
];

export function maskContactDetails(text?: string | null): string {
  if (!text) return "";
  let masked = String(text);
  for (const pattern of CONTACT_PATTERNS) {
    masked = masked.replace(pattern, "[hidden]");
  }
  return masked.trim();
}

// ─── Move Requirements (driver-facing, anonymised) ──────────────────
export interface RequirementRow {
  label: string;
  value: string;
}

export function getMoveRequirements(details?: MoveDetails | null): RequirementRow[] {
  if (!details) return [];
  const rows: RequirementRow[] = [];

  if (details.loadingHelp) rows.push({ label: "Loading help", value: details.loadingHelp });
  if (details.helperPreference) rows.push({ label: "Customer thinks they need", value: details.helperPreference });
  if (details.additionalHelpers) {
    const map: Record<string, string> = { yes: "Extra helper needed", no: "Driver only", unsure: "Unsure — advise" };
    rows.push({ label: "Extra help", value: map[details.additionalHelpers] || details.additionalHelpers });
  }
  if (details.accessType) rows.push({ label: "Access", value: details.accessType });
  if (details.floorLevel && details.floorLevel !== "Ground") rows.push({ label: "Floor", value: details.floorLevel });
  if (details.liftAccess) {
    rows.push({
      label: "Lift",
      value: details.liftAccess === "yes" || details.liftAccess === "Yes — lift available" ? "Lift available"
        : details.liftAccess === "no" || details.liftAccess === "No — stairs only" ? "Stairs only"
        : details.liftAccess,
    });
  }
  if (details.parkingAvailable) rows.push({ label: "Parking", value: details.parkingAvailable });
  if (details.heavyItems && details.heavyItems !== "No") {
    rows.push({
      label: "Heavy items",
      value: details.heavyItemsDescription
        ? maskContactDetails(details.heavyItemsDescription)
        : details.heavyItems,
    });
  }
  if (details.dismantlingRequired && details.dismantlingRequired !== "No") {
    rows.push({ label: "Dismantling", value: details.dismantlingRequired });
  }
  if (details.packingRequired === "yes") rows.push({ label: "Packing", value: "Packing help needed" });
  if (details.packingRequired === "partial") rows.push({ label: "Packing", value: "Partial packing help" });
  if (details.accessNotes) rows.push({ label: "Access notes", value: maskContactDetails(details.accessNotes) });
  const customerNote = details.customerMoveNotes || details.notes;
  if (customerNote) rows.push({ label: "Customer notes", value: maskContactDetails(customerNote) });

  return rows.filter((r) => r.value && r.value !== "[hidden]");
}

export function getMoveSummary(moveType?: string, details?: MoveDetails | null): string {
  if (!details) return "";

  switch (moveType) {
    case "Home Move":
      if (details.bedrooms) {
        return details.bedrooms === "4+"
          ? `${details.bedrooms} bedrooms${details.propertyType ? `, ${details.propertyType}` : ""}`
          : `${details.bedrooms} bedroom${details.bedrooms === "1" ? "" : "s"}${details.propertyType ? `, ${details.propertyType}` : ""}`;
      }
      return details.propertyType || "";

    case "Office Move":
      return details.officeSize || "";

    case "Student Move":
      return details.accommodationType || details.university || "";

    case "Furniture Delivery":
      return details.itemType || "";

    case "Man & Van Service":
      return details.numberOfItems ? `${details.numberOfItems} items` : "";

    case "Storage Collection":
      return details.storageDirection || "";

    default:
      return "";
  }
}

export function getAccessNote(details?: MoveDetails | null): string {
  if (!details) return "";
  const notes: string[] = [];

  if (details.floorLevel && details.floorLevel !== "Ground") {
    notes.push(`${details.floorLevel} floor`);
  }
  if (details.liftAccess) {
    notes.push(details.liftAccess === "yes" || details.liftAccess === "Yes — lift available"
      ? "Lift available"
      : details.liftAccess === "no" || details.liftAccess === "No — stairs only"
        ? "Stairs only"
        : details.liftAccess);
  }
  if (details.additionalHelpers) {
    notes.push(details.additionalHelpers === "yes" ? "Extra helper needed" : "");
  }
  if (details.packingRequired) {
    notes.push(details.packingRequired === "yes" ? "Packing required" : "");
  }
  if (details.accessNotes) {
    notes.push(maskContactDetails(details.accessNotes));
  }
  if (details.notes) {
    notes.push(maskContactDetails(details.notes));
  }

  return notes.filter(Boolean).join(" • ");
}

export function getItemSummary(details?: MoveDetails | null): string {
  if (!details) return "";
  const items: string[] = [];

  if (details.numberOfBoxes) items.push(`${details.numberOfBoxes} boxes`);
  if (details.suitcases) items.push(`${details.suitcases} suitcases`);
  if (details.smallFurnitureItems) items.push(details.smallFurnitureItems);
  if (details.numberOfItems) items.push(`${details.numberOfItems} items`);
  if (details.numberOfDesks) items.push(`${details.numberOfDesks} desks`);
  if (details.itEquipment) items.push(details.itEquipment);
  if (details.filingCabinets) items.push(`${details.filingCabinets} filing cabinets`);
  if (details.meetingRoomFurniture) items.push(details.meetingRoomFurniture);
  if (details.storageItems) items.push(details.storageItems);
  if (details.itemType) items.push(details.itemType);

  return items.filter(Boolean).join(" • ");
}
