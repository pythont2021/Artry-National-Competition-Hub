'use server';

import { createClient } from '@/lib/supabase/server';
import * as z from 'zod';

const vendorRegistrationSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  services: z.string().min(10, { message: "Please describe your services briefly (min. 10 characters)."}),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export async function registerVendor(formData: FormData) {
  try {
    const data = {
      companyName: formData.get('companyName'),
      contactPerson: formData.get('contactPerson'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      services: formData.get('services'),
      password: formData.get('password'),
    };

    const validatedData = vendorRegistrationSchema.parse(data);

    const supabase = createClient();
    
    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          company_name: validatedData.companyName,
          contact_person: validatedData.contactPerson,
          mobile: validatedData.mobile,
          services_offered: validatedData.services,
          role: 'vendor',
        }
      }
    });

    if (error) {
      console.error('Supabase signup error (Vendor):', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      console.error('Validation error:', e.errors);
      return { error: e.errors.map(err => err.message).join(', ') };
    }
    console.error('Critical error in registerVendor:', e);
    return { error: 'An unexpected server error occurred. Please try again.' };
  }
}
