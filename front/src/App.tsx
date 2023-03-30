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
import SbtiEvent from '@/pages/SbtiEvent';
import Search from '@/pages/Search';
import SnackContentPage from '@/pages/SnackContentPage';
import RecipeContentPage from '@/pages/RecipeContentPage';
import Alchol from './components/Home/Alchol';

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
    path: '/redirect',
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
    path: '/event/sbti/:result',
    element: <EventResult />,
  },
  {
    path: '/event/worldcup',
    element: <WorldcupEvent />,
  },
  {
    path: '/event/sbti',
    element: <SbtiEvent />,
  },
  {
    path: 'search',
    element: <Search />,
  },
  {
    path: '/snack-content/:theme',
    element: <SnackContentPage />,
  },
  {
    path: '/recipe-content/:theme',
    element: <RecipeContentPage />,
  },
  {
    path: '/test',
    element: <Alchol />,
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
