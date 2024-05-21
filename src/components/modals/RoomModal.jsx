/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader_1 } from "../shared/Loaders";
import useAddRoom from "../../hooks/useAddRoom";
import useEditRoom from "../../hooks/useEditRoom";
const validationSchema = Yup.object({
  room_no: Yup.string().required("Room no is required"),
  room_type: Yup.string().required("Room typeis required"),
});

function RoomModal(props) {
  const cancelButtonRef = useRef(null);
  const { loading, addRoom } = useAddRoom();
  const { loading1, editRoom } = useEditRoom();

  const handleClose = () => {
    props.setSelectedRoom(null);
    props.setIsOpenModal(false);
    resetForm();
  };

  const initialValues = {
    room_no: props.selectedRoom?.room_no,
    room_type: props.selectedRoom?.room_type,
  };
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (props.isEditMode) {
        await editRoom(
          {
            roomId: props.selectedRoom?._id,
            room_no: values?.room_no,
            room_type: values?.room_type,
          },
          handleClose
        );
      } else {
        await addRoom(values, handleClose);
      }
    },
  });

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#fff]  text-left shadow-xl transition-all lg:w-[500px] xs:w-full h-auto xs:mx-2 lg: lg:px-6 lg:py-6 ">
                <div className="absolute top-[10px] right-[10px] cursor-pointer">
                  <AiOutlineClose onClick={handleClose} />
                </div>
                <h1 className="2xl:font-[700] 2xl:text-[36px] lg:font-[600] lg:text-[32px]  font-roboto">
                  {props.isEditMode ? "Edit Room" : "Add New Room"}
                </h1>
                <form className="w-full">
                  <div className="w-full">
                    <div className="w-full  gap-2 flex flex-col">
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          Room No
                        </label>
                        <input
                          placeholder="Enter room no..."
                          type="text"
                          name="room_no"
                          value={values.room_no}
                          onChange={handleChange}
                          className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                        />
                        {errors.room_no && (
                          <p className="text-red-700 text-xs mt-2">
                            {errors.room_no}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          Room Type
                        </label>
                        <div className="w-[100%] ">
                          <select
                            className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                            id="demo-simple-select"
                            name="room_type"
                            value={values.room_type}
                            onChange={handleChange}
                          >
                            <option disabled selected>
                              Select type
                            </option>
                            <option value={"room"}>Room</option>
                            <option value={"lab"}>Lab</option>
                          </select>
                          {errors.room_type && (
                            <p className="text-red-700 text-xs mt-2">
                              {errors.room_type}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end w-full gap-2  mt-5 cursor-pointer text-white">
                    <button
                      onClick={handleSubmit}
                      className="bg-[#1C1D1E] font-[600] text-white w-[120px] h-[45px] rounded-[10px] flex justify-center items-center"
                    >
                      {loading || loading1 ? <ButtonLoader_1 /> : "Submit"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default RoomModal;
