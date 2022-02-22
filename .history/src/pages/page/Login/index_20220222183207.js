import React from 'react';
import thumnail from '../../../assets/undraw_programming_re_kg9v.svg';
import iconGG from '../../../assets/icon-gg.png';
import iconGithub from '../../../assets/icon-github.png';
function Login() {
  return (
    <div classNameName="bg-gray-800 flex justify-center lg:justify-center md:justify-start p-0 md:p-10 overflow-x-hidden">
      <form classNameName="max-w-sm bg-white rounded-lg shadow-md py-10 px-8">
        <h1 classNameName="text-2xl font-bold w-screen">Sign in</h1>
        <p classNameName="text-gray-400 text-xs mt-5">
          Login to manage your account
        </p>
        <label classNameName="block text-grey-darker text-sm mb-1 mt-4">
          <span classNameName="block mb-1">Email</span>
          <input
            classNameName="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
            type="email"
            name="email"
            placeholder="you@example.com"
          />
        </label>
        <label classNameName="block text-grey-darker text-sm mb-1  mt-4">
          <span classNameName="block mb-1">Password</span>
          <input
            classNameName="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight "
            name="password"
            type="password"
            placeholder="Enter 6 character or more"
          />
        </label>
        <div classNameName="mb-4 mt-4">
          <label classNameName="block">
            <input classNameName="mr-2 leading-tight" type="checkbox" />
            <span classNameName="text-sm">Remember me</span>
          </label>
        </div>
        <div classNameName="flex items-center justify-between mt-4">
          <button
            classNameName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Submit
          </button>
        </div>
        <div classNameName="flex space-x-3 mt-10">
          <button classNameName="flex item-center px-4 py-2 rounded font-bold w-full text-red-600 border border-red-600">
            <img classNameName="w-5 mr-4" src={iconGG} alt="icon-google" />
            Google
          </button>
          <button classNameName="flex item-center px-4 py-2 rounded font-bold w-full text-blue-600 border border-blue-600">
            <img classNameName="w-7 mr-2" src={iconGithub} alt="icon-face" />
            Github
          </button>
        </div>
        <p classNameName="text-gray-400 text-center mt-10">
          Already have an account?
          <a classNameName="text-indigo-700 underline ml-1">Sign In</a>
        </p>
      </form>
      <section classNameName="hidden md:block">
        <img classNameName="max-w-lg ml-20 mt-20" src={thumnail} alt="pannel" />
      </section>
    </div>
  );
}

export default Login;
