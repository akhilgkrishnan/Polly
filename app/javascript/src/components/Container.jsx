import React, { createContext } from "react";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";
import { getFromLocalStorage } from "src/helpers/storage";
import { isNil, isEmpty, either } from "ramda";

export const UserLoggedInContext = createContext();

const Container = ({ children }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken != "null";

  return (
    <UserLoggedInContext.Provider value={isLoggedIn}>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex h-full">
          <div className="bg-white border shadow-md mx-auto mt-16 md-8 w-3/5 px-2 py-4">
            {children}
          </div>
        </div>
      </div>
    </UserLoggedInContext.Provider>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
