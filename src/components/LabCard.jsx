function LabCard({ item, index, NavigateToDetailsPage }) {
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
    </div>
  );
}
export default LabCard;
