
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { GraduationCap, School, User } from "lucide-react";
import { EnrollmentCard } from "@/components/enrollment-card";

export const dynamic = 'force-dynamic';

export default function ParticipantDashboard() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token')?.value;
  
  if (!authToken || !authToken.includes('participant')) {
    redirect('/login?from=/dashboard/participant');
  }

  const isEnrolled = authToken.includes(':enrolled');

  // Define mock users
  const enrolledUser = {
    name: "Aryan Patel",
    avatarUrl: "https://i.pravatar.cc/150?u=Aryan%20Patel",
    description: "Enrolled Participant",
    details: [
        { icon: <User className="h-4 w-4" />, label: "Senior (18-22 years)" },
        { icon: <GraduationCap className="h-4 w-4" />, label: "B.F.A. 2nd Year" },
        { icon: <School className="h-4 w-4" />, label: "National Institute of Design" }
    ],
    category: 'senior' as const
  }
  
  const unenrolledUser = {
      name: "Sia Sharma",
      avatarUrl: "https://i.pravatar.cc/150?u=Sia%20Sharma",
      description: "Future Artist",
      details: [
          { icon: <User className="h-4 w-4" />, label: "Junior (9-12 years)" },
          { icon: <GraduationCap className="h-4 w-4" />, label: "7th Grade" },
          { icon: <School className="h-4 w-4" />, label: "City Pride School" }
      ],
      category: 'junior' as const
  }

  const currentUser = isEnrolled ? enrolledUser : unenrolledUser;

  // Render enrollment prompt if not enrolled
  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold">Welcome, {currentUser.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground font-body text-lg mt-2">Your journey starts here. Enroll to unlock all features.</p>
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

  // Render full dashboard if enrolled
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {currentUser.name.split(' ')[0]}!</h1>
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
                        name={currentUser.name}
                        avatarUrl={currentUser.avatarUrl}
                        description={currentUser.description}
                        details={currentUser.details}
                    />
                    <UpcomingEventsAlert />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <ArtSubmissions level={1} />
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
