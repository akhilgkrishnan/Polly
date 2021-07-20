import React, { useState, useEffect, createContext } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import pollsApi from "apis/polls";
import { getFromLocalStorage } from "src/helpers/storage";

export const PollsDataContext = createContext();
export const UserLoggedInContext = createContext();

const Dashboard = ({ history }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken != "null";

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const showPoll = id => {
    history.push(`/polls/${id}/show`);
  };

  const editPoll = id => {
    history.push(`/polls/${id}/edit`);
  };

  const destroyPoll = async id => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <div className="flex justify-center">
          <div className="w-3/4 px-4">
            <div className="flex justify-between">
              <h2 className="text-3xl font-extrabold text-indigo-500">Polls</h2>
              <Button
                type="link"
                path={`/polls/new`}
                buttonText="Create a poll +"
                iconClass="ri-add-line"
                loading={loading}
              />
            </div>
            <PollsDataContext.Provider value={polls}>
              <UserLoggedInContext.Provider value={isLoggedIn}>
                <ListPolls
                  showPoll={showPoll}
                  editPoll={editPoll}
                  destroyPoll={destroyPoll}
                />
              </UserLoggedInContext.Provider>
            </PollsDataContext.Provider>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center">No polls found..! 😔</h1>
    </Container>
  );
};

export default Dashboard;
