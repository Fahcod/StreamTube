import {BiBell,BiHistory,BiMenu,BiSearch} from "react-icons/bi"
import {FaFacebookMessenger} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const search_history = [
  ""
]

const HistoryItem = (props:any) =>{
  return(
    <>
    <div className="flex items-center gap-1.5 cursor-pointer">
    <BiHistory className="w-5 h-5 text-[#202020]"/>
    <p className="font-[rubik-light]">{props.props}</p>
    </div>
    </>
  )
}


const Navbar = () => {

  const navigate = useNavigate();
  // fetch the user data
  const userProfile:string = useSelector((state:any)=>state.user.profile_pic);
  const {textSearchTerm,setTextSearchTerm} = useContext<any>(AppContext);

  return (
    <div className="w-full dark:bg-[#101010] hidden md:flex sticky top-0 bg-white px-6 items-center justify-between z-[200] h-[60px] border-solid border-b-[1px] dark:border-[#333] border-gray-100">
   {/* the app logo */}
   <div>
    <h1 className="font-[roboto-black] text-2xl text-[#101010] dark:text-white">Stream<span className="text-red-500">Tube</span></h1>
   </div>
    {/* the search bar */}
    <div className="w-[40%] relative">
    <div className="w-full px-3 border-solid border-[1px] rounded-3xl dark:border-[#333] border-gray-200 h-[41px] flex items-center justify-between">
    <input type="text" onChange={(e)=>{
      setTextSearchTerm(e.target.value)
    }} value={textSearchTerm} className="w-[95%] dark:text-white outline-none h-full" placeholder="search here"/>
    <button
    onClick={()=>{navigate(`/search/${textSearchTerm}`)}}
    >
      <BiSearch className="w-5 h-5 text-[#454545]"/>
      </button>
    </div>
    {/* the search history container*/}
    <div className="w-full mt-2.5 absolute z-[200] shadow-md bg-white rounded-bl-md rounded-br-md">
    <div className="flex flex-col gap-4">
    {/* the search history */}
    {search_history.map((item:any,index)=>{
     if(search_history.length>1){
       return <HistoryItem props={item} key={index}/>
     }
    })}
    </div>
    </div>

    </div>
    {/* the last div */}
    <div className="cursor-pointer flex items-center gap-4">
    <div className="flex items-center justify-center dark:text-white dark:bg-[#222] w-[40px] h-[40px] bg-[#efefef] rounded-full">
    <FaFacebookMessenger className="w-5 h-5"/>
    </div>
    <div className="cursor-pointer flex items-center dark:text-white dark:bg-[#222] justify-center w-[40px] h-[40px] bg-[#efefef] rounded-full">
    <BiBell className="w-6 h-6"/>
    </div>
    <div className="cursor-pointer flex items-center dark:text-white dark:bg-[#222] justify-center w-[40px] h-[40px] bg-[#efefef] rounded-full">
    <BiMenu className="w-6 h-6"/>
    </div>
    {/* the user profile picture */}
    <Link to="/profile">
    <img src={userProfile} className="w-[40px] h-[40px] bg-[#efefef] rounded-full"/>
    </Link>
    </div>
    </div>
  )
}

export default Navbar;
