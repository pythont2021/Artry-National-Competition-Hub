
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // In a real application, you would validate user credentials against a database.
  
  // Participant credentials
  if (email === 'pythont2021@gmail.com' && password === '123456798') {
    cookies().set('auth-token', 'mock-user-session-token-for-participant', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: '/',
    });
    redirect('/dashboard/participant');
  }

  // Volunteer credentials
  if (email === 'volunteer@artry.com' && password === 'volunteer123') {
     cookies().set('auth-token', 'mock-user-session-token-for-volunteer', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: '/',
    });
    redirect('/dashboard/volunteer');
  }

  // Jury credentials
  if (email === 'jury@artry.com' && password === 'jury123') {
     cookies().set('auth-token', 'mock-user-session-token-for-jury', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: '/',
    });
    redirect('/dashboard/jury');
  }
  
  // Vendor credentials
  if (email === 'vendor@artry.com' && password === 'vendor123') {
     cookies().set('auth-token', 'mock-user-session-token-for-vendor', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: '/',
    });
    redirect('/dashboard/vendor');
  }

  // If credentials don't match, return an error message.
  return { error: 'Invalid email or password. Please try again.' };
}

export async function logout() {
  cookies().delete('auth-token');
  redirect('/login');
}
