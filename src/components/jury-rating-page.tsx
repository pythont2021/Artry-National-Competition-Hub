"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Star } from "lucide-react";
import { Artwork } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/client";

const RatingStars = ({ onRate, artworkId }: { onRate: (artworkId: number, rating: number) => Promise<void>, artworkId: number }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);

    const handleRate = (rating: number) => {
        setCurrentRating(rating);
        onRate(artworkId, rating);
    }
    
    return (
        <div className="flex justify-center gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[...Array(10)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <button key={ratingValue} onClick={() => handleRate(ratingValue)} onMouseEnter={() => setHoverRating(ratingValue)}>
                        <Star className={`h-6 w-6 transition-colors ${ratingValue <= (hoverRating || currentRating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    </button>
                )
            })}
        </div>
    )
}

export function JuryRatingPage({ artworks: initialArtworks }: { artworks: Artwork[] }) {
    const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
    const { toast } = useToast();
    const [ratedArtworkIds, setRatedArtworkIds] = useState<number[]>([]);
    const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
    const supabase = createClient();

    const getNewArtwork = () => {
      if (artworks.length === 0) {
        setCurrentArtwork(null);
        return;
      }

      const unratedArtworks = artworks.filter(artwork => !ratedArtworkIds.includes(artwork.id));

      if (unratedArtworks.length === 0) {
          setCurrentArtwork(null);
          toast({
              title: "All Artworks Rated",
              description: "You have rated all artworks.",
          });
          return;
      }
  
      const randomIndex = Math.floor(Math.random() * unratedArtworks.length);
      setCurrentArtwork(unratedArtworks[randomIndex]);
    };

    useEffect(() => {
        getNewArtwork();
    }, [artworks, ratedArtworkIds]);

    const handleRate = async (artworkId: number, rating: number) => {
        try {
            const { error } = await supabase
                .from('jury_ratings')
                .insert([{
                    artwork_id: artworkId,
                    rating: rating,
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                }]);

            if (error) {
                console.error("Error submitting rating:", error);
                toast({
                    variant: "destructive",
                    title: "Rating Failed",
                    description: "Failed to submit rating. Please try again.",
                });
                return;
            }

            setRatedArtworkIds(prev => [...prev, artworkId]);

            toast({
                title: "Rating Submitted",
                description: `You gave "${currentArtwork?.title}" a rating of ${rating}/10.`, // Corrected line
            });
            getNewArtwork();

        } catch (error: any) {
            console.error("Error submitting rating:", error);
            toast({
                variant: "destructive",
                title: "Rating Failed",
                description: "An unexpected error occurred. Please try again.",
            });
        }
    };

    if (!currentArtwork) {
        return (
             <Card>
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">Artwork for Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">No artworks available for review at this time.</p>
                </CardContent>
             </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Artwork for Review</CardTitle>
                <CardDescription>Please rate the following submission based on its artistic merit.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-8">
                <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={currentArtwork.image_url}
                        alt={currentArtwork.title}
                        width={600}
                        height={800}
                        data-ai-hint={currentArtwork.ai_hint || 'art'}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground font-body">Rate this piece from 1 to 10 stars.</p>
                    <div className="mt-4">
                        <RatingStars onRate={handleRate} artworkId={currentArtwork.id} />
                    </div>
                </div>
                 <Button onClick={getNewArtwork} size="lg">
                    Skip / Next Artwork <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </CardContent>
        </Card>
    )
}
