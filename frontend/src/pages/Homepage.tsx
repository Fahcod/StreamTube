import { useEffect } from "react";
import MainContainer from "../components/MainContainer";
import Navbar from "../components/Navbar";
import { scrollPage } from "../utils/other";
import PhoneNav from "../components/Responsive/PhoneNav";
import BottomNav from "../components/Responsive/BottomNav";


const Homepage = () => {

  useEffect(()=>{
      scrollPage()
    },[])

  return (
    <div>
      <PhoneNav/>
      <Navbar/>
      <MainContainer/>
      <BottomNav/>
    </div>
  )
}

export default Homepage;
