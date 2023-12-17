import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3001/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("login Successful");
        navigate("/");
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="loginpage w-max m-auto p-8  ">
        <form action="" method="post" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
