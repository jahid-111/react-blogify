/* eslint-disable react/prop-types */

const Blog = ({ blog }) => {
  // console.log(blog);
  return (
    <>
      <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
      <div className="flex justify-center items-center my-4 gap-4">
        <div className="flex items-center capitalize space-x-2">
          <div className="avater-img bg-indigo-600 text-white">
            <span className="">S</span>
          </div>
          <h5 className="text-slate-500 text-sm">
            {blog?.author?.firstName} {blog?.author?.lastName}
          </h5>
        </div>
        <span className="text-sm text-slate-700 dot">June 28, 2018</span>
        <span className="text-sm text-slate-700 dot">
          {blog?.likes?.length} Likes
        </span>
      </div>
      <img
        className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt=""
      />

      <ul className="tags">
        {blog?.tags?.split(", ").map((tag, i) => (
          <li className=" bg-red-200" key={i}>
            {tag}
          </li>
        ))}
      </ul>

      <article className="mx-auto w-full text-justify text-pretty md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 ">
        {blog?.content}

        {/* _______________KEY NOT AVAILABLE_______________ */}
        {/* {  <h2 className="font-bold text-3xl mt-4">100% code-based map</h2>
        What if we generate code that returns the right team for a given screen,
        instead of creating a map? Since we know the full list of screen
        classNames, we can check ahead of time whether there's any #code
        conflict, and if not, we can generate code that directly} */}
      </article>
    </>
  );
};

export default Blog;
