import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Save move request to Supabase
    const { data: request, error } = await supabase
      .from('move_requests')
      .insert([
        {
          first_name: data.firstName,
          email: data.email,
          phone: data.phone,
          collection_postcode: data.collectionPostcode,
          delivery_postcode: data.deliveryPostcode,
          move_date: data.moveDate,
          move_type: data.moveType,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Database Error', details: error.message }, { status: 500 });
    }

    // 2. Send Email
    try {
      if (process.env.RESEND_API_KEY) {
        console.log('Attempting to send email to:', data.email);
        
        const { data: emailResponse, error: emailError } = await resend.emails.send({
          from: 'no-reply@manandvanclub.co.uk', // Ensure this matches your Resend verified domain
          to: [data.email],
          subject: 'Move Request Received - Man & Van Club',
          html: `
            <h1>Move Request Received</h1>
            <p>Hi ${data.firstName},</p>
            <p>We have received your move request for ${data.moveDate}.</p>
            <p>Our team will be in touch shortly.</p>
          `,
        });

        if (emailError) {
          console.error('Resend API returned an error:', emailError);
        } else {
          console.log('Email successfully sent! ID:', emailResponse?.id);
        }
      }
    } catch (emailError: any) {
      console.error('Unexpected error in email logic:', emailError);
    }

    return NextResponse.json({ id: request.id });
  } catch (error: any) {
    console.error('General API Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
