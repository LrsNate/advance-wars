import React from 'react';

import styles from 'styles/Cell.scss';

const Cell = ({ rowId, colId }) => (
  <div className={styles.cell} />
);

Cell.propTypes = {
  rowId: React.PropTypes.number.isRequired,
  colId: React.PropTypes.number.isRequired,
};

export default Cell;
