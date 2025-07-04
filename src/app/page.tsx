import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Paintbrush } from 'lucide-react';


export default function FoundationHome() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-700/40"></div>
          <Card className="w-full max-w-2xl text-center shadow-2xl bg-card/80 backdrop-blur-sm z-10">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <Paintbrush className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-4xl md:text-5xl tracking-tight">
                Sajre Foundation
              </CardTitle>
              <CardDescription className="text-lg md:text-xl pt-2 font-body">
                Fostering creativity and empowering the next generation of artists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-body text-muted-foreground">
                We believe in the power of art to inspire change and connect communities. Our National Art Competition is a celebration of talent, passion, and imagination from every corner of the nation.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild size="lg" className="font-bold text-lg">
                <Link href="/competition">View Competition</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground font-body">
        © {new Date().getFullYear()} Sajre Foundation. All Rights Reserved.
      </footer>
    </div>
  );
}
