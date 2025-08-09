import { BiBell, BiMenu, BiPlay, BiSearch } from "react-icons/bi";


const PhoneNav = () => {
  return (
    <div className="px-2 sticky dark:bg-[#101010] top-0 w-full flex border-solid border-b-[1px] dark:border-[#333] border-gray-200 items-center justify-between md:hidden h-[60px] bg-white z-[100]">
    {/* the app logog */}
    <div className="flex items-center gap-1">
    <div className="bg-red-500 p-0.5 flex items-center justify-center rounded-full">
    <BiPlay className="text-white w-6 h-6"/>
    </div>
    <h1 className="font-[roboto-black] dark:text-white text-lg">Stream<span className="text-red-500">Tube</span></h1>
    </div>

    {/* the right div */}
    <div className="flex gap-3 items-center">
    <BiSearch className="w-6 dark:text-white h-6"/>
    <BiBell className="w-6 dark:text-white h-6"/>
    <BiMenu className="w-7 dark:text-white h-7"/>
    </div>
    </div>
  )
}

export default PhoneNav;
