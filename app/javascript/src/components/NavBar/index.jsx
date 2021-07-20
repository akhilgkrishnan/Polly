import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "src/helpers/storage";
import authApi from "apis/auth";
import { resetAuthTokens } from "src/apis/axios";
import { UserLoggedInContext } from "src/App";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");
  const isLoggedIn = useContext(UserLoggedInContext);
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white px-2 py-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-mono text-3xl font-bold cursor-pointer">
              <a className="cursor-pointer" href="/">
                Polly
              </a>
            </h1>
          </div>
          <div>
            {isLoggedIn ? (
              <>
                <Link
                  className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-lg leading-5"
                  to="/"
                >
                  {userName}
                </Link>
                <a
                  className="inline-flex items-center px-1 pt-1 mr-3 font-semibold 
                              text-lg leading-5 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </>
            ) : (
              <Link
                className="inline-flex items-center px-1 pt-1
                        mr-3 font-semibold text-lg leading-5"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
