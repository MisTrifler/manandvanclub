// ─────────────────────────────────────────────────────────────────────
// Customer no-show policy helpers.
//
// IMPORTANT: nothing here moves money. Compensation amounts are
// recorded as suggested/manual payout information for admin handling
// only. No automatic Stripe payouts or refunds exist.
// ─────────────────────────────────────────────────────────────────────

export const NO_SHOW_MIN_WAIT_MINUTES = 20;
export const NO_SHOW_MIN_CONTACT_ATTEMPTS = 2;
export const NO_SHOW_DISPUTE_WINDOW_HOURS = 48;
export const NO_SHOW_REPORT_WINDOW_HOURS = 24;

export const NO_SHOW_STATUSES = [
  "reported",
  "customer_notified",
  "disputed",
  "approved",
  "rejected",
  "resolved",
] as const;

export const NO_SHOW_PAYOUT_STATUSES = [
  "not_applicable",
  "pending_manual_payout",
  "paid_manually",
  "cancelled",
] as const;

export interface NoShowCompensation {
  depositAmount: number;
  moverCompensationAmount: number;
  platformRetainedAmount: number;
}

/**
 * Suggested mover no-show compensation by deposit tier (manual payout
 * guidance for admin — never an automatic payment).
 *   £10 → £5 · £15 → £10 · £25 → £15 · £35 → £20 · £50 → £25
 * Unknown deposit values fall back to 50% rounded down to the nearest £5.
 */
export function calculateCustomerNoShowCompensation(depositAmount: number): NoShowCompensation {
  const deposit = Math.round(Number(depositAmount) * 100) / 100;
  const tierMap: Record<number, number> = { 10: 5, 15: 10, 25: 15, 35: 20, 50: 25 };

  let moverCompensationAmount = tierMap[deposit];
  if (moverCompensationAmount === undefined) {
    moverCompensationAmount = Number.isFinite(deposit) && deposit > 0
      ? Math.max(0, Math.floor((deposit / 2) / 5) * 5)
      : 0;
  }

  const platformRetainedAmount = Math.max(0, Math.round((deposit - moverCompensationAmount) * 100) / 100);
  return { depositAmount: deposit, moverCompensationAmount, platformRetainedAmount };
}

/** Mover-facing status labels for booked job cards. */
export function noShowStatusLabel(status?: string | null): string {
  switch (status) {
    case "reported": return "No-show report submitted — awaiting admin review.";
    case "customer_notified": return "Customer notified — dispute window open.";
    case "disputed": return "Customer disputed — awaiting admin review.";
    case "approved": return "Customer no-show approved. Manual compensation pending/paid.";
    case "rejected": return "No-show report reviewed and not approved.";
    case "resolved": return "No-show case resolved.";
    default: return "";
  }
}
