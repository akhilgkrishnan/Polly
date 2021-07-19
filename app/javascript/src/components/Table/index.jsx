import React from "react";
import TableRow from "./TableRow";

const Table = ({ showPoll }) => {
  return (
    <div className="table w-full">
      <TableRow showPoll={showPoll} />
    </div>
  );
};

export default Table;
