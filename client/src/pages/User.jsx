import  { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [userData, setUserData] = useState(null);
  console.log(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming you have an endpoint for fetching user data
        const response = await axios.get('http://localhost:3001/getuser'); // Replace with your actual API endpoint
        console.log(response.data);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-max m-auto mt-10">
      {userData ? (
        <>
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
          {/* {userData.profilePic && (
            <img
              src={`http://localhost:3001${userData.profilePic}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          )} */}

          <h2>Posts created by {userData.name}:</h2>
          <ul>
            {userData.posts.map((post) => (
              <li key={post._id}>{post.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;
