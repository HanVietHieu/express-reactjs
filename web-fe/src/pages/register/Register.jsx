import React from "react";
import bg from "../../assets/svg/bg-web.svg";
import iconLogo from "../../assets/logo.png";
import { showToast } from "../../utils/helper";
import { TYPE_SHOW_NOTI } from "../../utils/const";
import _ from "lodash";
import { PATHS } from "../../config/path";
import { useNavigate } from "react-router-dom";
import { postDataApi } from "../../service/api";
import { API_PATHS } from "../../service/api-path/apiPaths";

export default function Register() {
  const navigate = useNavigate();
  const [isAcceptConditions, setIsAcceptConditions] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [passWord, setPassWord] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("")

  const handleSubmitForm = async () => {
    if (
      !userName ||
      !passWord ||
      !confirmPassword ||
      !email ||
      !phone ||
      !_.includes(email, "@")
    ) {
      return showToast(TYPE_SHOW_NOTI.err, "Please enter complete information");
    }
    if (passWord !== confirmPassword) {
      return showToast(TYPE_SHOW_NOTI.err, "Please check your password again");
    }

    const body = {
      user_name: userName, pass_word: passWord, phone_number: phone, email, confirm_password: confirmPassword
    }

    const data = await postDataApi(API_PATHS.register, body);
    
    showToast(data?.data?.success ? TYPE_SHOW_NOTI.success : TYPE_SHOW_NOTI.err, data?.data?.message);
    if(data?.data?.success){
      handleToSignIn();
    }
  };

  const handleToSignIn = () => {
    navigate(PATHS.LOGIN);
  };

  const isErrBtnSuccess =
    !userName ||
    !passWord ||
    !confirmPassword ||
    !email ||
    !phone ||
    !_.includes(email, "@") ||
    !isAcceptConditions;

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <img src={bg} alt="bg-register" className="bg-register" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={iconLogo} alt="logo" />
          Shop
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create an account
            </h1>
            <div className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username <sup className="lable-require">*</sup>
                </label>
                <input
                  id="username"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password <sup className="lable-require">*</sup>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password <sup className="lable-require">*</sup>
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email <sup className="lable-require">*</sup>
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number <sup className="lable-require">*</sup>
                </label>
                <input
                  type="number"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                    value={isAcceptConditions}
                    onClick={() => setIsAcceptConditions(!isAcceptConditions)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <span
                      className="color-colorforcus font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </span>
                  </label>
                </div>
              </div>
              <button
                className={`${isErrBtnSuccess
                    ? "opacity-50 disabled:cursor-not-allowed"
                    : ""
                  } w-full bg-secondary  duration-300 ease-in-out text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                onClick={handleSubmitForm}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <span
                  href="#"
                  className="color-colorforcus font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={handleToSignIn}
                >
                  Login here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
