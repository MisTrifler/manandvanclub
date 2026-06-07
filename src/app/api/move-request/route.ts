import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Save move request to Supabase (CRITICAL)
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
      return NextResponse.json({ 
        error: 'Database Error', 
        details: error.message,
        hint: error.hint 
      }, { status: 500 });
    }

    // 2. Try to send Emails (NON-CRITICAL for testing)
    try {
      if (process.env.RESEND_API_KEY) {
        // ... email logic ...
      }
    } catch (emailError: any) {
      console.error('Email sending failed, but lead was saved:', emailError);
    }

    return NextResponse.json({ id: request.id });
  } catch (error: any) {
    console.error('General API Error:', error);
    return NextResponse.json({ 
      error: 'Server Error', 
      message: error.message 
    }, { status: 500 });
  }
}
