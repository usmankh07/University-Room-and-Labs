/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardPage from "../pages/DashboardPage.jsx";
import RoomPage from "../pages/RoomPage";
import Cookies from "js-cookie";
import useCurrentUser from "../hooks/useCurrentUser";
import RoomDetailsPage from "../pages/RoomDetailsPage.jsx";
import Home from "../pages/Home.jsx";

const Routing = () => {
  const { getCurrentUser } = useCurrentUser();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      getCurrentUser(token);
    }
  }, [token]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {token ? (
            <>
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              <Route path="/admin/rooms" element={<RoomPage />} />
              <Route
                path="/admin/rooms/:name/:roomId"
                element={<RoomDetailsPage />}
              />
              <Route path="*" element={<DashboardPage />} />
            </>
          ) : (
            <>
              <Route path="/admin/login" element={<Login />} />
              <Route path="*" element={<Home />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
