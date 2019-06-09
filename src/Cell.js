import React from "react";
import { ListGroup, Overlay, Popover } from "react-bootstrap";
import { connect } from "react-redux";

function mapStateToProps(state, ownProps) {
  const { row, col } = ownProps;

  return { cell: state.map[row][col] };
}

export const cellClickType = "cell:click";
export const cellActionType = "cell:action";

const mapDispatchToProps = (dispatch, { row, col }) => ({
  onClickCell: () => dispatch({ type: cellClickType, row, col }),
  onCellAction: action => dispatch({ type: cellActionType, action })
});

class Cell extends React.Component {
  state = { ref: null };

  attachRef = ref => this.setState({ ref });

  render() {
    const { onClickCell, cell } = this.props;

    const classes = ["aw-map-cell"];

    if (cell.selected) {
      classes.push("selected");
    }
    if (cell.unit) {
      classes.push("mech");
    }
    if (cell.inRange) {
      classes.push("in-range");
    }

    return (
      <React.Fragment>
        <div
          ref={this.attachRef}
          id={`cell-${cell.y}-${cell.x}`}
          className={classes.join(" ")}
          onClick={onClickCell}
        />
        {this.renderOverlay()}
      </React.Fragment>
    );
  }

  renderOverlay() {
    const {
      onCellAction,
      cell: { actions }
    } = this.props;
    const { ref } = this.state;
    if (!actions) return null;

    return (
      <Overlay target={ref} show placement="bottom">
        {({ show, ...props }) => (
          <Popover {...props}>
            <ListGroup variant="flush">
              {Object.entries(actions).map(([action, label]) => (
                <ListGroup.Item
                  action
                  as="li"
                  key={action}
                  onClick={() => onCellAction(action)}
                >
                  {label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Popover>
        )}
      </Overlay>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);
