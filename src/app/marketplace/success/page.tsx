import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";
import {
  CheckCircle2,
  Phone,
  Mail,
  User,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: { requestId?: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
  const driverEmail = isValidDriverSession(token);

  if (!driverEmail) {
    redirect("/login?next=/marketplace");
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Check driver is still approved
  const { data: driver } = await supabaseAdmin
    .from("driver_applications")
    .select("id, contact_name, email, status")
    .eq("email", driverEmail)
    .single();

  if (!driver || driver.status !== "approved") {
    redirect("/login");
  }

  const requestId = searchParams?.requestId;

  if (!requestId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
        <div className="max-w-md text-center space-y-6">
          <div className="text-success text-6xl">✓</div>
          <h1 className="text-3xl font-black text-primary">Payment Successful</h1>
          <p className="text-text-secondary">
            Your payment was successful. The customer’s contact details have been sent to your email.
          </p>
          <a
            href="/marketplace"
            className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
          >
            Back to Marketplace
          </a>
        </div>
      </div>
    );
  }

  // Fetch the lead details
  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
        <div className="max-w-md text-center space-y-6">
          <div className="text-success text-6xl">✓</div>
          <h1 className="text-3xl font-black text-primary">Payment Successful</h1>
          <p className="text-text-secondary">
            Your payment was successful. The customer details have been sent to your email.
          </p>
          <a
            href="/marketplace"
            className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
          >
            Back to Marketplace
          </a>
        </div>
      </div>
    );
  }

  const moveType = formatMoveType(lead.move_type);
  const colPostcode = formatUKPostcode(lead.collection_postcode);
  const delPostcode = formatUKPostcode(lead.delivery_postcode);
  const moveDate = formatDisplayDate(lead.move_date);

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Success banner */}
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6 text-center">
          <div className="text-success text-5xl mb-4">
            <CheckCircle2 size={48} className="mx-auto text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">
            Exclusive Lead Unlocked
          </h1>
          <p className="text-text-secondary">
            You now have access to the customer’s contact details. An email with the full details has also been sent to your inbox.
          </p>
        </div>

        {/* Lead details card */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-black text-primary tracking-tight mb-6">
              Customer Details
            </h2>

            {/* Customer contact */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40">
                    Customer Name
                  </p>
                  <p className="font-bold text-primary">
                    {lead.first_name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40">
                    Phone
                  </p>
                  <p className="font-bold text-primary">
                    {lead.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40">
                    Email
                  </p>
                  <p className="font-bold text-primary">
                    {lead.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Move details */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40 mb-0.5">
                    Route
                  </p>
                  <p className="font-bold text-primary">
                    {colPostcode || "Unknown"}
                    <span className="text-primary/30 mx-2">→</span>
                    {delPostcode || "Unknown"}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {moveType}
                  </p>
                </div>
              </div>

              {moveDate && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <CalendarDays size={18} className="text-primary/60" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">
                      Move Date
                    </p>
                    <p className="font-bold text-primary">{moveDate}</p>
                  </div>
                </div>
              )}

              {lead.estimated_price && (
                <div className="bg-primary/5 rounded-xl p-4 border border-border/50 mt-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">
                    Customer guide price
                  </p>
                  <p className="text-xl font-black text-primary tracking-tighter">
                    {lead.estimated_price}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Guide only. Final price agreed directly with the customer.
                  </p>
                </div>
              )}
            </div>

            {/* Reminder */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-8">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Reminder:</strong> Final price and availability are agreed directly with the customer. This enquiry is not a guaranteed booking.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4 md:p-5 bg-gray-50/50">
            <a
              href="/marketplace"
              className="btn-orange w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm"
            >
              Back to Marketplace
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
