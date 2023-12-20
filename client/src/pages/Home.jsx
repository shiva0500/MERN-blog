import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getposts');

        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
  
    <Navbar/>
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-6">Latest Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-md">
            {post.imageUrl && (
              <img src={`http://localhost:3001${post.imageUrl}`} alt="Post" className="w-full h-32 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <p className="text-gray-700">{post.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
