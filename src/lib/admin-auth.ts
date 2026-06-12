import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "mv_admin_session";
const ADMIN_SESSION_MARKER = "manandvanclub-admin";

export function getAdminSecret() {
  const secret = process.env.ADMIN_PORTAL_SECRET;
  if (!secret || secret.trim().length === 0) {
    // No fallback: a missing secret must fail loudly rather than
    // silently signing sessions with a guessable default.
    throw new Error("ADMIN_PORTAL_SECRET is required");
  }
  return secret;
}

function signAdminValue(value: string) {
  return createHmac("sha256", getAdminSecret()).update(value).digest("hex");
}

export function createAdminSessionToken() {
  return `${ADMIN_SESSION_MARKER}.${signAdminValue(ADMIN_SESSION_MARKER)}`;
}

export function isValidAdminSession(token?: string | null) {
  if (!token) return false;

  const expected = createAdminSessionToken();
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  if (tokenBuffer.length !== expectedBuffer.length) return false;

  try {
    return timingSafeEqual(tokenBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}
