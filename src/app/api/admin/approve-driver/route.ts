import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { resend, SENDER_ADDRESS } from "@/lib/resend";
import {
  PARTNERS_REPLY_TO,
  buildApprovedMoverEmailHtml,
  buildMoverAgreementHtml,
  getAgreementDate,
  makeMoverAttachmentFilenames,
} from "@/lib/mover-onboarding";
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
    // partners@manandvanclub.co.uk and manually checked.
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
        // Create/confirm the auth user, but do not send login access in this email.
        // The approved mover agreement must be accepted first.
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = users.find((u) => u.email === driver.email);

        if (!existingUser) {
          await supabaseAdmin.auth.admin.createUser({
            email: driver.email,
            email_confirm: true,
          });
        }

        const agreementDate = getAgreementDate();
        const moverData = {
          company_name: driver.company_name,
          business_type: driver.business_type,
          company_number: driver.company_number,
          contact_name: driver.contact_name,
          phone: driver.phone,
          email: driver.email,
          coverage_area: driver.coverage_area,
          towns_covered: driver.towns_covered,
          radius: driver.radius,
          capacity: driver.capacity,
          service_house: driver.service_house,
          service_flat: driver.service_flat,
          service_student: driver.service_student,
          service_furniture: driver.service_furniture,
          service_office: driver.service_office,
          service_single: driver.service_single,
          service_long_distance: driver.service_long_distance,
          has_insurance: driver.has_insurance,
        };
        const filenames = makeMoverAttachmentFilenames(moverData);
        const agreementHtml = buildMoverAgreementHtml(moverData, agreementDate);

        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [driver.email],
          replyTo: PARTNERS_REPLY_TO,
          subject: "Man and Van Club - approved mover onboarding",
          html: buildApprovedMoverEmailHtml(moverData, agreementDate),
          attachments: [
            {
              filename: filenames.agreement,
              content: Buffer.from(agreementHtml, "utf8"),
              contentType: "text/html",
            },
          ] as any,
        });
      }

      if (status === "rejected") {
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [driver.email],
          replyTo: PARTNERS_REPLY_TO,
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
