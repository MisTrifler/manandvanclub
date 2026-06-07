import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function sortByNewest<T extends { created_at?: string; applied_at?: string; id?: string }>(rows: T[]) {
  return [...rows].sort((a, b) => {
    const aDate = a.created_at || a.applied_at || "";
    const bDate = b.created_at || b.applied_at || "";
    if (aDate && bDate) return new Date(bDate).getTime() - new Date(aDate).getTime();
    return String(b.id || "").localeCompare(String(a.id || ""));
  });
}

export async function GET() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    const [leadsResult, driversResult] = await Promise.all([
      supabaseAdmin
        .from("move_requests")
        .select("id, first_name, email, collection_postcode, delivery_postcode, move_type, is_verified, locked_by, created_at"),
      supabaseAdmin
        .from("driver_applications")
        .select("id, company_name, contact_name, phone, email, coverage_area, radius, status, applied_at"),
    ]);

    if (leadsResult.error || driversResult.error) {
      return NextResponse.json(
        {
          error: "Failed to fetch admin dashboard data.",
          details: {
            leads: leadsResult.error?.message || null,
            drivers: driversResult.error?.message || null,
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      leads: sortByNewest(leadsResult.data || []),
      drivers: sortByNewest(driversResult.data || []),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}
