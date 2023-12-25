import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const User = () => {
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem("useremail");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getuser", {
          params: { email },
        });

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
        `http://localhost:3001/deletepost/${postId}`
      );

      if (response.status === 200) {
        // Remove the deleted post from the state
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
            {userData.profilePic ? (
              <img
                src={`http://localhost:3001${userData.profilePic}`}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <img
                src={"https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                className="w-32 h-32 object-cover rounded-full"
                alt="/"
              />
            )}

            <h1>{userData.name}</h1>
            <p>Email: {userData.email}</p>

            <h2>Posts created by {userData.name}:</h2>
            {userData.posts.length > 0 ? (
              <table className="table-auto max-w-full border-separate border p-6">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.posts.map((post) => (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>
                        <Link
                          to={`/update/${post._id}`}
                          className="btn btn-success ">
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="btn btn-error px-2 py-1">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No posts available.</p>
            )}
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
};

export default User;
