export function normaliseQuoteAmount(value: unknown): number {
  const amount = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid quote amount");
  }

  if (amount > 10000) {
    throw new Error("Quote amount must not exceed £10,000");
  }

  return Math.round(amount * 100) / 100;
}

export function calculateBookingFee(quoteAmount: number): number {
  const amount = normaliseQuoteAmount(quoteAmount);

  if (amount <= 100) return 10;
  if (amount <= 250) return 15;
  if (amount <= 500) return 25;
  if (amount <= 1000) return 35;
  return 50;
}

export function toStripePence(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid amount");
  }
  return Math.round(amount * 100);
}

export function formatPounds(amount: number): string {
  const value = Number(amount || 0);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}
