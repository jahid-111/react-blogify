import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import BlogsSection from "./components/main/BlogsSection";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet>
        <BlogsSection></BlogsSection>
      </Outlet>
      <Footer></Footer>
    </>
  );
};

export default Layout;
