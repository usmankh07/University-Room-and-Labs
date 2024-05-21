import axios from "axios";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const useCurrentUser = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { setUserInfo } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async (token) => {
    await axios
      .get(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setUserInfo(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return { loading, getCurrentUser };
};
export default useCurrentUser;
