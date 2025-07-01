
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Event } from "@/lib/database.types";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function UpcomingEventsPage() {
   const supabase = createClient();
   const { data: upcomingEvents, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', 'upcoming')
    .order('event_date', { ascending: true });

  if (error) {
    console.error("Error fetching upcoming events:", error);
  }


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
        {upcomingEvents && upcomingEvents.map((event : Event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
              <CardDescription className="font-body pt-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3 font-body">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{format(new Date(event.event_date), "MMMM d, yyyy")}</span>
              </div>
              {event.event_time && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>{event.event_time}</span>
                </div>
              )}
              {event.location && (
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Set Reminder</Button>
            </CardFooter>
          </Card>
        ))}
         {(!upcomingEvents || upcomingEvents.length === 0) && (
            <p className="text-center md:col-span-2 text-muted-foreground">No upcoming events at the moment. Please check back soon!</p>
        )}
      </section>
    </div>
  );
}
