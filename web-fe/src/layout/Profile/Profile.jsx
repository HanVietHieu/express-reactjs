import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/path";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selector";
import { FaUserTie } from "react-icons/fa";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import ComponentPopup from "../../pages/components/popup/Popup";
import { useDispatch } from "react-redux";
import { setDataUserInfo } from "../../redux/future/account/action";

export default function Profile() {
  const [isModalLogout, setIsModalLogout] = useState(false);
  const navigate = useNavigate();
  const data = useSelector(getUser) || "";
  const userInfo = data?JSON.parse(data) : {};
  const dispatch = useDispatch()

  const handleClick = (link) => {
    navigate(link);
  };

const handleLogout = () => {
  setIsModalLogout(false);
  localStorage.removeItem('user_info')
  dispatch(setDataUserInfo({}))
}


  if (isEmpty(userInfo)) {
    return (
      <div className="login__before flex-lc">
        <div
          className="btn_register"
          onClick={() => handleClick(PATHS.REGISTER)}
        >
          Register
        </div>
        <div
          className="btn_login cursor-pointer"
          onClick={() => handleClick(PATHS.LOGIN)}
        >
          Login
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="group relative cursor-pointer">
        <div className="d-flex align-center">
          <div className="one-line user-infor">{userInfo.user_name || ""}</div>
          &nbsp;
          <div className="box-user-action-avt">
            {userInfo?.avt ? (
              <img
                className="box-user-action-avt-img"
                alt=""
                src="https://www.caythuocdangian.com/wp-content/uploads/anh-gai-xinh-che-mat-55.jpg"
              />
            ) : (
              <>
                <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center border border-white">
                  <FaUserTie />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md right-0 top-10">
          <ul>
            <li>
              <div
                onClick={() => navigate(PATHS.PROFILE)}
                className="inline-block w-full rounded-md p-2 hover:bg-primary/20 flex items-center"
              >
                <div className="pr-2">
                  <CgProfile className="text-xl" />
                </div>
                <div>Profile</div>
              </div>
            </li>

            <li>
              <div
                onClick={() => setIsModalLogout(true)}
                className="inline-block w-full rounded-md p-2 hover:bg-primary/20 flex items-center"
              >
                <div className="pr-2">
                  <IoIosLogOut className="text-xl" />
                </div>
                <div>Logout</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ComponentPopup
        isShowModal={isModalLogout}
        setIsShowModal={setIsModalLogout}
      >
        <h2 className="text-xl font-bold mb-4">Log Out</h2>
        <p className="mb-4 pb-4">Do you want to log out?</p>
        <div className="flex justify-evenly pt-4">
          <button className="px-4 py-2 text-white bg-secondary rounded w-[150px]" onClick={() => setIsModalLogout(false)}>
            Cancel
          </button>
          <button className="px-4 py-2 text-white bg-red-500 rounded w-[150px]" onClick={() => handleLogout()}>
            Yes
          </button>
        </div>
      </ComponentPopup>
    </>
  );
}
