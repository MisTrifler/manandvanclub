import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import DriverMarketplaceClient from "./DriverMarketplaceClient";

export const dynamic = "force-dynamic";

function normaliseEmail(value?: string | null) {
  return String(value || "").toLowerCase().trim();
}

export default async function MarketplacePage() {
  const cookieStore = cookies();
  const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
  const driverEmail = isValidDriverSession(token);

  if (!driverEmail) {
    redirect("/login?next=/marketplace");
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: driver } = await supabaseAdmin
    .from("driver_applications")
    .select("id, contact_name, status, email")
    .eq("email", driverEmail)
    .single();

  if (!driver || driver.status !== "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black text-primary">Access Denied</h1>
          <p className="text-text-secondary">Your account is not approved for the marketplace yet.</p>
        </div>
      </div>
    );
  }

  const { data: rawLeads } = await supabaseAdmin
    .from("move_requests")
    .select("id, first_name, email, phone, collection_postcode, delivery_postcode, move_date, move_type, estimated_price, created_at, details, status, quoted_by, quote_amount, quoted_at, quote_expires_at, booking_fee, booking_fee_paid, customer_details_released_at, declined_reason")
    .eq("is_verified", true)
    .not("status", "eq", "pending")
    .not("status", "eq", "locked")
    .not("status", "eq", "cancelled")
    .order("created_at", { ascending: false });

  const currentMoverEmail = normaliseEmail(driverEmail);

  const leads = (rawLeads || []).map((lead: any) => {
    const isQuotedMover = normaliseEmail(lead.quoted_by) === currentMoverEmail;
    const detailsReleased =
      lead.status === "booked" &&
      lead.booking_fee_paid === true &&
      Boolean(lead.customer_details_released_at) &&
      isQuotedMover;

    return {
      id: lead.id,
      first_name: detailsReleased ? lead.first_name : undefined,
      email: detailsReleased ? lead.email : undefined,
      phone: detailsReleased ? lead.phone : undefined,
      collection_postcode: lead.collection_postcode,
      delivery_postcode: lead.delivery_postcode,
      move_date: lead.move_date,
      move_type: lead.move_type,
      estimated_price: lead.estimated_price,
      created_at: lead.created_at,
      details: lead.details,
      status: lead.status,
      quoted_by: lead.quoted_by,
      quote_amount: lead.quote_amount,
      quoted_at: lead.quoted_at,
      quote_expires_at: lead.quote_expires_at,
      booking_fee: lead.booking_fee,
      booking_fee_paid: lead.booking_fee_paid,
      customer_details_released_at: detailsReleased ? lead.customer_details_released_at : undefined,
      declined_reason: isQuotedMover ? lead.declined_reason : undefined,
    };
  });

  return (
    <DriverMarketplaceClient
      userEmail={driverEmail}
      driverName={driver.contact_name || driver.email}
      leads={leads || []}
    />
  );
}
