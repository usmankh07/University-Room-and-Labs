import React from "react";
import { PiStudent } from "react-icons/pi";
import { TbPresentationAnalytics } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CardSkelton_1 } from "./shared/Skeltons";
import { skelton_data } from "../staticData/SkeltonData";

function DashboardCard({ counts, countsLoading }) {
  const dashboard = [
    {
      id: 1,
      title: "Total Users",
      student: counts?.totalUsers || 0,
      icon: <PiStudent />,
      bgColor: "bg-green-300",
      textColor: "text-green-600",
    },
    {
      id: 2,
      title: "Total Rooms",
      student: counts?.totalRooms || 0,
      icon: <TbPresentationAnalytics />,
      bgColor: "bg-red-200",
      textColor: "text-red-600",
    },
    {
      id: 3,
      title: "Total Labs",
      student: counts?.totalLabs || 0,
      icon: <FaRegUser />,
      bgColor: "bg-gray-200",
      textColor: "text-gray-600",
    },
    {
      id: 4,
      title: "Total Reservations",
      student: counts?.totalReservations || 0,
      icon: <FaRegUser />,
      bgColor: "bg-gray-200",
      textColor: "text-gray-600",
    },
    {
      id: 5,
      title: "Today Reservations",
      student: counts?.todayReservations || 0,
      icon: <FaRegUser />,
      bgColor: "bg-gray-200",
      textColor: "text-gray-600",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mt-5">
        {countsLoading ? (
          <>
            {skelton_data.slice(0, 5).map((_, index) => (
              <CardSkelton_1 key={index} />
            ))}
          </>
        ) : (
          <>
            {dashboard?.map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] w-full py-6 px-6 flex relative"
                style={{ boxShadow: "0px 0px 7px #e0e0e0" }}
              >
                <div>
                  <p className="2xl:font-[400] 2xl:text-[22px] lg:font-[300] lg:text-[20px]  font-robo text-[#737373]">
                    {data.title}
                  </p>
                  <h1 className="2xl:font-[700] 2xl:text-[40px] lg:font-[500] lg:text-[37px] font-robo text-[#263238]">
                    {data.student}
                  </h1>
                </div>
                <div
                  className={`text-[22px] ${data.textColor} ${data.bgColor} rounded p-1 absolute bottom-6 right-8`}
                >
                  {data.icon}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default DashboardCard;
