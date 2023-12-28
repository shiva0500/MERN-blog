import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const User = () => {
  const [userData, setUserData] = useState(null);
  const [userImg, setUserImg] = useState({ file: null });
  const email = localStorage.getItem("useremail");

  console.log(userData);
  
  const handleChange = (e) => {
    setUserImg({ file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", userImg.file);
      formData.append("email", email);

      const response = await axios.post(
        "https://mern-blogserver.onrender.com/userimg",
        formData
      );
      alert("Successfully submitted")
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://mern-blogserver.onrender.com/getuser",
          {
            params: { email },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [email, setUserData]);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `https://mern-blogserver.onrender.com/deletepost/${postId}`
      );

      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          posts: prevData.posts.filter((post) => post._id !== postId),
        }));
        console.log("Post deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="w-max m-auto mt-10">
        {userData ? (
          <>
            <div className="flex flex-col items-center mb-8">
              {userData.profilePic ? (
                <img
                  src={`https://mern-blogserver.onrender.com${userData.profilePic}`}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full"
                />
              ) : (
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                  }
                  className=" h-40 object-cover rounded-full"
                  alt="/"
                />
              )}
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full mb-4"
                  name="file"
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary">
                  Upload Image
                </button>
              </form>
              <h1 className="mt-2 text-white mb-2  text-3xl uppercase font-bold">
                {userData.name}
              </h1>
              <p className="text-gray-300 text-xl">Email: {userData.email}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Posts created by {userData.name}:
            </h2>
            <div>
              {userData.posts.length > 0 ? (
                <div className="grid md:grid-cols-2 p-0 lg:grid-cols-3 gap-4 ">
                  {userData.posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white rounded-lg max-w-md">
                      {post.imageUrl && (
                        <img
                          src={`https://mern-blogserver.onrender.com${post.imageUrl}`}
                          alt="Post"
                          className="w-full h-32 object-cover object-center"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-2 max-w-[400px] overflow-hidden line-clamp-4">
                          {post.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <Link
                            to={`/update/${post._id}`}
                            className="btn btn-success hover:bg-green-700">
                            Update
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="btn btn-error hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
};

export default User;
