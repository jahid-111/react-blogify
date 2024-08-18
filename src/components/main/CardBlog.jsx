/* eslint-disable react/prop-types */

import { forwardRef } from "react";
import { Link } from "react-router-dom";

const CardBlog = ({ blog }, ref) => {
  return (
    <div ref={ref} className="blog-card">
      <Link to={`/single-blog/${blog.id}`}>
        <img
          className="blog-thumb"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blog?.thumbnail
          }`}
          alt={`${blog.author.firstName}'s Blog`}
        />
      </Link>

      <div className="mt-2 relative">
        <Link to={`/single-blog/${blog.id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog.title}</h3>
        </Link>
        <p className="mb-6 text-base text-slate-500 mt-1">{blog.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">
                <Link
                  className=" underline hover:text-green-500"
                  to={`/profile/${blog?.author?.id}`}
                >
                  {" "}
                  <span>{blog.author.firstName}</span>{" "}
                  <span>{blog?.author?.lastName}</span>
                </Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span> Likes {blog?.likes?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CardBlog);
