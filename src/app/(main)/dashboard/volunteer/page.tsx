
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VolunteerStatsChart } from "@/components/volunteer-stats-chart";
import { ProfileCard } from "@/components/profile-card";
import { Briefcase, Mail, Star } from "lucide-react";
import { ReferredParticipantsList } from "@/components/referred-participants-list";

export const dynamic = 'force-dynamic';

export default function VolunteerDashboard() {
  const authToken = cookies().get('auth-token')?.value;
  if (!authToken || !authToken.includes('volunteer')) {
    redirect('/login?from=/dashboard/volunteer');
  }

  const user = {
    name: "Anita Desai",
    avatarUrl: `https://i.pravatar.cc/150?u=Anita%20Desai`,
    description: "Volunteer Profile",
    details: [
        { icon: <Briefcase className="h-4 w-4" />, label: "Art Teacher" },
        { icon: <Mail className="h-4 w-4" />, label: "volunteer@artry.com" },
        { icon: <Star className="h-4 w-4" />, label: "Referral Code: ABCDE123" },
    ]
  }

  // In a real app, this data would come from a database
  const referredParticipants = 15;
  const target = 50;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Thank you for your invaluable contribution.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8">
                <ProfileCard 
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    description={user.description}
                    details={user.details}
                />
                <VolunteerStatsChart achieved={referredParticipants} target={target} />
            </div>
            <div className="lg:col-span-2">
                <ReferredParticipantsList />
            </div>
        </div>
    </div>
  );
}
