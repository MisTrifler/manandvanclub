import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ALLOWED_STATUSES = new Set(["approved", "rejected", "pending"]);

export async function POST(req: Request) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { driverId, status, action } = await req.json();

    const supabaseAdmin = getSupabaseAdmin();

    // Admin marks insurance as verified after documents were emailed to
    // support@manandvanclub.co.uk and manually checked.
    if (action === "verify_insurance") {
      if (!driverId) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
      }
      const { error: verifyError } = await supabaseAdmin
        .from("driver_applications")
        .update({ insurance_verified: true, insurance_verified_at: new Date().toISOString() })
        .eq("id", driverId);
      if (verifyError) {
        return NextResponse.json({ error: verifyError.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, insuranceVerified: true });
    }

    if (!driverId || !status || !ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { data: driver, error: fetchError } = await supabaseAdmin
      .from("driver_applications")
      .select("*")
      .eq("id", driverId)
      .single();

    if (fetchError || !driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    // Hard server-side block: approval requires admin-verified insurance.
    // has_insurance (applicant checkbox) is NOT sufficient. No override.
    if (status === "approved" && driver.insurance_verified !== true) {
      return NextResponse.json(
        { error: "Cannot approve mover until Goods in Transit and Public Liability insurance documents have been received and verified." },
        { status: 403 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("driver_applications")
      .update({ status })
      .eq("id", driverId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY) {
      if (status === "approved") {
        // Check if user already exists
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = users.find(u => u.email === driver.email);

        if (!existingUser) {
          await supabaseAdmin.auth.admin.createUser({
            email: driver.email,
            email_confirm: true,
          });
        }

        // Generate magic link
        const { data: linkData } = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: driver.email,
        });

        const magicLink = linkData?.properties?.action_link;

        if (magicLink) {
          await resend.emails.send({
            from: SENDER_ADDRESS,
            to: [driver.email],
            replyTo: REPLY_TO_ADDRESS,
            subject: "Login to Man and Van Club",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 20px;">
                <h2 style="color: #0F172A;">Welcome to Man and Van Club</h2>
                <p>Hi ${driver.contact_name},</p>
                <p>Your account has been approved. Click below to log in:</p>
                <a href="${magicLink}" style="display:inline-block; background:#F97316; color:white; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; margin:20px 0;">
                  Log in with Magic Link
                </a>
                <p style="color:#64748B; font-size:13px;">This link expires in 24 hours.</p>
                <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
              </div>
            `,
          });
        }
      }

      if (status === "rejected") {
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [driver.email],
          replyTo: REPLY_TO_ADDRESS,
          subject: "Update regarding your application - Man and Van Club",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 20px;">
              <h2 style="color: #0F172A;">Application Update</h2>
              <p>Hi ${driver.contact_name},</p>
              <p>Thank you for your interest in joining the Man and Van Club mover network.</p>
              <p>We have carefully reviewed your application for <strong>${driver.company_name}</strong>. Unfortunately, we are unable to approve your application at this time.</p>
              <p style="color: #475569; line-height: 1.6;">
                To maintain the quality and exclusivity of our network, we apply strict criteria to all applicants. Common reasons for rejection include incomplete insurance details or coverage areas that are currently at capacity.
              </p>
              <p>We wish you the best with your business.</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Approval API Error:", error);
    return NextResponse.json({ error: "Server Error", message: error.message }, { status: 500 });
  }
}
