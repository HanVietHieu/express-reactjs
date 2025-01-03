import { useState } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/path";

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleClick = (link) => {
    navigate(link)
  }

  if (isEmpty(userInfo)) {
    return (
      <div className="login__before flex-lc">
        <div className="btn_register" onClick={() => handleClick(PATHS.REGISTER)}>Register</div>
        <div className="btn_login cursor-pointer" onClick={() => handleClick(PATHS.LOGIN)}>Login</div>
      </div>
    );
  }

  return (
    <div className="d-flex align-center">
      <div className="one-line user-infor">naninaninaninaninaninani</div>
      <div className="box-user-action-avt">
        <img
          className="box-user-action-avt-img"
          alt=""
          src="https://www.caythuocdangian.com/wp-content/uploads/anh-gai-xinh-che-mat-55.jpg"
        />
      </div>
    </div>
  );
}
