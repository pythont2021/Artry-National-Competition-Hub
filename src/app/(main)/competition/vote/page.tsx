import { VoteClientPage } from "@/components/vote-client-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const ARTWORKS_PER_PAGE = 20;

export default async function VotePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/competition/vote');
  }

  const currentPage = parseInt(searchParams.page || '1', 10);
  const from = (currentPage - 1) * ARTWORKS_PER_PAGE;
  const to = from + ARTWORKS_PER_PAGE - 1;

  const { data: artworks, error, count } = await supabase
    .from('artworks')
    .select('*', { count: 'exact' })
    .range(from, to);

  if (error) {
    console.error('Error fetching artworks for voting:', error);
    // Optionally render an error state
    return <div>Could not load artworks. Please try again later.</div>;
  }

  const pageCount = count ? Math.ceil(count / ARTWORKS_PER_PAGE) : 1;

  return <VoteClientPage artworks={artworks || []} pageCount={pageCount} currentPage={currentPage} />;
}
