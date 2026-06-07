import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { requestId, otp } = await req.json();

    if (!requestId || !otp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if OTP matches
    const { data: request, error: fetchError } = await supabase
      .from('move_requests')
      .select('otp_code, is_verified')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (request.is_verified) {
      return NextResponse.json({ message: 'Already verified' });
    }

    if (request.otp_code !== otp) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // 2. Update status to active and is_verified to true
    const { error: updateError } = await supabase
      .from('move_requests')
      .update({ 
        is_verified: true, 
        status: 'active',
        verified_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
