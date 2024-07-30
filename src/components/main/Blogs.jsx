import useFetch from "../../hooks/useFetch";
import ErrorData from "../pages/error-page/ErrorData";
import LoadingFetch from "../pages/error-page/LoadingFetch";
import CardBlog from "./CardBlog";

const Blogs = () => {
  const {
    data: blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch("blogs");



  // console.log(blogs)
  return (
    <div className="space-y-3 md:col-span-5">
      {blogsLoading ? (
        <LoadingFetch></LoadingFetch>
      ) : blogsError ? (
        <ErrorData></ErrorData>
      ) : (
        blogs?.blogs?.map((blog) => <CardBlog key={blog.id} blog={blog} />)
      )}
    </div>
  );
};

export default Blogs;
