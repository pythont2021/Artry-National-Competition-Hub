
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function registerParticipant(prevState: any, formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const participantCategory = formData.get('participantCategory') as string;
  const profilePhoto = formData.get('profilePhoto') as File;
  const dobValue = formData.get('dob') as string;

  // Format date correctly for DB
  const dobForDb = dobValue ? new Date(dobValue).toISOString().split('T')[0] : null;

  // 1. Sign up the user with all text-based metadata
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: participantCategory === 'artist' ? 'artist' : 'participant',
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        category: participantCategory,
        referral_code: formData.get('referralCode') as string,
        mobile: formData.get('mobile') as string,
        dob: dobForDb,
        board: formData.get('board') as string,
        school: formData.get('school') as string,
        grade: formData.get('grade') as string,
        address: formData.get('address') as string,
        alt_contact: formData.get('altContact') as string,
      }
    }
  });

  if (signUpError) {
    console.error('Supabase signup error:', signUpError);
    return { error: signUpError.message };
  }

  if (!signUpData.user) {
    return { error: "User was not created. Please try again." };
  }
  
  // 2. Upload profile photo if it exists
  if (profilePhoto && profilePhoto.size > 0) {
      const fileName = `${signUpData.user.id}/${profilePhoto.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, profilePhoto, {
            upsert: true, // Overwrite if file exists
        });

      if (uploadError) {
          console.error("Error uploading avatar:", uploadError);
          // Non-critical error, so we don't block registration
      } else {
          // 3. Get public URL and update profile
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          if(urlData?.publicUrl) {
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: urlData.publicUrl })
                .eq('id', signUpData.user.id);
            
             if (updateError) {
                console.error("Error updating profile with avatar URL:", updateError);
             }
          }
      }
  }

  // 4. Redirect to login
  redirect('/login?message=registration-success');
}
