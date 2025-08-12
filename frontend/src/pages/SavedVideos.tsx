
import { BiDotsVerticalRounded } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { User, VideoPost as VideoPostModel } from "../interfaces/interfaces";
import SavedVideo from "../components/SavedVideo";
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
]

// the videos component
const VideosComponent = () =>{

    useEffect(()=>{
         scrollPage()
       },[])

    const all_videos:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);
    const userData:User = useSelector((state:any)=>state.user);

    // filter and return all the saved videos
    const savedVideos:VideoPostModel[] = all_videos.filter((item:VideoPostModel)=>{
      return userData?.saved_videos.includes(item._id)
    })

  return(
    <div className="w-full pt-5 grid-cols-1 grid md:grid-cols-4 gap-5">
    {savedVideos.map((item:VideoPostModel,index)=>{
    return <SavedVideo key={index} {...item}/>
    })}
    </div>
  )
}

const SavedVideos = () => {

  const [activeCategory,setActiveCategory] = useState("Videos");

  return (
    <>
    <Navbar/>
    <PhoneNav/>
    <div className="w-full flex">
    <Sidebar/>
    <div className="w-full md:ml-[236px] md:px-6 py-5 md:py-11">
     {/* the header */}
    <div className="p-2 flex w-full justify-between">
    <div className="">
    <h1 className="font-[roboto-black] dark:text-white text-lg md:text-2xl">Saved videos</h1>
    {/* the ctegories */}
    <div className="flex items-center gap-6 pt-4">
    {categories.map((item,index)=>{
        return(
        <div onClick={()=>setActiveCategory(item.value)} className={`rounded-full text-sm md:text-[16px] cursor-pointer py-1.5 px-6 flex items-center ${item.value === activeCategory?'text-white bg-[#fb2c36] dark:border-red-500':'border-gray-200 dark:border-[#333]'} dark:text-white border-solid border-[1px]`} key={index}>
        <p className="font-[rubik-light]">{item.value}</p>
        </div>
        )
    })}
    </div>
    </div>
    {/* the options */}
    <div>
    <BiDotsVerticalRounded className="w-6 h-6 cursor-pointer"/>
    </div>
    </div>
    {/* the videos */}
    <VideosComponent/>
    </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default SavedVideos;