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

  const history = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        let checkAuth = await UserApi.checkAuthen();
        console.log(checkAuth)
        localStorage.setItem("acc", JSON.stringify(checkAuth.user));
        updateInfo(checkAuth.user);
        await fetchMyChapters()
        if (checkAuth.user.programing_languages.length === 0) {
          history("/chooseLanguages");
        }
        if(!checkAuth.user.isAdmin){
           history("/");
        }
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
    <div className={`w-full h-screen max-h-screen md:p-1`}>
      {/* Navbar */}
      <nav className="bg-transparent border-gray-200 sm:px-4 py-2.5 z-10">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center ml-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
              CWZ
            </span>
          </Link>
          {/* Desktop,PC display */}
          <div className="sm:hidden justify-between items-center w-full flex  flex-1 mx-5">
            <ul className="flex flex-row md:space-x-8 mt-0 text-sm md:font-medium flex-1">
              <li className="flex items-center justify-center">
                <a
                  href="#!"
                  className="block py-2 pr-4 pl-3 text-black rounded md:bg-transparent  md:p-0 dark:text-black"
                  aria-current="page"
                >
                  12:56 PM
                </a>
              </li>
              <li className="flex items-center flex-1 justify-end">
                <i className="fa fa-star text-yellow-400 mr-2 text-lg"></i>
                <span href="#!" className="block text-black text-sm font-bold">
                  {user.point_stars} STAR
                </span>
                <NavLink
                 to="/stars"
                  className=" ml-2 bg-gray-700 rounded-md text-gray-50 font-bold text-sm block text-center "
                  style={{ width: 20, height: 20, lineHeight: "20px" }}
                >
                  +
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center md:order-2">
            <span className="self-center text-sm font-bold pr-4 whitespace-nowrap text-black">
              {user.fullName}
            </span>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="profileSetting"
              aria-expanded="false"
              data-dropdown-toggle="dropdownProfile"
            >
              <span className="sr-only text-black">Open user menu</span>
              <img
                className="w-11 h-11 rounded-full"
                src={user.avatar}
                alt="user"
              />
            </button>
            {/* Dropdown on user image click */}
            <div
              className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdownProfile"
            >
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-black">
                  {user.fullName}
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="profileSetting">
                <li>
                  <NavLink 
                    to="/me"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black"
                  >
                    Your profile
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/stars"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black"
                  >
                    Buy Star
                  </NavLink>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="block py-2 w-full hover:bg-red-600 hover:text-black px-4 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            {/* Mobile menu */}
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:block items-center p-1 ml-3 text-xl text-gray-500 rounded-lg hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-8 h-8"
                fill="#34E7E4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="#34E7E4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              id="mobile-menu"
              className="hidden fixed text-black ml-4  w-1/2  duration-1000 bg-black transition-width z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl bg-opacity-90"
            >
              <ul
                className="flex flex-col items-center w-full"
                style={{ height: "90%" }}
              >
                <li className="my-3 text-center w-full hover:text-primary hover:duration-150">
                  <NavLink to="/" activeclassname="active">
                    <i className="fa fa-code text-gray-500 text-xl p-2"></i>
                    Chanllenge
                  </NavLink>
                </li>
                <li className="my-3 text-center w-full hover:text-primary hover:duration-150">
                  <NavLink to="/battle" activeclassname="active">
                    <i className="fab fa-galactic-senate text-gray-500 text-xl p-2"></i>
                    Battle
                  </NavLink>
                </li>
                <li className="my-3 text-center w-full hover:text-primary hover:duration-150">
                  <NavLink to="/notices" activeclassname="active">
                    <i className="fa fa-bell text-gray-500 text-xl p-2"></i>
                    Notices
                  </NavLink>
                </li>
                <li className="my-3 text-center w-full hover:text-primary hover:duration-150">
                  <NavLink to="/converstation" activeclassname="active">
                    <i className="fab fa-facebook-messenger text-gray-500 text-xl p-2"></i>
                    Message
                  </NavLink>
                </li>
                <li className="my-3 text-center w-full hover:text-primary hover:duration-150">
                  <NavLink activeclassname="active" to="/friends">
                    <i className="fa fa-user-friends text-gray-500 text-xl p-2"></i>
                    Friends
                  </NavLink>
                </li>

                <li className="my-3 text-center w-full hover:text-primary hover:duration-150">
                  <NavLink to="/rank" activeclassname="active">
                    <i className="fa fa-trophy text-gray-500 text-xl p-2"></i>
                    Rank
                  </NavLink>
                </li>
                <li className="text-center w-full hover:text-primary hover:duration-150">
                  <button onClick={handleLogout}>
                    <i className="fa fa-sign-out-alt text-gray-500 text-xl p-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* Content redering */}
      <div className="md:p-5 main__content px-20 w-full">{children}</div>
    </div>
  );
}

export default Main;
