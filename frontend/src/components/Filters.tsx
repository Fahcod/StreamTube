import { useState } from "react";

const filters:any[] = [
  "All",
  "Technology",
  "Islam",
  "Tekinologiya",
  "Space exploration",
  "Coder415",
  "Most watched",
  "Trending",
  "Watched",
];


const Filters = () => {

    const [activeLink,setActiveLink] = useState("All");

  return (
    <div className="w-full overflow-x-scroll [&::-moz-scrollbar]:w-0 [&::-webkit-scrollbar]:w-0 flex items-center gap-3 md:gap-4 px-2 md:px-5 py-5">
    {[...filters].map((item,index)=>{
        return (
            <div onClick={()=>setActiveLink(item)} className={`${activeLink === item?'bg-[#fb2c36] text-white':'dark:text-[#000]'} flex-shrink-0 ${activeLink === item?'border-[#fb2c36]':'bg-[#ebebeb] dark:bg-[#444]'} cursor-pointer py-1.5 px-4 rounded-md`} key={index}>
            <p className="font-[rubik-light] dark:text-white text-sm md:text-[15px]">{item}</p>
            </div>
        )
    })}
    </div>
  )
}

export default Filters
