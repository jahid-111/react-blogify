import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Blog from "./Blog";
import BlogComments from "./BlogComments";
import PostComment from "./PostComment";

const SingleBlog = () => {
  const { id } = useParams();

  const {
    data: blog,
    loading: blogLoading,
    error: blogError,
  } = useFetch(`blogs/${id}`);
  // console.log(blog);

  return (
    <div className="container text-center py-8">
      <Blog blog={blog}></Blog>
      <PostComment blog={blog}></PostComment>
      <BlogComments blog={blog}></BlogComments>
    </div>
  );
};

export default SingleBlog;
