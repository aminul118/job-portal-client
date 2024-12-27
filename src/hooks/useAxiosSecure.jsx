import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("ERROR CAUGHT IN INTERCEPTOR", error);
        if (error.status === 401 || 403) {
          console.log("Need To log out the user");
          signOutUser().then(() => {
            navigate("/signIn");
            console.log("Sign out user").catch((err) => {
              console.log("SIGN OUT ERROR");
            });
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
