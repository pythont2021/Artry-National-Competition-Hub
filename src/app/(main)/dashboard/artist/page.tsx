
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { User, Palette, Building } from "lucide-react";
import { EnrollmentCard } from "@/components/enrollment-card";

export const dynamic = 'force-dynamic';

export default function ArtistDashboard() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token')?.value;
  
  if (!authToken || !authToken.includes('artist')) {
    redirect('/login?from=/dashboard/artist');
  }

  const isEnrolled = authToken.includes(':enrolled');

  const unenrolledArtist = {
    name: "Ravi Verma",
    avatarUrl: "https://i.pravatar.cc/150?u=Ravi%20Verma",
    description: "Artist Profile",
    details: [
        { icon: <User className="h-4 w-4" />, label: "Artist (18+ years)" },
        { icon: <Palette className="h-4 w-4" />, label: "Specialty: Oil & Canvas" },
        { icon: <Building className="h-4 w-4" />, label: "Studio in Mumbai" }
    ],
    category: 'artist' as const
  }
  
  const enrolledArtist = {
    name: "Ravi Verma",
    avatarUrl: "https://i.pravatar.cc/150?u=Ravi%20Verma",
    description: "Enrolled Artist",
    details: [
        { icon: <User className="h-4 w-4" />, label: "Artist (18+ years)" },
        { icon: <Palette className="h-4 w-4" />, label: "Specialty: Oil & Canvas" },
        { icon: <Building className="h-4 w-4" />, label: "Studio in Mumbai" }
    ],
    category: 'artist' as const
  }

  const currentUser = isEnrolled ? enrolledArtist : unenrolledArtist;

  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold">Welcome, {currentUser.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground font-body text-lg mt-2">Your journey starts at Level 4. Enroll to begin.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
                 <ProfileCard 
                    name={currentUser.name}
                    avatarUrl={currentUser.avatarUrl}
                    description={currentUser.description}
                    details={currentUser.details}
                />
            </div>
            <div className="md:col-span-2">
                <EnrollmentCard userCategory={currentUser.category} />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {currentUser.name.split(' ')[0]}!</h1>
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
                        name={currentUser.name}
                        avatarUrl={currentUser.avatarUrl}
                        description={currentUser.description}
                        details={currentUser.details}
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
