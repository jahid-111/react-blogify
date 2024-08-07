import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const PopularBlog = () => {
  const { data } = useFetch("blogs/popular");

  const shouldScroll = data?.blogs?.length >= 4;

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul
        className={`space-y-5 my-5 ${
          shouldScroll ? "max-h-60 overflow-y-scroll" : ""
        }`}
      >
        {data?.blogs?.map((popular) => (
          <li key={popular.id}>
            <Link to={`/single-blog/${popular.id}`}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {popular?.title}
              </h3>
            </Link>

            <p className="text-slate-600 flex justify-between text-sm">
              <Link to={`/profile/${popular?.author?.id}`}>
                {" "}
                by{" "}
                <span className="underline hover:text-green-600">
                  {popular.author?.firstName} {popular.author?.lastName}
                </span>
              </Link>
              <span className=" pe-3"> likes {popular.likes.length}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlog;
