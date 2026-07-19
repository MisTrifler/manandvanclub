import { NextRequest, NextResponse } from "next/server";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { phone, name, email } = data;

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: SENDER_ADDRESS,
        to: ["support@manandvanclub.co.uk"],
        replyTo: email ? escapeHtml(email) : REPLY_TO_ADDRESS,
        subject: `Callback Request: ${escapeHtml(phone.trim())}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
            <h2 style="color: #0F172A;">📞 Callback Request from AI Chat</h2>
            <p style="font-size: 16px; margin: 20px 0;"><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>
            ${name ? `<p style="font-size: 16px;"><strong>Name:</strong> ${escapeHtml(name.trim())}</p>` : ""}
            ${email ? `<p style="font-size: 16px;"><strong>Email:</strong> ${escapeHtml(email.trim())}</p>` : ""}
            <p style="font-size: 14px; color: #64748B; margin-top: 20px;">This request came from the AI chat widget on manandvanclub.co.uk</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94A3B8;">© 2026 Man and Van Club</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Callback request error:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 }
    );
  }
}
