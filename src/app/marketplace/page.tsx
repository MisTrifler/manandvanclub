import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { leadIsAvailableToDriver, type DriverProfile } from "@/lib/marketplace-matching";
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
    .select("*")
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

  const currentMoverEmail = normaliseEmail(driverEmail);
  const driverProfile: DriverProfile = driver;

  // ── Server-side queries ────────────────────────────────────────────
  // 1. Candidate available leads: verified, unowned, unpaid, active
  //    statuses only. Area/service/date filtering applied below before
  //    anything is sent to the browser.
  // 2. Driver-owned leads: only rows quoted by THIS driver. Another
  //    mover's quoted/booked/declined jobs are never fetched.
  const [{ data: candidateLeads }, { data: ownLeads }] = await Promise.all([
    supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("is_verified", true)
      .in("status", ["available", "verified", "active"])
      .is("quoted_by", null)
      .is("quote_amount", null)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
      .is("customer_details_released_at", null)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("is_verified", true)
      .ilike("quoted_by", driverEmail)
      .order("created_at", { ascending: false }),
  ]);

  // Restrictive availability: status rules + future move date + driver
  // approved area + driver approved service types.
  const availableForDriver = (candidateLeads || []).filter((lead: any) =>
    leadIsAvailableToDriver(lead, driverProfile)
  );

  const mine = (ownLeads || []).filter(
    (lead: any) => normaliseEmail(lead.quoted_by) === currentMoverEmail
  );

  const seen = new Set<string>();
  const combined = [...mine, ...availableForDriver].filter((lead: any) => {
    if (seen.has(lead.id)) return false;
    seen.add(lead.id);
    return true;
  });

  const leads = combined.map((lead: any) => {
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
      quoted_by: isQuotedMover ? lead.quoted_by : undefined,
      quote_amount: isQuotedMover ? lead.quote_amount : undefined,
      quote_options: isQuotedMover ? lead.quote_options : undefined,
      selected_quote_option: isQuotedMover ? lead.selected_quote_option : undefined,
      quoted_at: isQuotedMover ? lead.quoted_at : undefined,
      quote_expires_at: isQuotedMover ? lead.quote_expires_at : undefined,
      booking_fee: isQuotedMover ? lead.booking_fee : undefined,
      booking_fee_paid: lead.booking_fee_paid,
      customer_details_released_at: detailsReleased ? lead.customer_details_released_at : undefined,
      declined_reason: isQuotedMover ? lead.declined_reason : undefined,
      customer_no_show_status: isQuotedMover ? lead.customer_no_show_status : undefined,
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
