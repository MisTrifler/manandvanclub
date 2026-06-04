import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendCustomerLoginLinkEmail } from "../../../../lib/wmcEmails";

export const runtime = "nodejs";

function clean(value) {
  return String(value || "").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(value));
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.WMC_SITE_URL ||
    "https://www.westmidlandscleaner.co.uk"
  ).replace(/\/$/, "");
}

function safeReturnPath(value) {
  const raw = clean(value) || "/customer/dashboard";
  if (!raw.startsWith("/")) return "/customer/dashboard";
  if (raw.startsWith("//")) return "/customer/dashboard";
  return raw;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = clean(body.email).toLowerCase();
    const returnTo = safeReturnPath(body.returnTo);

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();

    const { error } = await supabaseAdmin.from("customer_login_tokens").insert({
      customer_email: email,
      token,
      expires_at: expiresAt,
      return_to: returnTo
    });

    if (error) {
      console.error("Customer login token insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Customer login is not ready yet. Please make sure the Stage 14 SQL has been run." },
        { status: 500 }
      );
    }

    const loginUrl = `${getSiteUrl()}/customer/dashboard?token=${encodeURIComponent(token)}`;
    await sendCustomerLoginLinkEmail({ email, loginUrl });

    return NextResponse.json({ ok: true, message: "Login link sent." });
  } catch (error) {
    console.error("Customer login error:", error);
    return NextResponse.json({ ok: false, error: "Could not send customer login link." }, { status: 500 });
  }
}
