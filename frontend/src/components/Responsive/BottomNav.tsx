import { BiPlayCircle, BiPlusCircle } from "react-icons/bi";
import { FaHouse, FaRegClock, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";


const BottomNav = () => {
  return (
    <div className="w-full flex px-2 items-center justify-between md:hidden bg-white fixed bottom-0 h-[60px] border-solid border-t-[1px] border-gray-200">
    
    <Link to="/home">
    <div className="flex flex-col items-center gap-0.5">
    <FaHouse className="w-6.5 h-6.5 text-red-500"/>
    <p className="font-[roboto-light] text-xs text-red-500">Home</p>
    </div>
    </Link>

    <div className="flex flex-col items-center gap-0.5">
    <BiPlayCircle className="w-7 h-7 text-[#333232]"/>
    <p className="font-[roboto-light] text-[#101010] text-xs">Reels</p>
    </div>

    <Link to="/create">
    <div className="flex flex-col items-center gap-0.5">
    <BiPlusCircle className="w-7 h-7 text-[#333232]"/>
    <p className="font-[roboto-light] text-[#101010] text-xs">Create</p>
    </div>
    </Link>

    <Link to="/watched">
    <div className="flex flex-col items-center gap-0.5">
    <FaRegClock className="w-5.5 h-5.5 text-[#333232]"/>
    <p className="font-[roboto-light] text-[#101010] text-xs">Watched</p>
    </div>
    </Link>
    
    <Link to="/profile">
    <div className="flex flex-col items-center gap-0.5">
    <FaRegUser className="w-5.5 h-5.5 text-[#333232]"/>
    <p className="font-[roboto-light] text-[#101010] text-xs">Profile</p>
    </div>
    </Link>

    </div>
  )
}

export default BottomNav;
