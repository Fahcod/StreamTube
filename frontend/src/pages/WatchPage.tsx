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
import VideoPlayer from "../components/VideoPlayer";

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
    {/* the video player*/}
    <VideoPlayer video_url={activePost?.video_url}/>
    {/* the video details */}
    <h1 className="font-[roboto-black] text-sm md:text-xl py-1 px-2 md:px-0">{activePost?.title}</h1>
    <div className="w-full py-3 px-2 flex md:hidden items-center justify-between">
    {/* the left contaiiner */}
    <div className="">
    <p className="text-[#454545] text-xs">34 views</p>
    </div>
    {/* the right icons container */}
    <div className="flex items-center gap-5">
    <div onClick={()=>likePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiLike className="md:w-6 w-5 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm">{activePost?.likes?.length}</p>
    </div>

    <div onClick={()=>dislikePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDislike className="w-5 md:w-6 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm">{activePost?.dislikes?.length}</p>
    </div>

    <div className="flex items-center gap-2 cursor-pointer">
    <BiMessage className="w-5 h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm">{activePost?.comments?.length}</p>
    </div>

    <div onClick={()=>saveVideo(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDownload className="w-5 h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm">
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
    <h2 className="font-[roboto-bold] text-sm md:text-lg">{activePost?.owner.username}</h2>
    <p className="text-sm text-[#454545] leading-none">{activePost?.owner.followers?.length} followers</p>
    </div>
    </div>
    {/* the right container */}
    <div className="flex items-center gap-7">
    {/* the icons */}
    <div className="md:flex hidden items-center gap-3 px-2">
    
    <div onClick={()=>likePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiLike className="md:w-6 w-5 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm">{activePost?.likes?.length}</p>
    </div>

    <div onClick={()=>dislikePost(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDislike className="w-5 md:w-6 h-5 md:h-6"/>
    <p className="text-[#454545] text-sm">{activePost?.dislikes?.length}</p>
    </div>

    <div className="flex items-center gap-2 cursor-pointer">
    <BiMessage className="w-5 h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm">{activePost?.comments?.length}</p>
    </div>

    <div onClick={()=>saveVideo(activePost?._id)} className="flex items-center gap-2 cursor-pointer">
    <BiDownload className="w-5 h-5 md:w-6 md:h-6"/>
    <p className="text-[#454545] text-sm">
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
    <div className="md:mt-5 mt-3 bg-[#efefef] p-3 rounded-md">
    <h1 className="font-[roboto-bold]">{activePost?.title}</h1>
    <p className="font-[roboto-light] text-sm">{activePost?.description.slice(0,200)}...more</p>
    </div>
    </div>
    {/* the post comments */}
    <div className="w-full pt-3 md:px-0 px-2">
    {/* the header */}
    <div className="">
    <h2 className="font-[roboto-bold] text-lg">Comments</h2>
    </div>
    {/* the add comment form */}
    <div className="w-full flex pt-2 gap-3">
    <div className="flex-shrink-0">
    <img src={assets.banner_icon} className="w-[40px] flex-shrink-0 h-[40px] rounded-full"/>
    </div>
    {/* the add comment fields */}
    <div className="w-[100%] px-3 flexborder-solid border-b-[1px] border-gray-200 items-center justify-between h-[42px] bg-transparent">
    <input type="text" onChange={(e)=>setCommentText(e.target.value)} value={commentText} className="h-full md-[80%] md:w-[90%] outline-none" placeholder="Add a comment"/>
    <button onClick={()=>{
      if(commentText.length < 1){
        return;
      }
      addComment(activePost?._id,commentText);
      setCommentText("")
    }} className="cursor-pointer font-[rubik-light] font-semibold">Add</button>
    </div>
    </div>
    {/* the comments container */}
    <div className="w-full flex flex-col gap-7 pt-9">

    {/* THE COMMENT CONTAINER */}

    {/* END OF THE COMMENT CONTAINER */}

    </div>
    </div>
    </div>
    {/* the right container */}
    <div className="flex flex-col gap-4 w-full md:w-[37%] md:pb-0 pb-11">
    {posts.map((item,index)=>{
    if(item.post_type==="video" && item._id !== activePost?._id){
      return <SmallVideo {...item} key={index} func={scrollPage}/>
    }
    })}
    </div>
    </div>
    </>
  )
}

export default WatchPage;
