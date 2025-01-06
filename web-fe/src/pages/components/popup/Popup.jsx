import React from "react";
import { IoClose } from "react-icons/io5";

export default function ComponentPopup({
  isShowModal,
  setIsShowModal = () => {},
  children
}) {
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowModal(false);
    }
  };

  if (!isShowModal) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={closeModal}
    >
      <div className="bg-white w-[500px] p-6 rounded shadow-lg relative">
        <button
          type="button"
          className="absolute right-[3px] top-[3px] cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
          onClick={() => setIsShowModal(false)}
        >
          <IoClose className="text-xl" />
        </button>
        {children}
      </div>
    </div>
  );
}
