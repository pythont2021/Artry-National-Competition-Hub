import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";

export function UpcomingEventsAlert() {
  return (
    <Alert className="bg-primary/10 border-primary/20">
      <Rocket className="h-4 w-4 text-primary" />
      <AlertTitle className="font-headline text-lg text-primary">Next Level Unlocked!</AlertTitle>
      <AlertDescription className="mt-2 text-foreground/80">
        Congratulations! You are now eligible to participate in the **Level 2: Digital Art Challenge**. Submissions are now open.
      </AlertDescription>
      <Button asChild size="sm" className="mt-4">
          <Link href="/competition/events/upcoming">View Challenge</Link>
      </Button>
    </Alert>
  );
}
