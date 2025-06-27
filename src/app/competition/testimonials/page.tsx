import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    artwork: "Cosmic Ocean",
    quote: "Being part of Artry was a transformative experience. It gave me the confidence to pursue my passion for art seriously. The feedback and exposure were invaluable.",
    avatar: "/avatars/01.png",
    fallback: "PS",
  },
  {
    name: "Rohan M.",
    artwork: "City in Bloom",
    quote: "I never imagined my work would be seen by so many people. The platform is amazing, and the community is so supportive. It's more than just a competition; it's a family of artists.",
    avatar: "/avatars/02.png",
    fallback: "RM",
  },
  {
    name: "Aisha K.",
    artwork: "Silent Watcher",
    quote: "The entire process was seamless, from submission to the final showcase. It's incredibly well-organized and truly focuses on celebrating the artists. Highly recommend it to any young artist.",
    avatar: "/avatars/03.png",
    fallback: "AK",
  },
    {
    name: "Vikram R.",
    artwork: "Forgotten Melody",
    quote: "Winning an award was a dream come true, but the real prize was connecting with other artists who share my vision. The workshops were a fantastic bonus!",
    avatar: "/avatars/04.png",
    fallback: "VR",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Voices of Artry
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Hear from our past participants about their experience with the Artry National Competition.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
                <Quote className="w-8 h-8 text-primary/50" />
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-body text-lg italic text-foreground">
                "{testimonial.quote}"
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${testimonial.name}`} />
                  <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold font-headline">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground font-body">Creator of "{testimonial.artwork}"</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
