import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const artworks = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://placehold.co/600x800.png", aiHint: "abstract space" },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://placehold.co/600x800.png", aiHint: "cityscape floral" },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://placehold.co/600x800.png", aiHint: "wildlife portrait" },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://placehold.co/600x800.png", aiHint: "still life" },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://placehold.co/600x800.png", aiHint: "river sunset" },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://placehold.co/600x800.png", aiHint: "surreal digital" },
  { id: 7, title: "Market Morning", artist: "Deepa G.", imageUrl: "https://placehold.co/600x800.png", aiHint: "market scene" },
  { id: 8, title: "Monsoon Mist", artist: "Arjun V.", imageUrl: "https://placehold.co/600x800.png", aiHint: "rainy landscape" },
];

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Art Gallery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Explore the stunning collection of artworks from talented artists across the nation.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="group overflow-hidden flex flex-col">
            <CardHeader className="p-0">
                <div className="aspect-[3/4] overflow-hidden">
                    <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    width={600}
                    height={800}
                    data-ai-hint={artwork.aiHint}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <CardTitle className="font-headline text-xl">{artwork.title}</CardTitle>
              <CardDescription className="font-body text-md mt-1">by {artwork.artist}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
      
      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/competition/vote">Ready to Vote?</Link>
        </Button>
      </div>

    </div>
  );
}
