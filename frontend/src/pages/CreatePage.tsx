import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { User } from "../interfaces/interfaces";
import { BiSolidVideos } from "react-icons/bi";
import { FaTextWidth } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../APIs/api";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { scrollPage } from "../utils/other";
import BottomNav from "../components/Responsive/BottomNav";
import PhoneNav from "../components/Responsive/PhoneNav";

// the post_data type
type PostData = {
title:string,
category:string,
description:string
}

// the reel upload form
const ReelUploadForm = () =>{

  useEffect(()=>{
    scrollPage()
  },[])

  // the video url
  const [videoURL,setVideoURL] = useState<any>("");
  const [isUploading,setIsUploading] = useState(false);
  const navigate = useNavigate()
  const userData:User = useSelector((state:any)=>state.user);
  const {fetchAllPosts} = useContext<any>(AppContext);
  const [postData,setPostData] = useState<PostData>({
    title:"",
    category:"Category",
    description:"",
  });

  // the function to update the state
  const handleChange = (e:any)=>{
    setPostData({...postData,[e.target.name]:e.target.value})
  };

  // the video upload function
  const uploadVideo = async ():Promise<void> =>{
    setIsUploading(true);

  // the file data
  let fileData = new FormData();
  // upload the video first
  fileData.append("file",videoURL);

  let responseOne = await axiosInstance.post('/api/v1/files/upload',fileData);
  if(responseOne.status === 201){
    // upload the post data now
    const dataObject = {
    title:postData.title,
    category:postData.category,
    description:postData.description,
    video_url:responseOne.data.video_url,
    creator:userData._id,
    post_type:"reel"
    }

    let response = await axiosInstance.post('/api/v1/posts/create',dataObject);
    if(response.status === 201){
    setIsUploading(false);
    fetchAllPosts();
    navigate("/home")
    }else{
      setIsUploading(false)
      alert(response.data.detail)
    }
  }

  }

    return (
        <div className="w-[90%] rounded-md h-[380px] flex p-5 gap-5 mt-8 border-solid border-[1px] border-gray-200">
        {/* the video upload space */}
        <div className="w-[50%]">
        <input type="file" id="video" onChange={(e:any)=>setVideoURL(e.target.files[0])} hidden/>
        {
        videoURL?<div className="w-full h-full">
        <video src={URL.createObjectURL(videoURL)} controls className="w-full h-full object-cover rounded-md"/>
        </div>
        :
        <label htmlFor="video">
        <div className="w-full cursor-pointer flex items-center justify-center flex-col h-full bg-[#e9e6e6]">
        <div className="flex flex-col items-center gap-2">
        <BiSolidVideos className="w-11 text-[#888] h-11"/>
        <h1 className="font-[roboto-bold] text-[#888]">Click to select a reel</h1>
        </div>
        </div>
        </label>
        }
        </div>
        <div className="w-[50%]">
        <textarea onChange={handleChange} value={postData.description} name="description" className="h-[180px] outline-none w-full rounded-md p-3 border-solid border-[1px] border-gray-200" placeholder="Type your video description here..."></textarea>
        <input onChange={handleChange} name="title" value={postData.title} type="text" className="mt-3 border-solid rounded-md border-[1px] border-gray-200 p-2 w-full outline-none" placeholder="Type your video title here..."/>
        {/* the fields for the post category */}
        <div className="w-full pt-5 grid grid-cols-3 gap-6 items-center">
        <div className="w-full">
        {/* <p className="font-[rubik-light]">Post category</p> */}
        <select onChange={handleChange} value={postData.category} name="category" className="mt-2 outline-none border-solid rounded-md border-[1px] border-gray-200 p-2">
       <option value="Category">Category</option>
        <option value="Technology">Technology</option>
        <option value="Farming">Farming</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Space explorationn">Space</option>
        <option value="News">News</option>
        <option value="Islam">Islam</option>
        <option value="Kids">Kids</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Health">Health</option>
        <option value="Sports">Sports</option>
        </select>
        </div>
        {/* the button */}
        <button className="cursor-pointer font-[roboto-light] px-4 py-2 bg-blue-500 text-white rounded-md">Edit video</button>
         <button disabled={isUploading?true:false} onClick={()=>uploadVideo()} className="cursor-pointer font-[roboto-light] px-4 py-2 bg-red-500 text-white rounded-md">Upload video</button>
        </div>
        </div>
        </div>
    )
}

// the video upload form
const VideoUploadForm = () =>{
  // the video url
  const [videoURL,setVideoURL] = useState<any>("");
  const [isUploading,setIsUploading] = useState(false);
  const navigate = useNavigate()
  const userData:User = useSelector((state:any)=>state.user);
  const {fetchAllPosts} = useContext<any>(AppContext);
  const [postData,setPostData] = useState<PostData>({
    title:"",
    category:"Category",
    description:"",
  });

  // the function to update the state
  const handleChange = (e:any)=>{
    setPostData({...postData,[e.target.name]:e.target.value})
  };

  // the video upload function
  const uploadVideo = async ():Promise<void> =>{
    setIsUploading(true);

  // the file data
  let fileData = new FormData();
  // upload the video first
  fileData.append("file",videoURL);

  let responseOne = await axiosInstance.post('/api/v1/files/upload',fileData);
  if(responseOne.status === 201){
    // upload the post data now
    const dataObject = {
    title:postData.title,
    category:postData.category,
    description:postData.description,
    video_url:responseOne.data.video_url,
    creator:userData._id,
    post_type:"video"
    }

    let response = await axiosInstance.post('/api/v1/posts/create',dataObject);
    if(response.status === 201){
    setIsUploading(false);
    fetchAllPosts();
    navigate("/home")
    }else{
      setIsUploading(false)
      alert(response.data.detail)
    }
  }

  }

    return (
        <div className="w-[98%] mb-24 md:mb-0 md:w-[90%] rounded-md md:h-[380px] flex flex-col md:flex-row p-2 md:p-5 gap-5 mt-8 border-solid border-[1px] border-gray-200">
        {/* the video upload space */}
        <div className="w-full md:w-[50%]">
        <input type="file" id="video" onChange={(e:any)=>setVideoURL(e.target.files[0])} hidden/>
        {
        videoURL?<div className="w-full h-full">
        <video src={URL.createObjectURL(videoURL)} controls className="w-full h-full object-cover rounded-md"/>
        </div>
        :
        <label htmlFor="video">
        <div className="w-full cursor-pointer flex items-center justify-center flex-col h-[200px] md:h-full bg-[#e9e6e6]">
        <div className="flex flex-col items-center gap-2">
        <BiSolidVideos className="w-11 text-[#888] h-11"/>
        <h1 className="font-[roboto-bold] text-[#888]">Click to select a video</h1>
        </div>
        </div>
        </label>
        }
        </div>
        <div className="md:w-[50%] w-full">
        <textarea onChange={handleChange} value={postData.description} name="description" className="h-[180px] outline-none w-full rounded-md p-3 border-solid border-[1px] border-gray-200" placeholder="Type your video description here..."></textarea>
        <input onChange={handleChange} name="title" value={postData.title} type="text" className="mt-3 border-solid rounded-md border-[1px] border-gray-200 p-2 w-full outline-none" placeholder="Type your video title here..."/>
        {/* the fields for the post category */}
        <div className="w-full pt-5 grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
        <div className="w-full">
        {/* <p className="font-[rubik-light]">Post category</p> */}
        <select onChange={handleChange} value={postData.category} name="category" className="mt-2 outline-none border-solid rounded-md border-[1px] border-gray-200 p-2">
        <option value="Category">Category</option>
        <option value="Technology">Technology</option>
        <option value="Farming">Farming</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Space explorationn">Space</option>
        <option value="News">News</option>
        <option value="Islam">Islam</option>
        <option value="Kids">Kids</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Health">Health</option>
        <option value="Sports">Sports</option>
        </select>
        </div>
        {/* the button */}
        <button className="cursor-pointer hidden md:block font-[roboto-light] px-2 md:px-4 py-2 bg-blue-500 text-white rounded-md">Edit video</button>
         <button disabled={isUploading?true:false} onClick={()=>uploadVideo()} className={`cursor-pointer font-[roboto-light] px-2 md:px-4 py-2 ${isUploading?'bg-red-400':'bg-red-500'} text-white rounded-md`}>Upload video</button>
        </div>
        </div>
        </div>
    )
}

const CreatePage = () => {

  const userData:User = useSelector((state:any)=>state.user);
  const [postCtaegory,setPostCategory] = useState("Video")

  return (
    <>
    <PhoneNav/>
    <Navbar/>
    <div className="w-full flex">
    <Sidebar/>
    <div className="w-full md:ml-[236px] md:p-5">
    {/* the image banner */}
    <div className="w-full md:block hidden">
    <img src={assets.banner_icon} className="w-full h-[230px] object-cover rounded-md"/>
    </div>
    {/* the header */}
    <div className="flex gap-5 mt-5 p-2 md:p-0">
    <div>
    <img src={userData?.profile_pic} className="w-24 md:w-44 flex-shrink-0 h-24 md:h-44 rounded-full object-cover"/>
    </div>
    {/* the user details */}
    <div className="">
    <h1 className="font-[roboto-bold] text-lg md:text-2xl">{userData?.fullname}</h1>
    <p className="font-[roboto-light]">@{userData?.username}</p>
    <p className="">26 videos</p>
    <p className="">{userData?.followers.length} followers | {userData?.following.length} following</p>
    {/* the buttons */}
     <div className="flex items-center gap-4">
     <button className="py-2 px-5 hidden md:block  cursor-pointer rounded-full bg-red-500 mt-3 font-[rubik-light] text-white">Edit profile info</button>
     <button className="py-2 px-5 cursor-pointer rounded-full bg-[#cccccc] mt-3 font-[rubik-light] text[#454545]">Manage videos</button>
     </div>
    </div>
    </div>
    <div className="pt-6 flex flex-col md:flex-row md:items-center">
    <h1 className="font-[roboto-bold] text-xl md:pl-0 pl-2">Create a post</h1>
    <div className="flex items-center gap-6 md:p-0 p-2 md:pl-11">
    {/* the post option */}
     <div onClick={()=>setPostCategory("Video")} className="cursor-pointer bg-[#e2e1e1] py-1 px-2 md:px-3 rounded-md gap-2 flex items-center">
    <BiSolidVideos className="w-5 h-5 text-red-500"/>
     <p className="font-[roboto-light] ">Video</p>
     </div>
      {/* the post option */}
     <div onClick={()=>setPostCategory("Reel")} className="cursor-pointer bg-[#e2e1e1] py-1 px-2 md:px-3 rounded-md gap-2 flex items-center">
    <BiSolidVideos className="w-5 h-5 text-green-500"/>
     <p className="font-[roboto-light]">Reel</p>
     </div>
      {/* the post option */}
     <div className="cursor-pointer bg-[#e2e1e1] py-1 px-2 md:px-3 rounded-md gap-2 flex items-center">
    <FaTextWidth className="w-5 h-5 text-blue-500"/>
     <p className="font-[roboto-light]">Text</p>
     </div>
    </div>
    </div>
    <hr className="mt-2 bg-gray-200 outline-none border-none h-[1px]"/>
    {/* the post upload forms */}
    <div className="w-full flex flex-col items-center">
    {postCtaegory==="Video"?<VideoUploadForm/>:<ReelUploadForm/>}
    </div>
    </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default CreatePage;
