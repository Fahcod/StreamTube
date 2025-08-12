import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { loginSchema } from "../schemas/schemas";
import { axiosInstance } from "../APIs/api";
import { useState } from "react";

type LoginData = {
  email:string,
  password:string
}

const LoginPage = () => {

  const navigate = useNavigate();
  const [isSending,setIsSending] = useState(false);

  const onSubmit = async (values:LoginData) =>{
  setIsSending(true)
  let response = await axiosInstance.post('/api/v1/user/login',values);
    if(response.status === 200){
      navigate("/")
    }else{
      alert(response.data.detail)
      setIsSending(false)
    }
  }

  const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
      initialValues:{
        email:"",
        password:""
      },
      validationSchema:loginSchema,
      onSubmit
    });

  return (
    <div className="w-full">
    <div className="flex w-full h-[100vh] overflow-y-auto items-center justify-center">
        {/* the form */}
        <div className="w-[390px] pb-8 md:dark:bg-[#222] md:shadow-sm rounded-md md:bg-white">
        {/* the heading */}
        <div className="w-full text-center py-3">
        <h1 className="dark:text-white font-[roboto-black] text-xl">Login to Stream<span className="text-[#ed3833]">Tube</span></h1>
        </div>
        {/* the form fields */}
        <form onSubmit={handleSubmit} method="post" className="w-full flex flex-col gap-4 px-7">
        
        <div className="w-full">
        <p className="font-[rubik-light] py-0.5 dark:text-[#999]">Email</p>
        <input type="email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" className="p-2 border-solid dark:text-white dark:border-[#333] border-[1px] border-gray-200 w-full rounded-md outline-none" autoComplete="off" placeholder="Your full email"/>
        <p className="text-red-500 text-sm pt-1">{errors.email && touched.email?errors.email:""}</p>
        </div>

        <div className="w-full">
        <p className="font-[rubik-light] dark:text-[#999] py-0.5">Password</p>
        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} className="p-2 dark:text-white dark:border-[#333] border-solid border-[1px] border-gray-200 w-full rounded-md outline-none" autoComplete="off" placeholder="Your full password"/>
        <p className="text-red-500 text-sm pt-1">{errors.password && touched.password?errors.password:""}</p>
        </div>

        <div className="full">
        <button disabled={isSending?true:false} type="submit" className={`p-2 w-full text-white font-[rubik-light] ${isSending?'bg-red-400':'bg-[#ed3833]'} rounded-md`}>Login now</button>
        <p className="text-sm dark:text-[#999] font-[rubik-light] text-[#454545] pt-2">Dont have an account?<Link to="/signup">Signup</Link></p>
        </div>

        <div  className="w-full">
        <p className="text-center dark:text-[#999] text-[#454545]">or</p>
        <hr className="mt-3 dark:bg-[#333] outline-none border-none h-[1px] bg-gray-200"/>
        <button className="bg-[#efefef] dark:bg-[#333] p-2 rounded-md w-full flex items-center mt-3 cursor-pointer gap-4 justify-center">
        <img src={assets.google_icon} className="w-7 h-7"/>
        <p className="font-[rubik-light] dark:text-white">Continue with google</p>
        </button>
        </div>

        </form>
        </div>
        {/* end of the form */}
    </div>
    </div>
  )
}

export default LoginPage;
