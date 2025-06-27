import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Layers3, Lightbulb, Camera } from "lucide-react";
import Image from "next/image";

export default function AboutArtPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          About the Art Competition
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground font-body">
          A platform designed to discover, nurture, and celebrate the next generation of artistic talent across the nation.
        </p>
      </section>

      <section className="mt-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline text-3xl font-bold mb-4">Our Mission & Vision</h2>
          <div className="space-y-6 font-body text-muted-foreground">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 text-primary rounded-full mt-1">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Mission</h3>
                <p>To provide a prestigious national stage for young artists to showcase their work, gain recognition, and connect with a broader community of creators and art enthusiasts.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 text-primary rounded-full mt-1">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Vision</h3>
                <p>To foster a vibrant ecosystem where creativity flourishes, artistic dialogue is encouraged, and young talent is empowered to shape the future of art.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl">
           <Image src="https://placehold.co/600x400.png" alt="Artistic endeavor" width={600} height={400} data-ai-hint="art studio" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mt-24">
        <div className="text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">Competition Categories</h2>
            <p className="mt-2 text-muted-foreground font-body max-w-xl mx-auto">
              We welcome a diverse range of artistic expressions across several categories.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Layers3 className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline mt-2">Painting & Drawing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-muted-foreground">Includes oils, acrylics, watercolors, charcoal, pastels, and pencil work.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline mt-2">Digital Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-muted-foreground">Artwork created using digital technology, including digital painting and illustration.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <Camera className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline mt-2">Photography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-muted-foreground">Capturing moments through a lens, from portraits to landscapes and experimental shots.</p>
              </CardContent>
            </Card>
          </div>
      </section>
    </div>
  );
}
