import _ from 'lodash';

const MAX_DISTANCE = 3;

function isInDistance(cell1, cell2) {
  const distance = Math.abs(cell1.rowId - cell2.rowId) + Math.abs(cell1.colId - cell2.colId);
  return distance > 0 && distance <= MAX_DISTANCE;
}

export function activateUnit(state, action) {
  const activeCell = { rowId: action.rowId, colId: action.colId };

  const cells = state.map.cells.map((row) => { // eslint-disable-line
    return row.map(cell => ({
      ...cell,
      state: {
        ...cell.state,
        isActive: _.isEqual({ rowId: cell.rowId, colId: cell.colId }, activeCell),
        isInMovementRange: isInDistance({ rowId: cell.rowId, colId: cell.colId }, activeCell),
      },
    }));
  });

  return {
    ...state,
    map: { ...state.map, cells },
    cellIsSelected: true,
  };
}

export function resetUnitActivation(state) {
  const cells = state.map.cells.map((row) => { // eslint-disable-line
    return row.map(cell => ({
      ...cell,
      state: { ...cell.state, isActive: false, isInMovementRange: false },
    }));
  });

  return {
    ...state,
    map: { ...state.map, cells },
    cellIsSelected: false,
  };
}
