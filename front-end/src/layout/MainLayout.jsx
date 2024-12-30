import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer/Footer";
import { PATHS } from "../config/path";
import _ from "lodash";
import { useLocation } from "react-router-dom";

const LIST_PAGE_HIDDEN_LAYOUT = [PATHS.REGISTER, PATHS.LOGIN];
export default function MainLayout() {
  const location = useLocation();
  const isHidden = !_.includes(LIST_PAGE_HIDDEN_LAYOUT, location.pathname);

  return (
    <>
      {isHidden ? <Navbar /> : <></>}
      <Outlet />
      <ToastContainer />
      {isHidden ? <Footer /> : <></>}
    </>
  );
}
