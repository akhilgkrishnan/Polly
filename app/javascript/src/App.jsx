import React, { useEffect, useState, createContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import { ToastContainer } from "react-toastify";
import ShowPoll from "components/Polls/ShowPoll";
import EditPoll from "components/Polls/EditPoll";
import Signup from "components/Authentication/Signup";
import { either, isEmpty, isNil } from "ramda";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "src/helpers/storage";
import PageLoader from "components/PageLoader";

export const UserLoggedInContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken != "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <UserLoggedInContext.Provider value={isLoggedIn}>
        <ToastContainer />
        <Switch>
          <PrivateRoute
            path="/polls/new"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={CreatePoll}
          />
          <PrivateRoute
            path="/polls/:id/edit"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={EditPoll}
          />
          <PrivateRoute
            path="/polls/:id/show"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={ShowPoll}
          />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </UserLoggedInContext.Provider>
    </Router>
  );
};

export default App;
