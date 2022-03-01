import React from 'react';
import thumnail from '../../../assets/undraw_agreement_re_d4dv.svg';
function Contact() {
  return (
    <div className="bg-gray-800 flex justify-center items-center lg:justify-center md:justify-start p-0 md:p-10 overflow-x-hidden max-h-screen h-screen">
      <form
        className="max-w-xl bg-white rounded-2xl shadow-md py-10 px-8 bg-opacity-20"
        style={{ maxHeight: 700 }}
      >
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-white text-sm font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-white text-sm font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-white text-sm font-bold mb-2"
              htmlFor="grid-password"
            >
              Email Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-white text-sm font-bold mb-2"
              htmlFor="grid-password"
            >
              Your Message
            </label>
            <textarea
              placeholder="Type your message here..."
              rows={5}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              defaultValue={'\n      '}
            />
          </div>
          <div className="flex justify-between w-full px-3">
            <div className="md:flex md:items-center">
              <label className="block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className="text-sm">Send me your newsletter!</span>
              </label>
            </div>
            <a
              href="#_"
              class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span class="relative text-white">Send Message</span>
            </a>
          </div>
        </div>
      </form>
      <div className="hidden md:block">
        <img className="max-w-md ml-24 mt-20" src={thumnail} alt="pannel" />
      </div>
    </div>
  );
}

export default Contact;
