import React from 'react';
import thumnail from '../../../assets/verify-password.svg';

const VerifyPassword = () => {
  return (
    <div className="items-center bg-gray-800 flex justify-center lg:justify-center md:justify-start p-0 md:p-10 overflow-x-hidden max-h-screen h-screen">
      <form
        className="max-w-md bg-white rounded-2xl shadow-md py-10 px-8 bg-opacity-20"
        style={{ maxHeight: 700 }}
      >
        <h1 className="text-2xl font-bold w-screen text-white">
          Reset password
        </h1>
        <p className="text-gray-400 text-xs mt-6">
          Reset password to manage your account
        </p>
        <label className="block text-grey-darker text-sm mb-1 mt-8">
          <span className="block mb-1 text-white">New password</span>
          <input
            type="password"
            name="newPassword"
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="new password"
          />
        </label>
        <label className="block text-grey-darker text-sm mb-1 mt-8">
          <span className="block mb-1 text-white">Confirm password</span>
          <input
            type="password"
            name="repeatPassword"
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="repeat password"
          />
        </label>
        <div className="flex items-center justify-between mt-16">
          <a
            href="#_"
            className="w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
          >
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-400 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-green rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Change password
            </span>
          </a>
        </div>
      </form>
      <section className="hidden md:block">
        <img className="max-w-lg ml-24 mt-20" src={thumnail} alt="pannel" />
      </section>
    </div>
  );
};

export default VerifyPassword;
