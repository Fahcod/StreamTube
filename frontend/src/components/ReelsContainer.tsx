import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { VideoPost as VideoPostModel } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

const ReelsContainer = () => {

    const posts:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);
      // function to get the first six videos
      function getFirstSix():VideoPostModel[]{
      //fist obtain the video_type
      let videoType:VideoPostModel[] = posts.filter((item:VideoPostModel)=>{
        return item.post_type === 'reel';
      }).splice(-5);

      return videoType
      }

  return (
   <>
   <div className="w-full p-5 mt-2">
    {/* the header */}
    <div className="w-full flex items-center">
    <h1 className="font-[roboto-black] text-xl dark:text-white">Reels</h1>
    </div>
    {/* the posts container */}
    <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 pt-5">
    {getFirstSix().map((item:VideoPostModel,index:number)=>{
        return (
           <div className="" key={index}>
           {/* the video */}
           <Link to={`/reels/${item._id}`}>
           <video src={item.video_url} className="rounded-md w-full h-[180px] md:h-[280px] object-cover flex justify-center"/>
           </Link>
           {/* the details */}
           <div className="w-full flex justify-between pt-2">
           <h1 className="font-[roboto-medium] text-sm md:text-[16px]">{item.title.slice(0,28)}...</h1>
           <BiDotsVerticalRounded className="w-5 h-5 md:w-6 md:h-6 cursor-pointer flex-shrink-0"/>
           </div>
           <p className="font-[roboto-light] text-sm text-[#454545]">{item?.views.length} views</p>
           </div>
        )
    })}
    </div>
    </div>
   </>
  )
}

export default ReelsContainer;