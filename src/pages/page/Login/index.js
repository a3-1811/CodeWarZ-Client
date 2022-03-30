import React, { useState, useEffect } from "react";
import thumnail from "../../../assets/undraw_programming_re_kg9v.svg";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useNavigate, Link } from "react-router-dom";
import userAPI from "../../../apis/userApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Notice from "../../../components/shared/Notice";

//Google login
import { useGoogleLogin } from "react-use-googlelogin";

// Yup validateion schema
const schema = yup
  .object({
    email: yup.string().email("Your email invalid!").required(),
    password: yup
      .string()
      .min(6, "Password at least 6 characters")
      .required("Please confirm your password"),
  })
  .required();

function Login() {
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
  //Google login
  const googleAuth = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_KEY, // Your clientID from Google.
  });

  const history = useNavigate();
  //Notice component control state
  const [dialog, setDialog] = useState({
    message: "",
    isOpen: false,
    isSuccess: false,
  });

  //Check code form github login
  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      let code = newUrl[1];
      userAPI
        .loginAccountWithGithub({
          clientId: process.env.REACT_APP_GITHUB_KEY,
          clientKey: process.env.REACT_APP_GITHUB_CLIENT,
          code,
        })
        .then((data) => {
          localStorage.setItem("tokenAuth", data.token);
          localStorage.setItem("acc", JSON.stringify({ ...data.user }));

          setDialog({
            message: "Login success, please wait few second to redirect!",
            isSuccess: true,
            isOpen: true,
          });

          setTimeout(() => {
            history("/");
          }, 2000);
        })
        .catch((err) => {
          // Not found account
          setDialog({
            message: err.response.data.error,
            isSuccess: false,
            isOpen: true,
          });
        });
    }
  });

  //handleNotice
  const handleNotice = (state) => setDialog({ ...dialog, isOpen: state });

  // Submit form
  const onSubmit = (data) => {
    const { email, password } = data;
    userAPI
      .loginAccount({ email, password })
      .then((data) => {
        localStorage.setItem("tokenAuth", data.token);
        localStorage.setItem("acc", JSON.stringify({ ...data.user }));

        setDialog({
          ...dialog,
          message: "Login success, please wait few second to redirect!",
          isSuccess: true,
          isOpen: true,
        });

        setTimeout(() => {
          history("/");
        }, 2000);
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

  //Handle login Google, Github
  const signInWithGoogle = async () => {
    let { signIn } = googleAuth;
    let res = await signIn();
    userAPI
      .loginAccountWithGoogle({ access_token: res.accessToken })
      .then((data) => {
        localStorage.setItem("tokenAuth", data.token);
        localStorage.setItem("acc", JSON.stringify({ ...data.user }));

        setDialog({
          ...dialog,
          message: "Login success, please wait few second to redirect!",
          isSuccess: true,
          isOpen: true,
        });

        setTimeout(() => {
          history("/");
        }, 2000);
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

  const signInWithGithub = async () => {
    window.location.replace(
      `https://github.com/login/oauth/authorize?redirect_uri=${process.env.REACT_APP_BASE_URL}/login&scope=user&client_id=${process.env.REACT_APP_GITHUB_KEY}`
    );
  };

  //Show password
  const handleShowPassword = (status, type) => {
    setShowPassword({
      type,
      isShow: status,
    });
  };
  return (
    <div className="items-center bg-gray-800 flex justify-center p-0 md:p-10  overflow-x-hidden max-h-screen h-screen">
      <form
        style={{ maxHeight: 700 }}
        className="max-w-md bg-white rounded-2xl shadow-md py-10 px-8 bg-opacity-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold w-screen text-white">Sign in</h1>
        <p className="text-gray-400 text-xs mt-2">
          Login to manage your account
        </p>
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
        <div className="flex gap-20 mb-4 mt-4">
          <label className="block flex-1">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked
              disabled
            />
            <span className="text-sm text-white">Remember me</span>
          </label>
          <label className="block flex-1 text-right">
            <Link to="/forgot-password" className="text-sm text-primary">
              Forgot password?
            </Link>
          </label>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
          >
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-400 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-green rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Sign in
            </span>
          </button>
        </div>
        <div className="flex gap-3 space-x-3 mt-9">
          <span
            onClick={signInWithGoogle}
            className="cursor-pointer flex-1 px-3 py-3 text-xs text-black bg-white border-2 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </span>
          <span
            onClick={signInWithGithub}
            className="cursor-pointer px-3 py-3 flex-1 text-xs text-black bg-white border-2 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            Sign in with GitHub
          </span>
        </div>
        <p className="text-gray-400 text-sm text-center mt-7">
          Don't have an account?
          <Link
            to="/register"
            className="text-primary text-base font-bold ml-1"
          >
            Sign Up
          </Link>
        </p>
      </form>
      <section className="block lg:hidden">
        <img className="max-w-lg ml-24 mt-20" src={thumnail} alt="pannel" />
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

export default Login;
