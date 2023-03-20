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
