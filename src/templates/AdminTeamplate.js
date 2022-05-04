import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserApi from "../apis/userApi";
import { Link,useLocation } from "react-router-dom";
// Zutand store
import useStore from "../store/useStore";

function Main({ children }) {
  const location = useLocation();
  const updateInfo = useStore((state) => state.updateInfo);
  const user = useStore((state) => state.user);
  const fetchMyChapters = useStore((state) => state.fetchMyChapters);
  const updateChanllenges = useStore((state) => state.updateChanllenges);
  const updateDifficults = useStore((state) => state.updateDifficults);

  const history = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        let checkAuth = await UserApi.checkAuthen();
        localStorage.setItem("acc", JSON.stringify(checkAuth.user));
        updateInfo(checkAuth.user);
        await fetchMyChapters()
        if (checkAuth.user.programing_languages.length === 0) {
          history("/chooseLanguages");
        }
        if(!checkAuth.user.isAdmin){
           history("/");
        }
        let { manager } = await UserApi.manager();
        updateChanllenges(manager.chanllenges)
        updateDifficults(manager.difficults)
      } catch (error) {
        localStorage.removeItem("acc");
        localStorage.removeItem("tokenAuth");
        history("/login");
      }
    })();
  }, [history, updateInfo,fetchMyChapters]);
  const handleLogout = async () => {
    await UserApi.logout();
    localStorage.removeItem("acc");
    localStorage.removeItem("tokenAuth");
    history("/login");
  };
  return (
    <div className={`w-full h-screen max-h-screen md:p-1 flex relative`}>
      {/* Navbar */}
      <nav className="dashboard bg-transparent border-gray-200 sm:px-4 py-2.5 z-10 w-[200px] min-w-[180px] h-full">
          <div className="left-nav w-full h-full flex flex-col items-center">
            <div className="logo flex justify-center items-center h-[100px] w-full">
              <Link to="/" className="flex items-center">
                <span className="self-center text-2xl font-bold whitespace-nowrap text-black">
                  CWZ
                </span>
              </Link>
            </div>
            <ul className="flex flex-col items-center w-full h-full">
              <NavLink className="block w-full" to="/dashboard" activeclassname="active">
              <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
                <i className="fa fa-table mr-[8px]"></i>Dashboard
              </li>
                </NavLink>
                <NavLink className="block w-full" to="/manager-chanllenge" activeclassname="active">
              <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
              <i className="fab fa-pied-piper-hat mr-[8px]"></i>Challenge
              </li>
                </NavLink>
                <NavLink className="block w-full" to="/manager-difficult" activeclassname="active">
              <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
              <i className="fab fa-optin-monster mr-[8px]"></i>Diffcult
              </li>
                </NavLink>
                <NavLink className="block w-full" to="/manager-notification" activeclassname="active">
              <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
              <i className="fa fa-bullhorn mr-[8px]"></i>Notification
              </li>
                </NavLink>
                <NavLink className="block w-full" to="/manager-user" activeclassname="active">
              <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
              <i className="fa fa-users-cog mr-[8px]"></i>User
              </li>
                </NavLink>
                <NavLink className="block w-full" to="/statistic" activeclassname="active">
              <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
              <i className="fa fa-atlas  mr-[8px]"></i>Statistic
              </li>
                </NavLink>
              <button className="block text-left w-full mt-auto" onClick={handleLogout} activeclassname="active">
                <li className="px-[17px] py-[10px] text-sm font-medium text-gray-500 hover:text-white hover:bg-primary">
                <i className="fa fa-sign-out-alt mr-[8px]"></i>Logout
                </li>
              </button>
            </ul>
          </div>
      </nav>
      {/* Content redering */}
      <div className="md:p-5 main__content px-5 w-full">{children}</div>
      <div className="user fixed top-[10px] right-[48px] flex items-center">
        <div className="iconBox bg-yellow-500 bg-opacity-10 rounded-full h-9 w-9 flex justify-center items-center">
          <i className="fa fa-bell text-yellow-400"></i>
        </div>
          <div className="info flex items-center gap-x-2">
            <div className="imgBox h-10 w-10 ml-6 rounded-full">
              <Link to="/me"> 
              <img src={user.avatar} className="rounded-full h-full w-full" alt={user.fullName} />
              </Link>
            </div>
            <div className="flex flex-col items-start ">
              <span className="text-xs">Hello</span>
              <span className="text-sm font-bold">{user.fullName}</span>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Main;
