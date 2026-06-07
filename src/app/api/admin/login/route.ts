import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCookieOptions,
  getAdminSecret,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  const wantsJson = contentType.includes("application/json");

  let password = "";

  if (wantsJson) {
    const body = await req.json();
    password = String(body.password || "");
  } else {
    const formData = await req.formData();
    password = String(formData.get("password") || "");
  }

  if (password !== getAdminSecret()) {
    if (wantsJson) {
      return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
    }

    const url = new URL("/control-center-mv", req.url);
    url.searchParams.set("error", "invalid");
    return NextResponse.redirect(url);
  }

  const response = wantsJson
    ? NextResponse.json({ success: true })
    : NextResponse.redirect(new URL("/control-center-mv", req.url));

  response.cookies.set(
    ADMIN_COOKIE_NAME,
    createAdminSessionToken(),
    getAdminCookieOptions(),
  );

  return response;
}
