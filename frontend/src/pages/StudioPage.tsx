import StudioNav from "../components/StudioNav";

const Sidebar = () =>{
  return(
    <>
    <div className="md:block border-solid border-r-[1px] border-gray-200 bg-white hidden px-6 w-[236px] overflow-y-scroll fixed h-screen pb-24 [&::-moz-scrollbar]:w-0 [&::-webkit-scrollbar]:w-0">
    
    </div>
    </>
  )
}

const StudioPage = () => {
  return (
    <div className="w-full">
    <StudioNav/>
    {/* the content of the page */}
    <div className="w-full flex">
    <Sidebar/>

    </div>
    </div>
  )
}

export default StudioPage;
