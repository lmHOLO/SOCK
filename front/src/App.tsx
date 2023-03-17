import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import '@/styles/reset.css';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Redirect from '@/pages/Redirect';
import NotFound from '@/pages/NotFound';
import useMember from '@/hooks/memberHook';
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
]);
export default function App() {
  const { isLoggedIn } = useMember();
  return (
    <div>
      {/* <div
        style={isLoggedIn ? { width: '360px', margin: '52px auto' } : { margin: 0 }}
        className={isLoggedIn ? 'page' : 'login'}
      > */}
      <div className={isLoggedIn ? 'page' : 'login'}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
