/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import ShowMessage from "../components/shared/ShowMessage";
import { CardSkelton_4 } from "../components/shared/Skeltons";
import useGetRooms from "../hooks/useGetRooms";
import useGetLabs from "../hooks/useGetLabs";
import { skelton_data } from "../staticData/SkeltonData";
import LabCard from "../components/LabCard";
import ReservationDetailModal from "../components/modals/ReservationDetailModal";
function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { getRooms, roomLoading, roomsData, roomMessage } = useGetRooms();
  const { getLabs, labsLoading, labsData, labsMessage } = useGetLabs();

  useEffect(() => {
    getRooms(`?room_type=room`);
    getLabs(`?room_type=lab`);
  }, []);

  const NavigateToDetailsPage = (item) => {
    setIsOpenModal(true);
    setSelectedRoom(item);
  };
  return (
    <>
      <div className=" w-full h-auto">
        <div className="bg-backgroundColor px-5 py-2 flex items-center gap-4 w-full h-auto sticky top-0 z-20">
          <img src={logo} alt="" className="w-[50px] h-[50px]" />
          <h1 className="font-[800] text-[20px]">ClassLink</h1>
        </div>
        <div className="p-4 pb-8 bg-backgroundColor mt-4">
          <div className="font-[800] text-[30px]">Rooms</div>
          {roomLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-1">
              {skelton_data.slice(0, 8).map((_, index) => (
                <CardSkelton_4 key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-1">
              {roomsData?.map((item, index) => (
                <div key={index}>
                  <LabCard
                    key={index}
                    item={item}
                    index={index}
                    NavigateToDetailsPage={() => NavigateToDetailsPage(item)}
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
        </div>
        <div className="p-4 pb-8 bg-backgroundColor mt-4">
          <div className="font-[800] text-[30px]">Labs</div>
          {labsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-1">
              {skelton_data.slice(0, 8).map((_, index) => (
                <CardSkelton_4 key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-1">
              {labsData?.map((item, index) => (
                <div key={index}>
                  <LabCard
                    key={index}
                    item={item}
                    index={index}
                    NavigateToDetailsPage={() => NavigateToDetailsPage(item)}
                  />
                </div>
              ))}
            </div>
          )}
          {!labsLoading && labsMessage && labsData?.length === 0 && (
            <div className="w-full h-[50vh] flex justify-center items-center">
              <ShowMessage message={labsMessage} />
            </div>
          )}
        </div>
      </div>
      <ReservationDetailModal
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        selectedRoom={selectedRoom}
      />
      <div className="bg-backgroundColor px-5 py-2 flex items-center gap-4 w-full h-auto mt-4 justify-center">
        {/*  */}
      </div>
    </>
  );
}

export default Home;
