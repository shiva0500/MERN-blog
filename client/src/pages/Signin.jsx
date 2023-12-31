import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import '../index.css';
const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const alert1 = () => {
    Swal.fire({
      icon: "success",
      title: "Signin Successfully",
      showConfirmButton: false,
      timer: 3500,
    });
  };

  const alert2 = () => {
    Swal.fire({
      icon: "error",
      title: "Signin failed",
      showConfirmButton: false,
      timer: 3500,
    });
  };

  const handlesignin = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await axios.post(
        "https://mern-blogserver.onrender.com/signin",
        user
      );
      console.log("user created:", response.data);
      localStorage.setItem("useremail", user.email);
      localStorage.setItem("username", user.username);
      localStorage.setItem("token", "token");
      navigate("/");
      alert1();
      // window.location.reload();
    } catch (error) {
      console.error("Signin failed:", error.getMessage());
      alert2();
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signinpage w-screen h-screen m-auto p-8  ">
        </div>
        <div className="container">
        <form  className=" signinform  p-6  " onSubmit={handlesignin}>
          <label className="text-left mb-2 text-white text-lg" htmlFor="username">Username:</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full p-5 mb-4 "
            autoComplete="username"
            required
            onChange={handleChange}
          />
          <br />
          <label className="text-left mb-2 text-white text-lg" htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="input input-bordered w-full p-5 mb-4"
            onChange={handleChange}
          />
          <br />
          <label className="text-left mb-2 text-white text-lg" htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            autoComplete="password"
            name="password"
            required
            className="input input-bordered w-full p-5  mb-4"
            onChange={handleChange}
          />
          <br />
          <button
            type="submit"
            className="btn btn-defualt mt-3  border-none flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign In
            {creating && (
              <span className="mt-1 ml-3  loading loading-spinner loading-xs"></span>
            )}
          </button>
        </form>
        <p className="mt-10 text-center text-base text-gray-300">
          user?{" "}
          <Link to="/login">
            <a
              href="#"
              className="font-semibold  text-lg leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </Link>
        </p>
      </div>
        
    </>
  );
};

export default Signin;
