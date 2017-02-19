import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { activateCell } from 'actions';
import styles from 'styles/Cell.scss';

const Cell = ({ rowId, colId, state, activate }) => {
  const classes = classNames(styles.cell, {
    [styles.active]: state.isActive,
    [styles.inMovementRange]: state.isInMovementRange,
  });
  return (
    <div className={classes} onClick={activate({ rowId, colId })} /> // eslint-disable-line
  );
};

const PropTypes = React.PropTypes;
Cell.propTypes = {
  rowId: PropTypes.number.isRequired,
  colId: PropTypes.number.isRequired,
  state: PropTypes.shape({
    isActive: PropTypes.bool.isRequired,
    isInMovementRange: PropTypes.bool.isRequired,
  }).isRequired,
  activate: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { rowId, colId } = ownProps;
  return state.map.cells[rowId][colId];
}

function mapDispatchToProps(dispatch) {
  return {
    activate: ({ rowId, colId }) => () => {
      dispatch(activateCell(rowId, colId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
