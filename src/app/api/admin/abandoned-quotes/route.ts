import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const ACTION_STATUS: Record<string, string> = {
  contacted: "contacted",
  archive: "archived",
  reopen: "abandoned",
};

export async function POST(request: Request) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const id = String(body.id || "").trim();
    const action = String(body.action || "").trim();
    const adminNote = String(body.adminNote || "").trim();
    const nextStatus = ACTION_STATUS[action];

    if (!id || !nextStatus) {
      return NextResponse.json({ error: "Invalid abandoned quote action." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const update: Record<string, any> = {
      status: nextStatus,
      updated_at: now,
    };

    if (action === "contacted") update.contacted_at = now;
    if (action === "archive") update.archived_at = now;
    if (action === "reopen") {
      update.archived_at = null;
      update.contacted_at = null;
    }
    if (adminNote) update.admin_notes = adminNote;

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from("abandoned_quote_requests")
      .update(update)
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update abandoned quote.", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}
