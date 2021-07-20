import React from "react";
import TableRow from "./TableRow";

const Table = ({ showPoll, editPoll, destroyPoll }) => {
  return (
    <div className="table w-full">
      <TableRow
        showPoll={showPoll}
        editPoll={editPoll}
        destroyPoll={destroyPoll}
      />
    </div>
  );
};

export default Table;
