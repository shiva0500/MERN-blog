import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="navbar bg-base-100 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            daisyUI
          </Link>
        </div>
        <div>
          <ul className="flex items-center list-none ml-4">
            {isLogin ? (
              <div className="flex items-center justify-center">
                <Link to="/user" className="text-primary pr-4">
                  User
                </Link>{" "}
                <Link to="/create" className="text-primary pr-6">
                  Create
                </Link>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <li className="mr-4">
                  <Link to="/login" className="text-primary">
                    Login
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
