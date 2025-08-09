import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/Homepage'
import WatchPage from './pages/WatchPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppContextProvider from './context/AppContext';
import ProfilePage from './pages/ProfilePage';
import OtherProfile from './pages/OtherProfile';
import CreatePage from './pages/CreatePage';
import WatchedVideos from './pages/WatchedVideos';
import SavedVideos from './pages/SavedVideos';
import StudioPage from './pages/StudioPage';
import ReelsPage from './pages/ReelsPage';
import SearchResults from './pages/SearchResults';
import SplashScreen from './components/SplasScreen';

const router = createBrowserRouter([
  {
   path:"/",
   element:<SplashScreen/>
  },
  {
    path: "/home",
    element: <Homepage />
  }, {
    path: "/watch/:videoId",
    element: <WatchPage />
  }, {
    path:"/signup",
    element:<SignupPage/>
  },{
    path:"/login",
    element:<LoginPage/>
  },{
    path:"/profile",
    element:<ProfilePage/>
  },{
    path:"/account/:accountId",
    element:<OtherProfile/>
  },{
    path:"/create",
    element:<CreatePage/>
  },
  {
    path:"/watched",
    element:<WatchedVideos/>
  },{
    path:"/saved",
    element:<SavedVideos/>
  },{
    path:"/reels/:reelId",
    element:<ReelsPage/>
  },{
    path:"/studio",
    element:<StudioPage/>
  },{
    path:"/search/:searchTerm",
    element:<SearchResults/>
  }

])

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
    <AppContextProvider>
    <RouterProvider router={router} />
    </AppContextProvider>
    </Provider>
  </>
)
