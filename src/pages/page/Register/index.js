import React, { useState } from "react";
import thumbnail from "../../../assets/undraw_developer_activity_re_39tg.svg";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useNavigate, Link } from "react-router-dom";
import userAPI from "../../../apis/userApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Notice from "../../../components/shared/Notice";

// Yup validateion schema
const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Enter your full name")
      .min(3, "Please enter minium three char"),
    email: yup.string().email("Your email invalid!").required(),
    password: yup
      .string()
      .min(6, "Password at least 6 characters")
      .required("Please confirm your password"),
  })
  .required();

function Register() {
  // Declare initital variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //Eye password
  const [showPassword, setShowPassword] = useState({
    isShow: false,
    type: "password",
  });

  const history = useNavigate();
  //Notice component control state
  const [dialog, setDialog] = useState({
    message: "",
    isOpen: false,
    isSuccess: false,
  });

  //handleNotice
  const handleNotice = (state) => setDialog({ ...dialog, isOpen: state });

  // Submit form
  const onSubmit = (data) => {
    const { fullName, email, password } = data;
    userAPI
      .registerAccount({ fullName, email, password })
      .then((data) => {
        localStorage.setItem("tokenAuth", data.token);
        localStorage.setItem("acc", JSON.stringify({ ...data.user }));

        setDialog({
          ...dialog,
          message: "Register success, please wait few second to redirect!",
          isSuccess: true,
          isOpen: true,
        });

        setTimeout(() => {
          history("/");
        }, 2000);
      })
      .catch((err) => {
        setDialog({
          ...dialog,
          message: err.response.data.error,
          isSuccess: false,
          isOpen: true,
        });
      });
  };

  //Show password
  const handleShowPassword = (status, type) => {
    setShowPassword({
      type,
      isShow: status,
    });
  };

  return (
    <div className="items-center bg-gray-800 flex justify-center  p-0 md:p-10 overflow-x-hidden max-h-screen h-screen">
      <form
        className="max-w-md bg-white rounded-2xl shadow-md py-10 px-8 bg-opacity-20"
        style={{ maxHeight: 700 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold w-screen text-white">
          Create your account
        </h1>
        <p className="text-gray-400 text-xs mt-3">
          Created for developers by developers
        </p>
        <label className="block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 text-white">Name</span>
          <input
            {...register("fullName")}
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Jonh Doe"
          />
          <p className="message text-red-600 font-semibold mt-1">
            {errors.fullName?.message}
          </p>
        </label>
        <label className="block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 text-white">Email</span>
          <input
            {...register("email")}
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
          />
          <p className="message text-red-600 font-semibold mt-1">
            {errors.email?.message}
          </p>
        </label>
        <label className="relative block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 text-white">Password</span>
          <input
            {...register("password")}
            type={showPassword.type}
            className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter your password"
          />
          <div className="icon_button absolute right-4 top-9">
            {showPassword.isShow ? (
              <EyeOffIcon
                className="cursor-pointer h-6 font-extralight"
                onClick={() => {
                  handleShowPassword(false, "password");
                }}
              />
            ) : (
              <EyeIcon
                className="cursor-pointer h-6 font-extralight"
                onClick={() => {
                  handleShowPassword(true, "text");
                }}
              />
            )}
          </div>
          <p className="message text-red-600 font-semibold mt-1">
            {errors.password?.message}
          </p>
        </label>
        <div className="flexmb-4 mt-4">
          <label className="block">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked
              disabled
            />
            <span className="text-sm text-white">
              I agree to the Terms &#38; Conditions
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            class="w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
          >
            <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-400 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span class="absolute inset-0 w-full h-full bg-green rounded-md "></span>
            <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span class="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Create my account
            </span>
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?
          <Link className="text-primary text-base font-bold ml-1" to="/login">
            Sign In
          </Link>
        </p>
      </form>
      <section className="block md:hidden">
        <img className="max-w-lg ml-24 mt-20" src={thumbnail} alt="pannel" />
      </section>
      <Notice
        status={dialog.isOpen}
        message={dialog.message}
        handleNotice={handleNotice}
        typeNotice={dialog.isSuccess}
      />
    </div>
  );
}

export default Register;
