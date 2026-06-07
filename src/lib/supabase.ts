import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
// v1.6.2: Aggressive key detection
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error("CRITICAL: No Supabase Key found in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey || 'placeholder');
