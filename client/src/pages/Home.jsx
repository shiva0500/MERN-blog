import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import Blogs from "./Blogs";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);




  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getposts");
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleNavigate = (post) => {
    navigate("/blog", { state: { post } }); // Pass entire post as state
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-6 text-white text-center uppercase">Latest Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              {post.imageUrl && (
                <img
                  src={`http://localhost:3001${post.imageUrl}`}
                  alt="Post"
                  className="w-full h-32 object-cover object-center"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.description}</p>
              </div>
              <div className="info flex items-center justify-between gap-2 px-8 py-4">
                <div className="flex items-center justify-center gap-4">
                  <p className="author text-black font-bold text-xl mb-2">
                    {post.username}
                  </p>
                  <span className="text-gray-600 mb-2">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>

                <button
                  className="btn btn-active btn-primary"
                  onClick={() => handleNavigate(post)}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
