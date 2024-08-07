/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import { api } from "../data-api";
import { useAuth } from "./useAuth";
import axios from "axios";

const useToken = () => {
  const { auth, setAuth } = useAuth();
  // console.log(auth);

  useEffect(() => {
    // REQUEST
    // ________________________________
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          // console.log("Your Token is OK");
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE
    // ________________________________

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 500 ||
          (error.response.status === 403 && !originalRequest._retry)
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const token = response.data.accessToken;
            console.warn("PROVIDED  : NEW TOKEN");
            setAuth({ ...auth, authToken: token });

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(originalRequest);
          } catch (error) {
            // console.error("Request failed with status code 400",error);
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, auth?.authToken, auth?.refreshToken, setAuth]);

  return { api };
};

export default useToken;
