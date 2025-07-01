
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { enrollUser } from "@/app/(main)/login/actions";
import { useFormStatus } from "react-dom";

const fees = {
  junior: 299,
  intermediate: 599,
  senior: 899,
  artist: 1199,
};

type UserCategory = 'junior' | 'intermediate' | 'senior' | 'artist';

function EnrollButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" className="w-full" type="submit" disabled={pending}>
      {pending ? "Processing..." : "Enroll Now & Pay Fee"}
    </Button>
  );
}

export function EnrollmentCard({ userCategory }: { userCategory: UserCategory }) {
  const fee = fees[userCategory];
  const formAction = enrollUser.bind(null);

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
        <form action={formAction}>
           <input type="hidden" name="userCategory" value={userCategory === 'junior' || userCategory === 'intermediate' || userCategory === 'senior' ? 'participant' : 'artist'} />
           <EnrollButton />
        </form>
        <p className="text-xs text-muted-foreground mt-4">
            This is a secure one-time mock payment to enter the current competition level.
        </p>
      </CardContent>
    </Card>
  );
}
