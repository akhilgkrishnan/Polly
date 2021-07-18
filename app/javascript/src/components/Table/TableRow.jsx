import React, { useContext } from "react";
import { PollsDataContext } from "components/Dashboard";

const TableRow = () => {
  const data = useContext(PollsDataContext);
  return (
    <div className="table w-full">
      <div className="table-row-group">
        {data.map(poll => (
          <div className="table-row py-2" key={poll.id}>
            <div className="table-cell text-lg font-medium cursor-pointer hover:text-indigo-500">
              {poll.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TableRow;
