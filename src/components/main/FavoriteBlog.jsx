import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";

const FavoriteBlog = () => {
  const { auth } = useAuth();

  const { data: favourites } = useFetch(`blogs/favourites`);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favorites ❤️
      </h3>
      {auth?.user ? (
        <>
          {favourites?.blogs?.length === 0 ? (
            <h4 className=" text-center my-5"> {"You had't Add Yet"}</h4>
          ) : (
            <ul className="space-y-5 my-5">
              <li>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  How to Auto Deploy a Next.js App on Ubuntu from GitHub
                </h3>
                <p className="text-slate-600 text-sm">
                  #tailwindcss, #server, #ubuntu
                </p>
              </li>
            </ul>
          )}
        </>
      ) : (
        <div className=" text-center  font-xxl my-10 ">
          <Link className=" text-green-500  rounded-md" to="/login">
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
