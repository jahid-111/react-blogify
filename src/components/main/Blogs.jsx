import { useEffect, useState, useRef, useCallback } from "react";

import CardBlog from "./CardBlog"; // Replace with your actual path
import ErrorData from "../pages/error-page/ErrorData";
import LoadingFetch from "../pages/error-page/LoadingFetch";
import { api } from "../../data-api";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of items per page
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { auth } = useAuth();
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

  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setBlogs((prvBlogs) => prvBlogs.filter((blog) => blogId !== blog.id));
        toast.success("Delete Successfully");
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Failed To Delete This Blog");
      }
    }
  };

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs?.map((blog, index) => {
        if (blogs.length === index + 1) {
          return (
            <CardBlog
              ref={lastBlogElementRef}
              onDelete={handleDeleteBlog}
              key={blog.id}
              blog={blog}
            />
          );
        } else {
          return (
            <CardBlog onDelete={handleDeleteBlog} key={blog.id} blog={blog} />
          );
        }
      })}

      {blogsLoading && <LoadingFetch />}
      {blogsError && <ErrorData />}
    </div>
  );
};

export default BlogList;
