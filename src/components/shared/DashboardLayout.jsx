import React from "react";
import Sidebar from "../shared/Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full h-[100vh] flex bg-backgroundColor">
      <div className="w-[20%] h-full ">
        <Sidebar />
      </div>
      <div className="overflow-y-auto w-[80%] h-full">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
