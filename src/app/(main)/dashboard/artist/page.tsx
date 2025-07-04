
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { User, Palette, Building } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function ArtistDashboard() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/artist');
  }

  const userRole = user.user_metadata?.role;

  if (userRole !== 'artist') {
    redirect('/login');
  }

  const { data: submissions } = await supabase
    .from('artworks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const artist = {
    name: user.user_metadata.full_name || "Artist",
    avatarUrl: user.user_metadata.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Artist Profile",
    details: [
        { icon: <User className="h-4 w-4" />, label: "Artist (18+ years)" },
        { icon: <Palette className="h-4 w-4" />, label: "Specialty: Oil & Canvas" },
        { icon: <Building className="h-4 w-4" />, label: "Studio in Mumbai" }
    ],
    category: 'artist' as const
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {artist.name.split(' ')[0]}!</h1>
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
                        name={artist.name}
                        avatarUrl={artist.avatarUrl}
                        description={artist.description}
                        details={artist.details}
                    />
                    <UpcomingEventsAlert />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <ArtSubmissions level={4} submissions={submissions || []} />
                    <AchievementsSection />
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
