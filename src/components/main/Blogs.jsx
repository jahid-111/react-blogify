import { useEffect, useState, useRef, useCallback } from "react";

import CardBlog from "./CardBlog"; // Replace with your actual path
import ErrorData from "../pages/error-page/ErrorData";
import LoadingFetch from "../pages/error-page/LoadingFetch";
import { api } from "../../data-api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of items per page
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerBlog = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogsLoading(true);
      setBlogsError(false);
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/blogs?page=${page}&limit=${limit}`
        );
        setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);

        setHasMore(response.data.blogs.length > 0);
      } catch (error) {
        setBlogsError(true);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, [limit, page]);

  const lastBlogElementRef = useCallback(
    (node) => {
      if (blogsLoading) return;
      if (observerBlog.current) observerBlog.current.disconnect();
      observerBlog.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observerBlog.current.observe(node);
    },
    [blogsLoading, hasMore]
  );

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs?.map((blog, index) => {
        if (blogs.length === index + 1) {
          return (
            <CardBlog ref={lastBlogElementRef} key={blog.id} blog={blog} />
          );
        } else {
          return <CardBlog key={blog.id} blog={blog} />;
        }
      })}

      {blogsLoading && <LoadingFetch />}
      {blogsError && <ErrorData />}
    </div>
  );
};

export default BlogList;
