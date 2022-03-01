import React from 'react';
function Main() {
  return (
    <div className="bg-gray-800 w-full h-screen max-h-screen">
      {/* Sidebar left */}
      <div className="fixed h-full w-14 ml-4 overflow-hidden duration-1000 bg-gray-500 transition-width z-10 left-0 bottom-0 rounded-xl top-16 bg-opacity-20">
        <ul
          className="flex flex-col items-center w-full"
          style={{ height: '90%' }}
        >
          <li className="my-5 hover:border-r-2 hover:border-secondary text-center hover:text-secondary  w-full">
            <a href="!@" className=" rounded-full block">
              <i className="fa fa-biohazard text-gray-500 text-xl p-2 hover:shadow-circle"></i>
            </a>
          </li>
          <li className="my-5 hover:border-r-2 hover:border-secondary">
            <a href="!@" className="">
              <i className="fab fa-facebook-messenger text-gray-500 text-xl hover:text-secondary rounded-full px-1 hover:shadow-circle"></i>
            </a>
          </li>
          <li className="my-5 hover:border-r-2 hover:border-secondary">
            <a href="!@" className="">
              <i className="fa fa-user-friends text-gray-500 text-xl hover:text-secondary rounded-full px-1 hover:shadow-circle"></i>
            </a>
          </li>
          <li className="my-5 hover:border-r-2 hover:border-secondary">
            <a href="!@" className="">
              <i className="fa fa-bell text-gray-500 text-xl hover:text-secondary rounded-full px-1 hover:shadow-circle"></i>
            </a>
          </li>
          <li className="my-5 hover:border-r-2 hover:border-secondary">
            <a href="!@" className="">
              <i className="fa fa-trophy text-gray-500 text-xl hover:text-secondary rounded-full px-1 hover:shadow-circle"></i>
            </a>
          </li>
          <li className="my-5 hover:border-r-2 hover:border-secondary mt-auto">
            <a href="!@" className="">
              <i className="fa fa-sign-out-alt text-gray-500 text-xl hover:text-secondary rounded-full px-1 hover:shadow-circle"></i>
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
              ArtioUNC
            </span>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only text-white">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1646061544926-d6d155c8e593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="user"
              />
            </button>
            <div
              className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <a
                    href="#!"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
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
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="#!"
                  className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
                  aria-current="page"
                >
                  12:56 PM
                </a>
              </li>
              <li
                className="flex items-center justify-center"
                style={{ marginLeft: 800 }}
              >
                <i className="fa fa-star text-yellow-400 mr-2 text-xl"></i>
                <a
                  href="#!"
                  className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
                >
                  8879 START
                </a>
                <a
                  href="!#"
                  className="ml-2 bg-gray-500 rounded-md text-center"
                  style={{ width: 20, height: 20 }}
                >
                  +
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Sidebar right */}
      <div className="fixed h-full w-14 mr-4 overflow-hidden duration-1000 bg-gray-500 transition-width z-10 right-0 top-16 rounded-xl bg-opacity-20">
        <ul className="flex flex-col items-center h-full w-full">
          <li className="my-5">
            <a href="!@" className="">
              <i className="fa fa-cog text-white text-xl"></i>
            </a>
          </li>
          <li className="my-5">
            <a href="!@" className="">
              <i className="fa fa-user text-white text-xl"></i>
            </a>
          </li>
          <span
            className="block w-full mt-3 mb-3 bg-gray-500"
            style={{ height: 1 }}
          />
          <li className="px-3 ">
            <div className="flex flex-col justify-center items-center">
              <div className="h-12 w-12">
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
              <div className="flex flex-col justify-center items-center my-4 h-12 w-12">
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
              <div className="h-12 w-12">
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
