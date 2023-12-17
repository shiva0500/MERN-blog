import axios from "axios";
import {  useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const{setEmailnfo} = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile", {
          withCredentials: true,
        });
        const userInfo = response.data;
        setEmailnfo(userInfo.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      );
      setEmailnfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const email = userInfo?.email;

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
            {!email && (
              <>
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
              </>
            )}
            {email && (
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
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
