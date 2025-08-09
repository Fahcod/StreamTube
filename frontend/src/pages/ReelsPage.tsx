import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import type { VideoPost } from "../interfaces/interfaces";
import { getReelById } from "../utils/posts";
import { useSelector } from "react-redux";
import ReelVideo from "../components/ReelVideo";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { scrollPage } from "../utils/other";


const ReelsPage = () => {

   useEffect(()=>{
        scrollPage()
      },[])

  const {updateHistory} = useContext<any>(AppContext);
  // get all posts
  const posts:VideoPost[] = useSelector((state:any)=>state.posts.all_posts)
  // get the reel id
  const {reelId} = useParams();
  // get the actual reel
  const reelVideoItem = getReelById(posts,reelId);
  const posI:any[] = [reelVideoItem,...posts];

  useEffect(()=>{
  updateHistory(reelId)
  },[])

  return (
    <>
    <Navbar/>
    <div className="w-full flex">
    <Sidebar/>
    {/* The big video container */}
    <div className="w-full flex flex-col md:gap-6 md:ml-[236px] md:p-5">
    {posI.map((item,index)=>{
      if(reelVideoItem){
        return <ReelVideo key={index} {...item}/>
      }
    })}
    </div>
    </div>
    </>
  )
}

export default ReelsPage;
