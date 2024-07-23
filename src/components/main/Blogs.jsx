import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="space-y-3 md:col-span-5">
      <div className="blog-card">
        <img
          className="blog-thumb"
          src="./assets/blogs/React-Roadmap.jpg"
          alt=""
        />
        <div className="mt-2 relative">
          {/* <Link to="/single-blog">
            <h3 className="text-slate-300 text-xl lg:text-2xl">
              <Link to="/single-blog">React Roadmap in 2024</Link>
            </h3>
          </Link> */}
          <Link to="/single-blog">
            <h3 className="text-slate-300 text-xl lg:text-2xl">
              React Roadmap in 2024
            </h3>
          </Link>
          <p className="mb-6 text-base text-slate-500 mt-1">
            Aenean eleifend ante maecenas pulvinar montes lorem et pede dis
            dolor pretium donec dictum. Vici consequat justo enim. Venenatis
            eget adipiscing luctus lorem.
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">S</span>
              </div>

              <div>
                <h5 className="text-slate-500 text-sm">
                  <Link to="/profile">Saad Hasan</Link>
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>June 28, 2018</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span>100 Likes</span>
            </div>
          </div>

          <div className="absolute right-0 top-0">
            <button>
              <img src="./assets/icons/3dots.svg" alt="3dots of Action" />
            </button>

            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src="./assets/icons/edit.svg" alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src="./assets/icons/delete.svg" alt="Delete" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
