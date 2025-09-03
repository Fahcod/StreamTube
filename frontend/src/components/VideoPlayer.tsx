import { useRef, useState } from "react";
import { BiFullscreen, BiPause, BiPlay, BiSkipNext, BiSkipPrevious, BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";

const VideoPlayer = (props:{video_url:string | undefined}) => {

  // the player states
  const [isPlaying,setIsplaying] = useState(false);
  const [controlsVisible,setControlsVisisble] = useState(true);
  const [sliderValue,setSliderValue] = useState<number>(0);
  const [volume,setVolume] = useState(100);

  const videoElem = useRef<HTMLVideoElement | any>(null);
  const video = videoElem.current;

  function handlePlay(){
    if(isPlaying){
      setIsplaying(false);
      video.pause()
      setControlsVisisble(true)
    }else{
      setIsplaying(true);
      video.play();
      setControlsVisisble(false)
    }
  }

  function moveSlider(){
    const duration = video.duration;
    const currentTime = video.currentTime;
    const progress = (currentTime / duration) * 100;
    setSliderValue(progress);
  }

  function seekVideo(){
    const duration = video.duration;
    const progress = sliderValue;
    const currentTime = (progress / 100) * duration;
    video.currentTime = currentTime;
  }

  function showVideoControls(){
  setControlsVisisble(true)
  }

  return (
    <div className="w-full flex max-h-[280px] md:max-h-[470px] object-cover overflow-hidden relative">
    <video src={props.video_url} onClick={()=>showVideoControls()} onTimeUpdate={()=>moveSlider()} ref={videoElem} className="w-full md:rounded-md h-full"></video>
     {/* the video controls */}
    <div onMouseOver={()=>{showVideoControls()}} className={`w-full ${controlsVisible?'flex':'hidden'} duration-1000 bg-gradient-to-t from-[0%] from-[#000000e5] to-transparent flex-col justify-between h-full left-0 z-[10] absolute md:rounded-md`}>
    
    {/* the top container */}
    <div className=""></div>

    {/* the middle container */}
    <div onClick={()=>handlePlay()} className="w-full cursor-pointer flex justify-center">
    <div className="bg-[#00000067] rounded-full">
    {isPlaying?<BiPause className="text-white w-12 h-12"/>:<BiPlay className="text-white w-12 h-12"/>}
    </div>
    </div>

    {/* the bottom container */}
    <div className="w-full px-2 sm:py-0 py-2">
    <input type="range" onInput={()=>seekVideo()} onChange={(e:any)=>{setSliderValue(e.target.value)}} value={sliderValue} className="w-full cursor-pointer" id="slider"/>
    {/* the bottom opts */}
    <div className="w-full flex flex-row items-center justify-between">
    {/* the left cont */}
    <div className="flex items-center gap-5">
    <div className="hidden sm:flex items-center gap-3">
    <BiSkipPrevious className="text-white w-9 h-9 cursor-pointer"/>
    <div onClick={()=>handlePlay()}>
    {isPlaying?<BiPause className="text-white w-9 h-9 cursor-pointer"/>:<BiPlay className="text-white w-9 h-9 cursor-pointer"/>}
    </div>
    <BiSkipNext className="text-white w-9 h-9 cursor-pointer"/>
    </div>
    <div>
    <p className="text-white text-sm md:text-[15px]">0:01/1:20</p>
    </div>
    </div>
    {/* the right cont */}
    <div className="flex items-center gap-6">
    <div className="flex items-center gap-3">
    {volume == 0?<BiSolidVolumeMute className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-white"/>:
    <BiSolidVolumeFull className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-white"/>
    }
    <input type="range" onInput={(e:any)=>{
      setVolume(e.target.value);
      video.volume = volume / 100
      }} value={volume} id="slider" className="w-16"/>
    </div>
    <BiFullscreen onClick={()=>video.requestFullscreen()} className="cursor-pointer text-white w-5.5 h-5.5 sm:w-6.5 sm:h-6.5"/>
    </div>
    </div>
    </div>

    </div>

    </div>
  )
}

export default VideoPlayer;
