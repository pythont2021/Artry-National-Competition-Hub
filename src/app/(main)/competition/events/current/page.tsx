import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const currentEvents = [
  {
    title: "Digital Art Masterclass",
    date: "July 20, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Online Webinar",
    description: "Join acclaimed digital artist Samir P. for an exclusive masterclass on advanced digital painting techniques and finding your unique style.",
  },
  {
    title: "Final Submission Deadline",
    date: "July 31, 2024",
    time: "11:59 PM IST",
    location: "Online Portal",
    description: "The submission portal closes soon! Ensure your masterpieces are uploaded and your profiles are complete before the deadline.",
  },
];

export default function CurrentEventsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Current Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          What's happening right now at Artry. Don't miss out!
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentEvents.map((event, index) => (
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
              <Button>Learn More</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
