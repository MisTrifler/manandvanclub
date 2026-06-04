import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const BUCKET_NAME = "cleaner-documents";

function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function getAdminPasswordFromRequest(request) {
  return (
    request.headers.get("x-wmc-admin-password") ||
    request.headers.get("x-admin-password") ||
    ""
  );
}

function isAuthorised(request) {
  const submittedPassword = getAdminPasswordFromRequest(request);
  const realPassword = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";

  if (!realPassword) {
    return false;
  }

  return submittedPassword === realPassword;
}

async function createSignedDocumentUrl(path) {
  if (!path) {
    return null;
  }

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, 60 * 60 * 24 * 7);

  if (error) {
    return null;
  }

  return data?.signedUrl || null;
}

async function attachDocumentLinks(applications) {
  return Promise.all(
    applications.map(async (application) => {
      const [
        insuranceDocumentUrl,
        rightToWorkDocumentUrl,
        idDocumentUrl,
        extraDocumentUrl
      ] = await Promise.all([
        createSignedDocumentUrl(application.insurance_document_path),
        createSignedDocumentUrl(application.right_to_work_document_path),
        createSignedDocumentUrl(application.id_document_path),
        createSignedDocumentUrl(application.extra_document_path)
      ]);

      return {
        ...application,
        document_urls: {
          insurance_document_url: insuranceDocumentUrl,
          right_to_work_document_url: rightToWorkDocumentUrl,
          id_document_url: idDocumentUrl,
          extra_document_url: extraDocumentUrl
        }
      };
    })
  );
}

function buildPartnerPayloadFromApplication(application) {
  return {
    full_name: application.full_name,
    business_name: application.business_name || null,
    phone: application.phone,
    email: cleanEmail(application.email),
    base_area: application.base_area || application.postcode || null,
    areas_covered: application.areas_covered || null,
    status: "approved",
    admin_notes: application.admin_notes || null,
    is_active: true
  };
}

function buildMinimalPartnerPayloadFromApplication(application) {
  return {
    full_name: application.full_name,
    business_name: application.business_name || null,
    phone: application.phone,
    email: cleanEmail(application.email),
    base_area: application.base_area || application.postcode || null,
    areas_covered: application.areas_covered || null,
    status: "approved"
  };
}

async function createOrUpdateCleanerPartner(application) {
  const email = cleanEmail(application.email);
  const phone = cleanText(application.phone);

  if (!email && !phone) {
    return {
      success: false,
      error: "Cannot create cleaner partner because email and phone are missing."
    };
  }

  const fullPayload = buildPartnerPayloadFromApplication(application);
  const minimalPayload = buildMinimalPartnerPayloadFromApplication(application);

  let existingPartner = null;

  if (email) {
    const { data } = await supabaseAdmin
      .from("cleaner_partners")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    existingPartner = data || null;
  }

  if (!existingPartner && phone) {
    const { data } = await supabaseAdmin
      .from("cleaner_partners")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    existingPartner = data || null;
  }

  if (existingPartner?.id) {
    const { data: updatedPartner, error: updateError } = await supabaseAdmin
      .from("cleaner_partners")
      .update(fullPayload)
      .eq("id", existingPartner.id)
      .select("*")
      .single();

    if (!updateError) {
      return {
        success: true,
        partner: updatedPartner,
        action: "updated"
      };
    }

    const { data: fallbackUpdatedPartner, error: fallbackUpdateError } = await supabaseAdmin
      .from("cleaner_partners")
      .update(minimalPayload)
      .eq("id", existingPartner.id)
      .select("*")
      .single();

    if (fallbackUpdateError) {
      return {
        success: false,
        error:
          fallbackUpdateError.message ||
          updateError.message ||
          "Could not update cleaner partner."
      };
    }

    return {
      success: true,
      partner: fallbackUpdatedPartner,
      action: "updated"
    };
  }

  const { data: insertedPartner, error: insertError } = await supabaseAdmin
    .from("cleaner_partners")
    .insert(fullPayload)
    .select("*")
    .single();

  if (!insertError) {
    return {
      success: true,
      partner: insertedPartner,
      action: "created"
    };
  }

  const { data: fallbackInsertedPartner, error: fallbackInsertError } = await supabaseAdmin
    .from("cleaner_partners")
    .insert(minimalPayload)
    .select("*")
    .single();

  if (fallbackInsertError) {
    return {
      success: false,
      error:
        fallbackInsertError.message ||
        insertError.message ||
        "Could not create approved cleaner partner."
    };
  }

  return {
    success: true,
    partner: fallbackInsertedPartner,
    action: "created"
  };
}

export async function GET(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json(
        {
          error: "Not authorised"
        },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("cleaner_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json(
        {
          error: error.message || "Could not load cleaner applications."
        },
        { status: 500 }
      );
    }

    const applicationsWithDocuments = await attachDocumentLinks(data || []);

    return NextResponse.json({
      success: true,
      applications: applicationsWithDocuments
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Could not load cleaner applications."
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json(
        {
          error: "Not authorised"
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = cleanText(body.id);
    const applicationStatus = cleanText(body.applicationStatus);
    const adminNotes = cleanText(body.adminNotes);

    const allowedStatuses = [
      "submitted",
      "under_review",
      "approved",
      "rejected",
      "more_info_needed",
      "withdrawn"
    ];

    if (!id) {
      return NextResponse.json(
        {
          error: "Application ID is required."
        },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(applicationStatus)) {
      return NextResponse.json(
        {
          error: "Invalid application status."
        },
        { status: 400 }
      );
    }

    const updatePayload = {
      application_status: applicationStatus,
      admin_notes: adminNotes || null
    };

    if (applicationStatus === "under_review") {
      updatePayload.reviewed_at = new Date().toISOString();
    }

    if (applicationStatus === "approved") {
      updatePayload.approved_at = new Date().toISOString();
      updatePayload.reviewed_at = new Date().toISOString();
      updatePayload.rejected_at = null;
    }

    if (applicationStatus === "rejected") {
      updatePayload.rejected_at = new Date().toISOString();
      updatePayload.reviewed_at = new Date().toISOString();
      updatePayload.approved_at = null;
    }

    const { data: updatedApplication, error: updateError } = await supabaseAdmin
      .from("cleaner_applications")
      .update(updatePayload)
      .eq("id", id)
      .select("*")
      .single();

    if (updateError) {
      return NextResponse.json(
        {
          error: updateError.message || "Could not update cleaner application."
        },
        { status: 500 }
      );
    }

    let partnerResult = null;

    if (applicationStatus === "approved") {
      partnerResult = await createOrUpdateCleanerPartner(updatedApplication);

      if (!partnerResult.success) {
        const failureNote = `Application approved, but cleaner partner was not created: ${partnerResult.error}`;

        const { data: applicationWithFailureNote } = await supabaseAdmin
          .from("cleaner_applications")
          .update({
            admin_notes: adminNotes
              ? `${adminNotes}\n\n${failureNote}`
              : failureNote
          })
          .eq("id", id)
          .select("*")
          .single();

        const [applicationWithLinks] = await attachDocumentLinks([
          applicationWithFailureNote || updatedApplication
        ]);

        return NextResponse.json(
          {
            success: false,
            error: partnerResult.error,
            application: applicationWithLinks
          },
          { status: 500 }
        );
      }

      const successNote = `Cleaner partner ${partnerResult.action}: ${partnerResult.partner?.full_name || updatedApplication.full_name}`;

      await supabaseAdmin
        .from("cleaner_applications")
        .update({
          admin_notes: adminNotes
            ? `${adminNotes}\n\n${successNote}`
            : successNote
        })
        .eq("id", id);

      updatedApplication.admin_notes = adminNotes
        ? `${adminNotes}\n\n${successNote}`
        : successNote;
    }

    const [applicationWithLinks] = await attachDocumentLinks([updatedApplication]);

    return NextResponse.json({
      success: true,
      application: applicationWithLinks,
      cleanerPartner: partnerResult?.partner || null,
      cleanerPartnerAction: partnerResult?.action || null
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Could not update cleaner application."
      },
      { status: 500 }
    );
  }
}
