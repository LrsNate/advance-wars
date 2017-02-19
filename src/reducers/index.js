import _ from 'lodash';

import { ACTIVATE_CELL } from 'actions';

const MAX_DISTANCE = 3;

function isInDistance(cell1, cell2) {
  const distance = Math.abs(cell1.rowId - cell2.rowId) + Math.abs(cell1.colId - cell2.colId);
  return distance > 0 && distance <= MAX_DISTANCE;
}

function activateCell(state, action) {
  const activeCell = { rowId: action.rowId, colId: action.colId };
  const { rows, cols } = state.map;

  const cells = _.range(rows).map((rowId) => { // eslint-disable-line
    return _.range(cols).map(colId => ({
      rowId,
      colId,
      state: {
        isActive: _.isEqual({ rowId, colId }, activeCell),
        isInMovementRange: isInDistance({ rowId, colId }, activeCell),
      },
    }));
  });
  return {
    ...state,
    map: {
      ...state.map,
      cells,
    },
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIVATE_CELL:
      return activateCell(state, action);
    default:
      return state;
  }
}
