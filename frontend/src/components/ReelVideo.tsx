import { BiDotsVerticalRounded,BiPause,BiPlay, BiSolidComment, BiSolidDislike, BiSolidDownload, BiSolidLike, BiVolumeMute } from "react-icons/bi"
import type { VideoPost } from "../interfaces/interfaces"
import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"


const ReelVideo = (props:VideoPost) => {

    const videoRef = useRef<any>("");
    const [isPlaying,setIsPlaying] = useState<boolean>(false);
    const {likePost} = useContext<any>(AppContext);

    // get the video
    const video:HTMLVideoElement = videoRef.current;
   /***************************THE FUNCTIONS TO HANDLE THE VIDEO******************************/
   function handleVideo(){
   if(isPlaying){
    setIsPlaying(false)
    video.pause();
   }else{
   setIsPlaying(true);
   video.play()
   }
   }
  return (
    <div>
      {/* the videos container */}
    <div className="w-full h-screen flex justify-center">
    <div className="flex gap-3">
    {/* the actual video conatiner */}
    <div className="h-full w-full md:h-[540px] md:w-[300px] flex overflow-y-hidden justify-between relative bg-black md:rounded-md">
    <video src={props.video_url} ref={videoRef} loop={true} className="w-full object-cover object-center h-full md:rounded-md"></video>
    {/* the video controls container */}
    <div className="h-full md:h-[540px] w-full flex justify-between top-0 z-[100] absolute">
    {/* the left cont video details and controls */}
    <div className="w-full flex flex-col justify-between h-full">
    {/* the top div */}
    <div className="w-full flex items-center justify-between px-4 py-4">
    <div className="p-2 rounded-full bg-[#00000063]">
    <BiVolumeMute className="w-6 h-6 text-white cursor-pointer"/>
    </div>
    </div>
    {/* the middle div */}
    <div className="w-full cursor-pointer flex items-center justify-center" onClick={()=>handleVideo()}>
    {isPlaying?<BiPause className="text-white w-16 h-16"/>:<BiPlay className="text-white w-16 h-16"/>}
    </div>
    {/* the bottom div */}
    <div className="w-full px-4 pb-7 bg-gradient-to-t from-[#000000a4] to-10%-[transparent]">
    <div className="flex items-center gap-3">
    <Link to={`/account/${props.owner._id}`}>
    <div>
    <img src={props.owner.profile_pic} className="w-[35px] h-[35px] rounded-full object-cover"/>
    </div>
    </Link>
    <div>
    <h1 className="font-[roboto-medium] text-white">@{props.owner.username}</h1>
    </div>
    </div>
    <div className="pt-2">
    <p className="font-[roboto-light] text-sm text-white">{props.title}</p>
    <p className="font-[roboto-light] text-sm text-white">#{props.description.slice(0,50)}...</p>
    <h1 className="font-[roboto-medium] text-white">#reel</h1>
    </div>
    </div>
    </div>
    {/* the right video options */}
    <div className="flex md:hidden right-0 top-11 h-full absolute flex-col gap-7 pt-24 pr-3">
    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="cursor-pointer">
    <BiDotsVerticalRounded className="w-5 h-5 text-white"/>
    </div>
    </div>
    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="cursor-pointer">
    <BiSolidLike className="w-6 h-6 text-white"/>
    </div>
    <p className="font-[rubik-light] text-sm text-white">{props.likes.length}</p>
    </div>
    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="cursor-pointer">
    <BiSolidDislike className="w-6 h-6 text-white"/>
    </div>
    <p className="font-[rubik-light] text-sm text-white">Dislike</p>
    </div>
    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="cursor-pointer">
    <BiSolidComment className="w-6 h-6 text-white"/>
    </div>
    <p className="font-[rubik-light] text-sm text-white">345k</p>
    </div>
    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="cursor-pointer">
    <BiSolidDownload className="w-6 h-6 text-white"/>
    </div>
    </div>
    </div>
    </div>

    </div>
    {/* the video options */}
    <div className="hidden md:flex flex-col gap-5 pt-24">

    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="bg-[#eeeaea] p-2 rounded-full cursor-pointer">
    <BiDotsVerticalRounded className="w-5 h-5"/>
    </div>
    </div>
    
    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div onClick={()=>{likePost([props._id])}} className="bg-[#eeeaea] p-2 rounded-full cursor-pointer">
    <BiSolidLike className="w-5 h-5"/>
    </div>
    <p className="font-[rubik-light] text-sm">{props.likes.length}</p>
    </div>

    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="bg-[#eeeaea] p-2 rounded-full cursor-pointer">
    <BiSolidDislike className="w-5 h-5"/>
    </div>
    <p className="font-[rubik-light] text-sm">Dislike</p>
    </div>

    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="bg-[#eeeaea] p-2 rounded-full cursor-pointer">
    <BiSolidComment className="w-5 h-5"/>
    </div>
    <p className="font-[rubik-light] text-sm">345k</p>
    </div>

    {/* the video option */}
    <div className="flex flex-col items-center gap-2">
    <div className="bg-[#eeeaea] p-2 rounded-full cursor-pointer">
    <BiSolidDownload className="w-5 h-5"/>
    </div>
    </div>

    {/* the user profile */}
    <div>
    <img src={props.owner.profile_pic} className="w-[37px] rounded-full object-cover h-[37px]"/>
    </div>

    </div>


    </div>
    </div>

    </div>
  )
}

export default ReelVideo
