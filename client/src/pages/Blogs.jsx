import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const Blogs = () => {
  const location = useLocation();
  const post = location.state && location.state.post;
  
  return (
    <>
      <Navbar />
      <div className="h-auto flex flex-col items-center justify-center bg-gray-100">
        {post && (
          <div className="bg-white w-auto   h-auto  ">
            <img
              src={`http://localhost:3001${post.imageUrl}`}
              alt="Post"
              className="w-full  h-80 object-cover "
            />

            <div className="info flex gap-2 p-4 px-16">
              <p className="author text-black font-bold text-lg mb-2">{post.username}</p> {/* getting username by */}
              <span className="text-gray-600 mb-2">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="px-16 py-4">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <label  className="bold text-black text-3xl" htmlFor="">Description:</label>
              <h4 className="text-lg text-gray-600 mb-2">{post.description}</h4>
              <label  className="bold text-black text-3xl" htmlFor="">Summary:</label>
              <p className="text-gray-700">{post.summary}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
