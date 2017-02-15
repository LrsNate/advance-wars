import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Cell from 'components/Cell';
import styles from 'styles/Map.scss';

console.log(styles);

const Map = ({ rows, cols }) => {
  const cells = _.range(rows).map((rowId) => {
    const rowCells = _.range(cols).map(colId => <Cell rowId={rowId} colId={colId} key={colId} />);
    return (<div className={styles.row}>{rowCells}</div>);
  });
  return (
    <div>
      <h1>It works!</h1>
      <ul>
        <li>{rows} rows</li>
        <li>{cols} cols</li>
      </ul>
      {cells}
    </div>
  );
};

Map.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return state.map;
}

function mapDispatchToState(dispatch) {
  return { foo: dispatch({ type: 'foo' }) };
}

export default connect(mapStateToProps, mapDispatchToState)(Map);
