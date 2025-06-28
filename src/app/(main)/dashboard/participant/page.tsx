
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { GraduationCap, School, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function ParticipantDashboard() {
  const isLoggedIn = !!cookies().get('auth-token')?.value;
  if (!isLoggedIn) {
    redirect('/login?from=/dashboard/participant');
  }

  const user = {
    name: "Priya Sharma",
    avatarUrl: "https://i.pravatar.cc/150?u=Priya%20Sharma",
    description: "Participant Profile",
    details: [
        { icon: <User className="h-4 w-4" />, label: "Junior (9-12 years)" },
        { icon: <GraduationCap className="h-4 w-4" />, label: "Class 10" },
        { icon: <School className="h-4 w-4" />, label: "Delhi Public School" }
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {user.name.split(' ')[0]}!</h1>
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
                        name={user.name}
                        avatarUrl={user.avatarUrl}
                        description={user.description}
                        details={user.details}
                    />
                    <UpcomingEventsAlert />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <ArtSubmissions />
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
