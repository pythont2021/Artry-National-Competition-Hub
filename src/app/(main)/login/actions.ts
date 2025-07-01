
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getDashboardLink } from '@/lib/utils';

export async function login(formData: FormData) {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const { data: { user } } = await supabase.auth.getUser();
    const role = user?.user_metadata?.role || 'audience';
    
    const redirectTo = getDashboardLink(role);

    return { success: true, redirectTo };

  } catch (e: any) {
    console.error('Login action error:', e);
    return { error: 'An unexpected server error occurred.' };
  }
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login?message=logout-success');
}
