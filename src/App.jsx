import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateBlog from "./components/pages/Create-blog";
import Layout from "./Layout";
import BlogsSection from "./components/main/BlogsSection";
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/from/register";
import LoginPage from "./components/pages/from/LoginPage";
import ErrorPage from "./components/pages/error-page/ErrorPage";
import SingleBlog from "./components/pages/single-blog/SingleBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route path="/" element={<BlogsSection></BlogsSection>} />
        <Route path="/home" element={<BlogsSection></BlogsSection>} />
        <Route path="/create-blog" element={<CreateBlog></CreateBlog>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/search" element={<Search></Search>} />
        <Route path="/me" element={<Profile></Profile>} />
        <Route path="/profile/:id" element={<Profile></Profile>} />
        <Route path="single-blog/:id" element={<SingleBlog />} />
      </Route>
      <Route path="*" element={<ErrorPage></ErrorPage>} />
    </Routes>
  );
}

export default App;
