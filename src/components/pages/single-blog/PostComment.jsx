/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { useAuth } from "../../../hooks/useAuth";

const PostComment = ({ onLoadComment, comments, onPostComment, }, focusRef) => {
  const { auth } = useAuth();

  return (
    <div className="mx-auto w-full md:w-10/12 container">
      <h2 className="text-3xl font-bold my-8">Comment ( {comments.length} )</h2>
      <div className="flex items -center space-x-4">
        <div className="avater-img bg-indigo-600 text-white">
          <img
            className=" rounded-full "
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              auth?.user?.avatar
            }`}
            alt=""
          />
        </div>

        <div className="w-full">
          <textarea
            onChange={(e) => onLoadComment(e.target.value)}
            disabled={!auth?.user}
            style={{
              cursor: auth?.user ? "text" : "not-allowed",
            }}
            ref={focusRef}
            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
            placeholder="Write a comment"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              onClick={onPostComment}
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PostComment);
