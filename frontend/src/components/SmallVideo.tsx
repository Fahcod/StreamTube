import { Link } from "react-router-dom";


const SmallVideo = (props:any) => {
  return (
    <div onClick={()=>props.func()} className="w-full flex  gap-3 flex-col md:flex-row md:gap-5">
    <Link to={`/watch/${props._id}`}>
    <video src={props.video_url} className="md:rounded-md w-full md:w-[auto] md:max-w-56"/>
    </Link>
    {/* the video details */}
    <div className="md:px-0 px-1">
    <h1 className="font-[roboto-bold] dark:text-white text-sm md:text-[16px]">{props.title}...</h1>
    <p className="leading-none text-sm text-[#101010] dark:text-[#a7a7a7] font-[roboto-light]">Codewizard</p>
    <p className="leading-none text-xs text-[#101010] dark:text-[#a7a7a7] font-[roboto-light] pt-1">12d ago 45k views</p>
    </div>
    </div>
  )
}

export default SmallVideo;
