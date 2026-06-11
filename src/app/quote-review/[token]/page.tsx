import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
  getMoveSummary,
  getItemSummary,
  getAccessNote,
  type MoveDetails,
} from "@/lib/formatting";
import { calculateBookingFee, normaliseQuoteAmount } from "@/lib/booking-fee";
import { parseStoredQuoteOptions } from "@/lib/quote-options";
import QuoteReviewClient from "./QuoteReviewClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { token: string };
}

function isExpired(expiresAt?: string | null) {
  if (!expiresAt) return false;
  const expiry = new Date(expiresAt).getTime();
  return Number.isFinite(expiry) && expiry <= Date.now();
}

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

export default async function QuoteReviewPage({ params }: Props) {
  const token = params.token;

  if (!token || token.length < 16) {
    notFound();
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select("*")
    .eq("customer_quote_token", token)
    .single();

  if (!lead) {
    return <MessagePage title="Quote Not Found" message="Please check your link or contact support." />;
  }

  if (lead.status === "booked" || lead.booking_fee_paid) {
    return <MessagePage title="Booking Already Confirmed" message="This booking has already been confirmed. The mover will contact you directly to confirm timing, access and payment method." />;
  }

  if (lead.status === "declined") {
    return <MessagePage title="Quote Declined" message="You have declined this quote. Your details have not been released to the mover." />;
  }

  if (isExpired(lead.quote_expires_at)) {
    return <MessagePage title="Quote Expired" message="This quote has expired. Please submit a new request or contact support." />;
  }

  // Structured options are the primary path; legacy single quotes
  // (quote_amount, no quote_options) are mapped to one display option.
  const quoteOptions = parseStoredQuoteOptions(lead.quote_options);

  if (lead.status !== "quoted" || !lead.quoted_by || (quoteOptions.length === 0 && !lead.quote_amount)) {
    return <MessagePage title="Quote Pending" message="A mover is reviewing your request. You will receive an email once a quote is ready." />;
  }

  const moveType = formatMoveType(lead.move_type);
  const colPostcode = formatUKPostcode(lead.collection_postcode);
  const delPostcode = formatUKPostcode(lead.delivery_postcode);
  const moveDate = formatDisplayDate(lead.move_date);
  const details = (lead.details || null) as MoveDetails | null;
  const detailSummary = [
    getMoveSummary(lead.move_type, details),
    getItemSummary(details),
    getAccessNote(details),
  ].filter(Boolean);

  // Build the option list for the client. Legacy quotes become a single
  // option; legacy quote_message is intentionally never shown to the
  // customer (it may contain mover contact details).
  const displayOptions = (quoteOptions.length > 0
    ? quoteOptions
    : [{
        id: "legacy",
        serviceLevel: "one_man_loading" as const,
        serviceLabel: "Mover quote",
        serviceDescription: "Your mover has provided a single quote for this move.",
        vanSize: "suitable_van" as const,
        vanLabel: "Suitable van provided",
        totalPrice: normaliseQuoteAmount(lead.quote_amount),
      }]
  ).map((option) => {
    const deposit = calculateBookingFee(option.totalPrice);
    return {
      id: option.id,
      serviceLabel: option.serviceLabel,
      serviceDescription: option.serviceDescription,
      vanLabel: option.vanLabel,
      totalPrice: option.totalPrice,
      bookingDeposit: deposit,
      remainingBalance: Math.max(0, Math.round((option.totalPrice - deposit) * 100) / 100),
    };
  });

  return (
    <QuoteReviewClient
      token={token}
      firstName={lead.first_name || ""}
      moveType={moveType}
      colPostcode={colPostcode}
      delPostcode={delPostcode}
      moveDate={moveDate}
      estimatedPrice={lead.estimated_price || ""}
      detailSummary={detailSummary}
      options={displayOptions}
      quoteExpiresAt={lead.quote_expires_at || ""}
    />
  );
}
