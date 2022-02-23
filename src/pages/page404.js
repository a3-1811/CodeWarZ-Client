import React from 'react';

function Page404() {
  return (
    <section className="py-10 px-0 bg-white">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] h-40r bg-center">
                <h1 className="text-center text-8xl">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="text-4xl">Look like you're lost</h3>
                <p>the page you are looking for not avaible!</p>
                <a
                  href="#_"
                  className="mt-3 relative inline-block text-lg group"
                >
                  <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span className="relative">Back Home</span>
                  </span>
                  <span
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"
                  ></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page404;
