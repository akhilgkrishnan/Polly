import React from "react";
import TableRow from "./TableRow";

const Table = ({ showPoll, editPoll }) => {
  return (
    <div className="table w-full">
      <TableRow showPoll={showPoll} editPoll={editPoll} />
    </div>
  );
};

export default Table;
