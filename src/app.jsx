import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import getStoreInitialState from 'mocks';
import reducer from 'reducers';
import Map from 'components/Map';

const store = createStore(reducer, getStoreInitialState());

render(
  <Provider store={store}>
    <Map />
  </Provider>,
  document.getElementById('container'),
);
