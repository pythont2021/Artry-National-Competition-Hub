
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { likeArtwork } from "./actions";
import { Artwork } from "@/lib/database.types";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArtworks = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('audience_likes', { ascending: false });

      if (error) {
        console.error('Error fetching artworks:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch artworks.',
        });
      } else {
        setArtworks(data || []);
      }
    };

    fetchArtworks();
    
    const handleFocus = () => {
        fetchArtworks();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
        window.removeEventListener('focus', handleFocus);
    };

  }, [toast]);

  const handleLike = async (id: number, title: string) => {
    const result = await likeArtwork(id);
    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Could not like artwork",
        description: result.error,
      });
    } else {
      toast({
        title: "Liked!",
        description: `Your appreciation for "${title}" has been noted.`,
      });
      // Optimistically update the UI
      setArtworks(prevArtworks => 
        prevArtworks.map(art => 
          art.id === id ? { ...art, audience_likes: (art.audience_likes || 0) + 1 } : art
        )
      );
    }
  };

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
                    src={artwork.image_url}
                    alt={artwork.title}
                    width={600}
                    height={800}
                    data-ai-hint={artwork.ai_hint || "art"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </CardHeader>
            <CardContent className="pt-4 flex-grow flex flex-col justify-between">
              <div>
                <CardTitle className="font-headline text-xl">{artwork.title}</CardTitle>
                <CardDescription className="font-body text-md mt-1">by {artwork.artist_name}</CardDescription>
              </div>
              <div className="mt-4 border-t pt-3 space-y-2 text-sm font-body text-muted-foreground">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><ThumbsUp className="h-4 w-4" /> Audience Likes</span>
                    <span className="font-semibold text-foreground">{artwork.audience_likes}</span>
                </div>
              </div>
              <div className="mt-4">
                  <form action={() => handleLike(artwork.id, artwork.title)}>
                      <Button variant="outline" className="w-full" type="submit">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Like
                      </Button>
                  </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
