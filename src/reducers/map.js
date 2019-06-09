import { produce } from "immer";
import { cellActionType, cellClickType } from "../Cell";

function makeMap(rows, cols) {
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

const map = makeMap(7, 7);
map[3][2].unit = { type: "mech", x: 2, y: 3 };
map[5][5].unit = { type: "mech", x: 5, y: 5 };

function getSelected(map) {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.selected) return cell;
    }
  }
  return null;
}

function getTarget(map) {
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

function selectCell(map, x, y) {
  resetMap(map);
  const cell = map[y][x];
  if (cell.unit) {
    selectUnit(map, x, y);
  }
}

function resetMap(map) {
  return map.forEach(row => {
    row.forEach(cell => {
      cell.selected = false;
      cell.inRange = false;
      cell.actions = null;
    });
  });
}

function resetActions(map) {
  return map.forEach(row => {
    row.forEach(cell => {
      cell.actions = null;
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

function moveUnit(src, dest) {
  if (dest.unit) return;
  const { unit } = src;
  src.unit = null;

  unit.x = dest.x;
  unit.y = dest.y;
  dest.unit = unit;
}

function clickCell(map, { row, col }) {
  const selected = getSelected(map);
  if (!selected) {
    selectCell(map, col, row);
  } else {
    const cell = map[row][col];

    if (cell.inRange) {
      resetActions(map);
      cell.actions = { move: "Move", cancel: "Cancel" };
    } else {
      resetMap(map);
    }
  }
}

function cellAction(map, { action }) {
  const selected = getSelected(map);
  const target = getTarget(map);

  if (action === "move") {
    moveUnit(selected, target);
  }
  resetMap(map);
}

export default function mapReducer(state = map, action) {
  switch (action.type) {
    case cellClickType:
      return produce(state, map => clickCell(map, action));
    case cellActionType:
      return produce(state, map => cellAction(map, action));
    default:
      return state;
  }
}
