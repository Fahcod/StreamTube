import {createSlice} from "@reduxjs/toolkit";


const postsSlice = createSlice({
    name:"posts",
    initialState:{
    all_posts:[]
    },
    reducers:{
    
        setPosts:(state:any,action)=>{
            state.all_posts = action.payload
        },
        // adding a video to the top of the container
        addTopPost:(state:any,action)=>{
        state.all_posts.unshift(action.payload)
        }
    }
});

export const {setPosts,addTopPost} = postsSlice.actions;
export default postsSlice.reducer