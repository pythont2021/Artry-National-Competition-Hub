
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile-card";
import { UpcomingEventsAlert } from "@/components/upcoming-events-alert";
import { ArtSubmissions } from "@/components/art-submissions";
import { AchievementsSection } from "@/components/achievements-section";
import { MotivationalMessage } from "@/components/motivational-message";
import { User, Palette, Building } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function ArtistDashboard() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/artist');
  }

  // The 'profiles' table is missing. We will construct the profile from user metadata.
  const profile: Profile = {
    id: user.id,
    created_at: user.created_at,
    full_name: user.user_metadata.full_name ?? null,
    role: user.user_metadata.role ?? null,
    category: user.user_metadata.category ?? null,
    profession: user.user_metadata.profession ?? null,
    company_name: user.user_metadata.company_name ?? null,
    contact_person: user.user_metadata.contact_person ?? null,
    referral_code: user.user_metadata.referral_code ?? null,
    mobile: user.user_metadata.mobile ?? null,
    dob: user.user_metadata.dob ?? null,
    board: user.user_metadata.board ?? null,
    school: user.user_metadata.school ?? null,
    grade: user.user_metadata.grade ?? null,
    address: user.user_metadata.address ?? null,
    alt_contact: user.user_metadata.alt_contact ?? null,
    avatar_url: user.user_metadata.avatar_url ?? null,
    services_offered: user.user_metadata.services_offered ?? null,
    age_group: user.user_metadata.age_group ?? null,
  };


  if (profile.role !== 'artist') {
    // This will handle cases where the profile is not found or role mismatch
    redirect('/login');
  }

  const { data: submissions } = await supabase
    .from('artworks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const artist = {
    name: profile.full_name || "Artist",
    avatarUrl: profile.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
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
