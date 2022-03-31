import React, { useState } from "react";
import { Link } from "react-router-dom";
import userAPI from "../../../apis/userApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Notice from "../../../components/shared/Notice";

// Yup validateion schema
const schema = yup
  .object({
    email: yup.string().email("Your email invalid!").required(),
  })
  .required();

const ForgotPass = () => {
  // Declare initital variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
      .resetPassword({ fullName, email, password })
      .then((data) => {
        setDialog({
          ...dialog,
          message: data.success,
          isSuccess: true,
          isOpen: true,
        });
      })
      .catch((err) => {
        // Not found account
        setDialog({
          ...dialog,
          message: err.response.data.error,
          isSuccess: false,
          isOpen: true,
        });
      });
  };
  return (
    <div className="bg-gray-800 ">
      <div className="container mx-auto ">
        <div className="flex justify-center items-center h-screen px-6">
          <div className="md:w-full w-3/4 xl:w-11/12 flex">
            <div className="md:w-full h-auto bg-gray-400 md:hidden block w-1/2 bg-cover rounded-l-lg bg-[url('https://images.unsplash.com/photo-1603985529862-9e12198c9a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGFzc3dvcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')] bg-center bg-no-repeat" />
            <div className="md:w-full w-1/2 bg-white p-5 md:rounded-lg rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="you@example.com"
                  />
                  <p className="message text-red-600 font-semibold mt-1">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-primary focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-primary align-baseline hover:text-secondary"
                    to="/register"
                  >
                    Create an Account!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-primary align-baseline hover:text-secondary"
                    to="/login"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <Notice
            status={dialog.isOpen}
            message={dialog.message}
            handleNotice={handleNotice}
            typeNotice={dialog.isSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
