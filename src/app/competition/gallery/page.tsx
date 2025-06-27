import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ThumbsUp, Shield } from "lucide-react";

const artworks = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://placehold.co/600x800.png", aiHint: "abstract space", participantLikes: 120, audienceLikes: 450, juryLikes: 85 },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://placehold.co/600x800.png", aiHint: "cityscape floral", participantLikes: 95, audienceLikes: 380, juryLikes: 70 },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://placehold.co/600x800.png", aiHint: "wildlife portrait", participantLikes: 150, audienceLikes: 600, juryLikes: 95 },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://placehold.co/600x800.png", aiHint: "still life", participantLikes: 80, audienceLikes: 250, juryLikes: 60 },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://placehold.co/600x800.png", aiHint: "river sunset", participantLikes: 200, audienceLikes: 800, juryLikes: 98 },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://placehold.co/600x800.png", aiHint: "surreal digital", participantLikes: 180, audienceLikes: 720, juryLikes: 92 },
  { id: 7, title: "Market Morning", artist: "Deepa G.", imageUrl: "https://placehold.co/600x800.png", aiHint: "market scene", participantLikes: 110, audienceLikes: 400, juryLikes: 75 },
  { id: 8, title: "Monsoon Mist", artist: "Arjun V.", imageUrl: "https://placehold.co/600x800.png", aiHint: "rainy landscape", participantLikes: 130, audienceLikes: 550, juryLikes: 88 },
];

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Art Gallery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Explore the stunning collection of artworks and see their current standings.
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
            <CardContent className="pt-4 flex-grow flex flex-col justify-between">
              <div>
                <CardTitle className="font-headline text-xl">{artwork.title}</CardTitle>
                <CardDescription className="font-body text-md mt-1">by {artwork.artist}</CardDescription>
              </div>
              <div className="mt-4 border-t pt-3 space-y-2 text-sm font-body text-muted-foreground">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Participants</span>
                    <span className="font-semibold text-foreground">{artwork.participantLikes}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><ThumbsUp className="h-4 w-4" /> Audience</span>
                    <span className="font-semibold text-foreground">{artwork.audienceLikes}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Jury</span>
                    <span className="font-semibold text-foreground">{artwork.juryLikes}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
