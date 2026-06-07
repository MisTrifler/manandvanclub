import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DriverMarketplaceClient from "./DriverMarketplaceClient";

export default async function MarketplacePage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login?next=/marketplace");
  }

  // Check if user is an approved driver
  const { data: driver } = await supabase
    .from("driver_applications")
    .select("id, status, email")
    .eq("email", session.user.email)
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

  return <DriverMarketplaceClient userEmail={session.user.email} />;
}
