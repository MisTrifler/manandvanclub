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

export function createDriverSessionToken(email: string) {
  return `${email}.${DRIVER_SESSION_MARKER}.${signDriverValue(email)}`;
}

export function isValidDriverSession(token?: string | null): string | false {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [email, marker, signature] = parts;
  if (marker !== DRIVER_SESSION_MARKER) return false;
  if (!email || !signature) return false;

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
