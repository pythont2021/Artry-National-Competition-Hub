
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, Eye } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function VendorDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?from=/dashboard/vendor');
  }

  if (user.user_metadata.role !== 'vendor') {
    redirect('/login');
  }

  const profile = {
    name: user.user_metadata.contact_person || "Vendor",
    avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
    description: user.user_metadata.company_name || "Creative Supplies Inc.",
    details: [
        { icon: <Building className="h-4 w-4" />, label: "Vendor Profile" },
        { icon: <Mail className="h-4 w-4" />, label: user.email! },
        { icon: <Phone className="h-4 w-4" />, label: "+91 9876543210" },
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, {profile.name}!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Your Vendor Dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <ProfileCard 
                    name={profile.name}
                    avatarUrl={profile.avatarUrl}
                    description={profile.description}
                    details={profile.details}
                />
            </div>
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Monitor the Competition</CardTitle>
                        <CardDescription>As a vendor, you can view the public-facing pages of the competition.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/competition/gallery"><Eye className="mr-2" />View Art Gallery</Link>
                        </Button>
                        <Button asChild variant="secondary" className="w-full sm:w-auto">
                            <Link href="/competition/events/current"><Eye className="mr-2" />View Events</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
