import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { User, VideoPost as VideoPostModel } from "../interfaces/interfaces";
import UpdateProfile from "../modals/UpdateProfile";
import { setShowUPdateProfile } from "../slices/modals.slice";
import SavedVideo from "../components/SavedVideo";
import SmallReel from "../components/SmallReel";
import { useEffect, useState } from "react";
import { scrollPage } from "../utils/other";
import BottomNav from "../components/Responsive/BottomNav";
import PhoneNav from "../components/Responsive/PhoneNav";


const VideosContainer = (props:any)=>{
    return(
   <div className="w-full grid-cols-1 grid md:grid-cols-4 gap-5 pt-6 pb-24 md:pb-5">
     {props.userPosts.map((item:VideoPostModel,index:any)=>{
        if(item.post_type === "video"){
            return <SavedVideo {...item} key={index}/>
        }
     })}
     </div>
    )
}

const ReelsContainer = (props:any)=>{
    return(
   <div className="w-full grid grid-cols-2 px-2 md:grid-cols-5 gap-3 md:gap-5 pt-6 pb-24 md:pb-5">
     {props.userPosts.map((item:VideoPostModel,index:any)=>{
        if(item.post_type === "reel"){
            return <SmallReel {...item} key={index}/>
        }
     })}
     </div>
    )
}

const ProfilePage = () =>{

    useEffect(()=>{
        scrollPage()
      },[])
    
    const [activeLink,setActiveLink] = useState('Videos');
    // get all the posts
    const all_posts:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);
    // get the user data
    const userData:User = useSelector((state:any)=>state.user);
    const dispacth = useDispatch();
    // get the user's posts
    const userPosts:VideoPostModel[] = all_posts.filter((item:VideoPostModel)=>{
        return item.owner._id === userData._id
    });

    return(
    <>
     <UpdateProfile/>
     <PhoneNav/>
     <Navbar/>
     <div className="w-full flex">
     <Sidebar/>
     {/* the right container */}
     <div className="w-full md:ml-[236px] md:p-5">
     {/* the image banner */}
     <div className="w-full md:block hidden">
     <img src={assets.banner_icon} className="w-full h-[230px] object-cover rounded-md"/>
     </div>
     {/* the profile information */}
     <div className="w-full mt-1 md:mt-5 p-2">
    {/* the user information */}
     <div className="flex gap-2 md:gap-6">
     <div>
     <img src={userData?.profile_pic} className="w-16 h-16 md:w-44 md:h-44 rounded-full object-cover"/>
     </div>
     {/* the other details */}
     <div className="md:pt-3">
     <h1 className="font-[roboto-bold] text-[#101010] text-lg md:text-2xl">{userData?.fullname}</h1>
     <h2 className="font-[roboto-light]">@{userData?.username}</h2>
     <p>{userData?.followers.length} followers | {userData?.following.length} following</p>
     <p className="md:block hidden">{userData?.profile_bio.slice(0,55)}...</p>
     {/* the buttons */}
     <div className="w-full md-[auto] flex items-center gap-4">
     <button onClick={()=>dispacth(setShowUPdateProfile(true))} className="py-2 px-2 md:px-5 cursor-pointer text-[12px] md:text-[16px] rounded-full bg-red-500 mt-3 font-[rubik-light] text-white">Edit profile info</button>
     <button className="py-2 px-2 md:px-5 cursor-pointer rounded-full bg-[#cccccc] mt-3 font-[rubik-light] text-[12px] md:text-[16px] text[#454545]">Manage videos</button>
     </div>
     </div>
     </div>
     </div>
     {/* the bottom navigation */}
     <div className="w-full">
     <div className="pt-5 pl-2 md:pl-0">
     <ul>
     <li onClick={()=>setActiveLink("Videos")} className={`inline ${activeLink==="Videos"?'text-[#000]':'text-[#454545]'} font-[roboto-medium] cursor-pointer md:px-6`}>VIDEOS</li>
     <li onClick={()=>setActiveLink("Reels")} className={`inline ${activeLink==="Reels"?'text-[#000]':'text-[#454545]'} cursor-pointer font-[roboto-medium] px-6`}>REELS</li>
     <li className="inline cursor-pointer font-[roboto-medium] text-[#454545] px-6">LIKED</li>
     </ul>
     </div>
     <hr className="mt-2 h-[1px] bg-gray-200 outline-none border-none"/>
     </div>
     {/* the user's videos and posts */}
     {activeLink==='Videos'?<VideosContainer userPosts={userPosts}/>:<ReelsContainer userPosts={userPosts}/>}
     </div>
     </div>
     <BottomNav/>
    </>
    )
}

export default ProfilePage;