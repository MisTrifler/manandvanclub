import { NextResponse } from "next/server";
import { expireOldQuotes } from "@/lib/quote-attempts";

// Cron: expire stale 6-hour quote locks, archive attempts, release
// requests back to the available pool and email customers (once each).
// Secured by CRON_SECRET (Vercel cron sends it as a Bearer token).

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expired = await expireOldQuotes();
  return NextResponse.json({ ok: true, expired });
}
