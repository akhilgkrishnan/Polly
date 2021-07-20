import React from "react";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "src/helpers/storage";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");

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
            <Link
              className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-lg leading-5"
              to="/"
            >
              {userName}
            </Link>
            <a className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-lg leading-5 cursor-pointer">
              Logout
            </a>
            <Link
              className="inline-flex items-center px-1 pt-1
                      mr-3 font-semibold text-lg leading-5"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
