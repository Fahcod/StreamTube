import { BiPlusCircle, BiSolidVideos } from "react-icons/bi";
import { FaClock, FaHouse, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";


const BottomNav = () => {
  return (
    <div className="w-full flex dark:bg-[#101010] px-2 items-center justify-between md:hidden bg-white fixed bottom-0 h-[60px] border-solid border-t-[1px] dark:border-[#333] border-gray-200">
    
    <Link to="/">
    <div className="flex flex-col items-center gap-0.5">
    <FaHouse className="w-6.5 h-6.5 text-red-500"/>
    <p className="font-[roboto-light] text-xs text-red-500">Home</p>
    </div>
    </Link>

    <div className="flex flex-col items-center gap-0.5">
    <BiSolidVideos className="w-6.5 h-6.5 dark:text-[#e9e9e9] text-[#333232]"/>
    <p className="font-[roboto-light] text-[#101010] dark:text-[#e9e9e9] text-xs">Reels</p>
    </div>

    <div className="flex flex-col items-center gap-0.5">
    <BiPlusCircle className="w-8 h-8 text-[#333232] dark:text-[#e9e9e9]"/>
    </div>

    <Link to="/watched">
    <div className="flex flex-col items-center gap-0.5">
    <FaClock className="w-5.5 h-5.5 text-[#333232] dark:text-[#e9e9e9]"/>
    <p className="font-[roboto-light] text-[#101010] dark:text-[#e9e9e9] text-xs">Watched</p>
    </div>
    </Link>
    
    <Link to="/profile">
    <div className="flex flex-col items-center gap-0.5">
    <FaUser className="w-5.5 h-5.5 text-[#333232] dark:text-[#e9e9e9]"/>
    <p className="font-[roboto-light] text-[#101010] dark:text-[#e9e9e9] text-xs">Profile</p>
    </div>
    </Link>

    </div>
  )
}

export default BottomNav;
