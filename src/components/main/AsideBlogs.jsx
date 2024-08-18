import FavoriteBlog from "./FavoriteBlog";
import PopularBlog from "./PopularBlog";

const AsideBlogs = () => {
  return (
    <div className="md:col-span-2 relative h-full w-full space-y-5">
      <div className=" sticky top-2 ">
        <PopularBlog></PopularBlog>
        <FavoriteBlog></FavoriteBlog>
      </div>
    </div>
  );
};

export default AsideBlogs;
