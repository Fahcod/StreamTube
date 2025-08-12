import { BiPlay } from "react-icons/bi";
import { axiosInstance } from "../APIs/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SplashScreen = () =>{

   const navigate = useNavigate();
    // check if the user is authenticated
   const checkAuth = async () => {
           let response = await axiosInstance.get('/api/v1/user/get-user');
          if(response.status === 200){
            navigate("/home")
          }else{
            navigate("/login")
          }
       }

       useEffect(()=>{
       checkAuth()
       },[]);

return(
    <div className="w-full flex items-center justify-center dark:bg-[#101010] h-screen fixed top-0 bg-white z-[400]">
    {/* the div */}
    <div className="flex flex-col items-center gap-3">
    <div className="bg-red-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center">
    <BiPlay className="text-white w-11 h-11 md:w-12 md:h-12"/>
    </div>
    {/* the bottom div */}
    <div className="absolute bottom-10 flex flex-col items-center">
    <h1 className="font-[roboto-black] dark:text-white text-xl">Stream<span className="text-red-500">Tube</span></h1>
    <p className="font-[roboto-light] dark:text-[#999] text-[#454545] text-[13px] md:text-[15px]">By Codewizard 415</p>
    </div>
    </div>
    </div>
)
}

export default SplashScreen;