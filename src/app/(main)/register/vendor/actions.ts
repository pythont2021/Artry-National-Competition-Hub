
'use server';

import { createClient } from '@/lib/supabase/server';

export async function registerVendor(formData: FormData) {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: formData.get('companyName') as string,
          contact_person: formData.get('contactPerson') as string,
          mobile: formData.get('mobile') as string,
          services_offered: formData.get('services') as string,
        }
      }
    });

    if (error) {
      console.error('Supabase signup error (Vendor):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e: any) {
    console.error('Critical error in registerVendor:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
