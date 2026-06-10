import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  DRIVER_COOKIE_NAME,
  createDriverSessionToken,
  getDriverCookieOptions,
  verifyLoginCodeHash,
} from "@/lib/driver-auth";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").toLowerCase().trim();
    const code = String(body.code || "").trim();

    if (!email || !code || !/^[0-9]{6}$/.test(code)) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired code. Please request a new one." },
        { status: 400 },
      );
    }

    // 1. Find the latest unexpired, unused code for this email
    const now = new Date().toISOString();
    const { data: loginCode, error: fetchError } = await supabase
      .from("driver_login_codes")
      .select("id, driver_id, code_hash, attempt_count, used_at, expires_at")
      .eq("email", email)
      .is("used_at", null)
      .gt("expires_at", now)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !loginCode) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired code. Please request a new one." },
        { status: 400 },
      );
    }

    // 2. Check max attempts
    if (loginCode.attempt_count >= MAX_ATTEMPTS) {
      // Mark as used (invalidated) to prevent further attempts
      await supabase
        .from("driver_login_codes")
        .update({ used_at: now })
        .eq("id", loginCode.id);

      return NextResponse.json(
        { success: false, message: "Invalid or expired code. Please request a new one." },
        { status: 400 },
      );
    }

    // 3. Verify code hash
    const isValid = verifyLoginCodeHash(code, email, loginCode.code_hash);

    if (!isValid) {
      // Increment attempt count
      await supabase
        .from("driver_login_codes")
        .update({ attempt_count: loginCode.attempt_count + 1 })
        .eq("id", loginCode.id);

      return NextResponse.json(
        { success: false, message: "Invalid or expired code. Please request a new one." },
        { status: 400 },
      );
    }

    // 4. Mark code as used
    await supabase
      .from("driver_login_codes")
      .update({ used_at: now })
      .eq("id", loginCode.id);

    // 5. Verify driver is still approved
    const { data: driver } = await supabase
      .from("driver_applications")
      .select("id, email, status")
      .eq("id", loginCode.driver_id)
      .single();

    if (!driver || driver.status !== "approved") {
      return NextResponse.json(
        { success: false, message: "Invalid or expired code. Please request a new one." },
        { status: 400 },
      );
    }

    // 6. Create session
    const sessionToken = createDriverSessionToken(driver.email);
    const response = NextResponse.json({ success: true });
    response.cookies.set(DRIVER_COOKIE_NAME, sessionToken, getDriverCookieOptions());

    return response;
  } catch (error: any) {
    console.error("Verify login code error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid or expired code. Please request a new one." },
      { status: 400 },
    );
  }
}
