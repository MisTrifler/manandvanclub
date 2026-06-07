import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { resend } from "@/lib/resend";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ALLOWED_STATUSES = new Set(["approved", "rejected", "pending"]);

export async function POST(req: Request) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { driverId, status } = await req.json();

    if (!driverId || !status || !ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: driver, error: fetchError } = await supabaseAdmin
      .from("driver_applications")
      .select("id, company_name, contact_name, email")
      .eq("id", driverId)
      .single();

    if (fetchError || !driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
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
        await resend.emails.send({
          from: "Man and Van Club <support@manandvanclub.co.uk>",
          to: [driver.email],
          subject: "Approved: Welcome to the Man and Van Club Network!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 20px;">
              <h2 style="color: #0F172A;">Congratulations</h2>
              <p>Hi ${driver.contact_name},</p>
              <p>Your application to join <strong>Man and Van Club</strong> has been approved.</p>
              <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #F97316;">What happens now?</h3>
                <ul style="padding-left: 20px; color: #475569;">
                  <li><strong>Live Alerts:</strong> You will now receive new job alert emails when a customer in your area submits a request.</li>
                  <li><strong>Exclusive Leads:</strong> These leads are one-to-one. The first mover to unlock the lead gets exclusive access.</li>
                  <li><strong>No Bidding:</strong> Once you unlock a lead, the customer’s real phone and email will be sent to you instantly.</li>
                </ul>
              </div>
              <p>We are pleased to welcome ${driver.company_name} to the network.</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
            </div>
          `,
        });
      }

      if (status === "rejected") {
        await resend.emails.send({
          from: "Man and Van Club <support@manandvanclub.co.uk>",
          to: [driver.email],
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
