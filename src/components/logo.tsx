import Link from "next/link";
import { Paintbrush } from "lucide-react";

export function Logo() {
  return (
    <Link href="/competition" className="flex items-center gap-2" prefetch={false}>
      <Paintbrush className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline tracking-tight">Artry</span>
    </Link>
  );
}
