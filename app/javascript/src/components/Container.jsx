import React from "react";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex h-full">
          <div className="bg-white border shadow-md mx-auto mt-16 md-8 w-3/5 px-2 py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
