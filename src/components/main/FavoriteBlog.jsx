import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";

const FavoriteBlog = () => {
  const { auth } = useAuth();

  const { data: favorites } = useFetch(`blogs/favourites`);

  const shouldScroll = favorites?.blogs?.length >= 4;

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favorites ❤️
      </h3>
      {auth?.user ? (
        <>
          {favorites?.blogs?.length === 0 ? (
            <h4 className=" text-center my-5"> {"You hadn't Add Yet"}</h4>
          ) : (
            <ul
              className={`space-y-5 my-5 ${
                shouldScroll ? "max-h-60 overflow-y-scroll" : ""
              }`}
            >
              {favorites?.blogs?.map((favorite) => (
                <li key={favorite.id}>
                  <Link to={`/single-blog/${favorite.id}`}>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      {favorite?.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 text-sm">{favorite?.tags}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className=" text-center  font-xxl my-10 ">
          <Link to="/login" className=" text-green-500  rounded-md">
            {" "}
            Add to <span className=" underline font-semibold">
              Favourites
            </span>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoriteBlog;
