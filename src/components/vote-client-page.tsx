
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

export function VoteClientPage() {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [matchup, setMatchup] = useState<[Artwork, Artwork] | null>(null);
  const [voted, setVoted] = useState(false);
  const [selectedWinnerId, setSelectedWinnerId] = useState<number | null>(null);
  const { toast } = useToast();

  const getNewMatchup = () => {
    let newMatchup = [...artworks].sort(() => 0.5 - Math.random()).slice(0, 2);
    if (matchup) {
        let attempts = 0;
        while (
            (newMatchup[0].id === matchup[0].id && newMatchup[1].id === matchup[1].id) ||
            (newMatchup[0].id === matchup[1].id && newMatchup[1].id === matchup[0].id)
        ) {
            newMatchup = [...artworks].sort(() => 0.5 - Math.random()).slice(0, 2);
            attempts++;
            if (attempts > 10) break; 
        }
    }
    setMatchup(newMatchup as [Artwork, Artwork]);
    setVoted(false);
    setSelectedWinnerId(null);
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
    setSelectedWinnerId(winnerId);
    toast({
      title: "Vote Cast!",
      description: "Thank you for supporting our artists. Click Next to see another matchup.",
    });
  };

  if (!matchup) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <p className="font-headline text-xl">Loading matchup...</p>
      </div>
    );
  }

  const ArtCard = ({ artwork, isWinner, isLoser }: { artwork: Artwork; isWinner: boolean; isLoser: boolean; }) => (
    <Card 
        className={`group w-full max-w-sm transition-all duration-500 ease-in-out
        ${isWinner ? 'shadow-primary/40 shadow-2xl scale-105' : 'hover:shadow-2xl'}
        ${isLoser ? 'opacity-50 scale-95 blur-sm' : ''}
        `}
    >
      <CardHeader className="p-0">
        <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            width={600}
            height={800}
            data-ai-hint={artwork.aiHint}
            className={`h-full w-full object-cover transition-transform duration-300 ${voted ? '' : 'group-hover:scale-105'}`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <CardTitle className="font-headline text-2xl">{artwork.title}</CardTitle>
        <CardDescription className="font-body text-md mt-1">by {artwork.artist}</CardDescription>
        <Button onClick={() => handleVote(artwork.id)} disabled={voted} className="w-full mt-6">
          <ThumbsUp className="mr-2 h-4 w-4" />
          Vote for this Artwork
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col">
        <section className="text-center">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
            Art Showdown
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
            Which piece of art resonates with you more? Cast your vote to help decide the winner.
          </p>
        </section>

        <section className="flex-grow grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center justify-center gap-8 py-12">
            <div className="flex justify-center md:justify-end">
                <ArtCard 
                    artwork={matchup[0]} 
                    isWinner={voted && selectedWinnerId === matchup[0].id}
                    isLoser={voted && selectedWinnerId !== matchup[0].id}
                />
            </div>
          
            <div className="flex justify-center font-headline text-2xl md:text-4xl text-muted-foreground my-4 md:my-0 h-16 w-16 md:h-24 md:w-24 bg-card border rounded-full items-center">
                VS
            </div>

            <div className="flex justify-center md:justify-start">
                 <ArtCard 
                    artwork={matchup[1]} 
                    isWinner={voted && selectedWinnerId === matchup[1].id}
                    isLoser={voted && selectedWinnerId !== matchup[1].id}
                />
            </div>
        </section>

        <section className="mt-auto text-center h-12">
          {voted && (
            <Button onClick={getNewMatchup} size="lg" className="animate-pulse">
              Next Matchup <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </section>
      </div>
    </div>
  );
}
