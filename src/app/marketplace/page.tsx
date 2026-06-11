import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import DriverMarketplaceClient from "./DriverMarketplaceClient";

export const dynamic = "force-dynamic";

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
          <p className="text-text-secondary">
            Your account is not approved for the marketplace yet.
          </p>
        </div>
      </div>
    );
  }

  // Fetch all verified requests that are not legacy-locked or pending
  const { data: leads } = await supabaseAdmin
    .from("move_requests")
    .select(
      "id, first_name, email, phone, collection_postcode, delivery_postcode, move_date, move_type, estimated_price, created_at, details, status, quoted_by, quote_amount, quoted_at, booking_fee_paid"
    )
    .eq("is_verified", true)
    .not("status", "eq", "locked")
    .not("status", "eq", "pending")
    .not("status", "eq", "declined")
    .order("created_at", { ascending: false });

  // Privacy: customer contact details are only released to the mover whose
  // quote was accepted AND after the booking fee has been paid. Strip PII
  // from everything else before it leaves the server.
  const sanitizedLeads = (leads || []).map((lead) => {
    const isReleasedToThisDriver =
      lead.status === "booked" &&
      lead.booking_fee_paid &&
      lead.quoted_by?.toLowerCase() === driverEmail.toLowerCase();

    if (isReleasedToThisDriver) {
      return lead;
    }

    const { first_name, email, phone, ...safe } = lead;
    return { ...safe, first_name: undefined, email: undefined, phone: undefined };
  });

  return (
    <DriverMarketplaceClient
      userEmail={driverEmail}
      driverName={driver.contact_name || driver.email}
      leads={sanitizedLeads}
    />
  );
}
