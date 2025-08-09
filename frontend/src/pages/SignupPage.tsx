import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {useFormik} from "formik"
import { signupSchema } from "../schemas/schemas";
import { axiosInstance } from "../APIs/api";
import { useState } from "react";

type SignupData = {
  fullname:string,
  username:string,
  email:string,
  password:string
}

const SignupPage = () => {

  const navigate = useNavigate();
  const [isSending,setIsSending] = useState(false);

  const onSubmit = async (values:SignupData) =>{
  setIsSending(true)
  let response = await axiosInstance.post('/api/v1/user/signup',values);
  if(response.status === 201){
    setIsSending(false)
    navigate("/")
  }else{
    setIsSending(false)
    alert(response.data.detail)
  }
  }

  const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
    initialValues:{
      fullname:"",
      username:"",
      email:"",
      password:""
    },
    validationSchema:signupSchema,
    onSubmit
  });

  return (
    <div className="w-full">
    <div className="flex pt-36 w-full h-[100vh] overflow-y-auto items-center justify-center">
        {/* the form */}
        <form method="post" onSubmit={handleSubmit} className="w-[390px] pb-8 shadow-sm rounded-md bg-white">
        {/* the heading */}
        <div className="w-full text-center py-3">
        <h1 className="font-[roboto-black] text-xl">Signup for Stream<span className="text-[#ed3833]">Tube</span></h1>
        </div>
        {/* the form fields */}
        <div className="w-full flex flex-col gap-4 px-7">

        <div className="w-full">
        <p className="font-[rubik-light] py-0.5">Fullname</p>
        <input type="text" name="fullname" onBlur={handleBlur} onChange={handleChange} value={values.fullname} className="p-2 border-solid border-[1px] border-gray-200 w-full rounded-md outline-none" autoComplete="off" placeholder="Your full name"/>
        <p className="text-red-500 text-sm pt-1">{errors.fullname && touched.fullname?errors.fullname:""}</p>
        </div>

        <div className="w-full">
        <p className="font-[rubik-light] py-0.5">Username</p>
        <input type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} className="p-2 border-solid border-[1px] border-gray-200 w-full rounded-md outline-none" autoComplete="off" placeholder="Your username"/>
         <p className="text-red-500 text-sm pt-1">{errors.username && touched.username?errors.username:""}</p>
        </div>

        <div className="w-full">
        <p className="font-[rubik-light] py-0.5">Email</p>
        <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} className="p-2 border-solid border-[1px] border-gray-200 w-full rounded-md outline-none" autoComplete="off" placeholder="Your full email"/>
         <p className="text-red-500 text-sm pt-1">{errors.email && touched.email?errors.email:""}</p>
        </div>

        <div className="w-full">
        <p className="font-[rubik-light] py-0.5">Password</p>
        <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" className="p-2 border-solid border-[1px] border-gray-200 w-full rounded-md outline-none" autoComplete="off" placeholder="Your full password"/>
         <p className="text-red-500 text-sm pt-1">{errors.password && touched.password?errors.password:""}</p>
        </div>

        <div className="full">
        <button disabled={isSending?true:false} type="submit" className={`p-2 w-full text-white font-[rubik-light] ${isSending?'bg-red-400':'bg-[#ed3833]'} rounded-md`}>Signup now</button>
        <p className="text-sm font-[rubik-light] text-[#454545] pt-2">Already have an account?<Link to="/login">Login</Link></p>
        </div>

        <div  className="w-full">
        <p className="text-center text-[#454545]">or</p>
        <hr className="mt-3 outline-none border-none h-[1px] bg-gray-200"/>
        <button className="bg-[#efefef] p-2 rounded-md w-full flex items-center mt-3 cursor-pointer gap-4 justify-center">
        <img src={assets.google_icon} className="w-7 h-7"/>
        <p className="font-[rubik-light]">Continue with google</p>
        </button>
        </div>

        </div>
        </form>
        {/* end of the form */}
    </div>
    </div>
  )
}

export default SignupPage;
