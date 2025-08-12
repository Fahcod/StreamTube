import { BiDownload, BiHistory, BiHome, BiPlusCircle, BiSolidVideos } from "react-icons/bi";
import { FaGear } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { VideoPost } from "../interfaces/interfaces";

const Sidebar = () => {

  const all_users:any[] = useSelector((state:any)=>state.users.all_users);
  const all_posts:VideoPost[] = useSelector((state:any)=>state.posts.all_posts);
  const navigate = useNavigate();

  // the function to pick a reel
  function pickReel(){
  let latestRellVideo:VideoPost[] = all_posts.slice(-1);
  const lastestReelId = latestRellVideo[0]._id;
  navigate(`/reels/${lastestReelId}`)
  }

  return (
    <div className="md:block dark:bg-[#101010] bg-white hidden px-6 w-[236px] overflow-y-scroll fixed h-screen pb-24 [&::-moz-scrollbar]:w-0 [&::-webkit-scrollbar]:w-0">
    {/* the links */}
    <div className="w-full flex flex-col gap-6 pt-4">
    
    <Link to="/home">
    <div className="flex text-[#202020] dark:text-[#eeecec] items-center gap-3 cursor-pointer">
    <BiHome className="w-6.5 h-6.5"/>
    <p className="text-[17px] font-[Arial] pt-0.5">Home</p>
    </div>
    </Link>

    <div onClick={()=>pickReel()} className="flex text-[#202020] dark:text-[#eeecec] items-center gap-3 cursor-pointer">
    <BiSolidVideos className="w-6.5 h-6.5"/>
    <p className="text-[17px] font-[Arial] pt-0.5">Reels</p>
    </div>
    
    <Link to="/create">
    <div className="flex text-[#202020] dark:text-[#eeecec]  items-center gap-3 cursor-pointer">
    <BiPlusCircle className="w-6.5 h-6.5"/>
    <p className="text-[17px] font-[Arial] pt-0.5">Create</p>
    </div>
    </Link>

    <hr className="mt-0.5 border-none dark:bg-[#333] outline-none h-[1px] bg-gray-200"/>

    <Link to="/saved">
    <div className="flex text-[#202020] dark:text-[#eeecec]  items-center gap-3 cursor-pointer">
    <BiDownload className="w-6.5 h-6.5"/>
    <p className="text-[17px] font-[Arial] pt-0.5">Saved videos</p>
    </div>
    </Link>

    <Link to="/studio">
     <div className="flex text-[#202020] dark:text-[#eeecec] items-center gap-3 cursor-pointer">
    <BiSolidVideos className="w-6.5 h-6.5"/>
    <p className="text-[17px] font-[Arial] pt-0.5">My videos</p>
    </div>
    </Link>

    <Link to="/watched">
    <div className="flex text-[#202020] dark:text-[#eeecec] items-center gap-3 cursor-pointer">
    <BiHistory className="w-6.5 h-6.5"/>
    <p className="text-[17px] font-[Arial] pt-0.5">Watched videos</p>
    </div>
    </Link>

    </div>
    <hr className="mt-4 border-none dark:bg-[#333] outline-none h-[1px] bg-gray-200"/>
    {/* the followed accounts */}
    <div className="w-full">
    <div className="w-full flex pt-3 items-center justify-between">
    <h1 className="font-[roboto-medium] dark:text-white">Following</h1>
    <p className="font-[roboto-light] cursor-pointer text-sm text-blue-500">view all</p>
    </div>
    {/* the actual users */}
    <div className="w-full flex flex-col gap-5 pt-3">
    {all_users.map((item,index)=>{
       return (
        <div className="flex items-center gap-3" key={index}>
        <div>
        {item.profile_pic === ''?<div className="w-[32px] h-[32px] bg-[#dfd9d9] rounded-full"></div>
        :<img src={item.profile_pic} className="w-[32] h-[32px] rounded-full object-cover"/>
        }
        </div>
        {/* the user info */}
        <div className="">
        <h1 className="font-[roboto-light] dark:text-white text-sm text-[#101010]">{item.username}</h1>
        <p className="text-[#454545] dark:text-[#a7a7a7] text-[13px] font-[roboto-light] leading-none">{item.followers.length} followers</p>
        </div>
        </div>
      )
    })}
    </div>
    </div>
    <hr className="mt-4 border-none dark:bg-[#333] outline-none h-[1px] bg-gray-200"/>
    {/* the last cont */}
    <div className="w-full flex flex-col gap-4">

    <div className="flex dark:text-white items-center gap-2 pt-5">
    <FaGear className="text-[#101010] dark:text-white w-5 h-5"/>
    <p className="">Settings</p>
    </div>
    
    </div>
    </div>
  )
}

export default Sidebar;
