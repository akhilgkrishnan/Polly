import React from "react";
import Table from "components/Table";

const ListPolls = ({ showPoll, editPoll }) => {
  return <Table showPoll={showPoll} editPoll={editPoll} />;
};

export default ListPolls;
