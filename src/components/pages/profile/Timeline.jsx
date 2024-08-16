/* eslint-disable react/prop-types */

import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const Timeline = ({ profile, auth }) => {
  const contentThreshold = 150;

  return (
    <div className="my-6 space-y-4">
      <h4 className="mt-6  text-2xl text-gray-300 font-semibold lg:mt-8 lg:text-3xl">
        Timeline
      </h4>
      {profile?.blogs?.length === 0 ? (
        <h3 className=" text-xl text-center text-green-400 hover:text-green-200   ">
          <Link to={`/create-blog`}>Create Blog 😍</Link>{" "}
        </h3>
      ) : (
        <>
          {profile?.blogs.map((blog) => (
            <div key={blog.id} className="my-6 space-y-4">
              <div className="blog-card ">
                <Link to={`/single-blog/${blog.id}`}>
                  <img
                    className="blog-thumb "
                    src={`${
                      import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${blog?.thumbnail}`}
                    alt=""
                  />
                </Link>

                <div className="mt-2">
                  <h3 className="text-slate-300 sm:h-7  text-xl lg:text-2xl">
                    <Link to={`/single-blog/${blog.id}`}>{blog?.title}</Link>
                  </h3>

                  <p className="mb-6 text-base h-20 text-slate-500 mt-1">
                    {blog?.content.slice(0, contentThreshold)}
                    <Link
                      className=" text-green-500"
                      to={`/single-blog/${blog.id}`}
                    >
                      ...More
                    </Link>
                  </p>

                  <div
                    className="flex h-14
                   justify-between items-center"
                  >
                    <div className="flex items-center capitalize space-x-2">
                      <div className="avater-img bg-indigo-600 text-white">
                        <img
                          src={`${
                            import.meta.env.VITE_SERVER_BASE_URL
                          }/uploads/avatar/${blog?.author.avatar}`}
                          alt=""
                        />
                      </div>

                      <div>
                        <h5 className="text-slate-500 text-sm">
                          {blog?.author?.firstName} {blog?.author?.lastName}
                        </h5>
                        <div className="flex items-center text-xs text-slate-700">
                          <span>June 28, 2018</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-1 items-center text-slate-700">
                      <AiFillLike className="h-7 w-7" />
                      <p className=" text-xl font-semibold ">
                        {blog.likes.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Timeline;
