/* eslint-disable react/prop-types */
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogComments = ({ comments, onDelete }) => {
  const { auth } = useAuth();
  const [toggledComment, setToggledComment] = useState(null);

  const handleToggle = (commentId) => {
    setToggledComment((prevId) => (prevId === commentId ? null : commentId));
  };
  // console.log(comments[0]?.author?.id)

  return (
    <section id="comments">
      <div className="mx-auto w-full relative md:w-10/12 container">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 my-8">
            <p className=" bg-red-700 font-semibold p-2 rounded-full h-10 w-10 text-center ">
              {comment?.author?.firstName.slice(0, 1)}{" "}
            </p>

            <div className="w-full text-start">
              <Link to={`/profile/${comment?.author?.id}`}>
                <h5 className="text-slate-500 font-bold underline hover:text-green-500">
                  {comment?.author?.firstName} {comment?.author?.lastName}
                </h5>
              </Link>
              <p className="text-slate-300 rounded-md p-1 w-full text-justify">
                {comment.content}
              </p>
            </div>

            <div className="relative">
              {comment?.author?.id === auth?.user?.id && (
                <button
                  className=" bg-slate-800 rounded-full p-2"
                  onClick={() => handleToggle(comment.id)}
                >
                  <HiDotsVertical />
                </button>
              )}

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
