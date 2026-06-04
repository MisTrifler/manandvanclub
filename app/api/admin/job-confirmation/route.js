import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "This legacy admin job-confirmation route has been disabled. Use the current admin marketplace quote selection, customer selected-quote payment and payout workflow instead."
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error:
        "This legacy admin job-confirmation route has been disabled. Use /admin/marketplace and the current marketplace APIs instead."
    },
    { status: 410 }
  );
}
