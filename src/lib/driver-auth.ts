import { createHmac, timingSafeEqual } from "crypto";

export const DRIVER_COOKIE_NAME = "mv_driver_session";
const DRIVER_SESSION_MARKER = "manandvanclub-driver";

export function getDriverSecret() {
  return process.env.DRIVER_SESSION_SECRET || process.env.ADMIN_PORTAL_SECRET || "MV2026";
}

function signDriverValue(email: string) {
  const value = `${email}.${DRIVER_SESSION_MARKER}`;
  return createHmac("sha256", getDriverSecret()).update(value).digest("hex");
}

// Base64url-encode the email so dots (and other special chars) never break token parsing
function encodeEmail(email: string): string {
  return Buffer.from(email).toString("base64url");
}

function decodeEmail(encoded: string): string {
  return Buffer.from(encoded, "base64url").toString("utf-8");
}

export function createDriverSessionToken(email: string) {
  const encoded = encodeEmail(email);
  return `${encoded}.${DRIVER_SESSION_MARKER}.${signDriverValue(email)}`;
}

export function isValidDriverSession(token?: string | null): string | false {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [encoded, marker, signature] = parts;
  if (marker !== DRIVER_SESSION_MARKER) return false;
  if (!encoded || !signature) return false;

  try {
    const email = decodeEmail(encoded);
    const expected = signDriverValue(email);
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (sigBuffer.length !== expectedBuffer.length) return false;

    if (timingSafeEqual(sigBuffer, expectedBuffer)) {
      return email;
    }
  } catch {
    return false;
  }

  return false;
}

export function getDriverCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}

export function hashLoginCode(code: string, email: string): string {
  return createHmac("sha256", getDriverSecret())
    .update(`login-code:${code}:${email.toLowerCase()}`)
    .digest("hex");
}

export function verifyLoginCodeHash(code: string, email: string, hash: string): boolean {
  return hashLoginCode(code, email) === hash;
}
