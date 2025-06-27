import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";

export function MotivationalMessage() {
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div className="p-3 bg-accent/20 rounded-full">
          <Gift className="h-6 w-6 text-accent" />
        </div>
        <div>
          <CardTitle className="font-headline text-2xl">A Note on Your Journey</CardTitle>
          <CardDescription className="font-body text-base">Your participation lit up the competition.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-body text-muted-foreground">
          Dear Artist,
        </p>
        <p className="mt-2 font-body text-foreground">
          While your artwork wasn't shortlisted this time, we were incredibly moved by your creativity and the story you told through your piece. Every brushstroke is a step forward in your artistic journey. This is just one moment, and your path is filled with countless opportunities to shine.
        </p>
        <p className="mt-4 font-body text-foreground font-semibold">
          Keep creating, keep dreaming, and never stop sharing your unique vision with the world. We are excited to see what you create next!
        </p>
        <p className="mt-4 font-body text-muted-foreground">
          Warmly, <br/>
          The Artry Team
        </p>
      </CardContent>
    </Card>
  );
}
