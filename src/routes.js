import Login from "./pages/page/Login";
import Register from "./pages/page/Register";
import Main from "./pages/page/Main";
import Profile from "./pages/page/Profile";
import { Navigate } from "react-router-dom";
import Page404 from "./pages/page404";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Main /> : <Navigate to="/login" />,
  },
  { path: "/profile", element:  isLoggedIn ? <Profile /> : <Navigate to="/login"/> },
  {
    path: "/login",
    element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
  },
  { path: "/register", element: !isLoggedIn ? <Register /> : <Navigate to="/"/>},
  {
    path: "*",
    element: <Page404 />,
  },
];

export default routes;
