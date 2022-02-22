import React from 'react';

function Login() {
  return (
    <div className="bg-gray-800 flex justify-center lg:justify-center md:justify-start p-0 md:p-10 overflow-x-hidden">
      <form className="max-w-sm bg-white rounded-lg shadow-md py-10 px-8">
        <h1 className="text-2xl font-bold w-screen">Sign in</h1>
        <p className="text-gray-400 text-xs mt-5">
          Login to manage your account
        </p>
        <label className="block text-grey-darker text-sm mb-1 mt-4">
          <span className="block mb-1">Email</span>
          <input
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
            type="email"
            name="email"
            placeholder="you@example.com"
          />
        </label>
        <label className="block text-grey-darker text-sm mb-1  mt-4">
          <span className="block mb-1">Password</span>
          <input
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
            name="password"
            type="password"
            placeholder="Enter 6 character or more"
          />
        </label>
        <div class="mb-4 mt-4">
          <label class="block">
            <input class="mr-2 leading-tight" type="checkbox" />
            <span class="text-sm">Remember me</span>
          </label>
        </div>
        <div class="flex items-center justify-between mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Submit
          </button>
        </div>
        <div className="flex space-x-3 mt-10">
          <button className="flex item-center px-4 py-2 rounded font-bold w-full text-red-600 border border-red-600">
            <img
              className="w-5 mr-4"
              src="./img/icon-gg.png"
              alt="icon-google"
            />
            Google
          </button>
          <button className="flex item-center px-4 py-2 rounded font-bold w-full text-blue-600 border border-blue-600">
            <img
              className="w-7 mr-2"
              src="./img/icon-github.png"
              alt="icon-face"
            />
            Github
          </button>
        </div>
        <p className="text-gray-400 text-center mt-10">
          Already have an account?
          <a className="text-indigo-700 underline ml-1">Sign In</a>
        </p>
      </form>
      <section className="hidden md:block">
        <img
          className="max-w-lg ml-20 mt-20"
          src="./img/undraw_programming_re_kg9v.svg"
          alt="pannel"
        />
      </section>
    </div>
  );
}

export default Login;
