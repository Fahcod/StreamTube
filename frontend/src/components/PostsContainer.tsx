import { useSelector } from "react-redux";
import VideoPost from "./VideoPost";
import Filters from "./Filters";
import type { VideoPost as VideoPostModel} from "../interfaces/interfaces";
import ReelsContainer from "./ReelsContainer";


const PostsContainer = () => {

  const posts:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);
  // function to get the first six videos
  function getFirstSix():VideoPostModel[]{
  //fist obtain the video_type
  let videoType = posts.filter((item:VideoPostModel)=>{
    return item.post_type === 'video';
  })
  return videoType.slice(0,6)
  }

  // get the second six
  function getSecondSix():VideoPostModel[]{
   //fist obtain the video_type
  let videoType:VideoPostModel[] = posts.filter((item:VideoPostModel)=>{
    return item.post_type === 'video';
  });
  // filter them and exclude the items with the first six Ids
  let cleanTtems:VideoPostModel[] = videoType.filter((item:VideoPostModel)=>{
    return (!firstSixIds.includes(item._id))
  });

  return cleanTtems
  }

  // get the first six id's
  const firstSixIds = getFirstSix().map((item:VideoPostModel)=>{
    return item._id
  });

  return (
    <>
    <div className="w-full md:ml-[236px]">
    {/* the filters */}
    <Filters/>
    {/* the posts */}
    <div className="w-full pb-24 md:pb-10">

    {/* the first videos */}
    <div className="grid grid-cols-1 md:grid-cols-3 md:px-5 gap-5">
    {getFirstSix().map((item,index)=>{
       return <VideoPost {...item} key={index}/>
    })}
    </div>

    {/* the shorts container */}
    <ReelsContainer/>

    {/* the second six videos */}
    <div className="grid grid-cols-1 md:grid-cols-3 md:px-5 gap-5 md:py-6">
    {getSecondSix().map((item,index)=>{
       return <VideoPost {...item} key={index}/>
    })}
    </div>

    </div>
    </div>
    </>
  )
}

export default PostsContainer;
