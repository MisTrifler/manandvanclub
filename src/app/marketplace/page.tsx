import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DriverMarketplaceClient from './DriverMarketplaceClient';

export default async function MarketplacePage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user.email) {
    redirect('/login?next=/marketplace');
  }

  // Check if user is an approved driver
  const { data: driver } = await supabase
    .from('driver_applications')
    .select('id, status, email')
    .eq('email', session.user.email)
    .single();

  if (!driver || driver.status !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black text-primary">Access Denied</h1>
          <p className="text-text-secondary">Your account is not approved for the marketplace yet.</p>
        </div>
      </div>
    );
  }

  // Only fetch verified + unlocked leads
  const { data: leads } = await supabase
    .from('move_requests')
    .select('*')
    .eq('is_verified', true)
    .neq('status', 'locked')   // <-- Important: hide already paid leads
    .order('created_at', { ascending: false });

  return (
    <DriverMarketplaceClient 
      userEmail={session.user.email} 
      leads={leads || []} 
    />
  );
}
