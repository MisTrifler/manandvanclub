import { createHmac, timingSafeEqual } from "crypto";

export const DRIVER_COOKIE_NAME = "mv_driver_session";
const DRIVER_SESSION_MARKER = "manandvanclub-driver";

export function getDriverSecret() {
  return process.env.DRIVER_SESSION_SECRET || process.env.ADMIN_PORTAL_SECRET || "MV2026";
}

function signDriverValue(email: string) {
  const value = `${email}|${DRIVER_SESSION_MARKER}`;
  return createHmac("sha256", getDriverSecret()).update(value).digest("hex");
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function createDriverSessionToken(email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const encodedEmail = base64UrlEncode(normalizedEmail);
  const signature = signDriverValue(normalizedEmail);
  return `${encodedEmail}|${DRIVER_SESSION_MARKER}|${signature}`;
}

export function isValidDriverSession(token?: string | null): string | false {
  if (!token) return false;

  const parts = token.split("|");
  if (parts.length !== 3) return false;

  const [encodedEmail, marker, signature] = parts;
  if (marker !== DRIVER_SESSION_MARKER) return false;
  if (!encodedEmail || !signature) return false;

  let email: string;
  try {
    email = base64UrlDecode(encodedEmail).toLowerCase().trim();
  } catch {
    return false;
  }

  if (!email) return false;

  const expected = signDriverValue(email);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expectedBuffer.length) return false;

  try {
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
