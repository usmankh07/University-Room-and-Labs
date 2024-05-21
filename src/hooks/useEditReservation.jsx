import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import GlobalContext from "../context/GlobalContext";

const useEditReservation = () => {
  const token = Cookies.get("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading1, setLoading1] = useState(false);
  const { setUpdateResponse } = useContext(GlobalContext);

  const editReservation = async (payload, handleClose) => {
    setLoading1(true);
    await axios
      .patch(`${BASE_URL}/api/rooms/update-reserve-room`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        handleClose();
        setUpdateResponse(true);
        setLoading1(false);
        Swal.fire({
          icon: "success",
          text: "Reservation successfully updated!",
          customClass: {
            confirmButton: "custom-green-button",
          },
        });
      })
      .catch((error) => {
        setLoading1(false);
        handleClose();
        Swal.fire({
          icon: "error",
          text:
            error?.response?.data.message ||
            "Oops! Something went wrong on our end. Please give us a moment to fix it. Feel free to try again later",
          customClass: {
            confirmButton: "custom-red-button",
          },
        });
      });
  };

  return { loading1, editReservation };
};
export default useEditReservation;
