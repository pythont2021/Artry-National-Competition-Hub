'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // In a real application, you would validate user credentials against a database.
  // For this prototype, we'll check against the hardcoded credentials provided.
  if (email === 'pythont2021@gmail.com' && password === '123456798') {
    cookies().set('auth-token', 'mock-user-session-token-for-python-t', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: '/',
    });

    // After successful login, redirect the user to the dashboard.
    redirect('/dashboard/participant');
  }

  // If credentials don't match, return an error message.
  return { error: 'Invalid email or password. Please try again.' };
}

export async function logout() {
  cookies().delete('auth-token');
  redirect('/login');
}
