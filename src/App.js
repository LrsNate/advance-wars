import React from 'react';
import produce from 'immer';

class Cell extends React.Component {
  render() {
    const { onClick, cell } = this.props;
    const classes = ['aw-map-cell'];

    if (cell.selected) {
      classes.push('selected');
    }
    if (cell.unit) {
      classes.push('mech');
    }
    if (cell.inRange) {
      classes.push('in-range');
    }

    return <div className={classes.join(' ')} onClick={onClick} />;
  }
}

function makeMap(rows, cols) {
  const result = [];

  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({ type: 'plain', x, y });
    }
    result.push(row);
  }

  return result;
}

function addUnit(map, unit) {
  return produce(map, draft => {
    draft[unit.y][unit.x].unit = unit;
  });
}

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
  const { unit } = src;
  src.unit = null;

  unit.x = dest.x;
  unit.y = dest.y;
  dest.unit = unit;
}

class App extends React.Component {
  state = { map: addUnit(makeMap(7, 7), { type: 'mech', x: 2, y: 3 }) };

  handleClick(x, y) {
    this.setState(
      produce(({ map }) => {
        const selected = getSelected(map);
        if (!selected) {
          selectCell(map, x, y);
        } else {
          const cell = map[y][x];
          if (cell.inRange) {
            moveUnit(selected, cell);
          }
          resetMap(map);
        }
      })
    );
  }

  render() {
    const { map } = this.state;
    return (
      <div>
        {map.map((row, index) => (
          <div className="aw-map-row" key={index}>
            {row.map(cell => (
              <Cell
                cell={cell}
                key={`${cell.y},${cell.x}`}
                onClick={() => this.handleClick(cell.x, cell.y)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
