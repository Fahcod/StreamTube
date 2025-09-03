import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../APIs/api";
import { useDispatch } from "react-redux";
import { setPosts } from "../slices/posts.slice";
import { fetchUser, setUserData } from "../slices/user.slice";
import { setUsers } from "../slices/usersSlice";
import type { AppDispatch } from "../store/store";

export const AppContext = createContext({});

const AppContextProvider = (props:any)=>{

   //hook calls
    const dispatch = useDispatch<AppDispatch>();
   //the search term
   const [textSearchTerm,setTextSearchTerm] = useState("")

    //fetch the user data
    const fetchUserData = async () => {
        let response = await axiosInstance.get('/api/v1/user/get-user');
        if (response.status===200) {
            dispatch(setUserData(response.data.data))
        }else{
            console.error(response.data.detail)
        }
    }
     //fetch the users' data
    const fetchAllUsers = async () => {
        let response = await axiosInstance.get('/api/v1/user/get-all-users');
        if (response.status===200) {
            dispatch(setUsers(response.data.data))
            console.log(response.data.data)
        }else{
            console.error(response.data.detail)
        }
    }
    // fetch all the posts
    const fetchAllPosts = async () => {
        let response = await axiosInstance.get('/api/v1/posts/get');
        if (response.status===200) {
            dispatch(setPosts(response.data.data));
            console.log(response.data.data)
        }
    }
    // follow a user
    const followUser = async (userId:string) => {
        let response = await axiosInstance.put(`/api/v1/user/follow/${userId}`)
        if (response.status===200) {
           fetchUserData()
        }else{
            alert(response.data.detail)
            console.error(response.data.detail)
        }
    }
    // like a post
    const likePost = async (postId:string) => {
        let response = await axiosInstance.put(`/api/v1/posts/like/${postId}`)
        if (response.status===200) {
           fetchAllPosts()
        }else{
            console.error(response.data.detail)
        }
    }
    // dislike a post
    const dislikePost = async (postId:string) => {
        let response = await axiosInstance.put(`/api/v1/posts/dislike/${postId}`)
        if (response.status===200) {
           fetchAllPosts()
        }else{
            console.error(response.data.detail)
        }
    }
    // comment on a post
    const addComment = async (postId:string,comment:string) =>{
    let response = await axiosInstance.post(`/api/v1/comments/comment/${postId}`,{
        comment:comment
    });
    if(response.status === 201){
        fetchAllPosts()
    }else{
        console.error(response.data.detail)
    }
    }
     // update the watch history
    const updateHistory = async (postId:string) => {
        let response = await axiosInstance.put(`/api/v1/user/add-watched/${postId}`)
        if (response.status===200) {
           fetchUserData()
        }else{
            console.error(response.data.detail)
        }
    }
    // update the video views
    const updatePostViews = async (postId:string) => {
        let response = await axiosInstance.put(`/api/v1/posts/view/${postId}`)
        if (response.status===200) {
           fetchAllPosts()
        }else{
            alert(response.data.detail)
            console.error(response.data.detail)
        }
    }
    // save a video
    const saveVideo = async (postId:string) => {
        let response = await axiosInstance.put(`/api/v1/posts/save/${postId}`)
        if (response.status===200) {
           fetchUserData()
        }else{
            alert(response.data.detail)
            console.error(response.data.detail)
        }
    }

    // call all the APIs
    useEffect(()=>{
   fetchAllPosts();
   dispatch(fetchUser())
   fetchAllUsers()
    },[])

    const context_value = {
    followUser,
    likePost,
    dislikePost,
    addComment,
    updateHistory,
    fetchUserData,
    saveVideo,
    updatePostViews,
    fetchAllPosts,
    textSearchTerm,
    setTextSearchTerm
    }

    return (
        <AppContext.Provider value={context_value}>
        {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;