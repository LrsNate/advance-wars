import _ from 'lodash';

function getStoreInitialState() {
  const map = { rows: 16, cols: 20, cells: [], selectedCell: null };

  const cells = _.range(map.rows).map((rowId) => { // eslint-disable-line
    return _.range(map.cols).map(colId => ({
      rowId,
      colId,
      state: { isActive: false, isInMovementRange: false },
    }));
  });

  map.cells = cells;
  return { map };
}

export default getStoreInitialState();
