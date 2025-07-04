
import { redirect } from 'next/navigation';
import { getDashboardLink } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

// This page is a safeguard.
// It fetches the user's role and redirects them to the correct dashboard.
// This prevents crashes if a user with an old link accesses this page.
export default async function ParticipantDashboardRedirect() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // The getDashboardLink function now correctly routes all participants
  // to the audience dashboard.
  redirect(getDashboardLink(user?.user_metadata?.role));
  
  return null;
}
