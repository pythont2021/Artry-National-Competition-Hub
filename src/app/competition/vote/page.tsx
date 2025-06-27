"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ThumbsUp } from "lucide-react";

type Artwork = {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  aiHint: string;
};

const initialArtworks: Artwork[] = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://placehold.co/600x800.png", aiHint: "abstract space" },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://placehold.co/600x800.png", aiHint: "cityscape floral" },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://placehold.co/600x800.png", aiHint: "wildlife portrait" },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://placehold.co/600x800.png", aiHint: "still life" },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://placehold.co/600x800.png", aiHint: "river sunset" },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://placehold.co/600x800.png", aiHint: "surreal digital" },
  { id: 7, title: "Market Morning", artist: "Deepa G.", imageUrl: "https://placehold.co/600x800.png", aiHint: "market scene" },
  { id: 8, title: "Monsoon Mist", artist: "Arjun V.", imageUrl: "https://placehold.co/600x800.png", aiHint: "rainy landscape" },
];

export default function VotePage() {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [matchup, setMatchup] = useState<[Artwork, Artwork] | null>(null);
  const [voted, setVoted] = useState(false);
  const { toast } = useToast();

  const getNewMatchup = () => {
    let newMatchup = [...artworks].sort(() => 0.5 - Math.random()).slice(0, 2);
    // Ensure we get two different artworks, even if it's the same pair in a different order
    if (matchup) {
        let attempts = 0;
        while (
            (newMatchup[0].id === matchup[0].id && newMatchup[1].id === matchup[1].id) ||
            (newMatchup[0].id === matchup[1].id && newMatchup[1].id === matchup[0].id)
        ) {
            newMatchup = [...artworks].sort(() => 0.5 - Math.random()).slice(0, 2);
            attempts++;
            if (attempts > 10) break; // Avoid infinite loop
        }
    }
    setMatchup(newMatchup as [Artwork, Artwork]);
    setVoted(false);
  };

  useEffect(() => {
    getNewMatchup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVote = (winnerId: number) => {
    if (voted) {
      toast({
        variant: "destructive",
        title: "Already Voted",
        description: "You have already voted in this matchup.",
      });
      return;
    }
    setVoted(true);
    toast({
      title: "Vote Cast!",
      description: "Thank you for supporting our artists. Click Next to see another matchup.",
    });
  };

  if (!matchup) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <p>Loading matchup...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Art Showdown
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Which piece of art resonates with you more? Cast your vote to help decide the winner.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {matchup.map((artwork) => (
          <Card key={artwork.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  width={600}
                  height={800}
                  data-ai-hint={artwork.aiHint}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-grow">
              <CardTitle className="font-headline text-2xl">{artwork.title}</CardTitle>
              <CardDescription className="font-body text-md mt-1">by {artwork.artist}</CardDescription>
            </CardContent>
            <CardContent>
               <Button onClick={() => handleVote(artwork.id)} disabled={voted} className="w-full">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Vote for this Artwork
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-12 text-center">
        {voted && (
          <Button onClick={getNewMatchup} size="lg">
            Next Matchup <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </section>
    </div>
  );
}
