import { Paintbrush } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Logo />
            <p className="mt-2 text-muted-foreground max-w-sm">
              Celebrating the vibrant tapestry of art from emerging talents across the nation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 text-center md:text-left">
            <div>
              <h3 className="font-headline text-lg font-semibold">Explore</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/competition/about-art" className="text-muted-foreground hover:text-primary transition-colors">About the Art</Link></li>
                <li><Link href="/competition/events/current" className="text-muted-foreground hover:text-primary transition-colors">Events</Link></li>
                <li><Link href="/competition/vote" className="text-muted-foreground hover:text-primary transition-colors">Vote</Link></li>
                <li><Link href="/competition/winners" className="text-muted-foreground hover:text-primary transition-colors">Winners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/competition/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Volunteer</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Artry National Competition Hub. A Sajre Foundation Initiative.</p>
        </div>
      </div>
    </footer>
  );
}
