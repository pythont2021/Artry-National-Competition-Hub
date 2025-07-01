
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { Artwork } from "@/lib/database.types";

export const dynamic = 'force-dynamic';

const getPrize = (index: number, likes: number): string => {
  if (index === 0) return "Grand Prize Winner";
  if (index === 1) return "Category Winner: Painting";
  if (index === 2) return "Category Winner: Digital Art";
  if (likes > 500) return "Audience Choice Award";
  return "Honorable Mention";
}

export default async function WinnersPage() {
  const supabase = createClient();
  const { data: winningArtworks, error } = await supabase
    .from('artworks')
    .select('*')
    .order('audience_likes', { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching winners:", error);
  }

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
        {winningArtworks && winningArtworks.map((artwork: Artwork, index) => {
          const prize = getPrize(index, artwork.audience_likes || 0);
          return (
            <Card key={artwork.id} className="group overflow-hidden flex flex-col border-2 border-transparent hover:border-primary transition-all">
              <CardHeader className="p-0 relative">
                  <div className="aspect-[3/4] overflow-hidden">
                      <Image
                      src={artwork.image_url}
                      alt={artwork.title}
                      width={600}
                      height={800}
                      data-ai-hint={artwork.ai_hint || 'art'}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                  </div>
                  <Badge className="absolute top-2 right-2 text-sm" variant={prize.includes("Grand") ? "default" : "secondary"}>
                      <Award className="h-4 w-4 mr-2"/>
                      {prize}
                  </Badge>
              </CardHeader>
              <CardContent className="pt-4 flex-grow flex flex-col justify-between">
                <div>
                  <CardTitle className="font-headline text-xl">{artwork.title}</CardTitle>
                  <CardDescription className="font-body text-md mt-1">by {artwork.artist_name}</CardDescription>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {(!winningArtworks || winningArtworks.length === 0) && (
          <p className="text-center sm:col-span-2 lg:col-span-4 text-muted-foreground">Winners have not been announced yet. Stay tuned!</p>
        )}
      </section>
    </div>
  );
}
