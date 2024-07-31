import FavoriteBlog from "./FavoriteBlog";
import PopularBlog from "./PopularBlog";

const AsideBlogs = () => {
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <PopularBlog></PopularBlog>

      <FavoriteBlog></FavoriteBlog>
    </div>
  );
};

export default AsideBlogs;
