
'use server';

import { createClient } from '@/lib/supabase/server';

export async function registerParticipant(formData: FormData) {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const participantCategory = formData.get('participantCategory') as string;
    const dobValue = formData.get('dob') as string;
    
    const dobForDb = dobValue ? new Date(dobValue).toISOString() : null;

    const userData = {
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        category: participantCategory,
        age_group: formData.get('ageGroup') as string,
        referral_code: formData.get('referralCode') as string,
        mobile: formData.get('mobile') as string,
        dob: dobForDb,
        board: formData.get('board') as string,
        school: formData.get('school') as string,
        grade: formData.get('grade') as string,
        address: formData.get('address') as string,
        alt_contact: formData.get('altContact') as string,
    };

    // Sign up the user with all metadata.
    // The database trigger will copy this data to the public.profiles table.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) {
      console.error('Supabase signup error (Participant):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch(e: any) {
    console.error('Critical error in registerParticipant:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
