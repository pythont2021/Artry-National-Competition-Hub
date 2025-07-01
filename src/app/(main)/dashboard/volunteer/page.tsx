
import { redirect } from "next/navigation";
import { VolunteerStatsChart } from "@/components/volunteer-stats-chart";
import { ProfileCard } from "@/components/profile-card";
import { Briefcase, Mail, Star } from "lucide-react";
import { ReferredParticipantsList } from "@/components/referred-participants-list";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function VolunteerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/volunteer');
  }

  if (user.user_metadata.role !== 'volunteer') {
    redirect('/login');
  }

  const profile = {
    name: user.user_metadata.full_name || "Volunteer",
    avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Volunteer Profile",
    details: [
        { icon: <Briefcase className="h-4 w-4" />, label: "Art Teacher" },
        { icon: <Mail className="h-4 w-4" />, label: user.email! },
        { icon: <Star className="h-4 w-4" />, label: `Referral Code: ${user.user_metadata.referral_code || 'N/A'}` },
    ]
  }

  // In a real app, this data would come from a database
  const referredParticipants = 15;
  const target = 50;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {profile.name}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Thank you for your invaluable contribution.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8">
                <ProfileCard 
                    name={profile.name}
                    avatarUrl={profile.avatarUrl}
                    description={profile.description}
                    details={profile.details}
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
