import { toast } from "react-toastify";
import { TYPE_SHOW_NOTI } from "./const";

export const showToast = (type = TYPE_SHOW_NOTI.err, content = "") => {
    if (type === TYPE_SHOW_NOTI.err) {
      return toast.error(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (type === TYPE_SHOW_NOTI.success) {
      return toast.success(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };