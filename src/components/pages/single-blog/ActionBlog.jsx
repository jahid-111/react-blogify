/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useToken from "../../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaHeart } from "react-icons/fa";

const ActionBlog = ({ blog, onFocusTextarea }) => {
  const { auth } = useAuth();
  const { api } = useToken();
  const LikeActionError = useNavigate();

  // ----------------------------------------------------------- Like Action
  const [isLiked, setIsLiked] = useState(
    blog?.likes.some((like) => like.id === auth?.user?.id) || false
  );
  const [likesCount, setLikesCount] = useState(blog?.likes.length || 0);

  // ----------------------------------------------------------- Favorite Toggle
  const [fav, setFav] = useState([]);
  const [isFavorite, setIsFavorite] = useState(null);

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
      }
    } catch (error) {
      console.warn(error.message);
      if (!error.config.headers.Authorization) {
        LikeActionError("/login");
      }
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/favourite`,
        { fav },
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        if (isFavorite) {
          setFav((prevFav) => prevFav.filter((id) => id !== blog.id));
        } else {
          setFav((prevFav) => [...prevFav, blog.id]);
        }

        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      if (!error.config.headers.Authorization) {
        LikeActionError("/login");
      }
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
              <FaHeart className=" h-7 w-7 text-red-500" />
            ) : (
              <FaHeart className="h-7 w-7" />
            )}
          </button>
        </li>

        <li>
          <button onClick={handleLike}>
            <div className=" flex gap-1 items-center  justify-center">
              {isLiked ? (
                <AiFillLike className="text-blue-600 h-7 w-7" />
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
