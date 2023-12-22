import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import User from "./pages/User";
import CreatePost from "./pages/CreatePost";
import Blogs from "./pages/Blogs";

const App = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/blog" element={<Blogs />} />
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
