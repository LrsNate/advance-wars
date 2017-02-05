import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import getStoreInitialState from './mocks';
import MapContainer from './map';

const store = createStore(i => i, getStoreInitialState());

render(
  <Provider store={store}>
    <MapContainer />
  </Provider>,
  document.getElementById('container'),
);
