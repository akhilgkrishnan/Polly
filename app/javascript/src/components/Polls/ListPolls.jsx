import React from "react";
import Table from "components/Table";

const ListPolls = ({ showPoll, editPoll, destroyPoll }) => {
  return (
    <Table showPoll={showPoll} editPoll={editPoll} destroyPoll={destroyPoll} />
  );
};

export default ListPolls;
