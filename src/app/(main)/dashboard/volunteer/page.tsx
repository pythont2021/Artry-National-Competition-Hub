
import { redirect } from "next/navigation";
import { VolunteerStatsChart } from "@/components/volunteer-stats-chart";
import { ProfileCard } from "@/components/profile-card";
import { Briefcase, Mail, Star } from "lucide-react";
import { ReferredParticipantsList } from "@/components/referred-participants-list";
import { createClient } from "@/lib/supabase/server";
import { getDashboardLink } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function VolunteerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?from=/dashboard/volunteer');
  }
  
  const userRole = user.user_metadata?.role;

  if (userRole !== 'volunteer') {
    return redirect(getDashboardLink(userRole));
  }
  
  // NOTE: The feature to fetch referred participants is disabled
  // because it requires querying the `profiles` table, which is unstable.
  // This prevents the page from crashing.
  const referredParticipants: any[] = [];
  
  const displayName = user.user_metadata?.full_name || "Volunteer";
  const avatarUrl = user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`;
  const volunteerReferralCode = user.user_metadata?.referral_code || 'N/A';

  const profileDetails = [
      { icon: <Briefcase className="h-4 w-4" />, label: "Art Teacher" },
      { icon: <Mail className="h-4 w-4" />, label: user.email! },
      { icon: <Star className="h-4 w-4" />, label: `Referral Code: ${volunteerReferralCode}` },
  ];

  const referredCount = referredParticipants.length;
  const target = 50;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {displayName}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Thank you for your invaluable contribution.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8">
                <ProfileCard 
                    name={displayName}
                    avatarUrl={avatarUrl}
                    description="Volunteer Profile"
                    details={profileDetails}
                />
                <VolunteerStatsChart achieved={referredCount} target={target} />
            </div>
            <div className="lg:col-span-2">
                <ReferredParticipantsList participants={referredParticipants} />
            </div>
        </div>
    </div>
  );
}
