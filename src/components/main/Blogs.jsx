import useBlogs from "../../hooks/useBlogs";
import CardBlog from "./CardBlog";

const Blogs = () => {
  const { blogs, loading, error } = useBlogs();
  // const blogData = blogs?.data?.blogs;
  // console.log(blogData);
  return (
    <div className="space-y-3 md:col-span-5">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : (
        blogs?.data?.blogs?.map((blog) => (
          <CardBlog key={blog.id} blog={blog} />
        ))
      )}
    </div>
  );
};

export default Blogs;
