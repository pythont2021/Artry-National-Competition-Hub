'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerTeacher(prevState: any, formData: FormData) {
  // In a real app, you would validate the data and save the user to a database.
  
  const authToken = 'mock-user-session-token-for-volunteer';

  cookies().set('auth-token', authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  redirect('/dashboard/volunteer');
}
