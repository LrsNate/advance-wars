import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import INITIAL_STATE from 'store';
import reducer from 'reducers';
import Map from 'components/Map';

const logger = createLogger();

const store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(thunk, promise, logger),
);

render(
  <Provider store={store}>
    <Map />
  </Provider>,
  document.getElementById('container'),
);
