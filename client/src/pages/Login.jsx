import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setCreating(true);
    const response = await axios.post("http://localhost:3001/login", user);
    if (response.data.email === user.email) {
      localStorage.setItem("user_id", response.data._id);
      localStorage.setItem("token", response.data._id);
      navigate("/");
      window.location.reload();
      setCreating(false);

    } else if (response.data == "incorrect password") {
      console.log(response.data, "incorrect password");
    } else if (response.data == "Email not found") {
      console.log(response.data, "email not found");
    } else {
      console.log(response.data, "invalid details");
    }
    if (response.data == "Login successful") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", "token");
      navigate("/");
      window.location.reload();
      setCreating(false);

    } else if (response.data == "Incorrect password") {
      console.log(response.data, "incorrect password");
    } else if (response.data == "User not found") {
      console.log(response.data, "User not found");
    } else {
      console.log(response.data);
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
            required
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            required
            name="password"
            autoComplete="password"
            onChange={handleChange}
          />
          <br />
          <button className="btn">
            Login
            {creating && (
              <span className="mt-1 ml-3  loading loading-spinner loading-xs"></span>
            )}
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          New user?{" "}
          <Link to="/signin">
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
