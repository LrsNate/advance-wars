import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Cell from "./Cell";

function mapStateToProps(state) {
  return {
    rows: state.map.length,
    cols: state.map[0].length
  };
}

class Map extends React.Component {
  render() {
    const { rows } = this.props;
    return <div>{_.range(rows).map(this.renderRow)}</div>;
  }

  renderRow = row => {
    const { cols } = this.props;

    return (
      <div className="aw-map-row" key={row}>
        {_.range(cols).map(col => (
          <Cell row={row} col={col} key={`${row}-${col}`} />
        ))}
      </div>
    );
  };
}

export default connect(mapStateToProps)(Map);
