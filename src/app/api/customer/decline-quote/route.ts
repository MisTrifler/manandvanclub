import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const reason = typeof body.reason === "string" ? body.reason.slice(0, 200) : null;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: lead } = await supabaseAdmin
      .from("move_requests")
      .select("id, status, booking_fee_paid")
      .eq("customer_quote_token", token)
      .single();

    if (!lead) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    if (lead.booking_fee_paid === true || lead.status === "booked") {
      return NextResponse.json({ error: "This quote has already been accepted" }, { status: 409 });
    }

    await supabaseAdmin
      .from("move_requests")
      .update({
        status: "declined",
        customer_declined_quote_at: new Date().toISOString(),
        declined_reason: reason,
      })
      .eq("id", lead.id)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");

    return NextResponse.json({ success: true, message: "Quote declined. Your details have not been released to the mover." });
  } catch (error: any) {
    console.error("[customer/decline-quote] Error:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
