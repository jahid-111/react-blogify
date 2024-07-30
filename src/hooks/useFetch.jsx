import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/${path}`
        );

        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setTimeout(() => {
          setError(error.message);
          setLoading(false);
        }, 10000);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};

export default useFetch;
