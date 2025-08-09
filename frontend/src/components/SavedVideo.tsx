import { Link } from "react-router-dom"
import type { VideoPost as VideoPostModel } from "../interfaces/interfaces"
import { BiDotsVerticalRounded } from "react-icons/bi"


const SavedVideo = (props:VideoPostModel) => {
  return (
    <div className="w-full">
    <div className="w-full">
    <Link to={`/watch/${props._id}`}>
    <video src={props.video_url} className="md:rounded-md w-full"/>
    </Link>
    </div>
    {/* the details */}
    <div className="w-full md:pl-0 pl-1 flex justify-between pt-2.5">
    <h1 className="font-[roboto-medium] hidden md:block">{props.title.slice(0,55)}</h1>
     <h1 className="font-[roboto-medium] leading-none md:hidden leading-none text-sm">{props.title.slice(0,36)}{props.title.length>36?'...':''}</h1>
    <BiDotsVerticalRounded className="w-7 h-7 cursor-pointer"/>
    </div>
    <div className="md:pl-0 pl-1">
    <p className="text-[#454545] text-sm">{props.owner.username}</p>
    <p className="text-[#454545] text-xs">{props?.views?.length} views 2w ago</p>
    </div>
    </div>
  )
}

export default SavedVideo