
import { redirect } from "next/navigation";
import { VolunteerStatsChart } from "@/components/volunteer-stats-chart";
import { ProfileCard } from "@/components/profile-card";
import { Briefcase, Mail, Star } from "lucide-react";
import { ReferredParticipantsList } from "@/components/referred-participants-list";
import { createClient } from "@/lib/supabase/server";
import { getDashboardLink } from "@/lib/utils";
import type { Profile } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function VolunteerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?from=/dashboard/volunteer');
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>();

  if (error || !profile || profile.role !== 'volunteer') {
    return redirect(getDashboardLink(profile?.role));
  }
  
  const volunteerReferralCode = profile.referral_code;
  let referredParticipants: Pick<Profile, 'full_name' | 'category'>[] = [];
  
  if (volunteerReferralCode) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, category')
      .eq('referral_code', volunteerReferralCode);
    if(data) {
      referredParticipants = data;
    }
  }

  const displayName = profile.full_name || "Volunteer";
  const avatarUrl = profile.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`;
  const profileDetails = [
      { icon: <Briefcase className="h-4 w-4" />, label: "Art Teacher" },
      { icon: <Mail className="h-4 w-4" />, label: user.email! },
      { icon: <Star className="h-4 w-4" />, label: `Referral Code: ${volunteerReferralCode || 'N/A'}` },
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
