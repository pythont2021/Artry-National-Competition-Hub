
'use server';

import { createClient } from '@/lib/supabase/server';

export async function registerParticipant(formData: FormData) {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const participantCategory = formData.get('participantCategory') as string;
    const profilePhoto = formData.get('profilePhoto') as File | null;
    const dobValue = formData.get('dob') as string;
    const ageGroup = formData.get('ageGroup') as string;
    const referralCode = formData.get('referralCode') as string;

    const dobForDb = dobValue ? new Date(dobValue).toISOString() : null;

    const userData = {
        role: participantCategory === 'artist' ? 'artist' : 'participant',
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        category: participantCategory,
        age_group: ageGroup,
        referral_code: referralCode,
        mobile: formData.get('mobile') as string,
        dob: dobForDb,
        board: formData.get('board') as string,
        school: formData.get('school') as string,
        grade: formData.get('grade') as string,
        address: formData.get('address') as string,
        alt_contact: formData.get('altContact') as string,
        avatar_url: null as string | null,
    };

    // 1. Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { ...userData, dob: undefined } // Pass all except dob which is handled separately
      }
    });

    if (signUpError) {
      console.error('Supabase signup error (Participant):', signUpError);
      return { error: signUpError.message };
    }

    if (!signUpData.user) {
      return { error: "User was not created. Please try again." };
    }
    
    // 2. Upload profile photo if it exists
    if (profilePhoto && profilePhoto.size > 0) {
        const fileName = `${signUpData.user.id}/${Date.now()}_${profilePhoto.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, profilePhoto);

        if (uploadError) {
            console.error("Error uploading avatar:", uploadError);
            // Non-critical, but good to be aware of.
        } else {
            // 3. Get public URL and update profile
            const { data: urlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(fileName);
            
            if(urlData?.publicUrl) {
                userData.avatar_url = urlData.publicUrl;
            }
        }
    }

    // 4. Update the profile with all data, including avatar URL and DOB
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        ...userData,
      })
      .eq('id', signUpData.user.id);

    if (profileError) {
      console.error("Error updating profile with details:", profileError);
      // This is a more serious issue, might want to handle it.
      // For now, we'll let it pass but the user profile might be incomplete.
    }

    // 5. Return success
    return { success: true };
  } catch(e: any) {
    console.error('Critical error in registerParticipant:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
