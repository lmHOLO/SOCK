import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import '@/styles/reset.css';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Redirect from '@/pages/Redirect';
import NotFound from '@/pages/NotFound';
import useMember from '@/hooks/memberHook';
import SnackDetail from '@/pages/SnackDetail';
import RecipeDetail from '@/pages/RecipeDetail';
import RecipePosting from '@/pages/RecipePosting';
import FirebaseUploadTest from './pages/FirebaseUploadTest';
import EventList from '@/pages/EventList';
import EventResult from './pages/EventrResult';
import WorldcupEvent from '@/pages/WorldcupEvent';
import FirstPrefer from '@/pages/FirstPrefer';
import SbtiEvent from '@/pages/SbtiEvent';
import Search from '@/pages/Search';
import Profile from '@/pages/Profile';
import SnackContentPage from '@/pages/SnackContentPage';
import RecipeContentPage from '@/pages/RecipeContentPage';

const router = createBrowserRouter([
  /*   {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
    ],
  }, */
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
    errorElement: <NotFound />,
  },
  {
    path: '/redirect',
    element: <Redirect />,
    errorElement: <NotFound />,
  },
  {
    path: '/snacks/:id',
    element: <SnackDetail />,
    errorElement: <NotFound />,
  },
  {
    path: '/recipes/:id',
    element: <RecipeDetail />,
    errorElement: <NotFound />,
  },
  {
    path: '/recipe-posting',
    element: <RecipePosting />,
    errorElement: <NotFound />,
  },
  {
    path: '/firebasetest',
    element: <FirebaseUploadTest />,
    errorElement: <NotFound />,
  },
  {
    path: '/event',
    element: <EventList />,
    errorElement: <NotFound />,
  },
  {
    path: '/event/sbti/:result',
    element: <EventResult />,
    errorElement: <NotFound />,
  },
  {
    path: '/event/worldcup',
    element: <WorldcupEvent />,
    errorElement: <NotFound />,
  },
  {
    path: '/event/sbti',
    element: <SbtiEvent />,
    errorElement: <NotFound />,
  },
  {
    path: '/search',
    element: <Search />,
    errorElement: <NotFound />,
  },
  {
    path: '/snacks',
    element: <SnackContentPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/snack-content/:theme',
    element: <SnackContentPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/recipes',
    element: <RecipeContentPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/firstprefer',
    element: <FirstPrefer />,
  },
  
]);
export default function App() {
  const { isLoggedIn } = useMember();
  return (
    <div>
      <div className={isLoggedIn ? 'page' : 'login'}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
