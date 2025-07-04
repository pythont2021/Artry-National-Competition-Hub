'use server';

import { createClient } from '@/lib/supabase/server';
import * as z from 'zod';

const juryRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  profession: z.string().min(3, { message: "Profession is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export async function registerJury(formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      profession: formData.get('profession'),
      password: formData.get('password'),
    };

    const validatedData = juryRegistrationSchema.parse(data);

    const supabase = createClient();
    
    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.name,
          profession: validatedData.profession,
          mobile: validatedData.mobile,
          role: 'jury',
        }
      }
    });

    if (error) {
      console.error('Supabase signup error (Jury):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      console.error('Validation error:', e.errors);
      return { error: e.errors.map(err => err.message).join(', ') };
    }
    console.error('Critical error in registerJury:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
