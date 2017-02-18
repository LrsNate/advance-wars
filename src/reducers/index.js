import { ACTIVATE_CELL } from 'actions';

function activateCell(state, action) {
  const { rowId, colId } = action;
  return {
    ...state,
    selectedCell: { rowId, colId },
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
