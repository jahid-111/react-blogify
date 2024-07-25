import { useEffect, useState } from "react";
import axios from "axios";

const useApi = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/blogs");
        // console.log(response);

        if (response.status == 200) {
          setBlogs(response);
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
  }, []);

  return { blogs, loading, error };
};

export default useApi;
