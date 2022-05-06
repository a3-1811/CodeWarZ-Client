import React, { useState } from "react";
import userAPI from "../../../../../apis/userApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Notice from "../../../../../components/shared/Notice";
import { useNavigate } from "react-router-dom";

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



function AddModal(props) {
  const { show, handleStatus,handleReset } = props;

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
      .createNewAdmin({ fullName, email, password })
      .then((data) => {
        setDialog({
          ...dialog,
          message: "Create new admin success!",
          isSuccess: true,
          isOpen: true,
        });
        handleReset()
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
    <div
      className={`${
        show ? "block" : "hidden"
      } rounded-lg px-5 py-3 bg-white absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-primary border-2`}
    >
        <form
        className="max-w-md bg-white py-10 px-8 bg-opacity-20 flex justify-center flex-col"
        style={{ maxHeight: 700 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold w-screen text-primary">
          Create ADMIN account
        </h1>
        <label className="block text-grey-darker text-sm mb-1 mt-3">
          <span className="block mb-1 ">Name</span>
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
          <span className="block mb-1 ">Email</span>
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
          <span className="block mb-1 ">Password</span>
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
        <div className="flex items-center justify-between mt-4 flex-col">
          <button
            type="submit"
            className="bg-green mb-2 text-white w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter rounded-md group"
          >Create new account</button>
        <button
        onClick={()=>{handleStatus(false)}}
            className="bg-red-500 text-white w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter rounded-md group"
          >Cancel</button>
        </div>
      </form>
      <div className="absolute top-0">
      <Notice
        status={dialog.isOpen}
        message={dialog.message}
        handleNotice={handleNotice}
        typeNotice={dialog.isSuccess}
      />
      </div>
    </div>
  );
}

export default AddModal;
