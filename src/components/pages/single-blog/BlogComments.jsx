/* eslint-disable react/prop-types */
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const BlogComments = ({ comments, onDelete }) => {
  const { auth } = useAuth();
  const [toggledComment, setToggledComment] = useState(null);

  const handleToggle = (commentId) => {
    setToggledComment((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full relative md:w-10/12 container">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 my-8">
            <img
              className="rounded-full h-8 w-8"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                auth?.user?.avatar
              }`}
              alt=""
            />

            <div className="w-full text-start">
              <h5 className="text-slate-500 font-bold">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h5>
              <p className="text-slate-300 bg-gray-900 rounded-md p-1">
                {comment.content}
              </p>
            </div>

            <div className="relative">
              <button
                className=" bg-slate-900 rounded-full p-2"
                onClick={() => handleToggle(comment.id)}
              >
                <HiDotsVertical />
              </button>

              {toggledComment === comment.id && (
                <div className="action-modal-container">
                  <button className="action-menu-item hover:text-lwsGreen">
                    <BiEdit /> Edit
                  </button>

                  <button
                    className="action-menu-item hover:text-red-500"
                    onClick={() => {
                      onDelete(comment.id);
                      setToggledComment(null);
                    }}
                  >
                    <MdDeleteOutline /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogComments;
