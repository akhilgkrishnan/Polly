import React from "react";
import TableRow from "./TableRow";
import PropTypes from "prop-types";

const Table = ({ data }) => {
  return (
    <div className="table w-full">
      <TableRow data={data} />
    </div>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Table;
