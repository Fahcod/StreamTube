import PostsContainer from "./PostsContainer";
import Sidebar from "./Sidebar";


const MainContainer = () => {
  return (
    <div className="w-full flex">
      <Sidebar/>
      <PostsContainer/>
    </div>
  )
}

export default MainContainer;
