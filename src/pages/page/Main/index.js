import React from "react";
function Main() {
  return (
    <div className="bg-gray-800 w-full h-screen max-h-screen">
      {/* Sidebar left */}
      <div className="sidebar__left fixed h-full ml-4 overflow-hidden duration-1000 bg-gray-500 transition-width z-10 left-0 bottom-0 rounded-xl top-16 bg-opacity-20">
        <ul
          className="flex flex-col items-center w-full"
          style={{ height: "90%" }}
        >
          <li className="my-3 text-center">
            <a href="!@" className="active">
              <i className="fa fa-biohazard text-gray-500 text-xl p-2 "></i>
            </a>
          </li>
          <li className="my-3 text-center">
            <a href="!@">
              <i className="fab fa-facebook-messenger text-gray-500 text-xl p-2 "></i>
            </a>
          </li>
          <li className="my-3 text-center">
            <a href="!@">
              <i className="fa fa-user-friends text-gray-500 text-xl p-2 "></i>
            </a>
          </li>
          <li className="my-3 text-center">
            <a href="!@">
              <i className="fa fa-bell text-gray-500 text-xl p-2 "></i>
            </a>
          </li>
          <li className="my-3 text-center">
            <a href="!@">
              <i className="fa fa-trophy text-gray-500 text-xl p-2 "></i>
            </a>
          </li>
          <li className="mt-auto text-center">
            <a href="!@">
              <i className="fa fa-sign-out-alt text-gray-500 text-xl p-2 "></i>
            </a>
          </li>
        </ul>
      </div>
      {/* Navbar */}
      <nav className="bg-gray-800 border-gray-200 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#!" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              CWZ
            </span>
          </a>
          <div className="flex items-center md:order-2">
            <span className="self-center text-sm font-bold pr-4 whitespace-nowrap text-white">
              Abe1811
            </span>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="profileSetting"
              aria-expanded="false"
              data-dropdown-toggle="dropdownProfile"
            >
              <span className="sr-only text-white">Open user menu</span>
              <img
                className="w-11 h-11 rounded-full"
                src="https://images.unsplash.com/photo-1646061544926-d6d155c8e593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="user"
              />
            </button>
            {/* Dropdown on user image click */}
            <div
              className=" hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdownProfile"
            >
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">
                  abe1811
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  huybest10@gmail.com
                </span>
              </div>
              <ul className="py-1" aria-labelledby="profileSetting">
                <li>
                  <a
                    href="#!"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Your profile
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Desktop,PC display */}
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 flex-1 mx-5"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium flex-1">
              <li className="flex items-center justify-center">
                <a
                  href="#!"
                  className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
                  aria-current="page"
                >
                  12:56 PM
                </a>
              </li>
              <li className="flex items-center flex-1 justify-end">
                <i className="fa fa-star text-yellow-400 mr-2 text-lg"></i>
                <span
                  href="#!"
                  className="block text-white text-sm font-bold"
                >
                  8879 STAR
                </span>
                <a
                  href="!#"
                  className=" ml-2 bg-gray-700 rounded-md text-gray-50 font-bold text-sm block text-center "
                  style={{ width: 20, height: 20, lineHeight: "20px" }}
                >
                  +
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Sidebar right */}
      <div className="sidebar__right fixed h-full mr-4 overflow-hidden duration-1000 bg-gray-500 transition-width z-10 right-0 top-16 rounded-xl bg-opacity-20">
        <ul className="flex flex-col items-center h-full w-full">
          <li className="my-3">
            <a href="!@" className="">
              <i className="fa fa-user text-white text-lg"></i>
            </a>
          </li>
          <span
            className="block w-full mt-0 mb-3 bg-gray-500"
            style={{ height: 1 }}
          />
          <li className="px-3 ">
            <div className="flex flex-col justify-center items-center">
              <div className="h-10 w-10">
                <img
                  src="https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
          </li>
          <li className="px-3">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center my-4 h-10 w-10">
                <img
                  src="https://images.unsplash.com/photo-1645632698932-463c91daea4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
          </li>
          <li className="px-3 ">
            <div className="flex flex-col justify-center items-center">
              <div className="h-10 w-10">
                <img
                  src="https://images.unsplash.com/photo-1645522165850-a8b468936735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Main;
