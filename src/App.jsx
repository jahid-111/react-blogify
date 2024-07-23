import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateBlog from "./components/pages/Create-blog";
import Layout from "./Layout";
import BlogsSection from "./components/main/BlogsSection";
import LoginPage from "./components/pages/login/LoginPage";
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/login/register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/home" element={<BlogsSection></BlogsSection>} />
          <Route path="/create-blog" element={<CreateBlog></CreateBlog>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/search" element={<Search></Search>} />
          <Route path="/me" element={<Profile></Profile>} />
        </Route>
      </Routes>

      {/* <Page></Page> */}
    </>
  );
}

export default App;
