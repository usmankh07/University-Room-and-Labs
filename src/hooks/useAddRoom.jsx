import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import GlobalContext from "../context/GlobalContext";

const useAddRoom = () => {
  const token = Cookies.get("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const { setUpdateResponse } = useContext(GlobalContext);

  const addRoom = async (payload, handleClose) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/room/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        handleClose();
        setUpdateResponse(true);
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: "Room successfully created!",
          customClass: {
            confirmButton: "custom-green-button",
          },
        });
      })
      .catch((error) => {
        setLoading(false);
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

  return { loading, addRoom };
};
export default useAddRoom;
