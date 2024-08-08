/* eslint-disable react/prop-types */

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PostComment = ({ blog }, ref) => {
  const commentRef = useRef(null);
  const { auth } = useAuth();
  const navigateComment = useNavigate();

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (auth?.user) {
        if (commentRef.current) {
          commentRef.current.focus();
          commentRef.current.style.backgroundColor = "#39403b";
          setTimeout(() => {
            if (commentRef.current) {
              commentRef.current.style.backgroundColor = "";
            }
          }, 1000);
        }
      } else {
        console.warn("User is not authenticated");
        navigateComment("/login");
      }
    },
  }));

  return (
    <div className="mx-auto w-full md:w-10/12 container">
      <h2 className="text-3xl font-bold my-8">
        Comments ( {blog?.comments.length} )
      </h2>
      <div className="flex items -center space-x-4">
        <div className="avater-img bg-indigo-600 text-white">
          <span className="">author</span>
        </div>

        <div className="w-full">
          <textarea
            ref={commentRef}
            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
            placeholder="Write a comment"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PostComment);
