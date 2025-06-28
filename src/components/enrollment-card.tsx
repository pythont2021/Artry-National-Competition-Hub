
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fees = {
  junior: 299,
  intermediate: 599,
  senior: 899,
  artist: 1199,
};

type UserCategory = 'junior' | 'intermediate' | 'senior' | 'artist';

export function EnrollmentCard({ userCategory }: { userCategory: UserCategory }) {
  const { toast } = useToast();
  const fee = fees[userCategory];

  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful (Mock)",
      description: "In a real app, this would lead to a payment gateway. Please log out and log back in with an enrolled user account (e.g., participant@artry.com) to access the full dashboard.",
      duration: 10000
    });
  };

  return (
    <Card className="bg-primary/5 border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
                <Ticket className="h-8 w-8 text-primary" />
            </div>
            <div>
                 <CardTitle className="font-headline text-2xl">Enroll in the Competition</CardTitle>
                 <CardDescription>Unlock your dashboard and submit your artwork.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground font-body">Your one-time enrollment fee is:</p>
        <p className="font-headline text-5xl font-bold my-4">₹{fee}</p>
        <Button size="lg" className="w-full" onClick={handleEnroll}>
          Enroll Now & Pay Fee
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
            This is a secure one-time payment to enter the current competition level.
        </p>
      </CardContent>
    </Card>
  );
}
