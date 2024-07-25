import useBlogs from "../../hooks/useBlogs";
import ErrorData from "../pages/error-page/ErrorData";
import LoadingFetch from "../pages/error-page/LoadingFetch";
import CardBlog from "./CardBlog";

const Blogs = () => {
  const { blogs, loading, error } = useBlogs();
  // const blogData = blogs?.data?.blogs;
  // console.log(blogData);
  return (
    <div className="space-y-3 md:col-span-5">
      {loading ? (
        <LoadingFetch></LoadingFetch>
      ) : error ? (
        <ErrorData></ErrorData>
      ) : (
        blogs?.data?.blogs?.map((blog) => (
          <CardBlog key={blog.id} blog={blog} />
        ))
      )}
    </div>
  );
};

export default Blogs;
