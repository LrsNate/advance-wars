import React from 'react';
import _ from 'lodash';

import Cell from './cell';

const Row = ({ rowId, cols }) => {
  const cells = _.range(cols).map(colId => <Cell rowId={rowId} colId={colId} key={colId} />);
  return (
    <div>
      <p>Row: {rowId}</p>
      {cells}
    </div>
  );
};

Row.propTypes = {
  rowId: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
};

const Map = ({ rows, cols }) => {
  const rowElements = _.range(rows).map(rowId => <Row rowId={rowId} cols={cols} key={rowId} />);
  return (
    <div>
      <h1>It works!</h1>
      <ul>
        <li>{rows} rows</li>
        <li>{cols} cols</li>
      </ul>
      {rowElements}
    </div>
  );
};

Map.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
};

export default Map;
