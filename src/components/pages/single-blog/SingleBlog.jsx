import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Blog from "./Blog";
import BlogComments from "./BlogComments";
import PostComment from "./PostComment";
import ActionBlog from "./ActionBlog";
import LoadingFetch from "../error-page/LoadingFetch";
import ErrorData from "../error-page/ErrorData";
import { useRef } from "react";
const SingleBlog = () => {
  const { id } = useParams();

  const commentRef = useRef(null);
  const handleComment = () => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  };

  const {
    data: blog,
    loading: blogLoading,
    error: blogError,
  } = useFetch(`blogs/${id}`);
  return (
    <div className="container text-center py-8">
      {blogLoading ? (
        <LoadingFetch />
      ) : blogError ? (
        <ErrorData />
      ) : (
        <>
          <Blog blog={blog}></Blog>
          <PostComment blog={blog} ref={commentRef}></PostComment>
          <BlogComments blog={blog}></BlogComments>
          <ActionBlog onFocusTextarea={handleComment} blog={blog}></ActionBlog>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
