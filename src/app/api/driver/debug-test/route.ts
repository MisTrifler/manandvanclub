import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim();

    if (!email) {
      return NextResponse.json({ error: "No email provided" }, { status: 400 });
    }

    // Check env
    const hasKey = !!process.env.RESEND_API_KEY;

    // Try to send a test email
    let sendResult: any = null;
    let sendError: any = null;

    if (hasKey) {
      try {
        const result = await resend.emails.send({
          from: "Man and Van Club <support@manandvanclub.co.uk>",
          to: [email],
          subject: "Debug Test Email",
          html: `<p>This is a test email from the debug endpoint.</p>`,
        });
        sendResult = result;
      } catch (err: any) {
        sendError = {
          name: err.name,
          message: err.message,
          stack: err.stack,
          code: err.statusCode || err.code,
          body: err.body || null,
        };
      }
    }

    return NextResponse.json({
      hasResendKey: hasKey,
      resendKeyPrefix: hasKey ? process.env.RESEND_API_KEY?.slice(0, 6) + "..." : null,
      targetEmail: email,
      sendResult: sendResult
        ? { id: sendResult.id, data: sendResult.data }
        : null,
      sendError: sendError,
      nodeEnv: process.env.NODE_ENV,
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
