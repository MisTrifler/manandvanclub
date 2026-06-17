import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { formatUKPostcode, formatDisplayDate, formatMoveType } from "@/lib/formatting";
import NoShowDisputeClient from "./NoShowDisputeClient";


export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

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

export default async function NoShowDisputePage({ params }: { params: { token: string } }) {
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

  const status = lead.customer_no_show_status;

  if (status === "disputed") {
    return <MessagePage title="Dispute Received" message="We have already received your dispute. Our team will review the information from you and the mover before making a decision." />;
  }
  if (status === "approved" || status === "rejected" || status === "resolved") {
    return <MessagePage title="Case Reviewed" message="This no-show report has already been reviewed. Please contact support@manandvanclub.co.uk if you have questions." />;
  }
  if (status !== "customer_notified") {
    return <MessagePage title="Nothing To Dispute" message="There is no open no-show report on this booking." />;
  }

  const disputeUntil = lead.customer_no_show_customer_dispute_until
    ? new Date(lead.customer_no_show_customer_dispute_until)
    : null;
  if (!disputeUntil || Number.isNaN(disputeUntil.getTime()) || new Date() > disputeUntil) {
    return <MessagePage title="Dispute Window Closed" message="The dispute window has now closed. Please contact support if you believe there has been a serious error." />;
  }

  return (
    <NoShowDisputeClient
      token={token}
      firstName={lead.first_name || ""}
      moveType={formatMoveType(lead.move_type)}
      colPostcode={formatUKPostcode(lead.collection_postcode)}
      delPostcode={formatUKPostcode(lead.delivery_postcode)}
      moveDate={formatDisplayDate(lead.move_date)}
      waitMinutes={Number(lead.customer_no_show_wait_minutes || 0)}
      contactAttempts={Number(lead.customer_no_show_contact_attempts || 0)}
      disputeUntil={disputeUntil.toISOString()}
    />
  );
}
