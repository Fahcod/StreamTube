// this file contains functions needed for the video posts
import type { VideoPost } from "../interfaces/interfaces";

// the function to select a reel
export function getReelById(all_posts:VideoPost[],reel_id:string | undefined):VideoPost | undefined{
// find the item and return it
let reelVideo = all_posts.find(e=>e._id === reel_id);
return reelVideo
}

