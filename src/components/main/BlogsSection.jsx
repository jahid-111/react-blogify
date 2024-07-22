import Blogs from "./Blogs";
import AsideBlogs from "./AsideBlogs";

const BlogsSection = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <Blogs></Blogs>
          <AsideBlogs></AsideBlogs>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
