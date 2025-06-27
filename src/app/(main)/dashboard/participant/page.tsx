import { MotivationalMessage } from "@/components/motivational-message";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function ParticipantDashboard() {
  const isLoggedIn = !!cookies().get('auth-token')?.value;
  if (!isLoggedIn) {
    redirect('/login?from=/dashboard/participant');
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, Artist!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Here's a summary of your journey with us.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-headline text-2xl font-semibold mb-4">Notifications</h2>
            <MotivationalMessage />
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg">
            <h3 className="font-headline text-xl font-semibold mb-4">My Submissions</h3>
            <ul className="space-y-3 font-body">
              <li className="flex justify-between items-center">
                <span>"Cosmic Ocean"</span>
                <span className="text-sm bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Judged</span>
              </li>
              <li className="flex justify-between items-center">
                <span>"City in Bloom"</span>
                 <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">In Judging</span>
              </li>
              <li className="flex justify-between items-center">
                <span>"Silent Watcher"</span>
                <span className="text-sm bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Received</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}
