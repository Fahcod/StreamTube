import { useSelector } from "react-redux";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { User, VideoPost as VideoPostModel } from "../interfaces/interfaces";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { scrollPage } from "../utils/other";
import SavedVideo from "../components/SavedVideo";
import PhoneNav from "../components/Responsive/PhoneNav";
import BottomNav from "../components/Responsive/BottomNav";


const OtherProfile = () =>{
     useEffect(()=>{
          scrollPage()
        },[])

   const {accountId} = useParams();
   const {followUser}:any = useContext(AppContext)
    // get all the posts
    const all_posts:VideoPostModel[] = useSelector((state:any)=>state.posts.all_posts);
    // get the account info
    const all_users:User[] = useSelector((state:any)=>state.users.all_users)
    const userData = all_users.find(e=>e._id == accountId)
    // the information for the logged in user
    const userInfo:User = useSelector((state:any)=>state.user)
    // get the user's posts
    const userPosts:VideoPostModel[] = all_posts.filter((item:VideoPostModel)=>{
        return item.owner._id === userData?._id
    });
    
    return(
    <>
    <PhoneNav/>
     <Navbar/>
     <div className="w-full flex">
     <Sidebar/>
     {/* the right container */}
     <div className="w-full md:ml-[236px] md:p-5">
     {/* the image banner */}
     <div className=" md:block hidden w-full">
     <img src={assets.banner_icon} className="w-full h-[230px] object-cover rounded-md"/>
     </div>
     {/* the profile information */}
     <div className="w-full mt-5 md:p-0 p-2">
    {/* the user information */}
     <div className="flex gap-6">
     <div>
     <img src={userData?.profile_pic} className="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover"/>
     </div>
     {/* the other details */}
     <div className="pt-3">
     <h1 className="font-[roboto-black] text-[#101010] text-lg md:text-2xl">{userData?.fullname}</h1>
     <h2 className="font-[roboto-light]">@{userData?.username}</h2>
     <p>{userData?.followers.length} followers | {userData?.following.length} following</p>
     <p className="hidden md:block">I am a fullstack software developer...more</p>
     {/* the buttons */}
     <div className="flex items-center gap-4">
     <button onClick={()=>followUser(userData?._id)} className="py-2 px-5 cursor-pointer rounded-full bg-red-500 mt-3 font-[rubik-light] text-white">
     {userInfo?.following.includes(userData?._id)?'Following':'Follow'}
     </button>
     </div>
     </div>
     </div>
     </div>
     {/* the bottom navigation */}
     <div className="w-full">
     <div className="pt-5">
     <ul>
     <li className="inline cursor-pointer font-[Arial] px-2 md:px-6">VIDEOS</li>
     <li className="inline cursor-pointer font-[Arial] px-6">REELS</li>
     </ul>
     </div>
     <hr className="mt-2 h-[1px] bg-gray-200 outline-none border-none"/>
     </div>
     {/* the user's videos and posts */}
     <div className="w-full grid-cols-1 grid md:grid-cols-4 gap-5 pt-4 md:pt-6 pb-24 d:pb-5">
     {userPosts.map((item:VideoPostModel,index:any)=>{
        if(item.post_type==="video"){
            return <SavedVideo {...item} key={index}/>
        }
     })}
     </div>
     </div>
     </div>
     <BottomNav/>
    </>
    )
}

export default OtherProfile;