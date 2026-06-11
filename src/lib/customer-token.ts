import { randomBytes } from "crypto";

export function generateCustomerQuoteToken(): string {
  return randomBytes(32).toString("hex");
}
