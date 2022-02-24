import React from 'react';
function Main() {
  return (
    <div className="bg-gray-800 w-full h-screen">
      <div className="fixed h-full w-16 overflow-hidden duration-1000 bg-gray-500 transition-width z-10 left-0 top-0 bg-opacity-20">
        <ul className="flex flex-col items-center h-full w-full">
          <li className="hover:text-secondary text-gray-500 text-xl mt-5 p-4">
            <a href="!@" className="text-lg font-bold">
              CWZ
            </a>
          </li>
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
    </div>
  );
}

export default Main;
