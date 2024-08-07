import { useEffect, useState } from "react";
import { api } from "../data-api";
import { useAuth } from "./useAuth";
import useToken from "./useToken";

const useFetch = (path) => {
  const { auth, setAuth } = useAuth();
  useToken();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/${path}`
        );
        if (response.status === 200) {
          // console.log("useFetch Response :", response);
          setAuth((prevAuth) => ({
            ...prevAuth,
          }));
          setData(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth?.authToken, path, setAuth]);

  return { data, loading, error };
};

export default useFetch;
