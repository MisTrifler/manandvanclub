import { NextResponse } from "next/server";
import { DRIVER_COOKIE_NAME, getDriverCookieOptions } from "@/lib/driver-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(DRIVER_COOKIE_NAME, "", {
    ...getDriverCookieOptions(),
    maxAge: 0,
  });
  return response;
}
