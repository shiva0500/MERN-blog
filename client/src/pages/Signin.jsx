import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlesignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signin", {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        alert("Signin Successful");
        navigate('/')
      } else {
        alert("Signin failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signinpage w-max m-auto p-8 ">
        <form action="" method="post" onSubmit={handlesignin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
