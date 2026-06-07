import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  const wantsJson = contentType.includes("application/json");

  const response = wantsJson
    ? NextResponse.json({ success: true })
    : NextResponse.redirect(new URL("/control-center-mv", req.url));

  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
