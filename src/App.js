import produce from 'immer';
import React from 'react';
import { Overlay, Popover, ListGroup } from 'react-bootstrap';

class Cell extends React.Component {
  state = { ref: null };

  attachRef = ref => this.setState({ ref });

  render() {
    const { onAction, onClick, cell } = this.props;
    const { ref } = this.state;

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

    return (
      <React.Fragment>
        <div
          ref={this.attachRef}
          id={`cell-${cell.y}-${cell.x}`}
          className={classes.join(' ')}
          onClick={onClick}
        />
        <Overlay target={ref} show={!!cell.actions} placement="bottom">
          {({ show, ...props }) => (
            <Popover {...props}>
              <ListGroup variant="flush">
                {cell.actions &&
                  Object.entries(cell.actions).map(([action, label]) => (
                    <ListGroup.Item
                      action
                      as="li"
                      key={action}
                      onClick={() => onAction(action)}
                    >
                      {label}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Popover>
          )}
        </Overlay>
      </React.Fragment>
    );
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

class App extends React.Component {
  state = { map: makeMap(7, 7) };

  componentDidMount() {
    this.setState(
      produce(({ map }) => {
        map[3][2].unit = { type: 'mech', x: 2, y: 3 };
        map[5][5].unit = { type: 'mech', x: 5, y: 5 };
      })
    );
  }

  handleClick(x, y) {
    this.setState(
      produce(({ map }) => {
        const selected = getSelected(map);
        if (!selected) {
          selectCell(map, x, y);
        } else {
          const cell = map[y][x];

          if (cell.inRange) {
            cell.actions = { move: 'Move', cancel: 'Cancel' };
          } else {
            resetMap(map);
          }
        }
      })
    );
  }

  handleAction = action => {
    this.setState(
      produce(({ map }) => {
        const selected = getSelected(map);
        const target = getTarget(map);
        console.log(selected, target);

        if (action === 'move') {
          moveUnit(selected, target);
        }
        resetMap(map);
      })
    );
  };

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
                onAction={this.handleAction}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
