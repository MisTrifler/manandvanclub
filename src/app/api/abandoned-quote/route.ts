import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const optionalString = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : value),
  z.string().max(1000).optional().default(""),
);

const abandonedQuoteSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(["abandoned", "converted"]).optional().default("abandoned"),
  firstName: optionalString,
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    z.string().email().optional().or(z.literal("")),
  ),
  phone: optionalString,
  collectionPostcode: optionalString,
  deliveryPostcode: optionalString,
  moveType: optionalString,
  moveDate: optionalString,
  serviceIntent: optionalString,
  currentStep: z.coerce.number().int().min(1).max(4).optional().default(2),
  sourcePage: optionalString,
  landingPage: optionalString,
  referrer: optionalString,
  utmSource: optionalString,
  utmMedium: optionalString,
  utmCampaign: optionalString,
  utmTerm: optionalString,
  utmContent: optionalString,
  gclid: optionalString,
  gbraid: optionalString,
  wbraid: optionalString,
  deviceType: optionalString,
  collectionOutwardPostcode: optionalString,
  deliveryOutwardPostcode: optionalString,
  guidePriceDisplayed: optionalString,
  convertedToRequestId: z.string().uuid().optional(),
  details: z.record(z.any()).optional().default({}),
});

function hasContact(data: z.infer<typeof abandonedQuoteSchema>) {
  return Boolean(String(data.email || "").trim() || String(data.phone || "").trim());
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = abandonedQuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid abandoned quote payload." }, { status: 400 });
    }

    const data = parsed.data;
    const supabaseAdmin = getSupabaseAdmin();
    const now = new Date().toISOString();

    // Conversion updates should only update an existing abandoned quote ID.
    // They should not create a new customer row from a public endpoint.
    if (data.status === "converted") {
      if (!data.id) {
        return NextResponse.json({ error: "Abandoned quote ID is required for conversion." }, { status: 400 });
      }

      const { error } = await supabaseAdmin
        .from("abandoned_quote_requests")
        .update({
          status: "converted",
          converted_request_id: data.convertedToRequestId || null,
          converted_at: now,
          last_activity_at: now,
          updated_at: now,
        })
        .eq("id", data.id);

      if (error) {
        return NextResponse.json(
          { error: "Failed to update abandoned quote.", details: error.message },
          { status: 500 },
        );
      }

      return NextResponse.json({ ok: true, id: data.id, status: "converted" });
    }

    if (!hasContact(data)) {
      return NextResponse.json({ error: "Email or phone is required before saving a quote reminder." }, { status: 400 });
    }

    const row = {
      ...(data.id ? { id: data.id } : {}),
      status: "abandoned",
      first_name: data.firstName || null,
      email: data.email || null,
      phone: data.phone || null,
      collection_postcode: data.collectionPostcode || null,
      delivery_postcode: data.deliveryPostcode || null,
      move_type: data.moveType || null,
      move_date: data.moveDate || null,
      service_intent: data.serviceIntent || null,
      current_step: data.currentStep,
      source_page: data.sourcePage || null,
      landing_page: data.landingPage || null,
      referrer: data.referrer || null,
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      utm_term: data.utmTerm || null,
      utm_content: data.utmContent || null,
      gclid: data.gclid || null,
      gbraid: data.gbraid || null,
      wbraid: data.wbraid || null,
      device_type: data.deviceType || null,
      collection_outward_postcode: data.collectionOutwardPostcode || null,
      delivery_outward_postcode: data.deliveryOutwardPostcode || null,
      guide_price_displayed: data.guidePriceDisplayed || null,
      details: data.details || {},
      last_activity_at: now,
      updated_at: now,
    };

    const { data: saved, error } = await supabaseAdmin
      .from("abandoned_quote_requests")
      .upsert(row, { onConflict: "id" })
      .select("id,status")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to save abandoned quote.", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: saved.id, status: saved.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}
