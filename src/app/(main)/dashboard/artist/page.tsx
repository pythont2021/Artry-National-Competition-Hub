
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { User, Palette, Award, FileDown, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getDashboardLink } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const getProfileDetails = (metadata: any) => {
  if (!metadata || metadata.role !== 'artist') {
    return [];
  }
  return [
    { icon: <User className="h-4 w-4" />, label: "Artist (18+ years)" },
    { icon: <Palette className="h-4 w-4" />, label: metadata.profession || "Specialty not specified" },
    { icon: <Award className="h-4 w-4" />, label: `${metadata.achievements || 0} achievements` }
  ];
}

const placeholderAchievements = [
    {
        type: 'award',
        title: 'Level 1 Completion',
        description: 'Successfully completed the first level of the competition.',
        date: 'July 15, 2024',
        icon: <Trophy className="h-5 w-5 text-yellow-500" />,
        action: {
            label: 'Download Certificate',
            icon: <FileDown className="mr-2 h-4 w-4" />
        }
    },
    {
        type: 'award',
        title: 'Community Choice Mention',
        description: 'Recognized for outstanding audience engagement.',
        date: 'July 20, 2024',
        icon: <Award className="h-5 w-5 text-blue-500" />,
    }
];


export default async function ArtistDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?from=/dashboard/artist');
  }

  const userRole = user.user_metadata?.role;

  // Redirect if the user is not an artist
  if (userRole !== 'artist') {
    return redirect(getDashboardLink(userRole));
  }
  
  const { data: submissions } = await supabase
    .from('artworks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const displayName = user.user_metadata?.full_name || 'Artist';
  const avatarUrl = user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`;
  const profileDetails = getProfileDetails(user.user_metadata);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {displayName.split(' ')[0]}!</h1>
        <p className="text-muted-foreground font-body text-lg mt-2">Ready for the Level 4 challenge? Here's your dashboard.</p>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">My Dashboard</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <ProfileCard 
                        name={displayName}
                        avatarUrl={avatarUrl}
                        description="Artist Profile"
                        details={profileDetails}
                    />
                    <UpcomingEventsAlert />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <ArtSubmissions level={4} submissions={submissions || []} />
                    <AchievementsSection achievements={placeholderAchievements} />
                </div>
            </div>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
            <MotivationalMessage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
