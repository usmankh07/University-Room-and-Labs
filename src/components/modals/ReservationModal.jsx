/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader_1 } from "../shared/Loaders";
import useAddReservation from "../../hooks/useAddReservation";
import useEditReservation from "../../hooks/useEditReservation";
const validationSchema = Yup.object({
  roomId: Yup.string().required("roomId is required"),
  teacher_name: Yup.string().required("teacher_name is required"),
  subject: Yup.string().required("subject is required"),
  reserve_date: Yup.string().required("reserve_date is required"),
  start_time: Yup.string().required("start_time is required"),
  end_time: Yup.string().required("end_time is required"),
});

function ReservationModal(props) {
  const cancelButtonRef = useRef(null);
  const { loading, addReservation } = useAddReservation();
  const { loading1, editReservation } = useEditReservation();

  const handleClose = () => {
    props.setSelectedReserveRoom(null);
    props.setIsOpenModal(false);
    resetForm();
  };

  const initialValues = {
    roomId: props.roomId,
    teacher_name: props.selectedReserveRoom?.teacher_name,
    subject: props.selectedReserveRoom?.subject,
    reserve_date: props.selectedReserveRoom
      ? props.selectedReserveRoom.reserve_date.split("T")[0]
      : "",
    start_time: props.selectedReserveRoom?.start_time,
    end_time: props.selectedReserveRoom?.end_time,
  };
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (props.isEditMode) {
        await editReservation(
          {
            reserveRoomId: props.selectedReserveRoom?._id,
            teacher_name: values?.teacher_name,
            subject: values?.subject,
            reserve_date: values?.reserve_date,
            start_time: values?.start_time,
            end_time: values?.end_time,
          },
          handleClose
        );
      } else {
        await addReservation(values, handleClose);
      }
    },
  });
  const today = new Date().toISOString().split("T")[0];
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
                  {props.isEditMode
                    ? "Edit Reservation"
                    : "Add New Reservation"}
                </h1>
                <form className="w-full">
                  <div className="w-full">
                    <div className="w-full  gap-2 flex flex-col">
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          Teacher Name
                        </label>
                        <input
                          placeholder="Enter teacher name..."
                          type="text"
                          name="teacher_name"
                          value={values.teacher_name}
                          onChange={handleChange}
                          className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                        />
                        {errors.teacher_name && (
                          <p className="text-red-700 text-xs mt-2">
                            {errors.teacher_name}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          Subject
                        </label>
                        <input
                          placeholder="Enter subject..."
                          type="text"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                        />
                        {errors.subject && (
                          <p className="text-red-700 text-xs mt-2">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          Reserve Date
                        </label>
                        <input
                          type="date"
                          name="reserve_date"
                          min={today}
                          value={values.reserve_date}
                          onChange={handleChange}
                          className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                        />
                        {errors.reserve_date && (
                          <p className="text-red-700 text-xs mt-2">
                            {errors.reserve_date}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          Start Time
                        </label>
                        <input
                          type="time"
                          name="start_time"
                          value={values.start_time}
                          onChange={handleChange}
                          className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                        />
                        {errors.start_time && (
                          <p className="text-red-700 text-xs mt-2">
                            {errors.start_time}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="2xl:font-[400] 2xl:text-[20px] lg:font-[400] lg:text-[18px]  font-roboto"
                        >
                          End Time
                        </label>
                        <input
                          type="time"
                          name="end_time"
                          value={values.end_time}
                          onChange={handleChange}
                          className="border border-[#9D9D9D] h-[50px] w-[100%] px-2 text-[#5A5A5A]  bg-transparent rounded outline-none"
                        />
                        {errors.end_time && (
                          <p className="text-red-700 text-xs mt-2">
                            {errors.end_time}
                          </p>
                        )}
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
export default ReservationModal;
