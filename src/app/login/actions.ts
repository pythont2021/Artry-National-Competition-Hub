'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  // In a real application, you would validate user credentials here.
  // For this prototype, we'll assume the login is successful and set a cookie.
  
  const email = formData.get('email');
  const password = formData.get('password');

  // Basic validation to ensure fields are not empty.
  if (!email || !password) {
    // In a real app, you would return an error message to the client.
    return;
  }

  cookies().set('auth-token', 'mock-user-session-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // Cookie expires in 1 day
    path: '/',
  });

  // After successful login, redirect the user to the vote page.
  redirect('/competition/vote');
}
