
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Event } from "@/lib/database.types";
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function FutureEventsPage() {
  const supabase = createClient();
  const { data: futureEvents, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', 'future')
    .order('event_date', { ascending: true });

  if (error) {
    console.error("Error fetching future events:", error);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Future Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          A glimpse into what lies ahead. The journey of art never ends.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {futureEvents && futureEvents.map((event: Event) => (
          <Card key={event.id} className="bg-primary/5 border-primary/20">
            <CardHeader>
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-2xl mt-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 font-body text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{event.location === 'Registrations Open' ? event.location : format(new Date(event.event_date), "MMMM d, yyyy")}</span>
              </div>
              <p className="font-body text-foreground/80 pt-2">{event.description}</p>
            </CardContent>
          </Card>
        ))}
        {(!futureEvents || futureEvents.length === 0) && (
            <p className="text-center md:col-span-2 text-muted-foreground">No future events scheduled yet. Please check back soon!</p>
        )}
      </section>
    </div>
  );
}
