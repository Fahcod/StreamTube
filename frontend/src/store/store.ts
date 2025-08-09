import {configureStore} from "@reduxjs/toolkit";
import postsSliceReducer from "../slices/posts.slice";
import userSliceReducer from "../slices/user.slice";
import usersSliceReducer from "../slices/usersSlice";
import modalSliceReducer from "../slices/modals.slice"

export const store = configureStore({

    reducer:{
        posts:postsSliceReducer,
        user:userSliceReducer,
        users:usersSliceReducer,
        modals:modalSliceReducer
    }
})