'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerParticipant(prevState: any, formData: FormData) {
  const participantCategory = formData.get('participantCategory');
  
  // In a real app, you would save the user to a DB here.
  // We'll just set a cookie and redirect.

  let tokenType = 'participant';
  if (participantCategory === 'artist') {
    tokenType = 'artist';
  }

  // All new registrations are unenrolled by default
  const authToken = `mock-user-session-token-for-${tokenType}:not-enrolled`;

  cookies().set('auth-token', authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  redirect(`/dashboard/${tokenType}`);
}
