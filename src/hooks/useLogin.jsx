import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useCurrentUser from "./useCurrentUser";
import Cookies from "js-cookie";

function useLogin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { getCurrentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const Login = async (payload) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/auth/login`, payload)
      .then((response) => {
        Cookies.set("token", response.data.tokens.access_token, { expires: 7 });
        Cookies.set("refresh", response.data.tokens.refresh_token, {
          expires: 7,
        });
        setLoading(false);
        window.location.href = "/admin/dashboard";
        getCurrentUser(response.data.tokens.access_token);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          text:
            error?.response?.data?.message ||
            "Oops! Something went wrong on our end. Please give us a moment to fix it. Feel free to try again later",
          customClass: {
            confirmButton: "custom-red-button",
          },
        });
      });
  };
  return { Login, loading };
}
export default useLogin;
