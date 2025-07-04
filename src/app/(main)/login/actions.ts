
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getDashboardLink } from '@/lib/utils';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export async function login(data: z.infer<typeof loginFormSchema>) {
  try {
    const { email, password } = loginFormSchema.parse(data);
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (!authData.user) {
      return { error: 'Authentication failed, user not found.' };
    }

    const role = authData.user?.user_metadata?.role || 'audience';
    // const role = 'participant';

    const redirectTo = getDashboardLink(role);
    return { success: true, redirectTo };

  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return { error: "Invalid email or password format." };
    }
    return { error: 'An unexpected error occurred during login.' };
  }
}
 
export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login?message=logout-success');
}
