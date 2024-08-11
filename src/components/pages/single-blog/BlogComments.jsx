/* eslint-disable react/prop-types */

import { useAuth } from "../../../hooks/useAuth";

const BlogComments = ({ comments, onDelete }) => {
  const { auth } = useAuth();

  //  DELETE &#x27;http://localhost:3000/blogs/<blog_id>/comment/<comment_id>&#x27; \
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 my-8">
            <img
              className=" rounded-full h-8 w-8"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                auth?.user?.avatar
              }`}
              alt=""
            />

            <div className="w-full text-start  ">
              <h5 className="text-slate -500 font-bold">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h5>
              <p className="  text-slate-300  bg-gray-900 rounded-md p-1 ">
                {comment.content}
              </p>

              <button onClick={() => onDelete(comment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogComments;
