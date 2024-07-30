import { useEffect } from "react";
import { api } from "../data-api";
import { useAuth } from "./useAuth";
import axios from "axios";

const useToken = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;

            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/refresh-token`,
              { refreshToken }
            );

            const { token } = response.data;
            console.log(`New Token ${token}`);

            setAuth({ ...auth, authToken: token });
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(originalRequest);
          } catch (error) {
            console.error("Token refresh error:", error);
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, auth.authToken, auth?.refreshToken, setAuth]);
  console.log(api);
  return { api };
};

export default useToken;
