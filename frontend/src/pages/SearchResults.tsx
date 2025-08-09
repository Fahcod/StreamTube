import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { VideoPost as VideoPostModel} from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";


const SearchResults = () => {

    const [searchResults,setSearchResults] = useState<VideoPostModel[]>([]);
    const navigate = useNavigate();
    // get the serach term and all the posts
    const {textSearchTerm:searchTerm}:any = useContext(AppContext);
    const all_posts:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);

    //try finding the posts by username
    function searchItems(){
    let result = all_posts.filter((item:VideoPostModel)=>{
       if(searchTerm){
        return (
        item.owner.username.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())>-1
         || item.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())>-1 ) ||
         item.title.toLocaleLowerCase().lastIndexOf(searchTerm.toLocaleLowerCase())>-1 ||
         item.category.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())>-1
       }
    })
    setSearchResults(result)
    }

   useEffect(()=>{
    searchItems()
   },[searchTerm]);

  return (
    <>
    <Navbar/>
    {/* the main container */}
    <div className="w-full flex">
    <Sidebar/>
    {/* the results container */}
    <div className="w-full ml-[326px]">
    {/* the header */}
    <div className="">
    <h1 className="font-[roboto-bold] pt-5">Showing results for "{searchTerm}"</h1>
    </div>
    <div className="flex mt-3 items-center gap-5">
    <button className="cursor-pointer border-solid border-[1px] border-gray-200 bg-red-500 text-white px-6 rounded-full py-2">Videos</button>
    <button className="cursor-pointer border-solid border-[1px] border-gray-200 px-6 rounded-full py-2">Shorts</button>
    </div>
    {/* the videos container */}
    <div className="w-full flex pt-5 flex-col-reverse gap-6 pb-11">
    {searchResults.map((item:VideoPostModel,index:number)=>{
        if(item.post_type === "video"){
            return (
                <div className="flex gap-5 max-w-[90%]" key={index}>
                {/* the video */}
                <video src={item.video_url} onClick={()=>navigate(`/watch/${item._id}`)} className="w-[350px] rounded-md"/>
                {/* the other details */}
                <div>
                <h1 className="font-[roboto-bold]">{item.title}</h1>
                <p className="font-[roboto-light] text-sm text-[#454545]">{item.owner.username} {item.views.length} views</p>
                <p className="font-[roboto-light] pt-4 text-sm">{item.description.slice(0,220)}</p>
                </div>
                </div>
            )
        }
    })}
    </div>
    </div>
    </div>
    </>
  )
}

export default SearchResults;
