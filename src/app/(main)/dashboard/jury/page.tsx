
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Shield, Briefcase, Mail } from "lucide-react";
import { JuryRatingPage } from "@/components/jury-rating-page";

export const dynamic = 'force-dynamic';

export default function JuryDashboard() {
  const authToken = cookies().get('auth-token')?.value;
  if (!authToken || !authToken.includes('jury')) {
    redirect('/login?from=/dashboard/jury');
  }

  const user = {
    name: "Rohan Mehra",
    avatarUrl: `https://i.pravatar.cc/150?u=Rohan%20Mehra`,
    description: "Jury Profile",
    details: [
        { icon: <Briefcase className="h-4 w-4" />, label: "Art Critic" },
        { icon: <Mail className="h-4 w-4" />, label: "rohan.mehra@example.com" },
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/3 xl:w-1/4">
                 <ProfileCard 
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    description={user.description}
                    details={user.details}
                />
            </aside>
            <main className="w-full lg:w-2/3 xl:w-3/4">
                <JuryRatingPage />
            </main>
        </div>
    </div>
  );
}
