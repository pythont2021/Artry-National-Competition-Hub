"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Artwork = {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  likes: number;
  aiHint: string;
};

const initialArtworks: Artwork[] = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://placehold.co/600x800.png", likes: 850, aiHint: "abstract space" },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://placehold.co/600x800.png", likes: 720, aiHint: "cityscape floral" },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://placehold.co/600x800.png", likes: 930, aiHint: "wildlife portrait" },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://placehold.co/600x800.png", likes: 610, aiHint: "still life" },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://placehold.co/600x800.png", likes: 1200, aiHint: "river sunset" },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://placehold.co/600x800.png", likes: 880, aiHint: "surreal digital" },
  { id: 7, title: "Market Morning", artist: "Deepa G.", imageUrl: "https://placehold.co/600x800.png", likes: 550, aiHint: "market scene" },
  { id: 8, title: "Monsoon Mist", artist: "Arjun V.", imageUrl: "https://placehold.co/600x800.png", likes: 1100, aiHint: "rainy landscape" },
];

export default function VotePage() {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [votedId, setVotedId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleVote = (id: number) => {
    if (votedId) {
        toast({
            variant: "destructive",
            title: "Already Voted",
            description: "You can only vote for one artwork.",
        });
        return;
    }
    setVotedId(id);
    setArtworks(artworks.map(art => art.id === id ? {...art, likes: art.likes + 1} : art));
    toast({
      title: "Vote Cast!",
      description: "Thank you for supporting our artists.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Community Gallery & Voting
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Explore the stunning collection of artworks from talented artists across the nation. Cast your vote for your favorite piece.
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
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 font-body text-muted-foreground">
                    <Heart className={cn("h-5 w-5", votedId === artwork.id && "fill-destructive text-destructive")} />
                    <span>{artwork.likes.toLocaleString()}</span>
                </div>
                <Button onClick={() => handleVote(artwork.id)} disabled={!!votedId}>
                    <Heart className="mr-2 h-4 w-4" />
                    {votedId === artwork.id ? "Voted" : "Vote"}
                </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
