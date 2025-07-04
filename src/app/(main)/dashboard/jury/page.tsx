
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Briefcase, Mail } from "lucide-react";
import { JuryRatingPage } from "@/components/jury-rating-page";
import { createClient } from "@/lib/supabase/server";
import { getDashboardLink } from "@/lib/utils";
import type { Profile } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function JuryDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?from=/dashboard/jury');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>();
    
  if (error || !profile || profile.role !== 'jury') {
    return redirect(getDashboardLink(profile?.role));
  }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*');

  const displayName = profile.full_name || "Jury Member";
  const avatarUrl = profile.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`;

  const profileDetails = [
      { icon: <Briefcase className="h-4 w-4" />, label: profile.profession || "Art Expert" },
      { icon: <Mail className="h-4 w-4" />, label: user.email! },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/3 xl:w-1/4">
                 <ProfileCard 
                    name={displayName}
                    avatarUrl={avatarUrl}
                    description="Jury Profile"
                    details={profileDetails}
                />
            </aside>
            <main className="w-full lg:w-2/3 xl:w-3/4">
                <JuryRatingPage artworks={artworks || []} />
            </main>
        </div>
    </div>
  );
}
