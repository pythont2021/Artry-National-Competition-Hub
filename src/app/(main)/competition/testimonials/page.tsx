
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Testimonial } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const supabase = createClient();
  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
  }

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
        {testimonials && testimonials.map((testimonial: Testimonial) => (
          <Card key={testimonial.id} className="flex flex-col">
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
                  <AvatarImage src={testimonial.avatar_url || ''} />
                  <AvatarFallback>{testimonial.fallback_initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold font-headline">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground font-body">Creator of "{testimonial.artwork_title}"</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
        {(!testimonials || testimonials.length === 0) && (
            <p className="text-center md:col-span-2 text-muted-foreground">No testimonials yet. Be the first to share your story!</p>
        )}
      </section>
    </div>
  );
}
