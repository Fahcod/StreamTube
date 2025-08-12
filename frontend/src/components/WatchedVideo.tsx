
import { BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import type { VideoPost } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { axiosInstance } from "../APIs/api";
import { AppContext } from "../context/AppContext";


const WatchedVideo = (props:VideoPost) => {

  const [showRemoveBtn,setShowRemoveBtn] = useState(false);

  const {fetchUserData}:any = useContext(AppContext);

  const deleteHistory = async () =>{
    let response = await axiosInstance.put(`/api/v1/user/delete-history/${props._id}`);
    if(response.status === 200){
    setShowRemoveBtn(false);
    fetchUserData()
    }
  }

  return (
    <div className="flex flex-row gap-3 relative w-full md:w-[90%]">
    <div className="flex-shrink-0">
    <Link to={`/watch/${props._id}`}>
    <video src={props.video_url} className="flex-shrink-0 w-[130px] md:w-[300px] rounded-md"></video>
    </Link>
    </div>
    {/* the details */}
    <div>
    <h1 className="font-[roboto-bold] hidden md:block text-lg">{props.title}</h1>
    <h1 className="font-[roboto-medium] dark:text-white md:font-[roboto-bold] text-sm md:hidden">{props.title.slice(0,18)}{props.title.length > 18?'...':''}</h1>
    <p className="font-[rubik-light] dark:text-[#999] text-[#454545] text-xs md:text-sm">{props.owner.username} {props.views.length} views</p>
    <p className="font-[rubik-light] hidden md:block pt-5 text-sm">{props.description.slice(0,200)}</p>
    </div>
    <div>
    {showRemoveBtn?<div onClick={()=>deleteHistory()} className="bg-white dark:bg-[#333] md:right-[unset] right-4 mt-7 absolute h-[40px] gap-2 flex items-center px-3 md:px-4 shadow-sm cursor-pointer rounded-md">
    <BiTrash className="w-4 dark:text-white h-4 md:w-5 md:h-5"/>
    <p className="font-[roboto-light] dark:text-white md:text-[16px] text-xs">Remove</p>
    </div>:<></>}
    <BiDotsVerticalRounded onClick={()=>{
      showRemoveBtn?setShowRemoveBtn(false):setShowRemoveBtn(true)
    }} className="w-5 h-5 cursor-pointer dark:text-[#fff]"/>
    </div>
    </div>
  )
}

export default WatchedVideo;
