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
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: 'oauth2/redirect',
    element: <Redirect />,
  },
  {
    path: '/snacks/:id',
    element: <SnackDetail />,
  },
  {
    path: '/recipes/:id',
    element: <RecipeDetail />,
  },
  {
    path: '/recipe-posting',
    element: <RecipePosting />,
  },
  {
    path: '/firebasetest',
    element: <FirebaseUploadTest />,
  },
  {
    path: '/event',
    element: <EventList />,
  },
  {
    path:'/result/enfj',
    element:<EventResult/>,
  },
  {
    path: '/event/worldcup',
    element: <WorldcupEvent />,
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
