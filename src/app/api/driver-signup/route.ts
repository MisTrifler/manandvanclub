import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, SENDER_ADDRESS } from '@/lib/resend';
import {
  PARTNERS_EMAIL,
  PARTNERS_REPLY_TO,
  buildAdminMoverApplicationEmailHtml,
  buildMoverAgreementHtml,
  buildMoverApplicationReceivedEmailHtml,
  buildMoverApplicationSummaryHtml,
  getAgreementDate,
  makeMoverAttachmentFilenames,
  normaliseMoverApplication,
} from '@/lib/mover-onboarding';

function isMissingColumnError(error: any) {
  return error?.code === '42703' || error?.code === 'PGRST204' || /column .* does not exist|schema cache/i.test(error?.message || '');
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const normalised = normaliseMoverApplication(data);

    const baseRecord = {
      company_name: data.companyName,
      contact_name: data.contactName,
      phone: data.phone,
      email: data.email,
      coverage_area: data.coverageArea,
      radius: data.radius,
      has_insurance: data.hasInsurance,
      status: 'pending',
    };

    const extendedFields = {
      business_type: data.businessType,
      company_number: data.companyNumber,
      position_authority: data.position,
      towns_covered: data.townsCovered,
      capacity: data.capacity,
    };

    const serviceFields = {
      service_house: data.serviceHouse === true,
      service_flat: data.serviceFlat === true,
      service_student: data.serviceStudent === true,
      service_furniture: data.serviceFurniture === true,
      service_office: data.serviceOffice === true,
      service_single: data.serviceSingle === true,
      service_long_distance: data.serviceLongDistance === true,
    };

    const insertAttempts = [
      { ...baseRecord, ...extendedFields, ...serviceFields },
      { ...baseRecord, ...serviceFields },
      baseRecord,
    ];

    let insertError: any = null;
    for (const record of insertAttempts) {
      const { error } = await supabase.from('driver_applications').insert([record]);
      insertError = error;

      if (!error) {
        insertError = null;
        break;
      }

      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email has already applied.' }, { status: 400 });
      }

      if (!isMissingColumnError(error)) break;
    }

    if (insertError) {
      console.error('Supabase Driver Signup Error:', insertError);
      return NextResponse.json({ error: 'Database error', details: insertError.message, code: insertError.code }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const agreementDate = getAgreementDate();
        const filenames = makeMoverAttachmentFilenames(data);
        const agreementHtml = buildMoverAgreementHtml(data, agreementDate);
        const summaryHtml = buildMoverApplicationSummaryHtml(data, agreementDate);

        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [data.email],
          replyTo: PARTNERS_REPLY_TO,
          subject: 'Application received - Man and Van Club',
          html: buildMoverApplicationReceivedEmailHtml(),
        });

        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [PARTNERS_EMAIL],
          replyTo: normalised.email || PARTNERS_REPLY_TO,
          subject: `New mover application - ${normalised.companyName} - ${normalised.coverageArea}`,
          html: buildAdminMoverApplicationEmailHtml(data, agreementDate),
          attachments: [
            {
              filename: filenames.summary,
              content: Buffer.from(summaryHtml, 'utf8'),
              contentType: 'text/html',
            },
            {
              filename: filenames.agreement,
              content: Buffer.from(agreementHtml, 'utf8'),
              contentType: 'text/html',
            },
          ] as any,
        });
      } catch (emailErr) {
        console.error('Non-blocking Driver Signup Email Error:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
