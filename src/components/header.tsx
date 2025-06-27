"use client";

import Link from "next/link";
import {
  Menu,
  Paintbrush,
  Calendar,
  Sparkles,
  Award,
  Users,
  Info,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/competition", label: "Home", icon: Sparkles },
  {
    label: "Events",
    icon: Calendar,
    subLinks: [
      {
        href: "/competition/events/current",
        label: "Current Events",
        icon: Calendar,
      },
      {
        href: "/competition/events/upcoming",
        label: "Upcoming Events",
        icon: Calendar,
      },
      {
        href: "/competition/events/future",
        label: "Future Events",
        icon: Calendar,
      },
    ],
  },
  { href: "/competition/testimonials", label: "Testimonials", icon: Award },
  { href: "/competition/about-art", label: "About Art", icon: Info },
  { href: "/competition/vote", label: "Vote", icon: Users },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <Logo />
              </div>
              <nav className="grid gap-y-2">
                {navLinks.map((link) =>
                  link.subLinks ? (
                    link.subLinks.map((subLink) => (
                      <SheetClose asChild key={subLink.href}>
                        <Link
                          href={subLink.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                            pathname === subLink.href && "bg-accent text-accent-foreground"
                          )}
                        >
                          <subLink.icon className="h-5 w-5" />
                          <span>{subLink.label}</span>
                        </Link>
                      </SheetClose>
                    ))
                  ) : (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href!}
                        className={cn(
                          "flex items-center gap-3 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                           pathname === link.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    </SheetClose>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex w-full items-center justify-between md:justify-start">
           <div className="md:hidden">
            <Logo />
          </div>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            {navLinks.map((link) =>
              link.subLinks ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.subLinks.map((subLink) => (
                      <DropdownMenuItem key={subLink.href} asChild>
                        <Link href={subLink.href} className="flex items-center gap-2">
                          <subLink.icon className="h-4 w-4 text-muted-foreground" />
                          {subLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn("text-muted-foreground transition-colors hover:text-foreground", pathname === link.href && "text-foreground font-semibold")}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
