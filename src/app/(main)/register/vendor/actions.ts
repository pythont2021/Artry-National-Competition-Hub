
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function registerVendor(prevState: any, formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'vendor',
        company_name: formData.get('companyName') as string,
        contact_person: formData.get('contactPerson') as string,
      }
    }
  });

  if (error) {
    console.error('Supabase signup error:', error);
    return { error: error.message };
  }

  redirect('/login?message=registration-success');
}
