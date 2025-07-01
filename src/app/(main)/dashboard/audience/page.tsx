
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, User, Ticket, GalleryHorizontal, Hand } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function AudienceDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/dashboard/audience');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>();
  
  // If user has no specific role, they are audience. If profile doesnt exist, they are also treated as audience.
  const isAudience = !profile || profile.role === 'audience' || profile.role === 'participant';

  if (!isAudience) {
     redirect('/login');
  }

  const profileData = {
    name: profile?.full_name || "Art Enthusiast",
    avatarUrl: profile?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
    description: "Art Enthusiast",
    details: [
        { icon: <User className="h-4 w-4" />, label: "Audience Profile" },
    ]
  }
  
  const fees = [
      { category: "Junior (9-12 years)", fee: "₹299" },
      { category: "Intermediate (13-17 years)", fee: "₹599" },
      { category: "Senior (18-22 years)", fee: "₹899" },
      { category: "Artist (Level 4+)", fee: "₹1199" },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {profileData.name}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Your Audience Dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 flex flex-col gap-8">
                <ProfileCard 
                    name={profileData.name}
                    avatarUrl={profileData.avatarUrl}
                    description={profileData.description}
                    details={profileData.details}
                />
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Hand className="text-primary"/> Want to Participate?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Are you an artist? Register as a participant to submit your own artwork.
                        </CardDescription>
                         <Button asChild className="w-full mt-4">
                            <Link href="/register/participant">Register as an Artist</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2 flex flex-col gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Monitor the Competition</CardTitle>
                        <CardDescription>As an audience member, you can view the public-facing pages of the competition.</CardDescription>
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
