/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useToken from "../../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaHeart } from "react-icons/fa";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";

const ActionBlog = ({ blog, onFocusTextarea }) => {
  const { auth } = useAuth();
  const { api } = useToken();
  const publicAction = useNavigate();
  // ======================================================== Like Action
  const [isLiked, setIsLiked] = useState(
    blog?.likes.some((like) => like.id === auth?.user?.id) || false
  );
  const [likesCount, setLikesCount] = useState(blog?.likes.length || 0);

  // ======================================================== Favorite Toggle
  const [fav, setFavorite] = useState([]);
  const [isFavorite, setIsFavorite] = useState(null);

  const { data: favorites } = useFetch(`blogs/favourites`);

  useEffect(() => {
    //------------------- Favorites listen initial
    if (favorites) {
      const favoriteIds = favorites.blogs.map((fav) => fav.id);
      setFavorite(favoriteIds);
      setIsFavorite(favoriteIds.includes(blog?.id));
    }
  }, [favorites, blog?.id]);

  const handleLike = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        const { isLiked: newIsLiked, likes } = response.data;
        setIsLiked(newIsLiked);
        setLikesCount(likes.length);
        if (newIsLiked) {
          toast.success("Liked");
        } else {
          toast.error("Dislike");
        }
      }
    } catch (error) {
      console.warn(error.message);
      if (!error.config.headers.Authorization) {
        publicAction("/login");
        toast.error("Please Login");
      }
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/favourite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        const toggleIsFavorite = response.data.isFavourite;
        setIsFavorite(toggleIsFavorite);
        if (toggleIsFavorite) {
          setFavorite((prevFav) => [...prevFav, blog.id]);
          toast.success("Added Favorite");
        } else {
          setFavorite((prevFav) => prevFav.filter((id) => id !== blog.id));
          toast.error("Removed From Favorite");
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      if (!error.config.headers.Authorization) {
        publicAction("/login");
        toast.error("Please Login");
      }
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <button onClick={onFocusTextarea}>
            {" "}
            <FaComment className=" h-7 w-7" />{" "}
          </button>{" "}
        </li>

        <li>
          <button onClick={handleFavorite}>
            {isFavorite ? (
              <FaHeart className=" h-7 w-7 text-red-500"></FaHeart>
            ) : (
              <FaHeart className=" h-7 w-7 "></FaHeart>
            )}{" "}
          </button>
        </li>

        <li>
          <button onClick={handleLike}>
            <div className=" flex gap-1 items-center  justify-center">
              {isLiked ? (
                <AiFillLike className="text-blue-500 h-7 w-7" />
              ) : (
                <AiFillLike className="h-7 w-7" />
              )}
              <span className="text-center "> {likesCount} </span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionBlog;
