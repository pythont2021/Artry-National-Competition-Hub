
'use server';

import { createClient } from '@/lib/supabase/server';

export async function registerJury(formData: FormData) {
  try {
    const supabase = createClient();
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signUp({
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
      console.error('Supabase signup error (Jury):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e: any) {
    console.error('Critical error in registerJury:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
