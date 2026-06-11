import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").toLowerCase().trim();

    if (!email) {
      return NextResponse.json({ error: "No email provided" }, { status: 400 });
    }

    const results: any = { email, steps: [] };

    // Step 1: Check driver exists and is approved
    const { data: driver, error: driverError } = await supabase
      .from("driver_applications")
      .select("id, contact_name, email, status")
      .eq("email", email)
      .single();

    results.steps.push({
      step: "driver_lookup",
      found: !!driver,
      status: driver?.status || null,
      error: driverError
        ? { message: driverError.message, code: driverError.code, details: driverError.details }
        : null,
    });

    if (!driver || driver.status !== "approved") {
      return NextResponse.json({
        ...results,
        wouldSendEmail: false,
        reason: driver ? `Driver status is "${driver.status}"` : "Driver not found",
      });
    }

    // Step 2: Check rate limit (email)
    const sinceEmail = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: emailCount, error: emailCountError } = await supabase
      .from("driver_login_codes")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", sinceEmail);

    results.steps.push({
      step: "rate_limit_email",
      count: emailCount,
      error: emailCountError
        ? { message: emailCountError.message, code: emailCountError.code }
        : null,
    });

    // Step 3: Check rate limit (IP)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const sinceIp = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: ipCount, error: ipCountError } = await supabase
      .from("driver_login_codes")
      .select("*", { count: "exact", head: true })
      .eq("request_ip", ip)
      .gte("created_at", sinceIp);

    results.steps.push({
      step: "rate_limit_ip",
      ip,
      count: ipCount,
      error: ipCountError
        ? { message: ipCountError.message, code: ipCountError.code }
        : null,
    });

    // Step 4: Try to insert a code (simulated, not real code)
    const { data: insertResult, error: insertError } = await supabase
      .from("driver_login_codes")
      .insert({
        driver_id: driver.id,
        email: email,
        code_hash: "test-hash-not-real",
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        used_at: null,
        attempt_count: 0,
        request_ip: ip,
        user_agent: req.headers.get("user-agent") || "",
      })
      .select()
      .single();

    results.steps.push({
      step: "code_insert",
      inserted: !!insertResult,
      error: insertError
        ? { message: insertError.message, code: insertError.code, details: insertError.details, hint: insertError.hint }
        : null,
    });

    // Step 5: Clean up the test insert
    if (insertResult) {
      await supabase.from("driver_login_codes").delete().eq("id", insertResult.id);
      results.steps.push({ step: "cleanup", deleted: true });
    }

    return NextResponse.json({
      ...results,
      wouldSendEmail: !insertError && !driverError && !emailCountError && !ipCountError,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        topLevelError: true,
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
