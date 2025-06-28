import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VolunteerStatsChart } from "@/components/volunteer-stats-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Target } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function VolunteerDashboard() {
  const authToken = cookies().get('auth-token')?.value;
  if (!authToken || !authToken.includes('volunteer')) {
    redirect('/login?from=/dashboard/volunteer');
  }

  // In a real app, this data would come from a database
  const referredParticipants = 15;
  const target = 50;
  const topParticipant = "Priya S.";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Welcome, Volunteer!</h1>
          <p className="text-muted-foreground font-body text-lg mt-2">Thank you for your invaluable contribution.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <VolunteerStatsChart achieved={referredParticipants} target={target} />
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{referredParticipants}</div>
                        <p className="text-xs text-muted-foreground">participants have joined using your code</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Referral Target</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{target}</div>
                        <p className="text-xs text-muted-foreground">Your goal for this competition</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{topParticipant}</div>
                        <p className="text-xs text-muted-foreground">Most active participant from your referrals</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
