export const ACTIVATE_CELL = 'ACTIVATE_CELL';

export function activateCell(rowId, colId) {
  return {
    type: ACTIVATE_CELL,
    rowId,
    colId,
  };
}
