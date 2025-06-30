import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ThumbsUp, Shield } from "lucide-react";

const artworks = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg", aiHint: "abstract space", participantLikes: 120, audienceLikes: 450, juryRating: 9 },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg", aiHint: "cityscape floral", participantLikes: 95, audienceLikes: 380, juryRating: 7 },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg", aiHint: "wildlife portrait", participantLikes: 150, audienceLikes: 600, juryRating: 10 },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg", aiHint: "still life", participantLikes: 80, audienceLikes: 250, juryRating: 6 },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg", aiHint: "river sunset", participantLikes: 200, audienceLikes: 800, juryRating: 10 },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://images.pexels.com/photos/1707215/pexels-photo-1707215.jpeg", aiHint: "surreal digital", participantLikes: 180, audienceLikes: 720, juryRating: 9 },
  { id: 7, title: "Market Morning", artist: "Deepa G.", imageUrl: "https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg", aiHint: "market scene", participantLikes: 110, audienceLikes: 400, juryRating: 8 },
  { id: 8, title: "Monsoon Mist", artist: "Arjun V.", imageUrl: "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg", aiHint: "rainy landscape", participantLikes: 130, audienceLikes: 550, juryRating: 9 },
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
                    <span className="font-semibold text-foreground">{artwork.juryRating}/10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
