export function makeMap(rows, cols) {
  const result = [];

  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({ type: "plain", x, y });
    }
    result.push(row);
  }

  return result;
}

export function getSelected(map) {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.selected) return cell;
    }
  }
  return null;
}

export function getTarget(map) {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.actions) return cell;
    }
  }
  return null;
}

function isInRange(cell1, cell2, range) {
  const xd = Math.abs(cell1.x - cell2.x);
  const yd = Math.abs(cell1.y - cell2.y);

  return xd + yd <= range;
}

export function selectCell(map, x, y) {
  resetMap(map);
  const cell = map[y][x];
  if (cell.unit && !cell.unit.disabled) {
    selectUnit(map, x, y);
  }
}

export function resetMap(map) {
  return map.forEach(row => {
    row.forEach(cell => {
      cell.selected = false;
      cell.inRange = false;
      cell.actions = null;
    });
  });
}

export function resetActions(map) {
  return map.forEach(row => {
    row.forEach(cell => {
      cell.actions = null;
    });
  });
}

export function endTurn(map) {
  return map.forEach(row => {
    row.forEach(cell => {
      if (cell.unit) {
        cell.unit.disabled = false;
      }
    });
  });
}

function selectUnit(map, x, y) {
  return map.forEach(row => {
    row.forEach(cell => {
      if (cell.x === x && cell.y === y) {
        cell.selected = true;
      } else if (isInRange(cell, { x, y }, 2)) {
        cell.inRange = true;
      }
    });
  });
}

export function moveUnit(src, dest) {
  if (dest.unit) return;
  const { unit } = src;
  src.unit = null;

  unit.x = dest.x;
  unit.y = dest.y;
  unit.disabled = true;
  dest.unit = unit;
}