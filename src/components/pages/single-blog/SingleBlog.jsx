import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Blog from "./Blog";
import LoadingFetch from "../error-page/LoadingFetch";
import ErrorData from "../error-page/ErrorData";
import { useEffect, useRef, useState } from "react";
import Comments from "./Comments";
import { api } from "../../../data-api";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import ActionBlog from "./ActionBlog";
const SingleBlog = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentRef = useRef(null);
  const handleCommentFocus = () => {
    if (commentRef.current) {
      commentRef.current.focus();
      commentRef.current.style.backgroundColor = "#39403b";
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.style.backgroundColor = "";
        }
      }, 1000);
    }
  };

  const {
    data: blog,
    loading: blogLoading,
    error: blogError,
  } = useFetch(`blogs/${id}`);
  useEffect(() => {
    if (blog && blog.comments) {
      setComments(blog.comments);
    }
  }, [blog]);

  const handleCommentPost = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}/comment`,
        { content: comment },

        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );
      if (response.status === 200) {
        const newComments = response.data.comments;
        setComments(newComments);
        setComment("");
      }
    } catch (error) {
      if (!error.config.headers.Authorization) {
        navigate("/login");
        toast.error(`Please Login`);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/blogs/${id}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
        toast.success("Deleted");
      }
    } catch (error) {
      toast.error("An error occurred, Try Again");
    }
  };

  return (
    <div className="container text-center py-8">
      {blogLoading ? (
        <LoadingFetch />
      ) : blogError ? (
        <ErrorData />
      ) : (
        <>
          <Blog blog={blog} />
          <Comments
            onDelete={handleDeleteComment}
            ref={commentRef}
            onLoadComment={setComment}
            comments={comments}
            onPostComment={handleCommentPost}
          />
          <ActionBlog blog={blog} onFocusTextarea={handleCommentFocus} />
        </>
      )}
    </div>
  );
};

export default SingleBlog;
