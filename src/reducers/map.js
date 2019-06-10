import { produce } from "immer";
import { endTurnType } from "../App";
import { cellActionType, cellClickType } from "../Cell";
import {
  endTurn,
  getSelected,
  getTarget,
  makeMap,
  moveUnit,
  resetActions,
  resetMap,
  selectCell
} from "../lib/map";

const map = makeMap(7, 7);
map[3][2].unit = { type: "mech", x: 2, y: 3 };
map[5][5].unit = { type: "mech", x: 5, y: 5 };

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
    case endTurnType:
      return produce(state, endTurn);
    default:
      return state;
  }
}
