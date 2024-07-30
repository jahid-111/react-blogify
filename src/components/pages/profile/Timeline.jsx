/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Timeline = ({ profile, auth }) => {
  return (
    <div className="my-6 space-y-4">
      <h4 className="mt-6 text-xl text-center lg:mt-8 lg:text-2xl">
      </h4>
      {profile?.blogs?.length  === 0 ? (
        <h3 className=" text-xl text-center text-green-400 hover:text-green-200   ">
          <Link to={"/create-blog"}>Create Blog 😍</Link>{" "}
        </h3>
      ) : (
        <div className="my-6 space-y-4">
          <div className="blog-card">
            <img
              className="blog-thumb"
              src="./assets/blogs/Underrated Video.jpg"
              alt=""
            />
            <div className="mt-2">
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                React Fetch API {"title"}
              </h3>
              <p className="mb-6 text-base text-slate-500 mt-1">
                {
                  " lorem It looks like you want to conditionally render content based on the length of the blogs array in the profile object. There are a few syntax issues in your code snippet that need to be addressed."
                }
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center capitalize space-x-2">
                  <div className="avater-img bg-indigo-600 text-white">
                    <span className="">{"avatar"}</span>
                  </div>

                  <div>
                    <h5 className="text-slate-500 text-sm">{"user.Name"}</h5>
                    <div className="flex items-center text-xs text-slate-700">
                      <span>June 28, 2018</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm px-2 py-1 text-slate-700">
                  <span>100 Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
