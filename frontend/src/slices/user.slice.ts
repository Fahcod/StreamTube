import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
    _id: "",
    fullname: "",
    username: "",
    email: "",
    profile_pic:" ''",
    followers: [],
    following: [],
    search_history: [],
    saved_videos: [],
    watch_history: [],
    settings: {},
    created_at: "",
    updated_at: "",
    profile_bio:""
    },
    reducers:{
    setUserData:(state:any,action)=>{
        state._id = action.payload._id;
        state.fullname = action.payload.fullname;
        state.username = action.payload.username
        state.email = action.payload.email
        state.followers = action.payload.following
        state.following = action.payload.following
        state.search_history = action.payload.search_history;
        state.profile_pic = action.payload.profile_pic;
        state.watch_history = action.payload.watch_history;
        state.saved_videos = action.payload.saved_videos;
        state.profile_bio = action.payload.profile_bio
    }
    }
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer