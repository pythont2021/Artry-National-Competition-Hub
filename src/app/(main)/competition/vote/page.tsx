
import { VoteClientPage } from "@/components/vote-client-page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function VotePage() {
  const authToken = cookies().get('auth-token')?.value;

  if (!authToken) {
    redirect('/login?from=/competition/vote');
  }

  // Logged in, but not enrolled
  if (!authToken.includes(':enrolled')) {
     const userType = authToken.includes('artist') ? 'artist' : 'participant';
     redirect(`/dashboard/${userType}`);
  }

  return <VoteClientPage />;
}
