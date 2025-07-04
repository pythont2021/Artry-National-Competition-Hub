
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, User, Ticket, GalleryHorizontal } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getDashboardLink } from "@/lib/utils";
import type { ReactNode } from "react";

export const dynamic = 'force-dynamic';

// This function safely merges profile data from the `profiles` table and `user_metadata`
const getSafeProfileData = (user: any, profile: any) => {
    const role = user.user_metadata?.role || 'participant';
    const displayName = profile?.full_name || user.user_metadata?.full_name || "Participant";
    const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`;

    return { role, displayName, avatarUrl };
};

export default async function ParticipantDashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?from=/dashboard/participant');
  }

  // Ensure user is not redirected away if they have the 'participant' role
  const userRoleFromMeta = user.user_metadata?.role;
  if (userRoleFromMeta && userRoleFromMeta !== 'participant') {
      return redirect(getDashboardLink(userRoleFromMeta));
  }
  
  // Safely fetch profile from the database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { role, displayName, avatarUrl } = getSafeProfileData(user, profile);

  const profileType = `${role.charAt(0).toUpperCase() + role.slice(1)} Profile`;
  const welcomeName = displayName.split(' ')[0] || "Participant";


  const fees = [
      { category: "Junior (9-12 years)", fee: "₹299" },
      { category: "Intermediate (13-17 years)", fee: "₹599" },
      { category: "Senior (18-22 years)", fee: "₹899" },
      { category: "Artist (Level 4+)", fee: "₹1199" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {welcomeName}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Your participant dashboard.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 flex flex-col gap-8">
                <ProfileCard 
                    name={displayName}
                    avatarUrl={avatarUrl}
                    description={profileType}
                    details={[
                        { icon: <User className="h-4 w-4" />, label: role.charAt(0).toUpperCase() + role.slice(1) },
                    ]}
                />
            </div>
            <div className="md:col-span-2 flex flex-col gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Monitor the Competition</CardTitle>
                        <CardDescription>As a participant, you can view the public-facing pages of the competition.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/competition/gallery"><GalleryHorizontal className="mr-2" />View Art Gallery</Link>
                        </Button>
                        <Button asChild variant="secondary" className="w-full sm:w-auto">
                            <Link href="/competition/events/current"><Eye className="mr-2" />View Events</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Ticket className="text-primary"/> Enrollment Fees</CardTitle>
                        <CardDescription>Here are the one-time enrollment fees per competition level for participants.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {fees.map(item => (
                                <li key={item.category} className="flex justify-between items-center font-body">
                                    <span>{item.category}</span>
                                    <span className="font-bold font-headline">{item.fee}</span>
                                 </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

