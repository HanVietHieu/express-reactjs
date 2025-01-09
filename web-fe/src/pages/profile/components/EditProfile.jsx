import React, { useEffect } from "react";
import { TYPE_EDIT_PROFILE, TYPE_GERNDER, TYPE_SHOW_NOTI } from "../../../utils/const";
import styled from "styled-components";
import { showToast } from "../../../utils/helper";
import { postDataApi } from "../../../service/api";
import { API_PATHS } from "../../../service/api-path/apiPaths";
import { useDispatch } from "react-redux";
import { setDataUserInfo } from "../../../redux/future/account/action";
import _ from "lodash";

export default function EditProfile({dataUser = {}}) {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [gender, setGender] = React.useState(TYPE_GERNDER.default);
  const [fullName, setFullName] = React.useState("");
  const [age, setAge] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isEmpty(dataUser)) {
      return;
    }
    
    setUserName(dataUser.user_name);
    setEmail(dataUser.email);
    setPhone(dataUser.phone_number);
    setAddress(dataUser.address);
    setGender(dataUser.gender);
    setFullName(dataUser.full_name);
    setAge(dataUser.age);
  }, [dataUser]);

  const handleSubmitForm = async() => {
    if (!userName || !email || !phone || !fullName) {
     return showToast(TYPE_SHOW_NOTI.err, "Please enter complete information");
    }
    const body = {
      user_name: userName,
      email,
      phone_number: phone,
      address,
      gender,
      age,
      full_name: fullName,
      type: TYPE_EDIT_PROFILE.profile
    };
    const dataApi = await postDataApi(API_PATHS.updateProfile, body);
    if (dataApi?.data?.success) {
      dispatch(setDataUserInfo(dataApi));
     return showToast(TYPE_SHOW_NOTI.success, dataApi.data.message);
    }

    showToast(TYPE_SHOW_NOTI.err, dataApi?.data?.message || "Error edit profile");
  };

  return (
    <ContainerProfile className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <div className="space-y-4 md:space-y-6 grid grid-cols-2 gap-4" action="#">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User Name <sup className="lable-require">*</sup>
          </label>
          <input
            id="username"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mt-0" style={{ marginTop: "0px" }}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Full Name <sup className="lable-require">*</sup>
          </label>
          <input
            value={fullName}
            type="string"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Full Name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email <sup className="lable-require">*</sup>
          </label>
          <input
            type="email"
            value={email}
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
            value={phone}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="039********"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <input
            type="string"
            value={address}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Hanoi Viet Nam"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gender
          </label>
          <select
            onChange={(e) => setGender(e.target.value)}
            defaultValue={" "}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={0}>Gender</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Age
          </label>
          <input
            type="number"
            value={age}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
      <button
        className="w-full bg-secondary  duration-300 ease-in-out text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleSubmitForm}
      >
        Update Profile
      </button>
    </ContainerProfile>
  );
}

const ContainerProfile = styled.div`
  @media (min-width: 768px) {
    .grid-cols-2.gap-4 div:not(:nth-child(1), :nth-child(2)) {
      margin-top: 15px !important;
    }
  }
`;
