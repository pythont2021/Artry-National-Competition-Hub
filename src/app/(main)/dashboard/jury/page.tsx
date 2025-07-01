
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Shield, Briefcase, Mail } from "lucide-react";
import { JuryRatingPage } from "@/components/jury-rating-page";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function JuryDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/jury');
  }

  if (user.user_metadata.role !== 'jury') {
    redirect('/login');
  }

  const profile = {
    name: user.user_metadata.full_name || "Jury Member",
    avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Jury Profile",
    details: [
        { icon: <Briefcase className="h-4 w-4" />, label: user.user_metadata.profession || "Art Expert" },
        { icon: <Mail className="h-4 w-4" />, label: user.email! },
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/3 xl:w-1/4">
                 <ProfileCard 
                    name={profile.name}
                    avatarUrl={profile.avatarUrl}
                    description={profile.description}
                    details={profile.details}
                />
            </aside>
            <main className="w-full lg:w-2/3 xl:w-3/4">
                <JuryRatingPage />
            </main>
        </div>
    </div>
  );
}
