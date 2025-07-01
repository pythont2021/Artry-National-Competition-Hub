
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function registerJury(prevState: any, formData: FormData) {
  const supabase = createClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'jury',
        full_name: formData.get('name') as string,
        profession: formData.get('profession') as string,
        mobile: formData.get('mobile') as string,
      }
    }
  });

  if (error) {
    console.error('Supabase signup error:', error);
    return { error: error.message };
  }

  // Supabase sends a confirmation email.
  redirect('/login?message=registration-success');
}
