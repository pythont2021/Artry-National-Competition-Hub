"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, User, Users, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Artwork = {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  participantLikes: number;
  audienceLikes: number;
  aiHint: string;
};

const allArtworks: Artwork[] = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://placehold.co/600x800.png", participantLikes: 120, audienceLikes: 850, aiHint: "abstract space" },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://placehold.co/600x800.png", participantLikes: 95, audienceLikes: 720, aiHint: "cityscape floral" },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://placehold.co/600x800.png", participantLikes: 150, audienceLikes: 930, aiHint: "wildlife portrait" },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://placehold.co/600x800.png", participantLikes: 80, audienceLikes: 610, aiHint: "still life" },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://placehold.co/600x800.png", participantLikes: 210, audienceLikes: 1200, aiHint: "river sunset" },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://placehold.co/600x800.png", participantLikes: 115, audienceLikes: 880, aiHint: "surreal digital" },
];

const ArtworkCard = ({ artwork, onLike, isLiked, isVoted }: { artwork: Artwork; onLike: () => void; isLiked: boolean; isVoted: boolean }) => (
  <Card className={cn("w-full max-w-sm transition-all duration-300", isVoted && !isLiked && "opacity-50 blur-sm scale-95", isVoted && isLiked && "ring-2 ring-primary shadow-2xl")}>
    <CardHeader>
      <div className="aspect-[3/4] overflow-hidden rounded-md border">
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
    <CardContent className="text-center">
      <CardTitle className="font-headline text-2xl">{artwork.title}</CardTitle>
      <CardDescription className="font-body text-md mt-1">by {artwork.artist}</CardDescription>
    </CardContent>
    <CardFooter className="flex-col gap-4">
      <Button onClick={onLike} disabled={isVoted} size="lg" className="w-full">
        <Heart className={cn("mr-2 h-5 w-5", isLiked && "fill-destructive text-destructive")} />
        {isLiked ? "Voted!" : "Vote for this"}
      </Button>
      <div className="flex justify-around w-full text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          <span>{artwork.participantLikes.toLocaleString()} Participants</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span>{artwork.audienceLikes.toLocaleString()} Audience</span>
        </div>
      </div>
    </CardFooter>
  </Card>
);

export default function VotePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [votedFor, setVotedFor] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchNextPair = () => {
    setVotedFor(null);
    const shuffled = [...allArtworks].sort(() => 0.5 - Math.random());
    setArtworks(shuffled.slice(0, 2));
  };

  useEffect(() => {
    fetchNextPair();
  }, []);

  const handleVote = (id: number) => {
    setVotedFor(id);
    // In a real app, you would send this vote to the backend.
    // For now, we'll just show a toast.
    toast({
      title: "Vote Cast!",
      description: "Thank you for supporting our artists.",
    });
  };
  
  const handleSkip = () => {
    toast({
      description: "Loading next pair of artworks.",
    });
    fetchNextPair();
  };

  if (artworks.length < 2) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <p>Loading artworks...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">Cast Your Vote</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Help us celebrate creativity! Choose the artwork that speaks to you the most.
        </p>
      </div>
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative">
        <ArtworkCard artwork={artworks[0]} onLike={() => handleVote(artworks[0].id)} isLiked={votedFor === artworks[0].id} isVoted={votedFor !== null} />
        
        <div className="font-headline text-4xl font-bold text-muted-foreground/50 bg-background rounded-full border h-20 w-20 flex items-center justify-center my-4 md:my-0">
          VS
        </div>
        
        <ArtworkCard artwork={artworks[1]} onLike={() => handleVote(artworks[1].id)} isLiked={votedFor === artworks[1].id} isVoted={votedFor !== null} />
      </div>
      <div className="mt-12 flex justify-center">
        <Button onClick={handleSkip} variant="secondary" size="lg">
          <SkipForward className="mr-2 h-5 w-5" />
          {votedFor ? "Next Pair" : "Skip"}
        </Button>
      </div>
    </div>
  );
}
