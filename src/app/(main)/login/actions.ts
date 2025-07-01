
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getDashboardLink } from '@/lib/utils';
import * as z from 'zod';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export async function login(data: unknown) {
  try {
    const { email, password } = loginFormSchema.parse(data);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const { data: { user } } = await supabase.auth.getUser();
    const role = user?.user_metadata?.role || 'audience';
    
    const redirectTo = getDashboardLink(role);

    return { success: true, redirectTo };

  } catch (e: any) {
    console.error('Login action error:', e);
    if (e instanceof z.ZodError) {
      return { error: "Invalid email or password format." };
    }
    return { error: 'An unexpected server error occurred.' };
  }
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login?message=logout-success');
}
