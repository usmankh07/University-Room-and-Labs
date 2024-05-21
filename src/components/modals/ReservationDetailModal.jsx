/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import ShowMessage from "../shared/ShowMessage";
import useGetReservations from "../../hooks/useGetReservations";
import { CardSkelton_5 } from "../shared/Skeltons";
import { skelton_data } from "../../staticData/SkeltonData";

function ReservationDetailModal(props) {
  const cancelButtonRef = useRef(null);
  const handleClose = () => {
    props.setIsOpenModal(false);
  };
  const {
    getReservations,
    reservationData,
    reservationLoading,
    reservationMessage,
  } = useGetReservations();

  useEffect(() => {
    getReservations(`/${props.selectedRoom?._id}`);
  }, [props.selectedRoom]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatTimeTo12Hours = (timeString) => {
    const [hours, minutes] = timeString?.split(":");
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#fff]  text-left shadow-xl transition-all 2xl:w-[1000px] lg:w-[1000px] xs:w-full h-auto xs:mx-2 lg: lg:px-6 lg:py-6 ">
                <div className="absolute top-[10px] right-[10px] cursor-pointer">
                  <AiOutlineClose onClick={handleClose} />
                </div>
                <div className="flex flex-col">
                  <h1 className="2xl:text-[28px] font-[600] lg:text-[24px] font-roboto">
                    Reservations
                  </h1>
                  <div className="max-h-[500px] overflow-y-scroll">
                    <table className="w-full text-sm text-left rtl:text-right ">
                      <thead className="sticky z-[1] top-0 text-[#1C1D1E] font-semibold text-[16px] bg-gray-200">
                        <tr className="">
                          {[
                            "Teacher name",
                            "Subject",
                            "Room no",
                            "Date",
                            "Time",
                          ].map((item, index) => (
                            <th
                              scope="col"
                              className="py-5 px-3 w-[16.66%]"
                              key={index}
                            >
                              {item}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {reservationLoading ? (
                          <>
                            {skelton_data.slice(0, 8).map((_, index) => (
                              <CardSkelton_5 key={index} />
                            ))}
                          </>
                        ) : (
                          <>
                            {reservationData?.map((item, index) => (
                              <tr
                                key={index}
                                className="border border-b-[#EBEDF4]"
                              >
                                <td className="py-3 px-3 text-[#7A7A7A]">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={"/avatar_dummy.png"}
                                      alt="student"
                                      className="w-[30px] h-[30px] rounded-full"
                                    />
                                    <p>{item.teacher_name}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-[#7A7A7A]">
                                  {item.subject}
                                </td>
                                <td className="py-3 px-3 text-[#7A7A7A]">
                                  {props.selectedRoom.room_no}
                                </td>
                                <td className="py-3 px-3 text-[#7A7A7A]">
                                  {formatDate(item.reserve_date)}
                                </td>
                                <td className="py-3 px-3 text-[#7A7A7A]">
                                  {formatTimeTo12Hours(item.start_time)} to{" "}
                                  {formatTimeTo12Hours(item.end_time)}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                    {!reservationLoading &&
                      reservationMessage &&
                      reservationData?.length === 0 && (
                        <div className="flex justify-center items-center w-full h-[400px]">
                          <ShowMessage message={reservationMessage} />
                        </div>
                      )}
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
export default ReservationDetailModal;
