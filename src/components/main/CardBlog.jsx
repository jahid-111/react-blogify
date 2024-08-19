/* eslint-disable react/prop-types */

import { forwardRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AiFillLike } from "react-icons/ai";

const CardBlog = ({ blog, onDelete }, ref) => {
  const [toggle, setToggle] = useState(null);
  const { auth } = useAuth();

  const blogAuthor = auth?.user?.id === blog?.author?.id;

  const handleToggle = (blogId) => {
    setToggle((prevId) => (prevId === blogId ? null : blogId));
  };

  return (
    <div className=" relative" ref={ref}>
      <div className=" relative blog-card">
        <Link to={`/single-blog/${blog.id}`}>
          <img
            className="blog-thumb h-full"
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
          <p className="  h-36 text-base text-slate-500 overflow-hidden mt-1">
            {blog.content.slice(0, 150)}{" "}
            <Link className=" text-green-500" to={`/single-blog/${blog.id}`}>
              ...More
            </Link>
          </p>

          <div className="flex w-full justify-between items-center bottom-0 absolute ">
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

            <div className="text-sm px-2 py-1 flex justify-center items-center gap-1 text-slate-700">
              <span>
                <AiFillLike />
              </span>
              <span>{blog?.likes?.length}</span>
            </div>
          </div>
        </div>
      </div>

      {toggle && (
        <div className="absolute top-2 right-4 rounded-md bg-slate-900  w-44 h-24 p-2">
          <button className="action-menu-item hover:text-lwsGreen">
            <BiEdit className=" h-6 w-6" /> Edit
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="action-menu-item hover:text-red-500"
          >
            <MdDeleteOutline className=" h-6 w-6" /> Delete
          </button>
        </div>
      )}

      {blogAuthor && (
        <>
          {" "}
          <div className=" absolute  z-50 top-2 right-2 hover:text-green-500">
            <button
              className=" 0 p-1 rounded-full"
              onClick={() => handleToggle(blog.id)}
            >
              <HiDotsVertical />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default forwardRef(CardBlog);
