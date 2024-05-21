import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const useGetRooms = () => {
  const token = Cookies.get("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [roomsData, setRoomsData] = useState(null);
  const [roomLoading, setRoomLoading] = useState(true);
  const [roomMessage, setRoomMessage] = useState(null);
  const { setUpdateResponse } = useContext(GlobalContext);

  const getRooms = async (filter) => {
    await axios
      .get(`${BASE_URL}/api/rooms${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoomLoading(false);
        setRoomsData(response.data.data);
        setUpdateResponse(false);
        if (response.data.data.length === 0) {
          setRoomMessage("No records found");
        }
      })
      .catch((error) => {
        setRoomLoading(false);
        setRoomMessage(
          "Oops! Something went wrong on our end. Please give us a moment to fix it. Feel free to try again later"
        );
      });
  };
  return {
    getRooms,
    roomLoading,
    roomsData,
    roomMessage,
  };
};
export default useGetRooms;
