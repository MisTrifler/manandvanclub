import { NextResponse } from 'next/server';

// Legacy mover-payment checkout is disabled in the customer-paid booking fee model.
// The active payment flow is /api/customer/accept-quote, which creates a customer
// Booking Fee checkout only after the customer accepts a mover quote.
export async function POST() {
  return NextResponse.json(
    { error: 'This checkout flow is no longer active. Movers submit quotes for free; customers pay the booking fee only after accepting a quote.' },
    { status: 410 }
  );
}
