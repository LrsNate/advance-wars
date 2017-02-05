import React from 'react';

const Map = ({ rows, cols }) => (
  <div>
    <h1>It works!</h1>
    <ul>
      <li>{rows} rows</li>
      <li>{cols} cols</li>
    </ul>
  </div>
);

Map.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
};

export default Map;
