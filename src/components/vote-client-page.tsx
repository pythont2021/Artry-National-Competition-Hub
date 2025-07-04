"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { likeArtwork } from "@/app/(main)/competition/gallery/actions";
import { Artwork } from "@/lib/database.types";

export function VoteClientPage({ artworks, pageCount, currentPage }: { artworks: Artwork[]; pageCount: number; currentPage: number; }) {
  const [matchup, setMatchup] = useState<[Artwork, Artwork] | null>(null);
  const [voted, setVoted] = useState(false);
  const [selectedWinnerId, setSelectedWinnerId] = useState<number | null>(null);
  const [votedArtworkIds, setVotedArtworkIds] = useState<number[]>([]);
  const { toast } = useToast();

  const getNewMatchup = () => {
    if (artworks.length < 2) {
      setMatchup(null);
      return;
    }

    const availableArtworks = artworks.filter(artwork => !votedArtworkIds.includes(artwork.id));

    if (availableArtworks.length < 2) {
      setMatchup(null);
      toast({
        title: "No More Matchups",
        description: "You've seen all the matchups for now!",
      });
      return;
    }

    let newMatchup = [...availableArtworks].sort(() => 0.5 - Math.random()).slice(0, 2);
    setMatchup(newMatchup as [Artwork, Artwork]);
    setVoted(false);
    setSelectedWinnerId(null);
  };

  useEffect(() => {
    getNewMatchup();
  }, [artworks, votedArtworkIds]);

  const handleVote = async (winnerId: number) => {
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
    setVotedArtworkIds(prev => [...prev, matchup![0].id, matchup![1].id]);

    console.log("Voting for artworkId:", winnerId);
    const result = await likeArtwork(winnerId);
    if (result) {
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Vote Failed",
          description: result.error,
        });
      } else {
        toast({
          title: "Vote Cast!",
          description: "Thank you for supporting our artists. Click Next to see another matchup.",
        });
      }
    } else {
        toast({
          variant: "destructive",
          title: "Vote Failed",
          description: "An unexpected error occurred.",
        });
    }
  };

  if (!matchup) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <p className="font-headline text-xl">No more matchups available. Please come back later!</p>
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
            src={artwork.image_url}
            alt={artwork.title}
            width={600}
            height={800}
            data-ai-hint={artwork.ai_hint || 'art'}
            className={`h-full w-full object-cover transition-transform duration-300 ${voted ? '' : 'group-hover:scale-105'}`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <CardTitle className="font-headline text-2xl">{artwork.title}</CardTitle>
        <CardDescription className="font-body text-md mt-1">by {artwork.artist_name}</CardDescription>
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
