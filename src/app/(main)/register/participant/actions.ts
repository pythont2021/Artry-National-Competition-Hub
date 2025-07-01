
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function registerParticipant(prevState: any, formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const participantCategory = formData.get('participantCategory') as string;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: participantCategory === 'artist' ? 'artist' : 'participant',
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        category: participantCategory,
        referral_code: formData.get('referralCode') as string,
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
