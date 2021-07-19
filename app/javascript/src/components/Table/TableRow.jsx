import React, { useContext } from "react";
import { PollsDataContext } from "components/Dashboard";
import PropTypes from "prop-types";

const TableRow = ({ showPoll }) => {
  const data = useContext(PollsDataContext);
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
