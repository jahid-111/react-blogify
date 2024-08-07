/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useToken from "../../../hooks/useToken";
import { useNavigate } from "react-router-dom";

const ActionBlog = ({ blog }) => {
  const { auth } = useAuth();
  const { api } = useToken();
  const LikeActionError = useNavigate();

  const [isLiked, setIsLiked] = useState(
    blog?.likes.some((like) => like.id === auth?.user?.id) || false
  );

  const [likesCount, setLikesCount] = useState(blog?.likes.length || 0);

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

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>Comment</li>

        <li>Favorite</li>

        <li>
          <button onClick={handleLike}>
            {isLiked ? "Liked" : "Like"}
            <span> ( {likesCount} )</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionBlog;
