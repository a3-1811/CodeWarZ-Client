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
import MessagePage from './pages/page/Home/MessagePage';
import Rank from './pages/page/Home/Rank';
import Friends from './pages/page/Home/Friends';
import Notices from './pages/page/Home/Notices';
import Battle from './pages/page/Home/Battle';
import Stars from './pages/page/Home/Stars';
//Admin template
import Dashboard from './pages/page/Admin/Dashboard';
import ManagerChanllenge from './pages/page/Admin/ManagerChanllenge';
import ManagerDiffcult from './pages/page/Admin/ManagerDiffcult';
import ManagerNotification from './pages/page/Admin/ManagerNotification';
import ManagerUser from './pages/page/Admin/ManagerUser';
import Statistic from './pages/page/Admin/Statistics';

import CodeTeamplate from './templates/CodeTeamplate';
import AdminTeamplate from './templates/AdminTeamplate';

import NextStep from './pages/page/Home/Stars/NextStep';
import Fight from './pages/page/Home/Battle/Fight';
import BattleResult from './pages/page/Home/BattleResult';
import VNPayReturn from './pages/page/Home/VNPayReturn';
import AddChanllenge from './pages/page/Admin/ManagerChanllenge/AddChanllenge';
import DetailChallenge from './pages/page/Admin/ManagerChanllenge/DetailChallenge';
import UpdateChallenge from './pages/page/Admin/ManagerChanllenge/UpdateChanllenge';


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
    path: '/friends',
    element: <ProtectedRoute><Friends /></ProtectedRoute>,
  },
  {
    path: '/VNPayReturn',
    element: <CodeTeamplate><VNPayReturn /></CodeTeamplate>,
  },
  {
    path: '/rank',
    element: <ProtectedRoute><Rank /></ProtectedRoute>,
  },
  {
    path: '/battleResult/:winnerId',
    element: <CodeTeamplate><BattleResult /></CodeTeamplate>,
  },
  {
    path: '/battle',
    element: <ProtectedRoute><Battle /></ProtectedRoute>,
  },
  {
    path: '/fight/:room',
    element: <CodeTeamplate><Fight /></CodeTeamplate>,
  },
  {
  path: '/notices',
  element: <ProtectedRoute><Notices /></ProtectedRoute>,
  },
  {
    path: '/me',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '/stars',
    element: <ProtectedRoute><Stars /></ProtectedRoute>,
  },
  {
    path: '/converstation',
    element: <ProtectedRoute ><MessagePage /></ProtectedRoute>,
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
    path: '/stars/:method',
    element: <ProtectedRoute ><NextStep /></ProtectedRoute>,
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
    path: '/dashboard',
    element: <AdminRoute><Dashboard /></AdminRoute>
  },
  {
    path: '/manager-chanllenge',
    element: <AdminRoute><ManagerChanllenge /></AdminRoute>
  },
  {
    path: '/manager-chanllenge/add',
    element: <AdminRoute><AddChanllenge /></AdminRoute>
  },
  {
    path: '/manager-chanllenge/detail/:id',
    element: <AdminRoute><DetailChallenge /></AdminRoute>
  },
  {
    path: '/manager-chanllenge/update/:id',
    element: <AdminRoute><UpdateChallenge /></AdminRoute>
  },
  {
    path: '/manager-difficult',
    element: <AdminRoute><ManagerDiffcult /></AdminRoute>
  },
  {
    path: '/manager-notification',
    element: <AdminRoute><ManagerNotification /></AdminRoute>
  },
  {
    path: '/manager-user',
    element: <AdminRoute><ManagerUser /></AdminRoute>
  },
  {
    path: '/statistic',
    element: <AdminRoute><Statistic /></AdminRoute>
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


const AdminRoute = (
  {redirectPath = '/login',
  children}
) => {
    return (
      <AdminTeamplate>
        {children}
      </AdminTeamplate>
    )
};

export default routes;