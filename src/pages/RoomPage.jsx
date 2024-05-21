/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import DashboardLayout from "../components/shared/DashboardLayout";
import RoomModal from "../components/modals/RoomModal";
import { useNavigate } from "react-router-dom";
import { skelton_data } from "../staticData/SkeltonData";
import { CardSkelton_2 } from "../components/shared/Skeltons";
import DeleteModal from "../components/modals/DeleteModal";
import GlobalContext from "../context/GlobalContext";
import ShowMessage from "../components/shared/ShowMessage";
import RoomCard from "../components/RoomCard";
import useGetRooms from "../hooks/useGetRooms";

const RoomPage = () => {
  return (
    <DashboardLayout>
      <div className="bg-backgroundColor px-5 py-2 flex flex-col w-full h-auto">
        <MainLayout />
      </div>
    </DashboardLayout>
  );
};

export default RoomPage;

function MainLayout() {
  const Navigate = useNavigate();
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { updateResponse } = useContext(GlobalContext);
  const { getRooms, roomLoading, roomsData, roomMessage } = useGetRooms();

  useEffect(() => {
    getRooms(``);
  }, [updateResponse]);

  const handleMenu = (item, e, index) => {
    e.stopPropagation();
    setShowMenuIndex(index);
    setSelectedRoom(item);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenuIndex(null);
        setSelectedRoom(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const NavigateToDetailsPage = (item) => {
    Navigate(`/admin/rooms/${item.room_no}/${item._id}`);
  };
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="2xl:font-[700] 2xl:text-[36px] lg:font-[500] lg:text-[30px] font-roboto text-[#263238]">
            Rooms
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
            className="  flex items-center border bg-[#017663] border-none rounded-[6px] px-5 gap-3 min-w-[180px] h-[50px] cursor-pointer text-white"
          >
            <MdOutlinePersonAddAlt1 className="text-[18px] text-white" />
            <p className="2xl:font-[700] 2xl:text-[15px] lg:font-[500] lg:text-[14px]  font-roboto">
              Add New Room
            </p>
          </div>
        </div>
      </div>
      {roomLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-5">
          {skelton_data.slice(0, 12).map((_, index) => (
            <CardSkelton_2 key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-5">
          {roomsData?.map((item, index) => (
            <div key={index}>
              <RoomCard
                key={index}
                item={item}
                index={index}
                show={showMenuIndex === index}
                handleMenu={(e) => handleMenu(item, e, index)}
                NavigateToDetailsPage={() => NavigateToDetailsPage(item)}
                setDeleteModal={setDeleteModal}
                setIsEditMode={setIsEditMode}
                setIsOpenModal={setIsOpenModal}
                setShowMenuIndex={setShowMenuIndex}
                dropdownRef={dropdownRef}
              />
            </div>
          ))}
        </div>
      )}
      {!roomLoading && roomMessage && roomsData?.length === 0 && (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <ShowMessage message={roomMessage} />
        </div>
      )}

      <RoomModal
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        isEditMode={isEditMode}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      <DeleteModal
        setIsOpenModal={setDeleteModal}
        isOpenModal={deleteModal}
        url={`/api/rooms/delete-room/${selectedRoom?._id}`}
      />
    </>
  );
}
