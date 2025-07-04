
'use server';

import { createClient } from '@/lib/supabase/server';

export async function registerTeacher(formData: FormData) {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: formData.get('name') as string,
          referral_code: formData.get('referralCode') as string,
          mobile: formData.get('mobile') as string,
        }
      }
    });
    
    if (error) {
      console.error('Supabase signup error (Teacher):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e: any) {
    console.error('Critical error in registerTeacher:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
