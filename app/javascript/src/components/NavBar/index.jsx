import React from "react";
// import NavItem from "./NavItem";

const NavBar = () => {
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
            <a
              className="inline-flex items-center px-1 pt-1
                      mr-3 font-semibold text-lg leading-5"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
