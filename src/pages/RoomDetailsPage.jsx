/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../components/shared/DashboardLayout";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import DeleteModal from "../components/modals/DeleteModal";
import ReservationModal from "../components/modals/ReservationModal";
import useGetReservations from "../hooks/useGetReservations";
import { skelton_data } from "../staticData/SkeltonData";
import { CardSkelton_3 } from "../components/shared/Skeltons";
import ShowMessage from "../components/shared/ShowMessage";
import GlobalContext from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

function RoomDetailsPage() {
  return (
    <DashboardLayout>
      <div className="bg-backgroundColor px-5 py-2 flex flex-col w-full h-auto">
        <MainLayout />
      </div>
    </DashboardLayout>
  );
}

export default RoomDetailsPage;

function MainLayout() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedReserveRoom, setSelectedReserveRoom] = useState(null);
  const { roomId, name } = useParams();

  const { updateResponse } = useContext(GlobalContext);
  const {
    getReservations,
    reservationData,
    reservationLoading,
    reservationMessage,
  } = useGetReservations();

  useEffect(() => {
    getReservations(`/${roomId}`);
  }, [updateResponse]);

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
    <>
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="2xl:font-[700] 2xl:text-[36px] lg:font-[500] lg:text-[30px] font-roboto text-[#263238]">
            Reservations
          </h1>
          <span className="2xl:text-[18px] font-[400] lg:text-[15px] font-roboto text-[#7A7A7A]">
            Show all data here
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              setIsOpenModal(true);
              setIsEditMode(false);
            }}
            className="flex items-center border bg-[#017663] border-none rounded-[6px] px-5 gap-3 min-w-[180px] h-[50px] cursor-pointer text-white"
          >
            <MdOutlinePersonAddAlt1 className="text-[18px] text-white" />
            <p className="2xl:font-[700] 2xl:text-[15px] lg:font-[500] lg:text-[14px]  font-roboto">
              Add New Reservation
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 px-0">
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
                  "Actions",
                ].map((item, index) => (
                  <th scope="col" className="py-5 px-3 w-[16.66%]" key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {reservationLoading ? (
                <>
                  {skelton_data.slice(0, 10).map((_, index) => (
                    <CardSkelton_3 key={index} />
                  ))}
                </>
              ) : (
                <>
                  {reservationData?.map((item, index) => (
                    <tr key={index} className="border border-b-[#EBEDF4]">
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
                      <td className="py-3 px-3 text-[#7A7A7A]">{name}</td>
                      <td className="py-3 px-3 text-[#7A7A7A]">
                        {formatDate(item.reserve_date)}
                      </td>
                      <td className="py-3 px-3 text-[#7A7A7A]">
                        {formatTimeTo12Hours(item.start_time)} to{" "}
                        {formatTimeTo12Hours(item.end_time)}
                      </td>
                      <td className="py-3 px-3 flex gap-2 items-center">
                        <MdEdit
                          className="text-[#017663] text-[18px] cursor-pointer transition-transform duration-300 hover:scale-125"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditMode(true);
                            setSelectedReserveRoom(item);
                            setIsOpenModal(true);
                          }}
                        />
                        <MdDeleteOutline
                          className="text-red-600 text-[20px] cursor-pointer transition-transform duration-300 hover:scale-125"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal(true);
                            setSelectedReserveRoom(item);
                          }}
                        />
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

      <ReservationModal
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        isEditMode={isEditMode}
        roomId={roomId}
        selectedReserveRoom={selectedReserveRoom}
        setSelectedReserveRoom={setSelectedReserveRoom}
      />

      <DeleteModal
        setIsOpenModal={setDeleteModal}
        isOpenModal={deleteModal}
        url={`/api/rooms/delete-reserve-room/${selectedReserveRoom?._id}`}
      />
    </>
  );
}
