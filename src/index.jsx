import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import '../assets/stylesheets/application.scss';


import Router from './containers/router'

import bstReducer from './reducers/bst_reducer'
import connectedReducer from './reducers/connected_reducer'
import timeReducer from './reducers/time_reducer'
import assetDataReducer from './reducers/asset_data_reducer'

const reducers = combineReducers({
  bst: bstReducer,
  connected: connectedReducer,
  time_window: timeReducer,
  assetData: assetDataReducer
});

const middlewares = applyMiddleware(logger);


const root = document.getElementById('root');
ReactDOM.render(
  <Provider store={createStore(reducers, {}, middlewares)}>
    <Router />
  </Provider>, root);
