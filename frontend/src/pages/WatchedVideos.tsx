import { BiDotsVerticalRounded,BiTrash } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { VideoPost as VideoPostModel } from "../interfaces/interfaces";
import WatchedVideo from "../components/WatchedVideo";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../APIs/api";
import { scrollPage } from "../utils/other";
import PhoneNav from "../components/Responsive/PhoneNav";
import BottomNav from "../components/Responsive/BottomNav";

const categories = [
    {
      value:'Videos'
    },
    {
      value:'Shorts'
    },
];

type VideoProps = {
  all_videos:VideoPostModel[],
  user_watch_history:string[]
}

/***************************THE COMPONENTS FOR DIFFERENT PAGES******************************/
const VideosComponent = (props:VideoProps)=>{
  return(
 <div className="w-full pt-7 flex flex-col gap-5 md:pb-0 pb-16">
    {props.all_videos.map((item:VideoPostModel,index:number)=>{
    if(props.user_watch_history.includes(item._id)){
     if(item.post_type === "video"){
       return <WatchedVideo key={index} {...item}/>
     }
    }
    })}
    </div>
  )
}

const ReelsComponent = (props:VideoProps) =>{

   useEffect(()=>{
        scrollPage()
      },[])

  const {fetchUserData}:any = useContext(AppContext);
  const [showRemoveBtn,setShowRemoveBtn] = useState(false);

  const deleteHistory = async (postId:string) =>{
      let response = await axiosInstance.put(`/api/v1/user/delete-history/${postId}`);
      if(response.status === 200){
      setShowRemoveBtn(false);
      fetchUserData()
      }
    }

  return (
    <div className="w-full pt-7 flex flex-col gap-5 md:w-[90%]">
    {props.all_videos.map((item:VideoPostModel,index:number)=>{
      if(item.post_type === "reel"){
        return (
          <div className="w-full grid md:block grid-cols-2">
          <div className="w-full flex md:flex-row gap-3" key={index}>
          {/* the video */}
          <Link to={`/reels/${item._id}`} className="flex-shrink-0">
          <video src={item.video_url} className="flex-shrink-0 w-[120px] h-[190px] md:w-[210px] md:h-[290px] rounded-md object-cover"></video>
          </Link>
          {/* the details */}
          <div className="flex gap-3 pt-1">

          <div className="md:w-full">
          <h1 className="font-[roboto-medium] dark:text-white text-sm md:text[16px] md:font-[roboto-bold]">{item.title}</h1>
          <p className="font-[roboto-light] text-[#454545] text-xs md:text-[16px]">{item.owner.username} {item.views.length} views</p>
          <p className="font-[roboto-light] hidden md:block pt-3 text-sm">{item.description}</p>
          </div>

          <div className="relative">
            <BiDotsVerticalRounded onClick={()=>setShowRemoveBtn(true)} className="w-6 cursor-pointer h-6"/>
            {showRemoveBtn?<div onClick={()=>deleteHistory(item._id)} className="absolute flex mt-2 items-center px-3 py-2 cursor-pointer bg-white shadow-sm rounded-md gap-2">
            <BiTrash className="w-4 h-4 md:w-5 md:h-5"/>
            <p className="md:block hidden">Remove</p>
            </div>:<></>}

          </div>

          </div>
          </div>
          </div>
        )
      }
    })}
    </div>
  )
}

const WatchedVideos = () => {

    const [activeCategory,setActiveCategory] = useState("Videos");
    const all_videos:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);

    //get all the watched videos
    const user_watch_history:string[] = useSelector((state:any)=>state.user.watch_history);

  return (
    <>
    <Navbar/>
    <PhoneNav/>
    <div className="w-full flex">
    <Sidebar/>
    <div className="w-full md:ml-[236px] px-2.5 md:px-6 md:py-11 py-3">
     {/* the header */}
    <div className="flex w-full justify-between">
    <div className="">
    <h1 className="font-[roboto-black] dark:text-white text-lg md:text-2xl">Watched videos</h1>
    {/* the ctegories */}
    <div className="flex items-center gap-6 pt-4">
    {categories.map((item,index)=>{
        return(
        <div onClick={()=>setActiveCategory(item.value)} className={`rounded-full cursor-pointer py-1.5 px-6 flex md:text-[16px] text-sm items-center ${item.value === activeCategory?'text-white bg-[#fb2c36] dark:border-red-500':'border-gray-200 dark:border-[#333]'} dark:text-white border-solid border-[1px]`} key={index}>
        <p className="font-[roboto-light]">{item.value}</p>
        </div>
        )
    })}
    </div>
    </div>
    {/* the options */}
    <div>
    <BiDotsVerticalRounded className="dark:text-white w-6 h-6 md:w-7 md:h-7 cursor-pointer"/>
    </div>
    </div>
    {/* the videos */}
    {activeCategory === "Videos"?
    <VideosComponent all_videos={all_videos} user_watch_history={user_watch_history}/>:
    <ReelsComponent all_videos={all_videos} user_watch_history={user_watch_history}/>
   }
    </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default WatchedVideos;
