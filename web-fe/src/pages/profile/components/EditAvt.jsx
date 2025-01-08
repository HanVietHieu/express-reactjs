import React, { useRef, useState } from "react";
import avatarDefault from "../../../assets/images/AVTDefault.png";
import iconPhoto from "../../../assets/svg/Group 10397.svg";
import axios from "axios";
import { TYPE_SHOW_NOTI } from "../../../utils/const";
import { showToast } from "../../../utils/helper";

export default function EditAvt({ dataUser = {} }) {
  const [fileAvt, setFileAvt] = useState(null);
  const [urlAvt, setUrlAvt] = useState("");
  const ref = useRef(null);

  const handleChangeAvtInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileAvt(e.target.files[0]);
      let url = URL.createObjectURL(file);
      setUrlAvt(url);
    }
  };

  const handleChangeAvt = () => {
    ref.current.click();
  };

  const handleCancel = () => {
    setUrlAvt("");
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("file", fileAvt);

    const user = localStorage.getItem("user_info");
    const parseUser = JSON.parse(user);
    try {
      const response = await axios.post(
        'http://localhost:3036/shop-v1/api/upload',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${parseUser.token}`,
          },
          
        },
      );
      if(response?.status == 200){
        showToast(TYPE_SHOW_NOTI.success, response?.data?.message)
      }
    } catch (error) {
      
      showToast(TYPE_SHOW_NOTI.err, "Error edit avatar")
    }
  };

  return (
    <div className="container mt-5 pt-5 mb-5 ">
      <div className="relative w-[160px] h-[160px] ">
        <img
          src={urlAvt || dataUser.avt || avatarDefault}
          onError={(event) => {
            const img = event.currentTarget;
            img.src = avatarDefault;
          }}
          alt="img-avt"
          className="w-full h-full object-cover rounded-full overflow-hidden"
        />
        <input
          ref={ref}
          type="file"
          onChange={(e) => handleChangeAvtInput(e)}
          className="d-none"
        />
        {ref === null ? null : (
          <img
            src={iconPhoto}
            alt=""
            className="absolute bottom-2 cursor-pointer right-2 z-10"
            onClick={handleChangeAvt}
          />
        )}
      </div>
      <div className="pt-2">
        <p>Định dạng: .*png, .*jpeg, .*jpg</p>
        <p>Dung lượng tối đa: 5 MB</p>
      </div>

      <div className="d-flex gap-4 mt-5">
        <button className="btn-update" onClick={handleUpdate}>
          Update Avatar
        </button>
        <button className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
