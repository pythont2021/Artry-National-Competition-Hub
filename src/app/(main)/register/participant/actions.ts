'use server';

import { createClient } from '@/lib/supabase/server';
import * as z from 'zod';

const participantRegistrationSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  dob: z.string().refine(val => !isNaN(new Date(val).getTime()), { message: "A valid date of birth is required." }), // Validate as string, then convert
  ageGroup: z.string().optional(), // This will be set by the client, so it's optional here
  participantCategory: z.string().optional(), // This will be set by the client
  board: z.string({ required_error: "Please select a board." }),
  school: z.string().min(1, { message: "School/College is required." }),
  grade: z.string().min(1, { message: "Class/Grade is required." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  altContact: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }).optional().or(z.literal('')),
  referralCode: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export async function registerParticipant(formData: FormData) {
  try {
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      dob: formData.get('dob'),
      ageGroup: formData.get('ageGroup'),
      participantCategory: formData.get('participantCategory'),
      board: formData.get('board'),
      school: formData.get('school'),
      grade: formData.get('grade'),
      address: formData.get('address'),
      altContact: formData.get('altContact'),
      referralCode: formData.get('referralCode'),
      password: formData.get('password'),
    };

    const validatedData = participantRegistrationSchema.parse(data);

    const supabase = createClient();
    
    const dobForDb = validatedData.dob ? new Date(validatedData.dob).toISOString() : null;
    const role = validatedData.participantCategory === 'artist' ? 'artist' : 'participant';

    const userData = {
        full_name: `${validatedData.firstName} ${validatedData.lastName}`,
        category: validatedData.participantCategory,
        age_group: validatedData.ageGroup,
        referral_code: validatedData.referralCode,
        mobile: validatedData.mobile,
        dob: dobForDb,
        board: validatedData.board,
        school: validatedData.school,
        grade: validatedData.grade,
        address: validatedData.address,
        alt_contact: validatedData.altContact,
        role: role,
    };

    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
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
    if (e instanceof z.ZodError) {
      console.error('Validation error:', e.errors);
      return { error: e.errors.map(err => err.message).join(', ') };
    }
    console.error('Critical error in registerParticipant:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
