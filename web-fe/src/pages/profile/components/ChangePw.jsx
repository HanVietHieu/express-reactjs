import React, { useState } from "react";
import { postDataApi } from "../../../service/api";
import { API_PATHS } from "../../../service/api-path/apiPaths";
import { showToast } from "../../../utils/helper";
import { TYPE_SHOW_NOTI } from "../../../utils/const";

export default function ChangePw() {
  const [pass_word, setPass_word] = useState("");
  const [new_pass, setNew_pass] = useState("");
  const [confirm_pass, setConfirm_pass] = useState("");

  const handleSubmitForm = async () => {
    if (!pass_word || !new_pass || !confirm_pass) {
      return showToast(TYPE_SHOW_NOTI.err, "Plese check data form");
    }
    if (new_pass !== confirm_pass) {
      return showToast(
        TYPE_SHOW_NOTI.err,
        "New password and confirm different password!"
      );
    }

    const dataApi = await postDataApi(API_PATHS.changePw, {
      pass_word,
      new_pass,
      confirm_pass,
    });

    if (dataApi?.data?.success) {
      return showToast(TYPE_SHOW_NOTI.success, dataApi?.data?.message);
    }
    showToast(TYPE_SHOW_NOTI.err, dataApi?.data?.message);
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          PassWord <sup className="lable-require">*</sup>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={pass_word}
          onChange={(e) => setPass_word(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          New PassWord <sup className="lable-require">*</sup>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={new_pass}
          onChange={(e) => setNew_pass(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirm PassWord<sup className="lable-require">*</sup>
        </label>
        <input
          type="password"
          id="username"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={confirm_pass}
          onChange={(e) => setConfirm_pass(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-secondary  duration-300 ease-in-out text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleSubmitForm}
      >
        Update
      </button>
    </div>
  );
}
