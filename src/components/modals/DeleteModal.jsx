import React, { Fragment, useContext, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import GlobalContext from "../../context/GlobalContext";
import Cookies from "js-cookie";

function DeleteModal(props) {
  const token = Cookies.get("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { setUpdateResponse } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);
  const handleClose = () => {
    props.setIsOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    await axios
      .delete(`${BASE_URL}${props.url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        props.setIsOpenModal(!props.isOpenModal);
        setUpdateResponse(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <Transition.Root show={props.isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[9999999999]"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full lg:items-center xs:items-center justify-center md:p-4 xs:p-1 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#fff]  text-left shadow-xl transition-all 2xl:w-[400px] lg:w-[400px] xs:w-full h-auto xs:mx-2 lg: lg:px-6 lg:py-6 ">
                <div className="absolute top-[10px] right-[10px] cursor-pointer">
                  <AiOutlineClose onClick={handleClose} />
                </div>
                <div className="flex flex-col">
                  <h1 className="2xl:text-[28px] font-[600] lg:text-[24px] font-roboto">
                    Are you sure?
                  </h1>
                  <p className="font-[400] text-[15px] font-roboto text-[#1C1D1E]">
                    Do you really want to delete this Record?
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-5">
                    <button
                      className="bg-backgroundColor w-[120px] h-[40px] rounded-[10px] outline-none border-none"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-themeColor w-[120px] h-[40px] rounded-[10px] text-white outline-none border-none"
                      onClick={handleConfirmDelete}
                    >
                      {loading ? "Loading..." : "Delete"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default DeleteModal;
