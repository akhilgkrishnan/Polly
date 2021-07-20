import React, { useContext } from "react";
import { PollsDataContext } from "components/Dashboard";
import { UserLoggedInContext } from "components/Container";
import PropTypes from "prop-types";
import Button from "components/Button";

const TableRow = ({ showPoll, editPoll, destroyPoll }) => {
  const data = useContext(PollsDataContext);
  const isLoggedIn = useContext(UserLoggedInContext);
  return (
    <div className="table w-full">
      <div className="table-row-group">
        {data.map(poll => (
          <div className="table-row py-2" key={poll.id}>
            <div
              className="table-cell text-lg font-medium cursor-pointer hover:text-indigo-500"
              onClick={() => showPoll(poll.id)}
            >
              {poll.title}
            </div>
            {isLoggedIn ? (
              <div>
                <div className="table-cell">
                  <Button buttonText="Edit" onClick={() => editPoll(poll.id)} />
                </div>
                <div className="table-cell pl-2">
                  <Button
                    buttonText="Delete"
                    onClick={() => destroyPoll(poll.id)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

TableRow.propTypes = {
  showTask: PropTypes.func,
};
export default TableRow;
