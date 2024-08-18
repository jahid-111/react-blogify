/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { api } from "../.././data-api";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";

const Search = ({ onModalClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  console.log(error);
  useEffect(() => {
    const getSearchData = async (userInput) => {
      if (!userInput) {
        setSearchData([]); // Clear search data if input is empty
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${userInput}`
        );

        if (response.status === 200) {
          setSearchData(response.data.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    getSearchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchData([]);
    setError(null); // Clear previous errors
  };

  return (
    <section className="fixed inset-0 w-fu  ll h-screen grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="relative w-11/12 md:w-7/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        {/* Search Header */}
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desired Blogs
          </h3>
          <input
            onChange={handleInputChange}
            value={searchTerm}
            type="text"
            placeholder="Start Typing to Search"
            className="w-full border-b bg-transparent p-2 text-base text-white outline-none rounded-lg focus:ring focus:ring-indigo-600"
          />
        </div>

        {searchTerm && <h3 className="mt-2 font-semibold ">Result : </h3>}

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading && <p className="loader-Search"></p>}

          {error && <h4 className=" text-center">{error} 🥲</h4>}

          {!loading && !error && searchData.length === 0 && searchTerm && (
            <p className="text-slate-500 text-center mt-4">
              No results found 🥲
            </p>
          )}

          {searchData?.map((data) => (
            <div
              key={data.id}
              className="my-2 bg-gray-800 rounded-md p-1 hover:bg-slate-700 "
            >
              <Link
                onClick={() => onModalClose(false)}
                to={`single-blog/${data.id}`}
              >
                <div className="flex justify-sta  rt items-center gap-4">
                  <div className="mt-2">
                    <h3 className="text-slate-300 font-semibold">
                      {data.title}
                    </h3>
                    <p className="text-sm h-10 text-slate-500 mt-1">
                      {data?.content.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onModalClose(false)}
          className="absolute right-2 top-2"
        >
          <FaXmark className="cursor-pointer w-8 h-8 hover:text-red-500" />
        </button>
      </div>
    </section>
  );
};

export default Search;
