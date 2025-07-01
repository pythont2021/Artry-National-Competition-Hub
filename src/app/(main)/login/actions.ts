
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(prevState: any, formData: FormData) {
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

  if (role === 'participant' || role === 'artist' || role === 'volunteer' || role === 'jury' || role === 'vendor' || role === 'audience') {
    redirect(`/dashboard/${role}`);
  }

  redirect('/competition');
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login?message=logout-success');
}
