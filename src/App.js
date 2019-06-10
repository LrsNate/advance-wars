import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Map from "./Map";

export const endTurnType = "game:endTurn";

const mapDispatchToProps = dispatch => ({
  endTurn: () => dispatch({ type: endTurnType })
});

class App extends React.Component {
  render() {
    const { endTurn } = this.props;
    return (
      <div>
        <Map />
        <Button onClick={endTurn}>End turn</Button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
