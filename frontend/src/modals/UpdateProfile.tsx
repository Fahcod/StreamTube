import { useDispatch, useSelector } from "react-redux"
import type { User } from "../interfaces/interfaces"
import { useContext, useState } from "react";
import { setShowUPdateProfile } from "../slices/modals.slice";
import { axiosInstance } from "../APIs/api";
import { AppContext } from "../context/AppContext";

const UpdateProfile = () => {

  // the image uploaded
  const [imageFile,setImageFile] = useState<any>();
  const isShow:boolean = useSelector((state:any)=>state.modals.show_update_profile);
  const dispatch = useDispatch();
  const {fetchUserData} = useContext<any>(AppContext);
  const userData:User = useSelector((state:any)=>state.user);
  const [isSending,setisSending] = useState(false);
  // store the user information
  const [userInfo,setUserInfo] = useState({
    username:userData?.username,
    profile_bio:userData?.profile_bio
  });

  const handleChange = (e:any) =>{
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
  }

  const submitData = async ():Promise<void> =>{
    setisSending(true);
    // upload the image first
    let formData = new FormData();
    formData.append("file",imageFile);
    // uploadin the image file and if successfull,send the data
    let responseOne = await axiosInstance.post('/api/v1/files/upload',formData)
    if(responseOne.status === 201){
    // create the dataObject
    const dataObject = {
      username:userInfo.username,
      profile_bio:userInfo.profile_bio,
      profile_pic:responseOne.data.video_url
    }
    let response = await axiosInstance.put('/api/v1/user/update-profile',dataObject);
    if(response.status === 202){
      alert(response.data.message);
      fetchUserData();
      setisSending(false);
      dispatch(setShowUPdateProfile(false))
    }else{
      alert(response.data.message);
     console.log(response.data.message);
     setisSending(false)
    }
    }

  }


  return (
    <div className={`w-full ${isShow?'flex':'hidden'} items-center justify-center h-screen bg-[#0000006b] fixed top-0 z-[300]`}>
    {/* the profile upload form */}
    <div className="bg-white h-screen md:h-[unset] w-full md:w-[350px] px-4 py-5 pb-5 md:rounded-md">
    {/* the header */}
    <div className="w-full flex justify-between">
    <h1 className="font-[roboto-medium]">Update profile information</h1>
    <p onClick={()=>{dispatch(setShowUPdateProfile(false))}} className="font-[roboto-medium] text-red-500 cursor-pointer">Close</p>
    </div>
    {/* the profile image */}
    <div className="w-full flex justify-center pt-7">
    <div>
    <label htmlFor="prof">
    {imageFile?<img src={URL.createObjectURL(imageFile)} className="w-36 h-36 rounded-full object-cover"/>:
    <img src={userData.profile_pic} className="w-36 h-36 rounded-full object-cover"/>
    }
    </label>
    <input type="file" id="prof" onChange={(e:any)=>setImageFile(e.target.files[0])} hidden/>
    </div>
    </div>
    {/* the texts */}
    <div className="w-full pt-5">
    <p className="font-[roboto-medium] text-[#454545] text-sm">New username</p>
    <input type="text" name="username" onChange={handleChange} value={userInfo.username} placeholder="type your new username" className="mt-2 font-[roboto-light] outline-none rounded-md p-2 w-full border-solid border-[1px] border-gray-200" autoComplete="off"/>
    </div>
    <div className="w-full pt-5">
      <p className="font-[roboto-medium] text-[#454545] text-sm">New user bio</p>
      <textarea onChange={handleChange} value={userInfo.profile_bio} name="profile_bio" placeholder="type your profile bio" className="font-[roboto-light] rounded-md outline-none h-[110px] mt-2 p-1 w-full border-solid border-[1px] border-gray-200"></textarea>
    </div>
    {/* the upload button */}
    <div className="w-full mt-5">
    <button disabled={isSending?true:false} onClick={()=>submitData()} className={`text-white ${isSending?'bg-red-400':'bg-red-500 '} cursor-pointer font-[roboto-light] p-2 w-full rounded-md`}>Update your profile</button>
    </div>
    </div>
    </div>
  )
}

export default UpdateProfile
