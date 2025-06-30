
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Star } from "lucide-react";

// Same data as vote-client-page
type Artwork = {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  aiHint: string;
};
const initialArtworks: Artwork[] = [
  { id: 1, title: "Cosmic Ocean", artist: "Priya S.", imageUrl: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg", aiHint: "abstract space" },
  { id: 2, title: "City in Bloom", artist: "Rohan M.", imageUrl: "https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg", aiHint: "cityscape floral" },
  { id: 3, title: "Silent Watcher", artist: "Aisha K.", imageUrl: "https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg", aiHint: "wildlife portrait" },
  { id: 4, title: "Forgotten Melody", artist: "Vikram R.", imageUrl: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg", aiHint: "still life" },
  { id: 5, title: "Sunset over Ganges", artist: "Ananya D.", imageUrl: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg", aiHint: "river sunset" },
  { id: 6, title: "Digital Dreams", artist: "Samir P.", imageUrl: "https://images.pexels.com/photos/1707215/pexels-photo-1707215.jpeg", aiHint: "surreal digital" },
];

const RatingStars = ({ onRate, artworkId }: { onRate: (artworkId: number, rating: number) => void, artworkId: number }) => {
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

export function JuryRatingPage() {
    const [artworks, setArtworks] = useState(initialArtworks);
    const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
    const { toast } = useToast();

    const getNewArtwork = () => {
        let randomIndex = Math.floor(Math.random() * artworks.length);
        let newArtwork = artworks[randomIndex];

        if (currentArtwork) {
            let attempts = 0;
            while(newArtwork.id === currentArtwork.id) {
                randomIndex = Math.floor(Math.random() * artworks.length);
                newArtwork = artworks[randomIndex];
                if(attempts > 10) break;
                attempts++;
            }
        }
        setCurrentArtwork(newArtwork);
    };

    useEffect(() => {
        getNewArtwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRate = (artworkId: number, rating: number) => {
        console.log(`Rated artwork ${artworkId} with ${rating} stars`);
        toast({
            title: "Rating Submitted",
            description: `You gave "${currentArtwork?.title}" a rating of ${rating}/10.`,
        });
        
        // Automatically move to the next artwork after a short delay
        setTimeout(() => {
            getNewArtwork();
        }, 1500);
    };

    if (!currentArtwork) {
        return <p>Loading artwork...</p>
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
                        src={currentArtwork.imageUrl}
                        alt={currentArtwork.title}
                        width={600}
                        height={800}
                        data-ai-hint={currentArtwork.aiHint}
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
