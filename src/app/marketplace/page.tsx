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

  // Check if user is an approved driver
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

  // Only fetch verified + unlocked leads
  const { data: leads } = await supabaseAdmin
    .from("move_requests")
    .select("id, first_name, email, phone, collection_postcode, delivery_postcode, move_date, move_type, estimated_price, created_at, details")
    .eq("is_verified", true)
    .neq("status", "locked")
    .order("created_at", { ascending: false });

  return <DriverMarketplaceClient userEmail={driverEmail} driverName={driver.contact_name || driver.email} leads={leads || []} />;
}
