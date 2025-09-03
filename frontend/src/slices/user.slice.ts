import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_VERSION, axiosInstance } from "../APIs/api";

interface UserState {
    _id: string,
    fullname: string,
    username: string,
    email: string,
    profile_pic:string,
    followers: string[],
    following: string[],
    search_history:string [],
    saved_videos: string[],
    watch_history: string[],
    settings: {},
    created_at: any,
    updated_at: any,
    profile_bio:string,
    error:null | string,
    loading:boolean
}

const initialState:UserState = {
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
    profile_bio:"",
    error:null,
    loading:false
}

// the login to fetch the user
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () =>{
        let response = await axiosInstance.get(`/api/${API_VERSION}/user/get-user`);
        if(response.status === 200){
            return response.data.data
        }else{
            throw new Error("Failed to fetch user")
        }
    }
);

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
    setUserData:(state:any,action:PayloadAction<any>)=>{
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
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchUser.fulfilled,(state,action:PayloadAction<UserState>)=>{
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
        state.profile_bio = action.payload.profile_bio;
        state.loading = false
        })
        .addCase(fetchUser.rejected,(state,action:PayloadAction<any>)=>{
        state.error = action.payload
        })
    }
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer