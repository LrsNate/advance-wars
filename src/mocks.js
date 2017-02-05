export default function getStoreInitialState() {
  const map = { rows: 4, cols: 5, cells: [] };

  for (let i = 0; i < map.rows; i += 1) {
    map.cells.push([]);
    for (let j = 0; j < map.cols; j += 1) {
      map.cells[i].push({ row: i, col: j });
    }
  }

  return { map };
}
