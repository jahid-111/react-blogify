import BrandLogo from "../../assets/logo.svg";
import SearchSvg from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Header = () => {
  const { auth } = useAuth();

  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/home">
            <img className="w-32" src={BrandLogo} alt="lws" />
          </Link>
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="create-blog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            <li>
              <Link
                to="search"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={SearchSvg} alt="Search" />
                <span>Search</span>
              </Link>
            </li>

            {/* =================================== {USER ACCESS CONDITION} ===================================*/}
            {auth.user ? (
              <li className="flex items-center">
                <div className="avater-img bg-orange-600 text-white">
                  <span className="">J</span>
                </div>
                <Link to="/me">
                  <span className="text-white ml-2">
                    {auth?.user?.firstName} {auth?.user?.lastName}
                  </span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            )}

            {/* {if auth are true Name visible} */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
