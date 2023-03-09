import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import NotFound from './pages/NotFound';

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
  return (
    <div style={{ margin: '1rem 5rem' }}>
      <RouterProvider router={router} />
    </div>
  );
}
