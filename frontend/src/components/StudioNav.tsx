import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudioNav = () => {

  const userProfile = useSelector((state:any)=>state.user.profile_pic);

  return (
    <div className="w-full hidden md:flex sticky top-0 bg-white px-6 items-center justify-between z-[200] h-[60px] border-solid border-b-[1px] border-gray-100">
    {/* the app logo */}
    <div>
    <h1 className="font-[roboto-black] text-2xl text-[#101010]">Stream<span className="text-red-500">Studio</span></h1>
   </div>

   {/* the right container */}
   <Link to="/profile">
    <img src={userProfile} className="w-[40px] h-[40px] bg-[#efefef] rounded-full"/>
   </Link>
    </div>
  )
}

export default StudioNav;
