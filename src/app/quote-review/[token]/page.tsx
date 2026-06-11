import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";
import QuoteReviewClient from "./QuoteReviewClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { token: string };
}

export default async function QuoteReviewPage({ params }: Props) {
  const token = params.token;

  if (!token || token.length < 16) {
    notFound();
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select(
      "id, first_name, email, move_type, collection_postcode, delivery_postcode, move_date, estimated_price, quote_amount, quote_message, quoted_by, quoted_at, booking_fee, booking_fee_paid, status, customer_quote_token"
    )
    .eq("customer_quote_token", token)
    .single();

  if (!lead) {
    notFound();
  }

  // If already booked, show confirmation instead of quote review
  if (lead.status === "booked" || lead.booking_fee_paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-black text-primary tracking-tighter">Booking Confirmed</h1>
          <p className="text-text-secondary leading-relaxed">
            Your booking fee has been paid and your details have been released to the mover. The mover will contact you directly to confirm timing and payment method.
          </p>
          <p className="text-sm text-text-secondary/70">
            Need help? Contact{" "}
            <a href="mailto:support@manandvanclub.co.uk" className="text-accent font-bold hover:underline">
              support@manandvanclub.co.uk
            </a>
          </p>
        </div>
      </div>
    );
  }

  // If declined, show message
  if (lead.status === "declined") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-black text-primary tracking-tighter">Quote Declined</h1>
          <p className="text-text-secondary leading-relaxed">
            You have declined this quote. Your details have not been released to the mover. If you change your mind, you can submit a new request on the website.
          </p>
        </div>
      </div>
    );
  }

  // If not yet quoted, show waiting message
  if (lead.status !== "quoted" || !lead.quote_amount) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-black text-primary tracking-tighter">Quote Pending</h1>
          <p className="text-text-secondary leading-relaxed">
            A mover is reviewing your request. You will receive an email once a quote is ready.
          </p>
        </div>
      </div>
    );
  }

  const moveType = formatMoveType(lead.move_type);
  const colPostcode = formatUKPostcode(lead.collection_postcode);
  const delPostcode = formatUKPostcode(lead.delivery_postcode);
  const moveDate = formatDisplayDate(lead.move_date);

  return (
    <QuoteReviewClient
      token={token}
      firstName={lead.first_name || ""}
      moveType={moveType}
      colPostcode={colPostcode}
      delPostcode={delPostcode}
      moveDate={moveDate}
      estimatedPrice={lead.estimated_price || ""}
      quoteAmount={lead.quote_amount}
      quoteMessage={lead.quote_message || ""}
      bookingFee={lead.booking_fee || 0}
    />
  );
}
