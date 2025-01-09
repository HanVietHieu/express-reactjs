import React, { useEffect } from "react";
import { useState } from "react";
import EditProfile from "./components/EditProfile";
import EditAvt from "./components/EditAvt";
import ChangePw from "./components/ChangePw";
import { getUser } from "../../redux/selector";
import { useSelector } from "react-redux";
import _ from "lodash";

const tabs = [
  {
    id: 1,
    title: "Cá nhân",
    icon: {
      path: (
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      ),
      size: "0 0 20 20",
    },
  },
  {
    id: 2,
    title: "Ảnh đại diện",
    icon: {
      path: (
        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
      ),
      size: "0 0 18 18",
    },
  },
  {
    id: 3,
    title: "Đổi mật khẩu",
    icon: {
      path: (
        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
      ),
      size: "0 0 20 20",
    },
  },
];

export default function Profile() {
  const [tabActive, setTabActive] = useState(tabs[0]);
  const [dataUser, setDataUser] = useState({})
  const user = useSelector(getUser);
  useEffect(() => {
    if (!user) {
     return setDataUser({});
    }
    const data = JSON.parse(user)
    setDataUser(data)
  },[user])

  if(_.isEmpty(user)){
    return null
  }

  return (
    <div className="container mt-5 mb-5 min-h-[50vh]">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xxl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="container pt-5 pb-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                {tabs.map((tab) => {
                  return (
                    <li key={tab.id} onClick={() => setTabActive(tab)}>
                      <div
                        className={`${
                          tabActive.id === tab.id
                            ? "inline-flex items-center px-4 py-3 text-white bg-primary rounded-lg active w-full dark:bg-blue-600"
                            : "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                        } cursor-pointer`}
                      >
                        <svg
                          className={`${
                            tabActive.id === tab.id
                              ? "w-4 h-4 me-2 text-white"
                              : "w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox={tab.icon.size}
                        >
                          {tab.icon.path}
                        </svg>
                        <div>{tab.title}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-span-3">
              <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <h3 className="text-[36px] text-secondary font-bold text-gray-900 dark:text-white mb-2">
                  {tabActive.title}
                </h3>
                <div className="mb-2">
                  {tabActive.id === 1 ? (
                    <EditProfile dataUser={dataUser}/>
                  ) : tabActive.id === 2 ? (
                    <EditAvt dataUser={dataUser}/>
                  ) : (
                    <ChangePw />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
