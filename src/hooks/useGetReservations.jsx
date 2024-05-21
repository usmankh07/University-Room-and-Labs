import axios from "axios";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const useGetReservations = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [reservationData, setReservationData] = useState(null);
  const [reservationLoading, setReservationLoading] = useState(true);
  const [reservationMessage, setReservationMessage] = useState(null);
  const { setUpdateResponse } = useContext(GlobalContext);

  const getReservations = async (filter) => {
    setReservationLoading(true);
    await axios
      .get(`${BASE_URL}/api/rooms/reservation${filter}`)
      .then((response) => {
        setReservationLoading(false);
        setReservationData(response.data.data);
        setUpdateResponse(false);
        if (response.data.data.length === 0) {
          setReservationMessage("No reservations found");
        }
      })
      .catch((error) => {
        setReservationLoading(false);
        setReservationMessage(
          "Oops! Something went wrong on our end. Please give us a moment to fix it. Feel free to try again later"
        );
      });
  };
  return {
    getReservations,
    reservationData,
    reservationLoading,
    reservationMessage,
  };
};
export default useGetReservations;
