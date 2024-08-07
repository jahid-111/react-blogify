import axios from "axios";
import { useEffect, useState } from "react";

const usePost = (param) => {
  const [post, setPost] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const sendPost = async () => {
      try {
        setPostLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/${param}`
        );
        if (isMounted) {
          setPost(response.data);
          setPostLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setPostError(error);
          setPostLoading(false);
        }
      }
    };

    sendPost();

    return () => {
      isMounted = false;
    };
  }, [param]);
  return { post, postLoading, postError };
};

export default usePost;
