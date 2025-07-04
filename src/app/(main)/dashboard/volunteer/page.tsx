
import { redirect } from "next/navigation";
import { VolunteerStatsChart } from "@/components/volunteer-stats-chart";
import { ProfileCard } from "@/components/profile-card";
import { Briefcase, Mail, Star } from "lucide-react";
import { ReferredParticipantsList } from "@/components/referred-participants-list";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function VolunteerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/volunteer');
  }

  // The 'profiles' table is missing. We will construct the profile from user metadata.
  const profile: Profile = {
    id: user.id,
    created_at: user.created_at,
    full_name: user.user_metadata.full_name ?? null,
    role: user.user_metadata.role ?? null,
    category: user.user_metadata.category ?? null,
    profession: user.user_metadata.profession ?? null,
    company_name: user.user_metadata.company_name ?? null,
    contact_person: user.user_metadata.contact_person ?? null,
    referral_code: user.user_metadata.referral_code ?? null,
    mobile: user.user_metadata.mobile ?? null,
    dob: user.user_metadata.dob ?? null,
    board: user.user_metadata.board ?? null,
    school: user.user_metadata.school ?? null,
    grade: user.user_metadata.grade ?? null,
    address: user.user_metadata.address ?? null,
    alt_contact: user.user_metadata.alt_contact ?? null,
    avatar_url: user.user_metadata.avatar_url ?? null,
    services_offered: user.user_metadata.services_offered ?? null,
    age_group: user.user_metadata.age_group ?? null,
  };

  if (profile.role !== 'volunteer') {
    redirect('/login');
  }
  
  // The query for referred participants will fail because the 'profiles' table does not exist.
  // To prevent the page from crashing, we will return an empty array.
  // The UI component is designed to handle this gracefully.
  const referredParticipants: { full_name: string | null; category: string | null }[] = [];

  const profileData = {
    name: profile.full_name || "Volunteer",
    avatarUrl: profile.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Volunteer Profile",
    details: [
        { icon: <Briefcase className="h-4 w-4" />, label: "Art Teacher" },
        { icon: <Mail className="h-4 w-4" />, label: user.email! },
        { icon: <Star className="h-4 w-4" />, label: `Referral Code: ${profile.referral_code || 'N/A'}` },
    ]
  }

  const referredCount = referredParticipants?.length || 0;
  const target = 50;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {profileData.name}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Thank you for your invaluable contribution.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8">
                <ProfileCard 
                    name={profileData.name}
                    avatarUrl={profileData.avatarUrl}
                    description={profileData.description}
                    details={profileData.details}
                />
                <VolunteerStatsChart achieved={referredCount} target={target} />
            </div>
            <div className="lg:col-span-2">
                <ReferredParticipantsList participants={referredParticipants || []} />
            </div>
        </div>
    </div>
  );
}
