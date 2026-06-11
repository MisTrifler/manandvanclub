import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: lead } = await supabaseAdmin
      .from("move_requests")
      .select("id, status, customer_declined_quote_at")
      .eq("customer_quote_token", token)
      .single();

    if (!lead) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    if (lead.status === "booked" || lead.status === "declined") {
      return NextResponse.json(
        { error: "Quote already resolved" },
        { status: 409 }
      );
    }

    await supabaseAdmin
      .from("move_requests")
      .update({
        status: "declined",
        customer_declined_quote_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[decline-quote] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}
