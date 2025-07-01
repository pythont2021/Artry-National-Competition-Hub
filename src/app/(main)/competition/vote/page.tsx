
import { VoteClientPage } from "@/components/vote-client-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function VotePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/competition/vote');
  }

  const { data: artworks, error } = await supabase
    .from('artworks')
    .select('*');

  if (error) {
    console.error('Error fetching artworks for voting:', error);
    // Optionally render an error state
    return <div>Could not load artworks. Please try again later.</div>;
  }

  return <VoteClientPage artworks={artworks || []} />;
}
