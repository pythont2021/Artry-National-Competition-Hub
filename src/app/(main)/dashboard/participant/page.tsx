
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { GraduationCap, School, User, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function ParticipantDashboard() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/participant');
  }
  
  const userRole = user.user_metadata?.role;

  if (userRole !== 'participant') {
    redirect('/login');
  }

  const { data: submissions } = await supabase
    .from('artworks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const participant = {
    name: user.user_metadata.full_name || "Participant",
    avatarUrl: user.user_metadata.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Enrolled Participant",
    details: [
        { icon: <User className="h-4 w-4" />, label: user.user_metadata.category || "Participant" },
        { icon: <Users className="h-4 w-4" />, label: user.user_metadata.age_group || "Age not specified" },
        { icon: <GraduationCap className="h-4 w-4" />, label: user.user_metadata.grade || "Not specified" },
        { icon: <School className="h-4 w-4" />, label: user.user_metadata.school || "Not specified" }
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {participant.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground font-body text-lg mt-2">Here's a summary of your journey with us.</p>
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
                        name={participant.name}
                        avatarUrl={participant.avatarUrl}
                        description={participant.description}
                        details={participant.details}
                    />
                    <UpcomingEventsAlert />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <ArtSubmissions level={1} submissions={submissions || []} />
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
