import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

function useGetTotalCounts() {
  const token = Cookies.get("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [counts, setCounts] = useState(null);
  const [countsLoading, setCountsLoading] = useState(true);

  const getCounts = async () => {
    await axios
      .get(`${BASE_URL}/api/total-counts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCountsLoading(false);
        setCounts(response.data);
      })
      .catch((error) => {
        setCountsLoading(false);
      });
  };
  return { countsLoading, getCounts, counts };
}

export default useGetTotalCounts;
