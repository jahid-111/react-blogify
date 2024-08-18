/* eslint-disable react/prop-types */
import { FaXmark } from "react-icons/fa6";

const Search = ({ onModalClose }) => {
  return (
    <section className="fixed inset-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="relative w-11/12 md:w-7/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desire Blogs
          </h3>
          <input
            type="text"
            placeholder="Start Typing to Search"
            className="w-full border-b bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
          />
        </div>
        <hr className=" bg-black" />
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {/* Sample search result */}
            <div className="flex gap-6 py-2">
              <img
                className="h-28 object-contain"
                src="./assets/blogs/taiulwind-cn-thumb.jpg"
                alt=""
              />
              <div className="mt-2">
                <h3 className="text-slate-300 text-xl font-bold">
                  Style your components with TailwindCSS
                </h3>
                <p className="mb-6 text-sm text-slate-500 mt-1">
                  Aenean eleifend ante maecenas pulvinar montes lorem et pede
                  dis dolor pretium donec dictum. Vici consequat justo enim.
                  Venenatis eget adipiscing luctus lorem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => onModalClose(false)}>
          <FaXmark className="absolute right-2 top-2 cursor-pointer w-8 h-8 hover:text-red-500" />
        </button>
      </div>
    </section>
  );
};

export default Search;
