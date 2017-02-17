import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from 'styles/Cell.scss';

const Cell = ({ rowId, colId, isActive, activate }) => {
  const classes = classNames(styles.cell, { [styles.active]: isActive });
  return (
    <div className={classes} onClick={activate({ rowId, colId })} /> // eslint-disable-line
  );
};

Cell.propTypes = {
  rowId: React.PropTypes.number.isRequired,
  colId: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  activate: React.PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { rowId, colId } = ownProps;
  const isActive = _.isEqual(state.selectedCell, { rowId, colId });
  return { ...ownProps, isActive };
}

function mapDispatchToProps(dispatch) {
  return {
    activate: ({ rowId, colId }) => () => {
      dispatch({
        type: 'ACTIVATE_CELL',
        rowId,
        colId,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
