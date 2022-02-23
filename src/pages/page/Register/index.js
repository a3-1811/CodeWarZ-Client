import React from 'react';
import thumbnail from '../../../assets/undraw_developer_activity_re_39tg.svg';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
function Register() {
  return (
    <div className="bg-gray-800 flex justify-center lg:justify-center md:justify-start p-0 md:p-10 overflow-x-hidden max-h-screen">
      <form className="max-w-md bg-white rounded-2xl shadow-md py-10 px-8 bg-opacity-20">
        <h1 className="text-2xl font-bold w-screen text-white">
          Create your account
        </h1>
        <p className="text-gray-400 text-xs mt-6">
          Created for developers by developers
        </p>
        <label className="block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 text-white">Name</span>
          <input
            type="text"
            name="fullName"
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Jonh Doe"
          />
        </label>
        <label className="block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 text-white">Email</span>
          <input
            type="email"
            name="email"
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
          />
        </label>
        <label className="relative block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 text-white">Password</span>
          <input
            type="password"
            name="email"
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter your password"
          />
          <div className="icon_button absolute right-4 top-9">
            <EyeIcon className="h-6 font-extralight" />
          </div>
        </label>
        <div className="flexmb-4 mt-4">
          <label className="block">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm text-white">
              I agree to the Terms & Conditions
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a
            href="#_"
            class="w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
          >
            <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-400 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span class="absolute inset-0 w-full h-full bg-green rounded-md "></span>
            <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span class="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Create my account
            </span>
          </a>
        </div>
        <p className="text-gray-400 text-sm text-center mt-8">
          Already have an account?
          <a className="text-primary text-base font-bold ml-1" href="!#">
            Sign In
          </a>
        </p>
      </form>
      <section className="hidden md:block">
        <img className="max-w-lg ml-24 mt-20" src={thumbnail} alt="pannel" />
      </section>
    </div>
  );
}

export default Register;
