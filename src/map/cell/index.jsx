import { connect } from 'react-redux';
import Cell from './cell';

function mapStateToProps(state, ownProps) {
  return ownProps;
}

function mapDispatchToState(dispatch) {
  return { foo: dispatch({ type: 'foo' }) };
}

export default connect(mapStateToProps, mapDispatchToState)(Cell);
