
import { redirect } from 'next/navigation';

export default function ParticipantDashboardRedirect() {
  // This page is a permanent redirect to the safe audience dashboard for any participant users.
  redirect('/dashboard/audience');
  return null;
}
