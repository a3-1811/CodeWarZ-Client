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
      <div className="fixed h-full w-16 overflow-hidden duration-1000 bg-gray-500 transition-width z-10 right-0 top-0 bg-opacity-20">
        <ul className="flex flex-col items-center h-full w-full">
          <li className="my-9">
            <a href="!@" className="">
              <i className="fa fa-cog text-white text-xl"></i>
            </a>
          </li>
          <li className="">
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
