import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ data }) => {
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

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableRow;
