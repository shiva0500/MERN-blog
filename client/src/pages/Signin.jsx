import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlesignin = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await axios.post("https://mern-blogserver.onrender.com/signin" , user);
      console.log("user created:", response.data);
      localStorage.setItem("useremail", user.email);
      localStorage.setItem("username", user.username);
      localStorage.setItem("token", "token");
      navigate("/");
      window.location.reload();
      alert("Signin Successful");
    } catch (error) {
      console.error(error);
      alert("Signin failed:", error.getMessage());
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signinpage w-max m-auto p-8 ">
        <form onSubmit={handlesignin}>
          <label htmlFor="username">Username:</label>
          <input
          name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            autoComplete="username"
            required
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            autoComplete="password"
            name="password"
            required
            className="input input-bordered w-full max-w-xs mb-2"
            onChange={handleChange}
          />
          <br />
          <button type="submit" className="btn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign In
            {creating && (
              <span className="mt-1 ml-3  loading loading-spinner loading-xs"></span>
            )}
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
           user?{" "}
          <Link to="/login">
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

export default Signin;
