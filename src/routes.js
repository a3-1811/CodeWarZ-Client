import Login from './pages/page/Login';
import Register from './pages/page/Register';
import Main from './pages/page/Main';
import Profile from './pages/page/Profile';
import Page404 from './pages/page404';
import ForgotPass from './pages/page/ForgotPass';
import VerifyPassword from './pages/page/VerifyPassword';
import Contact from './pages/page/Contact';
//Home Teamplate 
import HomeTeamplate from "./templates/HomeTeamplate.js";

const routes = () => [
  {
    path: '/',
    element: <ProtectedRoute><Main /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPass />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/verify/:token',
    element: <VerifyPassword />
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

const ProtectedRoute = (
  {redirectPath = '/login',
  children}
) => {
    return (
      <HomeTeamplate>
        {children}
      </HomeTeamplate>
    )
};

export default routes;