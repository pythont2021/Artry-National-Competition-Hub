
'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function likeArtwork(artworkId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to like an artwork." };
    }

    // Insert a vote record. The database trigger will increment the like count.
    const { error } = await supabase
        .from('votes')
        .insert({ artwork_id: artworkId, user_id: user.id });

    if (error) {
        // Handle potential unique constraint violation (user already liked)
        if (error.code === '23505') {
             return { error: "You have already liked this artwork." };
        }
        console.error("Error liking artwork:", error);
        return { error: "An error occurred while liking the artwork." };
    }

    // Revalidate the gallery path to show the updated like count
    revalidatePath('/competition/gallery');
    
    return { success: true };
}
