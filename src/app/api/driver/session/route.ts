import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
  const driverEmail = isValidDriverSession(token);

  return NextResponse.json(
    {
      loggedIn: Boolean(driverEmail),
      email: driverEmail || null,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
