
'use server';

export async function likeArtwork(artworkId: number) {
    console.log("likeArtwork called with artworkId:", artworkId);
    return { success: true, message: "Like processed (simplified)." };
}
