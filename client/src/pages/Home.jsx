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
        const response = await axios.get("https://mern-blogserver.onrender.com/getposts");
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
      <div className="container mx-auto my-8 cursor-pointer ">
        <h1 className="text-4xl font-bold mb-6">Latest Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              onClick={() => handleNavigate(post)}>
              {post.imageUrl && (
                <img
                  src={`https://mern-blogserver.onrender.com${post.imageUrl}`}
                  alt="Post"
                  className="w-full h-32 object-cover"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>

              <div className="info flex gap-2 p-4">
                <p className="author text-gray-600 mb-2">{post.username}</p> {/*name of user by whom the post is created */} 
                <span className="text-gray-600 mb-2"> {new Date(post.createdAt).toLocaleString()}</span>  {/* time and date when the post is created*/}
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-2">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
