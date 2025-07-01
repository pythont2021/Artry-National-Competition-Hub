import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const winningArtworks = [
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg", aiHint: "wildlife portrait", prize: "Grand Prize Winner" },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg", aiHint: "river sunset", prize: "Category Winner: Painting" },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://images.pexels.com/photos/1707215/pexels-photo-1707215.jpeg", aiHint: "surreal digital", prize: "Category Winner: Digital Art" },
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg", aiHint: "abstract space", prize: "Audience Choice Award" },
];

export default function WinnersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
        <h1 className="mt-4 font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Competition Winners
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Celebrating the exceptional talent and creativity from this year's competition. Congratulations to all our winners!
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {winningArtworks.map((artwork) => (
          <Card key={artwork.id} className="group overflow-hidden flex flex-col border-2 border-transparent hover:border-primary transition-all">
             <CardHeader className="p-0 relative">
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
                 <Badge className="absolute top-2 right-2 text-sm" variant={artwork.prize.includes("Grand") ? "default" : "secondary"}>
                    <Award className="h-4 w-4 mr-2"/>
                    {artwork.prize}
                 </Badge>
            </CardHeader>
            <CardContent className="pt-4 flex-grow flex flex-col justify-between">
              <div>
                <CardTitle className="font-headline text-xl">{artwork.title}</CardTitle>
                <CardDescription className="font-body text-md mt-1">by {artwork.artist}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
