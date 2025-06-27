import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Palette, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Express Your Vision",
    description: "Submit up to five pieces of your best work and share your unique artistic perspective with the world.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Engage the Audience",
    description: "Let your art be seen and appreciated. Our interactive voting system lets the community champion their favorites.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Win Recognition",
    description: "Compete for exciting awards, certificates, and the honor of being featured in the winners' gallery.",
  },
]

export default function CompetitionHome() {
  return (
    <>
      <section className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
            Artry National Competition Hub
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-body">
            Where creativity finds its stage. A celebration of young artists shaping the future of art.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">Register Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/competition/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="mt-2 text-muted-foreground font-body max-w-xl mx-auto">
              Participating is simple. Follow these steps to join the competition and showcase your talent.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-body">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">Featured Artwork</h2>
            <p className="mt-2 text-muted-foreground font-body max-w-xl mx-auto">
              Get inspired by some of the stunning submissions from our talented participants.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group overflow-hidden rounded-lg">
              <Image src="https://placehold.co/400x500.png" alt="Artwork 1" width={400} height={500} data-ai-hint="abstract painting" className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
            </div>
            <div className="group overflow-hidden rounded-lg">
              <Image src="https://placehold.co/400x500.png" alt="Artwork 2" width={400} height={500} data-ai-hint="portrait oil" className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
            </div>
            <div className="group overflow-hidden rounded-lg">
              <Image src="https://placehold.co/400x500.png" alt="Artwork 3" width={400} height={500} data-ai-hint="landscape watercolor" className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
            </div>
            <div className="group overflow-hidden rounded-lg">
              <Image src="https://placehold.co/400x500.png" alt="Artwork 4" width={400} height={500} data-ai-hint="modern sculpture" className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
            </div>
          </div>
           <div className="mt-12 text-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/competition/vote">Vote For Your Favorite</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
