import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const alert1 = () => {
    Swal.fire({
      icon: "success",
      title: "Login Successfully",
      showConfirmButton: false,
      timer: 1500
    });
  }





  const handleLogin = async (e) => {
    e.preventDefault();
    setCreating(true);
    const response = await axios.post("http://localhost:3001/login", user);
    if (response.data.email === user.email) {
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("user_id", response.data._id);
      localStorage.setItem("useremail", response.data.email);
      localStorage.setItem("token", response.data._id);
      navigate("/");
      setCreating(false);
      alert1();

    } else if (response.data == "incorrect password") {
      console.log(response.data, "incorrect password");
    } else if (response.data == "Email not found") {
      console.log(response.data, "email not found");
    } else {
      console.log(response.data, "invalid details");
    }
    if (response.data == "Login successful") {
      localStorage.setItem("user", JSON.stringify(user.email));
      localStorage.setItem("token", "token");
      navigate("/");
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
          <button className="btn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
