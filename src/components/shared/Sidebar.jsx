import React from "react";
import logo from "../../assets/logo.png";
import { RxDashboard } from "react-icons/rx";
import { TbPresentationAnalytics } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import Cookies from "js-cookie";

function Sidebar() {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/admin/login";
  };
  return (
    <>
      <div className="w-full bg-backgroundColor py-6 px-6 h-[100vh] flex flex-col  justify-between ">
        <div>
          <Link to="/admin/dashboard" className="flex items-center gap-4">
            <img src={logo} alt="" className="w-[50px] h-[50px]" />
            <h1 className="font-[800] text-[20px]">ClassLink</h1>
          </Link>

          <div className=" flex flex-col 2xl:gap-6 lg:gap-4 mt-10">
            <NavLink
              to="/"
              className={`flex items-center gap-2 px-5 py-2 rounded text-[#263238] cursor-pointer hover:text-themeColor hover:bg-[#ffedee] hover:font-[700]`}
            >
              <IoHomeOutline className="text-[20px]" />
              <p className="2xl:text-[20px] lg:text-[18px] font-roboto ">
                Home
              </p>
            </NavLink>
            <NavLink
              to="/admin/dashboard"
              className={`flex items-center gap-2 px-5 py-2 rounded text-[#263238] cursor-pointer hover:text-themeColor hover:bg-[#ffedee] hover:font-[700]`}
            >
              <RxDashboard className="text-[20px]" />
              <p className="2xl:text-[20px] lg:text-[18px] font-roboto ">
                Dashboard
              </p>
            </NavLink>

            <NavLink
              to="/admin/rooms"
              className={`flex items-center gap-2 px-5 py-2 rounded text-[#263238] cursor-pointer hover:text-themeColor hover:bg-[#ffedee] hover:font-[700]`}
            >
              <TbPresentationAnalytics className="text-[20px]" />
              <p className=" 2xl:text-[20px]  lg:text-[18px] font-roboto ">
                Rooms
              </p>
            </NavLink>
          </div>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 border border-[#DCDCDC] rounded py-2 cursor-pointer hover:border-themeColor hover:text-themeColor"
        >
          <IoMdLogOut className="text-[20px]" />
          <p className="font-[500] text-[18px] font-roboto ">Log out</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
