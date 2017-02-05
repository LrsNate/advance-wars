import { connect } from 'react-redux';
import Map from './map';

function mapStateToProps(state) {
  return state.map;
}

function mapDispatchToState(dispatch) {
  return { foo: dispatch({ type: 'foo' }) };
}

export default connect(mapStateToProps, mapDispatchToState)(Map);
