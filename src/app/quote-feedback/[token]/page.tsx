import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { formatUKPostcode, formatDisplayDate, formatMoveType } from "@/lib/formatting";
import QuoteFeedbackClient from "./QuoteFeedbackClient";

export const dynamic = "force-dynamic";

function MessagePage({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
      <div className="max-w-md text-center space-y-6 bg-white border border-border rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-black text-primary tracking-tighter">{title}</h1>
        <p className="text-text-secondary leading-relaxed">{message}</p>
        <a href="/" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">
          Return Home
        </a>
      </div>
    </div>
  );
}

export default async function QuoteFeedbackPage({ params }: { params: { token: string } }) {
  const token = params.token;
  if (!token || token.length < 16) notFound();

  const supabaseAdmin = getSupabaseAdmin();
  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select("*")
    .eq("customer_quote_token", token)
    .single();

  if (!lead) {
    return <MessagePage title="Link Not Found" message="Please check your link or contact support." />;
  }

  if (lead.status === "booked" || lead.booking_fee_paid === true || lead.customer_details_released_at) {
    return <MessagePage title="Booking Confirmed" message="This booking has already been confirmed, so feedback is not needed here. Contact support if anything has changed." />;
  }


  // Also allow legacy declined/expired statuses (pre-migration leads)
  const allowedStatuses = ["quote_feedback_pending", "declined", "expired", "available", "closed", "quoted"];
  if (!allowedStatuses.includes(String(lead.status || ""))) {
    return <MessagePage title="Nothing To Review" message="There is no quote feedback needed for this request right now." />;
  }

  return (
    <QuoteFeedbackClient
      token={token}
      firstName={lead.first_name || ""}
      moveType={formatMoveType(lead.move_type)}
      colPostcode={formatUKPostcode(lead.collection_postcode)}
      delPostcode={formatUKPostcode(lead.delivery_postcode)}
      moveDate={formatDisplayDate(lead.move_date)}
      lastOutcome={lead.quote_feedback_last_outcome === "expired" || lead.status === "expired" ? "expired" : "declined"}
    />
  );
}
