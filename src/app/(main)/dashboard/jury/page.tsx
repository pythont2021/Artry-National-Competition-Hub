
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Shield, Briefcase, Mail } from "lucide-react";
import { JuryRatingPage } from "@/components/jury-rating-page";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function JuryDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/jury');
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
    
  if (profile.role !== 'jury') {
    redirect('/login');
  }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*');

  const profileData = {
    name: profile.full_name || "Jury Member",
    avatarUrl: profile.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Jury Profile",
    details: [
        { icon: <Briefcase className="h-4 w-4" />, label: profile.profession || "Art Expert" },
        { icon: <Mail className="h-4 w-4" />, label: user.email! },
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/3 xl:w-1/4">
                 <ProfileCard 
                    name={profileData.name}
                    avatarUrl={profileData.avatarUrl}
                    description={profileData.description}
                    details={profileData.details}
                />
            </aside>
            <main className="w-full lg:w-2/3 xl:w-3/4">
                <JuryRatingPage artworks={artworks || []} />
            </main>
        </div>
    </div>
  );
}
