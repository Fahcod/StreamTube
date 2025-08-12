import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallVideo from "../components/SmallVideo";
import { assets } from "../assets/assets";
import { BiDislike, BiDownload, BiLike, BiMessage } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { User, VideoPost } from "../interfaces/interfaces";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { scrollPage } from "../utils/other";
import PhoneNav from "../components/Responsive/PhoneNav";

const WatchPage = () => {

  useEffect(()=>{
      scrollPage()
    },[]);

  // the comment information
  const [commentText,setCommentText] = useState("");

  const {videoId} = useParams();
  const {followUser,likePost,dislikePost,addComment,updateHistory,saveVideo,updatePostViews}:any = useContext(AppContext);
  const posts:VideoPost[] = useSelector((state:any)=>state.posts.all_posts);
  const activePost:VideoPost | undefined = posts.find(e=>e._id === videoId);
  const userData:User = useSelector((state:any)=>state.user);

  useEffect(()=>{
    updateHistory(activePost?._id)
    updatePostViews(activePost?._id)
  },[]);

  return (
    <>
    <Navbar/>
    <PhoneNav/>
    {/* the watch page */}
    <div className="w-full flex flex-col md:flex-row md:p-5 gap-8 justify-between">
    {/* the left container */}
    <div className="w-full md:w-[63%]">
    {/* the video */}
    <video src={activePost?.video_url} controls className="w-full md:rounded-md"></video>
    {/* the video details */}
    <h1 className="font-[roboto-black] dark:text-white text-sm md:text-xl py-1 px-2 md:px-0">{activePost?.title}</h1>
    <div className="w-full py-3 px-2 flex md:hidden items-center justify-between">
    {/* the left contaiiner */}
    <div className="">
    <p className="text-[#454545] text-xs dark:text-[#a7a7a7]">34 views</p>
    </div>
    {/* the right icons container */}
    <div className="flex items-center gap-5">
    <div onClick={()=>likePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiLike className="dark:text-white md:w-6 w-5 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">{activePost?.likes?.length}</p>
    </div>

    <div onClick={()=>dislikePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDislike className="dark:text-white w-5 md:w-6 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">{activePost?.dislikes?.length}</p>
    </div>

    <div className="flex items-center gap-2 cursor-pointer">
    <BiMessage className="dark:text-white w-5 h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">{activePost?.comments?.length}</p>
    </div>

    <div onClick={()=>saveVideo(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDownload className="w-5 h-5 dark:text-white md:w-6 md:h-6"/>
    <p className="text-[#454545] dark:text-[#a7a7a7] text-sm">
      {activePost && userData?.saved_videos.includes(activePost?._id)?'Saved':'Save'}
      </p>
    </div>
    </div>
    {/* end of the right icons container */}
    </div>
    {/* the video options */}
    <div className="w-full flex items-center justify-between px-2 md:px-0 md:pt-2">
    <div className="items-center gap-2 flex">
    <Link to={`/account/${activePost?.owner._id}`}>
    <div>
    <img src={activePost?.owner.profile_pic} className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full object-cover"/>
    </div>
    </Link>
    {/* the creator details */}
    <div>
    <h2 className="font-[roboto-bold] text-sm dark:text-white md:text-lg">{activePost?.owner.username}</h2>
    <p className="text-sm text-[#454545] dark:text-[#a7a7a7] leading-none">{activePost?.owner.followers?.length} followers</p>
    </div>
    </div>
    {/* the right container */}
    <div className="flex items-center gap-7">
    {/* the icons */}
    <div className="md:flex hidden items-center gap-3 px-2">
    
    <div onClick={()=>likePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiLike className="md:w-6 dark:text-white w-5 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">{activePost?.likes?.length}</p>
    </div>

    <div onClick={()=>dislikePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDislike className="w-5 dark:text-white md:w-6 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">{activePost?.dislikes?.length}</p>
    </div>

    <div className="flex items-center gap-2 cursor-pointer">
    <BiMessage className="w-5 dark:text-white h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">{activePost?.comments?.length}</p>
    </div>

    <div onClick={()=>saveVideo(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDownload className="w-5 dark:text-white h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm dark:text-[#a7a7a7]">
      {activePost && userData?.saved_videos.includes(activePost?._id)?'Saved':'Save'}
      </p>
    </div>

    </div>
    {/* the follow button */}
    <div>
    <button onClick={()=>followUser(activePost?.owner._id)} className="bg-red-500 cursor-pointer text-sm md:text-[16px] text-white py-2 px-5 md:px-6 rounded-full font-[rubik-light]">
    {userData?.following.includes(activePost?.owner._id)?'Following':'Follow'}
    </button>
    </div>
    </div>
    </div>
    {/* the video descripttion */}
    <div className="w-full md:px-0 px-2">
    <div className="md:mt-5 mt-3 bg-[#efefef] dark:bg-[#333] p-3 rounded-md">
    <h1 className="font-[roboto-bold] dark:text-white">{activePost?.title}</h1>
    <p className="font-[roboto-light] dark:text-[#fff] text-sm">{activePost?.description.slice(0,200)}...more</p>
    </div>
    </div>
    {/* the post comments */}
    <div className="w-full hidden pt-3">
    {/* the header */}
    <div className="">
    <h2 className="font-[rubik-bold] text-lg">Comments</h2>
    </div>
    {/* the add comment form */}
    <div className="w-full flex pt-2 gap-3">
    <div>
    <img src={assets.banner_icon} className="w-[40px] h-[40px] rounded-full"/>
    </div>
    {/* the add comment fields */}
    <div className="w-[100%] px-3 flex items-center justify-between h-[42px] bg-[#efefef] rounded-md">
    <input type="text" onChange={(e)=>setCommentText(e.target.value)} value={commentText} className="h-full w-[90%] outline-none" placeholder="Add a comment"/>
    <button onClick={()=>{
      if(commentText.length < 1){
        return;
      }
      addComment(activePost?._id,commentText);
      setCommentText("")
    }} className="cursor-pointer font-[rubik-light] font-semibold text-blue-500">Add</button>
    </div>
    </div>
     <hr className="mt-4 border-none outline-none h-[1px] bg-gray-200"/>
    {/* the comments container */}
    <div className="w-full flex flex-col gap-7 pt-5">
    
    {/* the comment div */}
    <div className="w-full">
    {/* the user info */}
    <div className="flex gap-2">
    <div className="flex-shrink-0 ">
    <img src={assets.banner_icon} className="w-[35px] h-[35px] rounded-full object-cover"/>
    </div>
    <div>
    <h2 className="font-[rubik-semibold]">Twesigye fahad</h2>
    <p className="font-[rubik-light] text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam sapiente consectetur voluptatem minima minus nam distinctio quo in, recusandae iusto, cumque nemo quasi adipisci molestiae accusamus quas quis libero. Optio.</p>
    {/* the comment options */}
    <div className="w-full flex pt-2 gap-5 items-center">

    <div className="flex items-center gap-1 cursor-pointer">
    <BiLike className="w-5 h-5"/>
    <p className="text-[#454545] text-sm">12</p>
    </div>

    <div className="flex items-center gap-1 cursor-pointer">
    <BiDislike className="w-5 h-5"/>
    <p className="text-[#454545] text-sm">12</p>
    </div>

    <div className="flex items-center gap-1 cursor-pointer">
    <BiMessage className="w-5 h-5"/>
    <p className="text-[#454545] text-sm">34</p>
    </div>

    </div>
    </div>
    </div>
    </div>

    {/* the comment div */}
    <div className="w-full">
    {/* the user info */}
    <div className="flex gap-2">
    <div className="flex-shrink-0 ">
    <img src={assets.banner_icon} className="w-[35px] h-[35px] rounded-full object-cover"/>
    </div>
    <div>
    <h2 className="font-[rubik-semibold]">Twesigye fahad</h2>
    <p className="font-[rubik-light] text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam sapiente consectetur voluptatem minima minus nam distinctio quo in, recusandae iusto, cumque nemo quasi adipisci molestiae accusamus quas quis libero. Optio.</p>
    {/* the comment options */}
    <div className="w-full flex pt-2 gap-5 items-center">

    <div className="flex items-center gap-1 cursor-pointer">
    <BiLike className="w-5 h-5"/>
    <p className="text-[#454545] text-sm">12</p>
    </div>

    <div className="flex items-center gap-1 cursor-pointer">
    <BiDislike className="w-5 h-5"/>
    <p className="text-[#454545] text-sm">12</p>
    </div>

    <div className="flex items-center gap-1 cursor-pointer">
    <BiMessage className="w-5 h-5"/>
    <p className="text-[#454545] text-sm">12</p>
    </div>

    </div>
    </div>
    </div>
    </div>

    </div>
    </div>
    </div>
    {/* the right container */}
    <div className="flex flex-col gap-4 w-full md:w-[37%] md:pb-0 pb-11">
    {posts.map((item,index)=>{
    if(item.post_type==="video"){
      return <SmallVideo {...item} key={index} func={scrollPage}/>
    }
    })}
    </div>
    </div>
    </>
  )
}

export default WatchPage;
