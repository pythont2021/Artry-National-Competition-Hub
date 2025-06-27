import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const upcomingEvents = [
  {
    title: "Community Voting Opens",
    date: "August 5, 2024",
    time: "12:00 PM IST",
    location: "Competition Gallery",
    description: "The gallery is open! Browse all the incredible submissions and cast your vote for the Audience Choice award. Your voice matters!",
  },
  {
    title: "Expert Judging Panel",
    date: "August 10-15, 2024",
    time: "All Day",
    location: "Private",
    description: "Our distinguished panel of judges will review the shortlisted artworks to select the winners for each category. Finalists will be announced soon.",
  },
];

export default function UpcomingEventsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Upcoming Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Get ready for what's next on the Artry calendar.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {upcomingEvents.map((event, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
              <CardDescription className="font-body pt-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3 font-body">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Set Reminder</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
