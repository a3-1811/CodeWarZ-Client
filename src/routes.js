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
import LanguageBegin from './pages/page/Home/LanguageBegin';
import Chapter from './pages/page/Home/Chapter';
import CodePlayground from './pages/page/Home/CodePlayground';
import CodeTeamplate from './templates/CodeTeamplate';


const routes = () => [
  {
    path: '/',
    element: <ProtectedRoute><Main /></ProtectedRoute>,
  },
  {
    path: '/chooseLanguages',
    element: <ProtectedRoute><LanguageBegin /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '/chapter/:id',
    element: <ProtectedRoute ><Chapter /></ProtectedRoute>,
  },
  {
    path: '/code/:id',
    element: <CodeRoute ><CodePlayground /></CodeRoute>,
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

const CodeRoute = (
  {redirectPath = '/login',
  children}
) => {
    return (
      <CodeTeamplate>
        {children}
      </CodeTeamplate>
    )
};


export default routes;