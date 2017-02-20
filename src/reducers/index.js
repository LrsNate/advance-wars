import { ACTIVATE_CELL } from 'actions';
import activateUnit from 'reducers/unit';

function activateCell(state, action) {
  const { rowId, colId } = action;
  if (!state.map.cells[rowId][colId].unit) {
    return state;
  }
  return activateUnit(state, action);
}

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIVATE_CELL:
      return activateCell(state, action);
    default:
      return state;
  }
}
