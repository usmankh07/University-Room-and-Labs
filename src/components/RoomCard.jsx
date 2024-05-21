import { HiOutlineDotsVertical } from "react-icons/hi";

function RoomCard({
  item,
  index,
  show,
  handleMenu,
  setDeleteModal,
  setIsEditMode,
  setIsOpenModal,
  setShowMenuIndex,
  dropdownRef,
  NavigateToDetailsPage,
}) {
  return (
    <div
      className="w-full bg-[#FFFFFF] rounded-[10px] p-[20px] flex flex-col  relative cursor-pointer border border-transparent hover:border-[#017663]"
      key={index}
      onClick={NavigateToDetailsPage}
    >
      <div className="flex flex-col gap-1  mb-4">
        <span className="font-[500] text-[20px] font-roboto text-[#1C1D1E]">
          {item.room_no}
        </span>

        <span className="font-[400] text-[12px] font-roboto text-[#7A7A7A]">
          {item.is_reserved ? "Reserved" : "Free"}
        </span>
      </div>
      <div className="flex items-center justify-between ">
        <span className=" font-[500] text-[12px] font-roboto text-[#1C1D1E]">
          Total Reservations
        </span>

        <span className=" font-[700] text-[12px] font-roboto text-[#1C1D1E]">
          {item.totalReservations}
        </span>
      </div>
      <div className="flex items-center justify-between  ">
        <span className=" font-[500] text-[12px] font-roboto text-[#1C1D1E]">
          Today Reservations
        </span>

        <span className=" font-[700] text-[12px] font-roboto text-[#1C1D1E]">
          {item.todayReservations}
        </span>
      </div>

      <div className="absolute right-1 top-1 p-2">
        <HiOutlineDotsVertical
          className="text-[20px] text-[#7A7A7A] z-40"
          onClick={handleMenu}
        />
      </div>
      {show && (
        <DropMenu
          setDeleteModal={setDeleteModal}
          setIsEditMode={setIsEditMode}
          setIsOpenModal={setIsOpenModal}
          setShowMenuIndex={setShowMenuIndex}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
}
export default RoomCard;
function DropMenu({
  setDeleteModal,
  setIsEditMode,
  setIsOpenModal,
  setShowMenuIndex,
  dropdownRef,
}) {
  return (
    <div
      className="w-[80px] rounded border border-[#DCDCDC] bg-[#F9F9FF] p-1 absolute right-[2%] top-[15%]  flex flex-col z-[8888] "
      ref={dropdownRef}
    >
      <span
        className=" font-[400] text-[13px] font-roboto text-[#1C1D1E]  hover:bg-[#f09ea073] rounded px-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditMode(true);
          setIsOpenModal(true);
          setShowMenuIndex(null);
        }}
      >
        Edit
      </span>
      <span
        className=" font-[400] text-[13px] font-roboto text-[#1C1D1E]  hover:bg-[#f09ea073] rounded px-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setDeleteModal(true);
          setShowMenuIndex(null);
        }}
      >
        Remove
      </span>
    </div>
  );
}
