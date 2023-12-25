import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const alert1 = () => {
    Swal.fire({
      icon: "success",
      title: "LogOut Successfull",
      showConfirmButton: false,
      timer: 1500
    });
  }


  const alert2 = () => {
    Swal.fire({
      icon: "error",
      title: "Signed Out failed",
      showConfirmButton: false,
      timer: 1500
    });
  }

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("useremail");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      setIsLogin(false);
      alert1();
    } catch (error) {
      alert2();
    }

  };

  return (
    <div>
      <div className="navbar bg-base-100 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
          LAZYBLOGS
          </Link>
        </div>
        <div>
          <ul className="flex items-center justify-between list-none ml-4">
            {isLogin ? (
              <div className="flex items-center justify-center">
                <Link to="/" className="text-white pr-4">
                  Home
                </Link>
                <Link to="/user" className="text-white pr-4">
                  <i className="fa-solid fa-user fa-xl"></i>{" "}
                </Link>{" "}
                <Link to="/create" className="text-white pr-6">
                  <i className="fa-solid fa-square-plus fa-xl"></i>{" "}
                </Link>{" "}
                <button className="btn btn-neutral" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <li className="mr-4">
                  <Link to="/" className="text-white pr-4">
                    Home
                  </Link>
                </li>
                <li className="mr-4">
                  <Link to="/signin" className="text-primary">
                    Signin
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
