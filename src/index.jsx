import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';


import '../assets/stylesheets/application.scss';

import Router from './components/router'


const reducers = combineReducers({

});

const middlewares = applyMiddleware(logger);


const root = document.getElementById('root');
ReactDOM.render(
  <Provider store={createStore(reducers, {}, middlewares)}>
    <Router />
  </Provider>, root);
