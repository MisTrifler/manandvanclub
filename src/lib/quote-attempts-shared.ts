// Client-safe budget label helpers (no server imports).
// Guidance only — never affects visibility, release or payments.


export function normaliseReason(reason: string): string {
  return String(reason || "").trim().toLowerCase();
}

export function isClosingReason(reason: string): boolean {
  const r = normaliseReason(reason);
  return r.includes("found another mover") || r.includes("no longer need");
}

export function shouldShowBudgetFields(stillNeedsHelp: string, reason: string): boolean {
  return stillNeedsHelp === "yes" && reason === "Price was too high";
}

export type BudgetLabel = "reasonable" | "may_be_low" | "very_low" | "unknown";

export function getBudgetReasonablenessLabel(input: {
  budgetMax?: number | null;
  guidePriceMin?: number | null;
  guidePriceMax?: number | null;
  previousQuoteMin?: number | null;
  previousQuoteMax?: number | null;
}): BudgetLabel {
  const budgetMax = Number(input.budgetMax);
  const guideMin = Number(input.guidePriceMin);
  if (!Number.isFinite(budgetMax) || budgetMax <= 0) return "unknown";
  if (!Number.isFinite(guideMin) || guideMin <= 0) {
    const prevMin = Number(input.previousQuoteMin);
    if (Number.isFinite(prevMin) && prevMin > 0) {
      return budgetMax >= prevMin * 0.9 ? "reasonable" : budgetMax >= prevMin * 0.6 ? "may_be_low" : "very_low";
    }
    return "unknown";
  }
  if (budgetMax >= guideMin * 0.75) return "reasonable";
  if (budgetMax >= guideMin * 0.6) return "may_be_low";
  return "very_low";
}

export function budgetLabelText(label: BudgetLabel): string {
  switch (label) {
    case "reasonable": return "Customer budget looks close to the guide range.";
    case "may_be_low": return "Customer budget may be below the usual guide range.";
    case "very_low": return "Customer budget looks well below the usual guide range. Quote only if this still works for you.";
    default: return "";
  }
}
