
import { VoteClientPage } from "@/components/vote-client-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function VotePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?from=/competition/vote');
  }

  return <VoteClientPage />;
}
