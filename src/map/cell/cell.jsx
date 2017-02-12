import React from 'react';

const Cell = ({ rowId, colId }) => (
  <p>{rowId}, {colId}</p>
);

Cell.propTypes = {
  rowId: React.PropTypes.number.isRequired,
  colId: React.PropTypes.number.isRequired,
};

export default Cell;
