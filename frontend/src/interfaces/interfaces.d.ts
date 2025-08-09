// this is the file that contains the interfaces used in the app

// the comment type
type Comment = {
    author:string,
    comment:string,
    likes:string[],
    replies:any[]
}

// the post owner type
type Owner = {
    _id:string,
    profile_pic:string,
    username:string,
    followers:string[]
}

// the video post interface
export interface VideoPost {
    _id: string,
    owner:Owner,
    title:string,
    video_url: string,
    post_type: string,
    category:string,
    likes: string[],
    reposts: number[],
    views: string[],
    dislikes:string[],
    comments:Comment[],
    description:string,
    created_at: any,
    updated_at: any
}

export interface User {
    _id: string,
    fullname: string,
    username: string,
    email: string,
    profile_pic: string,
    followers: any[],
    following: any[],
    search_history: any[],
    saved_videos: string[],
    watch_history: string[],
    settings: any,
    profile_bio:string,
    created_at: string,
    updated_at: string
}