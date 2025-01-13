import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer/Footer";
import { PATHS } from "../config/path";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LIST_PAGE_HIDDEN_LAYOUT = [PATHS.REGISTER, PATHS.LOGIN];
export default function MainLayout() {
  const location = useLocation();
  const isHidden = !_.includes(LIST_PAGE_HIDDEN_LAYOUT, location.pathname);

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Xử lý credentialResponse, gửi tới backend nếu cần
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };
  return (
    <>
    <GoogleOAuthProvider clientId="271326885562-86b2f5bfhqoac69b3lhc2chggi7g3kk4.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
      {isHidden ? <Navbar /> : <></>}
      <Outlet />
      <ToastContainer />
      {isHidden ? <Footer /> : <></>}
    </>
  );
}
