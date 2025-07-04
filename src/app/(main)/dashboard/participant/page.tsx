
import { redirect } from 'next/navigation';

export default function ParticipantDashboardRedirect() {
  // This page is deprecated and now redirects to the consolidated artist dashboard.
  redirect('/dashboard/artist');
  return null;
}
