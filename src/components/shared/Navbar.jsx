import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import profile from "../../assets/logo.png";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
function Navbar() {
  const { userInfo } = useContext(GlobalContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  return (
    <>
      <div className="w-full bg-backgroundColor py-6 px-5 sticky top-0 z-50">
        <div className="w-full bg-[#FCFCFC] px-[20px] py-[20px] flex rounded-[10px] items-center justify-between">
          <div>
            {window.location.pathname === "/admin/dashboard" && (
              <h1 className="2xl:font-[700] 2xl:text-[32px] lg:font-[500] lg:text-[30px] font-roboto text-[#1C1D1E]">
                Welcome On Board!
              </h1>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pr-4 hover:text-themeColor cursor-pointer">
              <div className="relative">
                <FaBell className="bg-backgroundColor rounded-[30px] p-2 text-[30px]" />
              </div>
              {userInfo?.picture ? (
                <img
                  src={`${BASE_URL}${userInfo?.picture}`}
                  alt=""
                  className="rounded-full w-[45px] h-[45px] border border-backgroundColor p-1"
                />
              ) : (
                <svg
                  class="w-[45px] h-[45px] text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              )}
              <div>
                <>
                  <h1 className=" font-[500] text-[16px] font-roboto text-[#1C1D1E]">
                    {userInfo?.username}
                  </h1>
                  <p className="font-[300] text-[15px] font-roboto text-[#C1C1C1]">
                    {userInfo?.role}
                  </p>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
