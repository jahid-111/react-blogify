import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Blog from "./Blog";
import BlogComments from "./BlogComments";
import PostComment from "./PostComment";
import ActionBlog from "./ActionBlog";
import LoadingFetch from "../error-page/LoadingFetch";
import ErrorData from "../error-page/ErrorData";

const SingleBlog = () => {
  const { id } = useParams();

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
          <PostComment blog={blog}></PostComment>
          <BlogComments blog={blog}></BlogComments>
          <ActionBlog></ActionBlog>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
