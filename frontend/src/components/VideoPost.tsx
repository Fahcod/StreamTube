import { Link } from "react-router-dom"
import type { VideoPost as VideoPostModel } from "../interfaces/interfaces"


const VideoPost = (props:VideoPostModel) => {
  return (
    <div>
    {/* the video */}
    <div className="w-full">
    <Link to={`/watch/${props._id}`}>
    <video src={props.video_url} className="md:rounded-md max-h-[200px] min-w-full object-cover"></video>
    </Link>
    </div>
    {/* the post details */}
    <div className="w-full px-2 md:px-0 flex gap-3 pt-3">
    {/* the creator profile */}
    <Link to={`/account/${props?.owner._id}`}>
    <div className="flex-shrink-0 w-[30px] md:w-[37px]">
    <img src={props.owner.profile_pic} className="flex-shrink-0 w-[30px] h-[30px] md:w-[37px] md:h-[37px] rounded-full object-cover"/>
    </div>
    </Link>
    {/* the video details */}
    <div className="">
    <h2 className="font-[roboto-bold] dark:text-white md:block hidden leading-5 text-[#101010]">{props.title.slice(0,55)}{props.title.length > 55?'...':''}</h2>
    {/* the title for mobile */}
    <h2 className="font-[roboto-bold] dark:text-white text-sm md:hidden leading-none text-[#101010]">{props.title.slice(0,28)}{props.title.length > 28?'...':''}</h2>
    <p className="pt-1 leading-none text-sm dark:text-[#a7a7a7] text-[#101010] font-[rubik-light]">{props.owner.username}</p>
    <p className="leading-none text-xs text-[#101010] dark:text-[#a7a7a7] font-[rubik-light] pt-1">12d ago {props?.views.length} views</p>
    </div>
    </div>
    </div>
  )
}

export default VideoPost;
