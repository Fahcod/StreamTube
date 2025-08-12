import { Link } from "react-router-dom";
import type { VideoPost } from "../interfaces/interfaces";
import { BiDotsVerticalRounded } from "react-icons/bi";


const SmallReel = (props:VideoPost) => {
  return (
    <div className="full">
    <Link to={`/reels/${props._id}`}>
    <video src={props.video_url} className="w-full h-[250px] object-cover rounded-md"/>
    </Link>
    {/* the details */}
    <div className="w-full flex justify-between pt-2">
    <h1 className="font-[roboto-medium] dark:text-white">{props.title}</h1>
    <div className="flex-shrink-0">
    <BiDotsVerticalRounded className="w-5.5 h-5.5 cursor-pointer"/>
    </div>
    </div>
    <div>
    <p className="text-[#454545] dark:text-[#999] text-sm font-[roboto-light]">{props.views.length} views</p>
    </div>
    </div>
  )
}

export default SmallReel;
