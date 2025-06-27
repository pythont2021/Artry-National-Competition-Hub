import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Sparkles } from "lucide-react";

const futureEvents = [
  {
    title: "Winners Announcement Gala",
    date: "September 1, 2024",
    description: "The moment we've all been waiting for! Join us for a virtual gala where we will announce the winners of the Artry National Competition 2024.",
  },
  {
    title: "Artry Competition 2025",
    date: "Registrations Open January 2025",
    description: "Inspired by this year's talent? Get ready for the next edition! Registrations for the Artry National Competition 2025 will open early next year.",
  },
];

export default function FutureEventsPage() {
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
        {futureEvents.map((event, index) => (
          <Card key={index} className="bg-primary/5 border-primary/20">
            <CardHeader>
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-2xl mt-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 font-body text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <p className="font-body text-foreground/80 pt-2">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
