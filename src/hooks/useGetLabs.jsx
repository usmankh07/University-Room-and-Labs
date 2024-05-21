import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const useGetLabs = () => {
  const token = Cookies.get("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [labsData, setLabsData] = useState(null);
  const [labsLoading, setLabsLoading] = useState(true);
  const [labsMessage, setLabsMessage] = useState(null);
  const { setUpdateResponse } = useContext(GlobalContext);

  const getLabs = async (filter) => {
    await axios
      .get(`${BASE_URL}/api/rooms${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLabsLoading(false);
        setLabsData(response.data.data);
        setUpdateResponse(false);
        if (response.data.data.length === 0) {
          setLabsMessage("No records found");
        }
      })
      .catch((error) => {
        setLabsLoading(false);
        setLabsMessage(
          "Oops! Something went wrong on our end. Please give us a moment to fix it. Feel free to try again later"
        );
      });
  };
  return {
    getLabs,
    labsLoading,
    labsData,
    labsMessage,
  };
};
export default useGetLabs;
