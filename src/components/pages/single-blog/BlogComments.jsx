/* eslint-disable react/prop-types */

const BlogComments = ({ blog }) => {
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        {blog?.comments.map((comment) => (
          <div
            key={comment?.author?.id}
            className="flex items-start space-x-4 my-8"
          >
            <div className=" text-white ">
              <p className="avater-img bg-orange-600">img</p>
            </div>
            <div className="w-full text-start  ">
              <h5 className="text-slate -500 font-bold">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h5>
              <p className="text-slate-300  bg-gray-900 rounded-md p-1 ">
                {comment?.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogComments;
