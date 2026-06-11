export function calculateBookingFee(quoteAmount: number): number {
  if (typeof quoteAmount !== "number" || Number.isNaN(quoteAmount) || quoteAmount <= 0) {
    throw new Error("Invalid quote amount");
  }

  if (quoteAmount <= 100) return 9.99;
  if (quoteAmount <= 250) return 14.99;
  return 24.99;
}
