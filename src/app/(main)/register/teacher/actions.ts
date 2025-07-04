'use server';

import { createClient } from '@/lib/supabase/server';
import * as z from 'zod';

const teacherRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  referralCode: z.string().min(1, { message: "Referral code is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export async function registerTeacher(formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      referralCode: formData.get('referralCode'),
      password: formData.get('password'),
    };

    const validatedData = teacherRegistrationSchema.parse(data);

    const supabase = createClient();
    
    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.name,
          referral_code: validatedData.referralCode,
          mobile: validatedData.mobile,
          role: 'volunteer',
        }
      }
    });
    
    if (error) {
      console.error('Supabase signup error (Teacher):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      console.error('Validation error:', e.errors);
      return { error: e.errors.map(err => err.message).join(', ') };
    }
    console.error('Critical error in registerTeacher:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
